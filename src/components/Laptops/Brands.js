import React from "react";
import axios from "../../libs/axios";


import {
    Typography,
    Button,
    List,
    Grid, FormGroup, TextField, ListItemText, ListItemSecondaryAction, IconButton, ListItem
} from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";

function Laptops () {

    let [newBrandName, setNewBrandName] = React.useState('')
    let [newBrandSlug, setNewBrandSlug] = React.useState('')

    let [laptops, setLaptops] = React.useState([])
    let {brands, services} = laptops

    let newBrands
    // let [newBrands, setNewBrands] = React.useState([])
    if(brands) {
        newBrands  = brands.slice()
    }


    React.useEffect( () => {
        axios.get('http://localhost:3000/laptops')
            .then(
                response => {
                    setLaptops(response)
                    // console.log(response.brands)
                }
            )
    }, [])

    function handleInputNewBrand(e) {
        if( e.target.name === 'name' )  setNewBrandName(e.target.value)
        if( e.target.name === 'slug' )  setNewBrandSlug(e.target.value)
    }

    function addNewBrand(e) {
        e.preventDefault()
        let newId = 0
        newBrands.forEach(item => {
            if (item.id > newId) newId = item.id
        });
        newId++

        let createdBrand = {
            "name": newBrandName,
            "slug": newBrandSlug,
            "id": newId
        }
        newBrands.push(createdBrand)

        const sentData = {
            "brands" : newBrands,
            "services": services
        }

        setLaptops(sentData)
        axios.put('http://localhost:3000/laptops', sentData)

        setNewBrandName('')
        setNewBrandSlug('')
    }

    function removeBrand(id) {
        let filtered = newBrands.filter( item => item.id !== id)

        const sentData = {
            "brands" : filtered,
            "services": services
        }

        setLaptops(sentData)
        axios.put('http://localhost:3000/laptops', sentData)
    }

    function renderBrands() {
        if(newBrands) return (
                <List className={'flex-list'}>
                    {
                        newBrands.map((item) => (
                            <ListItem divider={true} key={item.id}>
                                <ListItemText
                                    primary={`${item.name}`}
                                    secondary={`slug: ${item.slug}, id: ${item.id}`}
                                />
                                <ListItemSecondaryAction
                                    onClick={ () => removeBrand(item.id) }
                                >
                                    <div>
                                        {/*<CircularProgress color={"secondary"} size={20}/>*/}
                                    </div>
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
                        renderBrands()
                    }
                    <h4 className={'heading'}>
                        Добавить бренд
                    </h4>
                    <form
                        onSubmit={addNewBrand}
                    >
                        <FormGroup>
                            <TextField type='text'
                                       autoComplete={'off'}
                                       required
                                       variant="outlined"
                                       label='Введите название бренда'
                                       name='name'
                                       value={newBrandName}
                                       onChange={handleInputNewBrand}
                                       className={'mt-2'}
                            />
                            <TextField type='text'
                                       autoComplete={'off'}
                                       required
                                       variant="outlined"
                                       label='Введите слаг бренда'
                                       name='slug'
                                       value={newBrandSlug}
                                       onChange={handleInputNewBrand}
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

export default Laptops