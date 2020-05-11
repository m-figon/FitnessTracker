import React, { Component } from 'react'
import './upperBar.css';
import { Link } from 'react-router-dom';
class UpperBar extends Component {
    constructor() {
        super();
        this.state = {
            signId: "",
            loginOperation: ""
        }
    }
    componentDidMount() {
        if(this.props.loged){
            this.setState({
                signId: "visibleSign",
                loginOperation: <Link to="/" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1 onClick={()=>this.props.settingState("loged",false,"logedAc","","logedId",null)}>Log out</h1></Link>
            })
        }else{
            this.setState({
                signId: "hiddenSign",
                loginOperation: <Link to="/login" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Log in</h1></Link>
            })
        }
    }
    render() {
        const upperBar = () => {
            return (<div className="upper-bar">
                <div className="u-bar">
                    <div className="u-left">
                        <img src="https://img.icons8.com/cotton/64/000000/weight-1--v2.png" />
                        <Link to="/" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Fitness Tracker</h1></Link>
                    </div>
                    <div className="u-right">
                        <div id={this.state.signId} className="visibility-div">
                        <h1 id="welcome">Hi,</h1>
                        <Link to="/account" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>{this.props.logedAc}</h1></Link>
                        <h1 id="gray">|</h1>
                        </div>
                        {this.state.loginOperation}
                        <h1 id="gray">|</h1>
                        <Link to="/register" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Sign Up</h1></Link>
                    </div>
                </div>
            </div>);
        }
        if (this.props.loged) {
            return (
                <>
                    {upperBar()}
                    <div className="navigation-bar">
                        <div className="n-bar">
                            <Link to="/account" style={{ textDecoration: 'none', color: "white" }}><h1>ACCOUNT</h1></Link>
                            <Link to="/food" style={{ textDecoration: 'none', color: "white" }}><h1>FOOD</h1></Link>
                            <Link to="/exercise" style={{ textDecoration: 'none', color: "white" }}><h1>EXERCISE</h1></Link>
                            <Link to="/weight" style={{ textDecoration: 'none', color: "white" }}><h1>WEIGHT</h1></Link>
                            <Link to="/goals" style={{ textDecoration: 'none', color: "white" }}><h1>GOALS</h1></Link>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    {upperBar()}
                    <div className="navigation-bar">
                        <div className="slogan">
                            <h1>Fitness starts with being consistent!</h1>
                            <Link to="/register" style={{ textDecoration: 'none', color: "white" }}><h1>Join now for free</h1></Link>
                        </div>
                    </div>
                </>
            )
        }
    }


}

export default UpperBar;
