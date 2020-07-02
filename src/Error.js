import React, { Component } from 'react'

export default class Error extends Component {
    constructor(props){
        super(props);
        this.state={
            errorState: false
        }
    }
    static getDerivedStateFromError(error){
        return{
            errorState: true
        }
    }
    render() {
        if(this.state.errorState){
            console.log('error!!!!')
            return (
                <h1>Something went wrong</h1>
            )
        }
         return(this.props.children);
    }
}

