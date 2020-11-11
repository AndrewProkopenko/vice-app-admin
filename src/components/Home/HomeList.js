import React from "react"; 
import axios from '../../libs/axios'

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
    Grid,
    Paper, 
    FormGroup, 
    TextField, 
    Button , 
    IconButton,
    Typography,
    Divider
} from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles';

import { Alert } from '@material-ui/lab'; 


function HomeList () {

    let [services, setServices] = React.useState([])
    let [isSuccessSave, setIsSuccessSave] = React.useState(false)
    
    let [newServTitle, setNewServTitle] = React.useState('')
    let [newServSlug, setNewServSlug] = React.useState('')
    let [newServPrice, setNewServPrice] = React.useState('')
    let [file, setFile] = React.useState('')
    
    React.useEffect( () => {
        axios.get('/main-list')
            .then( (response) => {  
                setServices(response.items)
            })
    }, []) 

    const useStyles = makeStyles((theme) => ({
        flexDiv: {
          display: 'flex', 
          alignItems: 'center',
          marginTop: '1em',
          marginLeft: '1em'
        },
        input: {
          display: 'none',
        },
        label: { 
            marginRight: '1em',  
        }
      }));
    const classes = useStyles();

    function fileHendler(event) {  
        setFile(event.target.files[0])
    }

    function hendleServiceAdd(e) {
        e.preventDefault()

        // генерируем новое уникальноe id
        let newId = 0
        services.forEach(item => {
            if (item.id > newId) newId = item.id
        });
        newId++

        let newService  = { 
            "title": newServTitle,
            "slug": newServSlug,
            "price": newServPrice,
            "img": file.name || '', 
            "id": newId
        }

        let newServiceList = services.slice()
        newServiceList.push(newService)
        setServices(newServiceList)

        let sentData = {
            "items" : newServiceList, 
        } 
         
        axios.put('/main-list', sentData)
        .then( () => {
            setIsSuccessSave(true)
            setNewServTitle('')
            setNewServSlug('')
            setNewServPrice('')
        }) 
    }

    function deleteService(id) { 
        let filtered = services.filter( item => item.id !== id)

        let sentData = {
            "items" : filtered, 
        } 
        setServices(filtered)
        axios.put('/main-list', sentData)
    }
 
    function renderPreview() {  
        return services.map( item => {  
            return ( 
                <li  key={item.id} >

                <div className='btn-absolute right'>
                    <IconButton 
                        variant="contained"
                        color="secondary"   
                        size={'medium'}
                        onClick={()=>{deleteService(item.id)}}
                    ><DeleteIcon /></IconButton>
                </div>
                
                    <h4>{item.title}</h4>
                    <div> 
                        {
                                item.img 
                            }
                        <div className="img-cont ">
                           
                            {/* <svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width={84} height={49} viewBox="0 0 84 49">
                                <path d="M82.665,47.713 C81.804,48.570 80.772,48.999 79.569,48.999 L4.421,48.999 C3.216,48.999 2.182,48.570 1.322,47.713 C0.442,46.858 0.000,45.840 0.000,44.663 L0.000,44.380 L83.987,44.380 L83.987,44.663 C83.987,45.840 83.546,46.858 82.665,47.713 ZM11.672,5.338 C11.672,3.920 12.221,2.659 13.320,1.563 C14.395,0.518 15.655,-0.001 17.098,-0.001 L66.887,-0.001 C68.309,-0.001 69.566,0.518 70.669,1.563 C71.768,2.659 72.314,3.920 72.314,5.338 L72.314,42.499 L11.672,42.499 L11.672,5.338 ZM41.994,1.686 C41.722,1.686 41.503,1.906 41.503,2.177 C41.503,2.448 41.722,2.666 41.994,2.666 C42.265,2.666 42.484,2.448 42.484,2.177 C42.484,1.906 42.265,1.686 41.994,1.686 ZM67.034,38.325 L67.113,38.325 C67.971,38.325 68.668,37.630 68.668,36.771 L68.668,5.372 C68.668,4.513 67.971,3.816 67.113,3.816 L67.034,3.816 L16.876,3.816 C16.016,3.816 15.319,4.513 15.319,5.372 L15.319,36.771 C15.319,37.630 16.016,38.325 16.876,38.325 L67.034,38.325 Z" />
                            </svg> */}
                        </div>
                    </div>
                <div className="price-btn"><span /> {item.price} <span /></div> 
            </li> 
            )
        })
    }
    return (
        <div> 
            <Grid container spacing={3}> 
                <Grid item xs={12} md={12} > 
                    <Typography variant={"h6"}>Блок услуг</Typography> 
                     
                    {
                        isSuccessSave &&
                        <Alert severity="success">Успешно сохранено!</Alert>
                    }
                    <form 
                        onSubmit={hendleServiceAdd} 
                    >
                        <FormGroup row> 
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите название услуги'
                                    value={newServTitle}
                                    
                                    onChange={(e)=>{ setIsSuccessSave(false); setNewServTitle(e.target.value)}}
                                    className={'mr-2 mt-2 flex-grow-1'}
                            />
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите slug (ссылку)'
                                    value={newServSlug} 
                                    className="mt-2"
                                    onChange={(e)=>{ setIsSuccessSave(false);setNewServSlug(e.target.value)}}
                            />
                            
                        </FormGroup>
                        <FormGroup row>  
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите цену'
                                    value={newServPrice} 
                                    onChange={(e)=>{ setIsSuccessSave(false);setNewServPrice(e.target.value)}}
                                    className={'mt-2'}
                            />
                           <div className={classes.flexDiv}>
                                <input
                                    accept="image/svg+xml"
                                    className={classes.input}
                                    id="contained-button-file" 
                                    type="file"
                                    onChange={fileHendler}

                                />
                                <label htmlFor="contained-button-file" className={classes.label}>
                                    <Button variant="outlined"  color='info' component="div">
                                        Выбрать картинку
                                    </Button>
                                </label>
                                {
                                    file.name !== undefined ?
                                    <h6 className={classes.label}>Выбрано: {file.name}</h6> :
                                    <span>Примечание: для выбора картинки <br/> доступен только формат svg</span>
                                }
                                
                           </div>
                        </FormGroup>
                        
                        <Button
                            type={'submit'}
                            className={"mt-2"}
                            variant="contained"
                            color="primary"
                            size={'medium'}
                            startIcon={<SaveIcon/>}
                        >
                            Добавить услугу
                        </Button>
                    </form> 
                
                </Grid>
                <Grid item xs={12} md={12}> 
                    <div className='preview-container'>
                        <h3 className='preview-head'>Превью :</h3>
                        <Divider/>
                        <ul className='main-page-row'>
                            {
                                renderPreview()
                            }
                        </ul> 
                    </div> 
                </Grid>
            </Grid>
            
        </div>
    )
}

export default HomeList