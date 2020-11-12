import React from 'react'
import axios from '../../libs/axios'
import { useParams, useLocation } from 'react-router-dom'

import { 
    Typography,
    FormGroup,  
    TextField , 
    Button,
    Divider,
    Grid
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';


// функция для редактирования текста в компонентах 
function Pages() {
    const {page} = useParams()
    let [heading, setHeading] = React.useState('') 
    let [content, setContent] = React.useState('')   
    let [isSuccessSave, setIsSuccessSave] = React.useState(false)
    
    let [file, setFile] = React.useState('')

    const useStyles = makeStyles((theme) => ({
        flexDiv: {
          display: 'flex', 
          alignItems: 'center',
          marginTop: '1em'
        },
        input: {
          display: 'none',
        },
        label: { 
            marginRight: '1em',  
        }
      }));
    const classes = useStyles();

    
    function usePageViews() {
        let location = useLocation(); 
        React.useEffect(() => {
             

            setIsSuccessSave(false)
            axios.get(`${page}`)
                .then(
                    response => { 
                        console.log(response.img)
                        setContent(response.content)
                        setHeading(response.heading) 
                        setFile(response.img) 
                    }
                )
                // .then( () => {
                //     Image()
                // }
                // )
        }, [location]);
    }

    function fileHendler(event) {   

        setFile(event.target.files[0].name) 
    } 

    function removeImageFile() { 
        setFile('')
    }

    function handleInputContent(e) {
        setContent(e.target.value) 
        setIsSuccessSave(false)
    }  

    
    function hendleButtonSave() { 
        const newData = {
            "heading": heading, 
            "content": content, 
            "img": file , 
        }
        axios.put(`/${page}`, newData)
            .then(
                setIsSuccessSave(true)
            )
    }

    // function Image() { 
    //     let port = document.querySelector('.image-portal')
        
    //     let img = document.createElement('img')  

    //     console.log(file)
    //     // if(port) port.innerHTML = '';
    //     if(port && file.length > 0 ) {
    //         img.classList.add('image-230')
    //         img.classList.add('float-left')
    //         img.src = `/images/${file}`
    //         // <div className='image-230 float-left' style='background-image: url(../images/2.jpg)'> 

    //         // </div>  
    //         port.appendChild(img)
    //     }
        
    //     console.log(img)
    // } 
    // Image() 

    return (
        <div>
            {usePageViews()}
            <Grid container>
                <Grid item lg={6}>
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
                                    rows={18} 
                                    className={'mt-2'}
                        />
                        {/* <h5 className={'mt-2 mb-0'}> 
                            Если хотите добавить картинку,напишите следующий текст: <br/>
                            <code>
                                {String("<div class='image-230 float-left' style='background-image: url(../img/[ИМЯ-ФАЙЛА.РАСШИРЕНИЕ])'></div>")}    
                            </code> <br/>
                            где:   <br/>
                            - класс image-230 - обязателен <br/>
                            - класс float-left - для того чтобы текст обтекал картинку <br/>
                            - обязательно имя картинки должно совпадать <br/>
                        </h5> */}
                            <div className='mt-2'>Не забудьте разместить в тексте: <br/> 
                                <code>{String("<div class='image-portal'></div>")}</code>
                                <br/>
                                для обозначения места где должна быть картинка
                            </div>
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
                                    file.length > 0 &&
                                    <h6 className={classes.label}>Выбрано: {file}</h6>  
                                }
                                
                                {
                                    file.length > 0 &&
                                    <Button 
                                        variant="outlined"  
                                        color='secondary' 
                                        component="div"
                                        onClick={removeImageFile}
                                    >
                                        Удалить картинку
                                    </Button>
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
                        onClick={hendleButtonSave}
                    >
                        Сохранить
                    </Button> 
                </Grid>      

                <Grid item lg={6}> 
                    <div className='preview-container ml-1'>
                        <h3 className='preview-head'>Превью :</h3>
                        <Divider/>
                        <div dangerouslySetInnerHTML={{__html: content}}></div> 
                    </div> 
                </Grid>
            </Grid>
            
            
        </div>
    )
}

export default Pages
