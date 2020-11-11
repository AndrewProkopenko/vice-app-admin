import React from 'react'

import HomeList from "./HomeList"
import HomeAdv from "./HomeAdv"
import HomeReviews from "./HomeReviews"

import Divider from '@material-ui/core/Divider';

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
