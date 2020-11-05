import React from "react";
import { Route, Switch} from "react-router-dom";

import Home from "./components/Home";
import Prefixes from "./components/Prefixes";
import Laptops from "./components/Laptops/Laptops";
import Pages from "./components/Pages";

function RouterComponent () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/prefixes" component={Prefixes}  />
            <Route exact path="/pages" component={Pages}  />
            <Route exact path="/laptops" component={Laptops}  />
        </Switch>
    )
}

export default  RouterComponent