import React from 'react'
import axios from '../../libs/axios'
import { useParams, useLocation } from 'react-router-dom'

import { 
    Typography,
    FormGroup,  
    TextField , 
    Button,
    Divider
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import { Alert } from '@material-ui/lab';


// функция для редактирования текста в компонентах 
function Pages() {
    const {page} = useParams()
    let [heading, setHeading] = React.useState('') 
    let [content, setContent] = React.useState('')   
    let [isSuccessSave, setIsSuccessSave] = React.useState(false)

 
    function usePageViews() {
        let location = useLocation(); 
        React.useEffect(() => {

            setIsSuccessSave(false)
            axios.get(`${page}`)
                .then(
                    response => { 
                        setContent(response.content)
                        setHeading(response.heading) 
                    }
                )
        }, [location]);
    }
    function handleInputContent(e) {
        setContent(e.target.value) 
        setIsSuccessSave(false)
    }  
    
    function hendleButtonSave() { 
        const newData = {
            "heading": heading, 
            "content": content
        }
        axios.put(`/${page}`, newData)
            .then(
                setIsSuccessSave(true)
            )
    }

    return (
        <div>
            {usePageViews()}
            <Typography variant={'h6'}>
                Введите текст для страницы "{heading}"
            </Typography>
            {
                isSuccessSave &&
                <Alert severity="success">Успешно сохранено!</Alert>
            }
            <FormGroup>
                <TextField  type='text'
                            required
                            variant="outlined"
                            label='Введите контент'
                            value={content}
                            name='content'
                            onChange={handleInputContent} 
                            multiline
                            rows={8} 
                            className={'mt-2'}
                />
                <h5 className={'mt-2 mb-0'}> 
                    Если хотите добавить картинку,напишите следующий текст: <br/>
                    <code>
                        {String("<div class='image-230 float-left' style='background-image: url(../img/[ИМЯ-ФАЙЛА.РАСШИРЕНИЕ])'></div>")}    
                    </code> <br/>
                    где:   <br/>
                    - класс image-230 - обязателен <br/>
                    - класс float-left - для того чтобы текст обтекал картинку <br/>
                    - обязательно имя картинки должно совпадать <br/>
                </h5>
                 
            </FormGroup>
            
            <Button
                type={'submit'}
                className={"mt-2"}
                variant="contained"
                color="primary" 
                size={'medium'}
                startIcon={<SaveIcon/>}
                onClick={hendleButtonSave}
            >
                Сохранить
            </Button> 
                     

            <div className='preview-container'>
                <h3 className='preview-head'>Превью :</h3>
                <Divider/>
                <div dangerouslySetInnerHTML={{__html: content}}></div> 
            </div>
            
            
        </div>
    )
}

export default Pages
