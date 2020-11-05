import React from "react";
import axios from "../../libs/axios";

import Brands from './Brands'


import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';

function Laptops () {

    return (
        <div >
            <Typography variant="h6" gutterBottom={true}>
                Ремонт ноутбуков
            </Typography>
            <Accordion boxShadow={1}>

                <AccordionSummary  expandIcon={<ExpandMore />}>
                        Бренды
                </AccordionSummary>

                <AccordionDetails>
                    <Brands/>
                </AccordionDetails>

            </Accordion>

            <Accordion>

                <AccordionSummary  expandIcon={<ExpandMore />}>
                    Услуги
                </AccordionSummary>

                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </AccordionDetails>

            </Accordion>


        </div>
    )
}

export default Laptops