import React from 'react'
import {Switch , Route, Redirect } from 'react-router'
import Board from "./components/Board";
import Quadro from "./components/Quadro"


export default props => 
    <Switch>
        <Route exact path='/board/:id' component={Board}/>
        <Route exact path='/:id' component={Quadro}/>
        <Redirect from='*' to='/board/1'/>
    </Switch>