import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard/Index'
import Header from './Pages/Header/Index'

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component = {Dashboard} />
            <Route path="/h" exact component = {Header} />
        </BrowserRouter>
    )
}
