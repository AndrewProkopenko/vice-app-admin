

import React from 'react'
import './App.scss'


import {BrowserRouter as Router} from 'react-router-dom'

import {
    Container, 
    Grid, 
    Paper
} from '@material-ui/core';
 
import RouterComponent from "./RouterComponent";
import DrawerContainer from './components/DrawerContainer'

import ScroolToTop from './ScrollToTop'
 

function App() {  
    return (
        <Router>
            <ScroolToTop/>

            
            <Container className='main' maxWidth={'xl'}>
            <DrawerContainer/>
                <Grid container spacing={3}> 
                    {/* <Grid item xs={12} md={2} >
                        <Paper className='sidebar' elevation={3}>
                            <Sidebar/> 
                        </Paper>
                    </Grid> */}
                    <Grid item xs={12} >
                        <Paper className='paper mt-2' elevation={3}>
                           <RouterComponent/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Router>
    );
}

export default App;
