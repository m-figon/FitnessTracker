import React from 'react'
import './upperBar.css';
function UpperBar() {
    return (
        <div className="upper-bar">
            <div className="u-bar">
                <div className="u-left">
                <img src="https://img.icons8.com/cotton/64/000000/weight-1--v2.png"/>
                <h1>Fitness Tracker</h1>
                </div>
                <div className="u-right">
                <h1>Log In</h1>
                <h1>Sign Up</h1>
                </div>
            </div>
        </div>
    )
}

export default UpperBar;
