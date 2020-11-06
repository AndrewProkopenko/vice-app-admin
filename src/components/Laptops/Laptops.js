import React from "react";

import LaptopsBrands from './LaptopsBrands'
import LaptopsServices from "./LaptopsServices";

import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';

function Laptops () {

    return (
        <React.Fragment >
            <Typography variant="h6" gutterBottom={true}>
                Ремонт ноутбуков
            </Typography>
            <Accordion className={'accordion'} >
                <AccordionSummary  expandIcon={<ExpandMore />}>
                    Бренды
                </AccordionSummary>
                <AccordionDetails>
                    <LaptopsBrands/>
                </AccordionDetails>
            </Accordion>

            <Accordion className={'accordion'}>
                <AccordionSummary  expandIcon={<ExpandMore />}>
                    Услуги
                </AccordionSummary>
                <AccordionDetails>
                    <LaptopsServices/>
                </AccordionDetails>
            </Accordion>

        </React.Fragment>
    )
}

export default Laptops