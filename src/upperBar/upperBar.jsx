import React from 'react'
import './upperBar.css';
import { Link } from 'react-router-dom';
function UpperBar(props) {
    const upperBar = () =>{
        return(<div className="upper-bar">
        <div className="u-bar">
            <div className="u-left">
            <img src="https://img.icons8.com/cotton/64/000000/weight-1--v2.png"/>
            <Link to="/" style={{ textDecoration: 'none', color:"rgb(76, 145, 235)" }}><h1>Fitness Tracker</h1></Link>     
            </div>
            <div className="u-right">
            <Link to="/login" style={{ textDecoration: 'none', color:"rgb(76, 145, 235)" }}><h1>Log In</h1></Link>
            <h1>Sign Up</h1>
            </div>
        </div>
    </div>);
    }
    if(props.loged){
        return (
            <>
            {upperBar()}
            <div className="navigation-bar">
            <div className="n-bar">
                <Link to="/account" style={{ textDecoration: 'none', color:"white" }}><h1>ACCOUNT</h1></Link>          
                <Link to="/food" style={{ textDecoration: 'none', color:"white" }}><h1>FOOD</h1></Link>
                <Link to="/excersise" style={{ textDecoration: 'none', color:"white" }}><h1>EXCERSISE</h1></Link>
                <Link to="/weight" style={{ textDecoration: 'none', color:"white" }}><h1>WEIGHT</h1></Link>
                <Link to="/goals" style={{ textDecoration: 'none', color:"white" }}><h1>GOALS</h1></Link>
            </div>
        </div>
        </>
        )
    }else{
        return (
            <>
            {upperBar()}
            <div className="navigation-bar">
            <div className="slogan">
                <h1>Fitness starts with being consistent!</h1>
                <h1>Join now fo free</h1>
            </div>
        </div>
        </>
        )
    }
    
}

export default UpperBar;
