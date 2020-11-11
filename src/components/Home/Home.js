import React from 'react'

import HomeList from "./HomeList"
import HomeAdv from "./HomeAdv"
import HomeReviews from "./HomeReviews"

import {
    Divider,
    Button,

} from '@material-ui/core';
  
function Home() {
    
    return (
            <div> 
                <HomeList/>
                
                <Divider/>
                
                <HomeAdv/>
                
                <Divider/>

                <HomeReviews/>   
            </div>
    )
}

export default Home
