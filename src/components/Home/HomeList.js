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
            setFile('')
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

                            <div className='img' style={{ 
                                ['-webkitMask']: `url(./images/${item.img}) no-repeat center`,
                                mask: `url(./images/${item.img}) no-repeat center`
                            }}></div>
 
                            {/* <img src='./images/3.svg' fill="#fff" alt='hi'/>  */}
                            
                            {/* <svg><use xlinkHref="./images/3.svg"></use></svg> */}
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