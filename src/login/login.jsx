import React, { Component } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions/acAction.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class login extends Component {
    constructor(){
        super();
        this.email = React.createRef();
        this.state={
            emailValue: "Email Adress",
            password1Value: "Password",
            password1Type: "text",
            alertId: "hidden",
            users: []
        }
    }
    componentDidMount(){
        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/users')
                .then(response => response.json())
                .then(data => this.setState({
                    users: data
                }));
      }
    inputChange(e,array){
        this.setState({
            [array]: e.target.value
        })
    }
    focusChange(e,array,defaultValue,array2,value2){
        if(e.target.value===defaultValue){
            this.setState({
                [array]: "",
                [array2]: value2
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
    login(){
        for(const item of this.state.users){
            if(item.mail===this.state.emailValue && item.password===this.state.password1Value){
                this.setState({
                    alertId: "hidden"
                })
                this.props.settingState("loged",true,"logedId",item.id);
                this.props.loginAction(item.name);
            }else{
                this.setState({
                    alertId: "visible"
                })
            }
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
                        <input autocomplete="off" type="text" onFocus={(e)=>this.focusChange(e,"emailValue","Email Adress",null,null)} onBlur={(e)=>this.blurChange(e,"emailValue","Email Adress",null,null,"")} value={this.state.emailValue} onChange={(e)=>this.inputChange(e,"emailValue")}/>
                        <h1>Password:</h1>
                        <input autocomplete="off" type={this.state.password1Type} onFocus={(e)=>this.focusChange(e,"password1Value","Password","password1Type","password")} onBlur={(e)=>this.blurChange(e,"password1Value","Password","password1Type","text","")} value={this.state.password1Value} onChange={(e)=>this.inputChange(e,"password1Value")}/>
                        <button onClick={()=>this.login()}>Log in</button>
                        <h1>Not a member yet?</h1>
                        <Link to="/register" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1> Sign up now!</h1></Link>
                    </div>
    
                </div>
            </div>
        )
    }
    
}

login.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
  };
  const mapStateToProps = state => ({
    logedAc: state.posts.items
  });
  export default connect(mapStateToProps, { loginAction })(login);