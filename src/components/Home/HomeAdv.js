import React from "react"; 
import axios from '../../libs/axios'

import SaveIcon from '@material-ui/icons/Save';
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

import DeleteIcon from '@material-ui/icons/Delete';

import { Alert } from '@material-ui/lab';


function HomeAdv () {

    let [services, setServices] = React.useState([])
    let [isSuccessSave, setIsSuccessSave] = React.useState(false)
    
    let [newTitle, setNewTitle] = React.useState('') 
    let [heading, setHeading] = React.useState('') 

    React.useEffect( () => {
        axios.get('/main-adv')
            .then( (response) => {   
                setServices(response.items)
                setHeading(response.content)
            })
    }, []) 

    function hendleHeading(e) {  
        e.preventDefault()
        let sentData = {
            "items" : services, 
            "content": heading
        } 
         
        axios.put('/main-adv', sentData)
        .then( () => {
            setIsSuccessSave(true)
            setNewTitle('') 
        }) 

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
            "title": newTitle, 
            "id": newId
        }

        let newServiceList = services.slice()
        newServiceList.push(newService)
        setServices(newServiceList)

        let sentData = {
            "items" : newServiceList, 
            "content": heading
        } 
         
        axios.put('/main-adv', sentData)
        .then( () => {
            setIsSuccessSave(true)
            setNewTitle('') 
        }) 
    }

    function deleteService(id) { 
        let filtered = services.filter( item => item.id !== id)

        let sentData = {
            "items" : filtered, 
        } 
        setServices(filtered)
        axios.put('/main-adv', sentData)
    }
 
    function renderPreview() {  
        return services.map( item => {  
            return ( 
                <li  key={item.id} className="blocks-inner" style={{position: 'relative'}}>

                <div className='btn-absolute top'>
                    <IconButton 
                        variant="contained"
                        color="secondary"   
                        size={'medium'}
                        onClick={()=>{deleteService(item.id)}}
                    ><DeleteIcon /></IconButton>
                </div>
                {/* <div className='btn-absolute right'>
                    <Button
                        variant="contained"
                        color="light"  
                    >Cкрыть</Button>
                </div> */}
                {/* <NavLink className="wrap-link" to="/uslugi/remont-istochnikov-bespereboynogo-pitaniya-i-stabilizatorov-napryazheniya" /> */}
                  
            <div className="num">{  item.id}</div>
                <div className="item">{ item.title }</div> 
                </li> 
            )
        })
    }
    return (
        <div> 
            <Grid container spacing={3} className='mt-2'> 
                <Grid item xs={12} md={12} > 
                    <Typography variant={"h6"}>Блок Преимущества</Typography> 
                     
                    {
                        isSuccessSave &&
                        <Alert severity="success">Успешно сохранено!</Alert>
                    }
                       <form 
                        onSubmit={hendleHeading} 
                        >
                            <FormGroup row > 
                            <TextField type='text'
                                        required
                                        variant="outlined"
                                        label='Введите загаловок'
                                        value={heading}
                                        name='content'
                                        onChange={(e)=>{ setIsSuccessSave(false); setHeading(e.target.value)}}
                                        className={'mt-2 mr-2 flex-grow-1'}
                                />
                                <Button
                                type={'submit'}
                                className={"mt-2"}
                                variant="contained"
                                color="primary"
                                size={'small'}
                                startIcon={<SaveIcon/>}
                            >
                                Сохранить загаловок
                            </Button>
                            </FormGroup>
                            
                        </form> 
                
                    <form 
                        onSubmit={hendleServiceAdd} 
                    >
                        <FormGroup row>  
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите название'
                                    value={newTitle}
                                    name='adv'
                                    onChange={(e)=>{ setIsSuccessSave(false); setNewTitle(e.target.value)}}
                                    className={'mt-2 mr-2 flex-grow-1'}
                            />
                            <Button
                                type={'submit'}
                                className={"mt-2"}
                                variant="contained"
                                color="primary"
                                size={'medium'}
                                startIcon={<SaveIcon/>}
                            >
                                Добавить преимущество
                            </Button>
                        </FormGroup>
                        
                        <h6>Примечание: номер преимущества устанавливается автоматически по порядку</h6>
                    </form> 
                
                 
                </Grid>
                <Grid item xs={12} md={12}> 
                    <div className='preview-container'>
                        <h3 className='preview-head'>Превью:</h3>
                        <Divider/>
                        <div className="block-wrapper-advantages ">
                            <div className="advantages-wrapper">
                            <div className="title"> {heading}</div>
                            <ul className="block-extra-wrapper">
                                {
                                    renderPreview()
                                }
                            </ul>
                            </div>
                        </div>
                         
                    </div> 
                </Grid>
            </Grid>
            
        </div>
    )
}

export default HomeAdv