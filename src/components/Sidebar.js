import React from "react";
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {List, ListItem, ListItemText, Collapse} from "@material-ui/core";
import {NavLink} from "react-router-dom";

function Sidebar() {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
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
                    <ListItemText primary="Страницы услуги" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/laptops' >
                            <ListItem button >
                                <ListItemText primary={'Ремонт ноутбуков'} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/1' >
                            <ListItem button >
                                <ListItemText primary={'Ремонт принтеров'} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/2' >
                            <ListItem button >
                                <ListItemText primary={'Гарантийный ремонт'} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                    </List>
                </Collapse>


            </List>
    )
}

export default Sidebar