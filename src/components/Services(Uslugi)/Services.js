import React from 'react'
import axios from '../../libs/axios'

import {
    List,
    ListItem,
    Checkbox,
    ListItemText,
    ListItemIcon,
    Typography, 
    Button
} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';

function Services() {

    let [list, setList] = React.useState([]) 
    let [isSuccessSave, setIsSuccessSave] = React.useState(false) 


    React.useEffect( () => {
        axios.get('/pages')
            .then(
                response => {
                    setList(response.uslugi) 
                }
            )
    }, [])

    function handleToggle(id) { 
        let newList = list.slice()
        const currentItem = newList[id-1]
        currentItem.show = !currentItem.show

        setList(newList) 
        setIsSuccessSave(false) 
    };

    async function saveList(e) {
        e.preventDefault() 
        let newList = {
            "uslugi" : list
        }
        await axios.put('/pages/', newList)
        .then( () => { 
                setIsSuccessSave(true)
            }
        )
    }

    return (
        <div>
            <Typography variant={'h6'}>
                Выберите страницы, которые будут показаны в списке
            </Typography>
            {
                isSuccessSave &&
                <Alert severity="success">Успешно сохранено!</Alert>
            }
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
                onClick={saveList}
            >
                Сохранить
            </Button>
        </div>
    )
}

export default Services
