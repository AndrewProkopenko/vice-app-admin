import React from 'react'
import axios from '../../libs/axios'

import {
    List,
    ListItem,
    Checkbox,
    ListItemText,
    ListItemIcon,
    Typography, 
    Button,
    FormGroup,
    TextField,
    Divider
} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';

function Services() {

    let [list, setList] = React.useState([]) 
    let [content, setContent] = React.useState('') 
    let [isSuccessSave, setIsSuccessSave] = React.useState(false) 


    React.useEffect(  () => { 
        axios.get('/uslugi')
            .then(
                response => {
                    setList(response.items) 
                    setContent(response.content)
                }
            )
    }, []) 

    console.log(list)
    function handleInput(e) {
        setContent(e.target.value) 
        setIsSuccessSave(false)
    } 
      
    function handleToggle(id) { 
        let newList = list.slice()
        const currentItem = newList[id-1]
        currentItem.show = !currentItem.show

        setList(newList) 
        setIsSuccessSave(false) 
    };

    function saveData(e) {
        e.preventDefault() 
        const newList = {
            "uslugi" : list,
            "content": content
        }
        axios.put('/pages/', newList)
        .then( () => { 
                setIsSuccessSave(true)
            }
        )
    }

    return (
        <div>
            <Typography variant={'h6'}>
                Введите текст для страницы "Услуги"
            </Typography>
            {
                isSuccessSave &&
                <Alert severity="success">Успешно сохранено!</Alert>
            }
            <FormGroup>
                <TextField  type='text'
                            required
                            variant="outlined"
                            label='Введите контент(h1 и тд.)'
                            value={content}
                            name='content'
                            onChange={handleInput} 
                            multiline
                            rows={3} 
                            className={'mt-2'}
                />
            </FormGroup>

            <div className='preview-container'>
                <h3 className='preview-head'>Превью :</h3>
                <Divider/>
                <div dangerouslySetInnerHTML={{__html: content}}></div> 
            </div>

            <Typography variant={'h6'}  className='mt-2'>
                Выберите страницы, которые будут показаны в списке 
            </Typography>
            <List >
                    {
                        list.map((value) => {
                            const labelId = `checkbox-list-label-${value.id}`; 
                            return (
                                <ListItem key={value.id} role={undefined} dense button onClick={()=>{handleToggle(value.id)}}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={value.show}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText 
                                        id={labelId} 
                                        primary={`${value.name}`}  
                                    />
                                </ListItem>
                            );
                        })
                    } 
            </List>
            
            <Button 
                className={"mt-2"}
                variant="contained"
                color="primary"
                size={'medium'}
                startIcon={<SaveIcon/>}
                onClick={saveData}
            >
                Сохранить
            </Button>
        </div>
    )
}

export default Services
