import React, { Component } from 'react'
import './login.css';
class login extends Component {
    constructor(){
        super();
        this.email = React.createRef();
        this.state={
            emailValue: "Email Adress",
            passwordValue: "Password",
            alertId: "hidden"
        }
    }
    inputChange(e,array){
        this.setState({
            [array]: e.target.value
        })
    }
    focusChange(e,array,defaultValue){
        if(e.target.value===defaultValue){
            this.setState({
                [array]: ""
            })
        }
    }
    render(){
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-content">
                        <h1 id={this.state.alertId}>Incorrect username or password. Please try again.</h1>
                        <h2>Member login</h2>
                        <h1>Email Address:</h1>
                        <input type="text" onFocus={(e)=>this.focusChange(e,"emailValue","Email Adress")} value={this.state.emailValue} onChange={(e)=>this.inputChange(e,"emailValue")}/>
                        <h1>Password:</h1>
                        <input type="text" onFocus={(e)=>this.focusChange(e,"passwordValue","Password")}value={this.state.passwordValue} onChange={(e)=>this.inputChange(e,"passwordValue")}/>
                        <button>Log in</button>
                        <h1>Not a member yet?</h1><h1> Sign up now!</h1>
                    </div>
    
                </div>
            </div>
        )
    }
    
}

export default login
