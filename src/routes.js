import React from 'react'
import {Switch , Route, Redirect } from 'react-router'
import Board from "./components/Board";
import Quadro from "./components/Quadro"


export default props => 
    <Switch>
        <Route exact path='/' component={Board}/>
        <Route exact path='/principal' component={Quadro}/>
        <Redirect from='*' to='/'/>
    </Switch>