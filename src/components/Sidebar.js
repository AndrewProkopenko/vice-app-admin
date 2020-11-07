import React from "react";
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {List, ListItem, ListItemText, Collapse} from "@material-ui/core";
import {NavLink} from "react-router-dom";

function Sidebar() {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };

    return (

            <List>
                <NavLink exact to='/'>
                    <ListItem button>
                        <ListItemText primary={'Главная '}/>
                    </ListItem>
                </NavLink>
                <NavLink exact to='/prefixes'>
                    <ListItem button>
                        <ListItemText primary={'Префиксы'}/>
                    </ListItem>
                </NavLink>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Контент, Бренды, услуги" secondary={"Наполнение страниц"} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/content/uslugi' >
                            <ListItem button >
                                <ListItemText primary={'Услуги'} secondary={"path: /uslugi"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/content/remont-noutbukov' >
                            <ListItem button >
                                <ListItemText primary={'Ремонт ноутбуков'} secondary={"path: /uslugi/remont-noutbukov"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/1' >
                            <ListItem button disabled={true} >
                                <ListItemText primary={'Гарантийный ремонт'} secondary={"path: /uslugi/garantiynyy-remont"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/2' >
                            <ListItem button disabled={true} >
                                <ListItemText primary={'Ремонт компьютеров'} secondary={"path: /uslugi/remont-kompyuterov"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>

                        <NavLink exact to='/4' >
                            <ListItem button disabled={true} >
                                <ListItemText primary={'Ремонт источников бесперебойного питания и стабилизаторов напряжения'}
                                              secondary={"path: /uslugi/remont-istochnikov-bespereboynogo-pitaniya-i-stabilizatorov-napryazheniya"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/5' >
                            <ListItem button disabled={true}>
                                <ListItemText primary={'Ремонт принтеров, МФУ, копиров'} secondary={"path: /uslugi/remont-printerov-mfu-kopirov"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/6' >
                            <ListItem button disabled={true}>
                                <ListItemText primary={'Ремонт планшетов и смартфонов'} secondary={"path: /uslugi/remont-planshetov-i-smartfonov"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/6' >
                            <ListItem button  disabled={true}>
                                <ListItemText primary={'Платный ремонт'} secondary={"path: /uslugi/platnyy-remont"}  className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                    </List>
                </Collapse>

                <ListItem button onClick={handleClick2}>
                    <ListItemText primary="TITLE, DESCRIPTION " secondary={'Задать страницам'} />
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/meta/main' >
                            <ListItem button >
                                <ListItemText primary={'Главная'} secondary={"path: /"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi' >
                            <ListItem button >
                                <ListItemText primary={'Услуги'} secondary={"path: /uslugi"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-garantiynyy-remont' >
                            <ListItem button   >
                                <ListItemText primary={'Гарантийный ремонт'} secondary={"path: /uslugi/garantiynyy-remont"} className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-kompyuterov' >
                            <ListItem button>
                                <ListItemText primary={'Ремонт компьютеров'} secondary={"path: /uslugi/remont-kompyuterov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-istochnikov' >
                            <ListItem button  >
                                <ListItemText primary={'Ремонт источников бесперебойного питания и стабилизаторов напряжения'}
                                              secondary={"path: /uslugi/remont-istochnikov-bespereboynogo-pitaniya-i-stabilizatorov-napryazheniya"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-printerov-mfu-kopirov' >
                            <ListItem button  >
                                <ListItemText primary={'Ремонт принтеров, МФУ, копиров'} secondary={"path: /uslugi/remont-printerov-mfu-kopirov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-planshetov-i-smartfonov' >
                            <ListItem button >
                                <ListItemText primary={'Ремонт планшетов и смартфонов'} secondary={"path: /uslugi/remont-planshetov-i-smartfonov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-platnyy-remont' >
                            <ListItem button   >
                                <ListItemText primary={'Платный ремонт'} secondary={"path: /uslugi/platnyy-remont"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/price' >
                            <ListItem button >
                                <ListItemText primary={'Цены'} secondary={"path: /price"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/o-nas' >
                            <ListItem button >
                                <ListItemText primary={'О нас'} secondary={"path: /o-nas "} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/o-nas-garantiynoye-obsluzhivaniye' >
                            <ListItem button >
                                <ListItemText primary={'Гарантийное обслуживание'} secondary={"path: /garantiynoye-obsluzhivaniye"} className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/o-nas-nashi-vendory' >
                            <ListItem button >
                                <ListItemText primary={'Наши авторизации'} secondary={"path: /nashi-vendory"} className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/novosti' >
                            <ListItem button >
                                <ListItemText primary={'Новости'} secondary={"path: /novosti"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/otzyvy' >
                            <ListItem button >
                                <ListItemText primary={'Отзывы'} secondary={"path: /otzyvy"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/kontakty' >
                            <ListItem button >
                                <ListItemText primary={'Контакты'} secondary={"path: /kontakty"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>

                    </List>
                </Collapse>


            </List>
    )
}

export default Sidebar