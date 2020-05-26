import Controller from 'react-imvc/controller'
import React from 'react'

export default class Home extends Controller {
    View = View
}

function View() {
    return (
        <h1>Hello React-IMVC</h1>
    )
}