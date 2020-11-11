import React from "react";
import axios from "../../libs/axios";


import {
    Button,
    List,
    Grid, FormGroup, TextField, ListItemText, ListItemSecondaryAction, IconButton, ListItem
} from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

function LaptopsServices () {

    let [newServiceName, setNewServiceName] = React.useState('')
    let [newServiceSlug, setNewServiceSlug] = React.useState('')

    let [laptops, setLaptops] = React.useState([])
    let {brands, services, companies} = laptops

    let newServices
    if(services) {
        newServices  = services.slice()
    }


    React.useEffect( () => {
        axios.get('/laptops')
            .then(
                response => {  
                    setLaptops(response)
                }
            )
    }, [])

    function handleInputNewService(e) {
        if( e.target.name === 'name' )  setNewServiceName(e.target.value)
        if( e.target.name === 'slug' )  setNewServiceSlug(e.target.value)
    }

    function addNewService(e) {
        e.preventDefault()
        let newId = 0
        newServices.forEach(item => {
            if (item.id > newId) newId = item.id
        });
        newId++

        let createdService = {
            "name": newServiceName,
            "slug": newServiceSlug,
            "id": newId
        }
        newServices.push(createdService)

        const sentData = {
            "brands" : brands,
            "services": newServices, 
            "companies": companies
        } 

        setLaptops(sentData)
        axios.put('/laptops', sentData)

        setNewServiceName('')
        setNewServiceSlug('')
    }

    function removeService(id) {
        let filtered = newServices.filter( item => item.id !== id)

        const sentData = {
            "brands" : brands,
            "services": filtered
        }

        setLaptops(sentData)
        axios.put('/laptops', sentData)
    }

    function renderServices() {
        if(newServices) return (
            <List className={'flex-list'}>
                {
                    newServices.map((item) => (
                        <ListItem   key={item.id}>
                            <ListItemText
                                primary={`${item.name}`}
                                secondary={`slug: ${item.slug}, id: ${item.id}`}
                            />
                            <ListItemSecondaryAction
                                onClick={ () => removeService(item.id) }
                            >
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    return (
        <Grid container>
            <Grid item   >

                {
                    renderServices()
                }
                <h4 className={'heading'}>
                    Добавить бренд
                </h4>
                <form
                    onSubmit={addNewService}
                >
                    <FormGroup>
                        <TextField type='text'
                                   autoComplete={'off'}
                                   required
                                   variant="outlined"
                                   label='Введите название бренда'
                                   name='name'
                                   value={newServiceName}
                                   onChange={handleInputNewService}
                                   className={'mt-2'}
                        />
                        <TextField type='text'
                                   autoComplete={'off'}
                                   required
                                   variant="outlined"
                                   label='Введите слаг бренда'
                                   name='slug'
                                   value={newServiceSlug}
                                   onChange={handleInputNewService}
                                   className={'mt-2'}
                        />
                    </FormGroup>
                    <Button
                        type={'submit'}
                        className={"mt-2"}
                        variant="contained"
                        color="primary"
                        size={'medium'}
                        startIcon={<SaveIcon/>}
                    >
                        Добавить бренд
                    </Button>
                </form>
            </Grid>
        </Grid>

    )
}

export default LaptopsServices