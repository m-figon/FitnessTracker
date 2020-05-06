import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './register.css';
class register extends Component {
    constructor(){
        super();
        this.state={
            emailValue: "Email Adress",
            password1Value: "Password",
            password1Type: "text",
            password2Value: "Confirm Password",
            password2Type: "text",
            alertId: "hidden"
        }
    }
    inputChange(e,array){
        this.setState({
            [array]: e.target.value
        })
    }
    focusChange(e,array1,defaultValue,array2){
        if(e.target.value===defaultValue){
            this.setState({
                [array1]: "",
                [array2]: "password"
            })
        }
    }
    blurChange(e,array1,value1,array2,value2,defaultValue){
        if(e.target.value===defaultValue){
            this.setState({
                [array1]: value1,
                [array2]: value2
            })
        }
    }
    render(){
        /*
        setInterval(() => {
            if(this.state.emailValue===""){
                this.setState({
                    emailValue: "Email Adress"
                })
            }
            if(this.state.password1Value===""){
                this.setState({
                    password1Value: "Password",
                    password1Type: "text"
                })
            }
            if(this.state.password2Value===""){
                this.setState({
                    password2Value: "Confirm Password",
                    password2Type: "text"
                })
            }
        }, 3000);
        */
        return (
            <div>
                <div className="register">
                    <div className="register-form">
                        <div className="register-content">
                            <h1 id={this.state.alertId}>Incorrect registration values. Please try again.</h1>
                            <h2>Your Account Information</h2>
                            <h1>Email Address:</h1>
                            <input type="text" onFocus={(e)=>this.focusChange(e,"emailValue","Email Adress")} onBlur={(e)=>this.blurChange(e,"emailValue","Email Adress",null,null,"")} value={this.state.emailValue} onChange={(e)=>this.inputChange(e,"emailValue")}/>
                            <h1>Password:</h1>
                            <div className="one-line">
                            <input type={this.state.password1Type} onFocus={(e)=>this.focusChange(e,"password1Value","Password","password1Type")} onBlur={(e)=>this.blurChange(e,"password1Value","Password","password1Type","text","")} value={this.state.password1Value} onChange={(e)=>this.inputChange(e,"password1Value")}/>
                            <h1>6-255 characters, no space</h1>
                            </div>
                            <h1>Confirm Password:</h1>
                            <input type={this.state.password2Type} onFocus={(e)=>this.focusChange(e,"password2Value","Confirm Password","password2Type")} onBlur={(e)=>this.blurChange(e,"password2Value","Confirm Password","password2Type","text","")}value={this.state.password2Value} onChange={(e)=>this.inputChange(e,"password2Value")}/>
                            <button onClick={()=>this.login()}>Sign up</button>
                            
                        </div>
        
                    </div>
                </div>
            </div>
        )
    }
    
}

export default register
