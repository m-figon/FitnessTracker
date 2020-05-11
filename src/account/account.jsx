import React from 'react'
import './account.css';
import { Link } from 'react-router-dom';
function account(props) {
    return (
        <div className="account-display">
            <div className="account">
                <div className="topic">
                    <h1>Your Daily Summary</h1>
                </div>
                <div className="grid-account">
                    <div className="left-side">
                        <h1>{props.users[props.id].name}</h1>
                        <div className="img-border">
                            <img alt="" src="https://robohash.org/77set=set10"></img>
                        </div>
                    </div>
                    <div className="up-side">
                        <div className="single-line">
                            <h1>Calories Remaining</h1>
                            <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Change</h1></Link>
                        </div>
                        <div className="single-line">
                            <h1 id="green">{props.users[props.id].calories}</h1>
                            <div className="right-buttons">
                                <button>Add Exercise</button>
                                <button>Add Food</button>
                            </div>
                        </div>
                    </div>
                    <div className="down-side">
                        <h1>Hello!</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default account;
