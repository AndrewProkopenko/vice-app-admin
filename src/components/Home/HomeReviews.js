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


function HomeReviews () {

    let [services, setServices] = React.useState([])
    let [isSuccessSave, setIsSuccessSave] = React.useState(false)
    
    let [newTitle, setNewTitle] = React.useState('') 
    let [newAuthor, setNewAuthor] = React.useState('') 
    let [heading, setHeading] = React.useState('') 

    React.useEffect( () => {
        axios.get('/main-review')
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
         
        axios.put('/main-review', sentData)
        .then( () => {
            setIsSuccessSave(true)
            setNewTitle('') 
            setNewAuthor('')
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
            "name": newAuthor,
            "text": newTitle,
            "img": "", 
            "id": newId
        }

        let newServiceList = services.slice()
        newServiceList.push(newService)
        setServices(newServiceList)

        let sentData = {
            "items" : newServiceList, 
            "content": heading
        } 
         
        axios.put('/main-review', sentData)
        .then( () => {
            setIsSuccessSave(true)
            setNewTitle('') 
            setNewAuthor('')
        }) 
    }

    function deleteService(id) { 
        let filtered = services.filter( item => item.id !== id)

        let sentData = {
            "items" : filtered, 
        } 
        setServices(filtered)
        axios.put('/main-review', sentData)
    }
 
    function renderPreview() {  
        return services.map( item => {  
            return ( 
                <li  key={item.id} style={{position: 'relative'}} >

                    <div className='btn-absolute right'>
                        <IconButton 
                            variant="contained"
                            color="secondary"   
                            size={'small'}
                            onClick={()=>{deleteService(item.id)}}
                        ><DeleteIcon /></IconButton>
                    </div>
                    
                    <div className="name">{  item.name}</div>
                    <div className="text">{ item.text }</div> 
                </li> 
            )
        })
    }
    return (
        <div> 
            <Grid container spacing={3} className='mt-2'> 
                <Grid item xs={12} md={12} > 
                    <Typography variant={"h6"}>Блок Отзывы</Typography> 
                     
                    {
                        isSuccessSave &&
                        <Alert severity="success">Успешно сохранено!</Alert>
                    }
                    <form 
                        onSubmit={hendleHeading} 
                        >
                            <FormGroup row > 
                                <TextField 
                                    type='text'
                                    required
                                    variant="outlined"
                                    label='Введите заголовок'
                                    value={heading} 
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
                                    label='Введите автора'
                                    value={newAuthor}
                                    name='adv'
                                    onChange={(e)=>{ setIsSuccessSave(false); setNewAuthor(e.target.value)}}
                                    className={'mt-2 mr-2 flex-grow-1'}
                            />
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите текст отзыва'
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
                                Добавить отзыв
                            </Button>
                        </FormGroup>
                         
                    </form> 
                
                 
                </Grid>
                <Grid item xs={12} md={12}> 
                    <div className='preview-container'>
                        <h3 className='preview-head'>Превью:</h3>
                        <Divider/>
                        <div> 
                            <div className="title"> {heading}</div>
                            <ul className="block-review" >
                                {
                                    renderPreview()
                                }
                            </ul> 
                        </div>
                         
                    </div> 
                </Grid>
            </Grid> 
        </div>
    )
}

export default HomeReviews