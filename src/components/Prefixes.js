import React from "react";
import axios from 'axios'

import SaveIcon from '@material-ui/icons/Save';
import { FormGroup, TextField, Button , Typography} from '@material-ui/core'

import { Alert } from '@material-ui/lab';

function Prefixes () {

    let [prefixes, setPrefixes] = React.useState([])

    let [isSuccessSave, setIsSuccessSave] = React.useState(false)

    React.useEffect( () => {
        axios.get('http://localhost:3000/prefixes')
            .then( response => setPrefixes(response.data.laptops) )
    }, [])

    function handleInput(e) {
        setPrefixes(e.target.value)
        setIsSuccessSave(false)
    }

    function hendleButtonSave(e) {
        e.preventDefault()
        const newPrefix = {
            "laptops": prefixes
        }
        axios.put('http://localhost:3000/prefixes', newPrefix)
            .then(
                setIsSuccessSave(true)
            )
    }

    return (
        <div>
            <Typography variant={"h6"}>Префикс для ноутбуков</Typography>
            {
                isSuccessSave &&
                <Alert severity="success">Успешно сохранено!</Alert>
            }
            <form onSubmit={hendleButtonSave} >
                <FormGroup>
                    <TextField type='text'
                               required
                               variant="outlined"
                               label='Введите префикс'
                               value={prefixes}
                               name='prefix'
                               onChange={handleInput}
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
                    Сохранить
                </Button>
            </form>
        </div>
    )
}

export default  Prefixes