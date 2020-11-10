// import React from 'react'
import './App.scss'

import {BrowserRouter as Router} from 'react-router-dom'

import {Container, Grid, Paper} from '@material-ui/core';

import Sidebar from "./components/Sidebar";
import RouterComponent from "./RouterComponent";


function App() {

    return (
        <Router>
            <Container className='main'>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper className='sidebar' elevation={3}>
                            <Sidebar/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper className='paper' elevation={3}>
                           <RouterComponent/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Router>
    );
}

export default App;
