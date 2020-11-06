
import React from "react";
import {Button, FormGroup, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

function MetaForm(props) {

    return (
        <form onSubmit={props.hendleSubmit}>
            <FormGroup>
                <TextField type='text'
                           required
                           variant="outlined"
                           label='Введите TITLE'
                           value={props.title}
                           name='prefix'
                           onChange={props.hendleTitle}
                           className={'mt-2'}
                />
                <TextField type='text'
                           required
                           variant="outlined"
                           label='Введите DESCRIPTION'
                           value={props.desc}
                           name='prefix'
                           onChange={props.hendleDesc}
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
    )
}

export default MetaForm