import React from "react";
import { Route, Switch} from "react-router-dom";

import Home from "./components/Home/Home";
import Prefixes from "./components/Prefixes";
import Laptops from "./components/Laptops/Laptops";
import Meta from "./components/Meta/Meta"
import Services from "./components/Services(Uslugi)/Services";
import Pages from "./components/Services(Uslugi)/Pages";

function RouterComponent () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/prefixes" component={Prefixes}  /> 
            <Route exact path="/content/content-remont-noutbukov" component={Laptops}  />

            <Route exact path="/content/uslugi" component={Services}  />

            <Route exact path="/content/pages/:page" component={Pages}  />

            <Route path="/meta/:page" component={Meta}   />
        </Switch>
    )
}

export default  RouterComponent