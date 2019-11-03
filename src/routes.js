import React from 'react'
import {Switch , Route, Redirect } from 'react-router'
import Board from "./components/Board";


export default props => 
    <Switch>
        <Route exact path='/' component={Board}/>
        <Redirect from='*' to='/'/>
    </Switch>