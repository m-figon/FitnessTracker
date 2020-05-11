import React, { Component } from 'react'
import './account.css';
import { Link } from 'react-router-dom';
import moment from 'moment'
class account extends Component {
    constructor() {
        super();
        this.state = {
            day: null,
            month: null,
            year: null
        }
    }
    componentDidMount() {

        let currentDate = moment().format('L');
        this.setState({
            month: parseInt(currentDate.substr(0, 2)),
            day: parseInt(currentDate.substr(3, 2)),
            year: parseInt(currentDate.substr(6, 4))
        })

    }

    render() {
        return (
            <div className="account-display" >
                <div className="account">
                    <div className="topic">
                        <h1>Your Daily Summary</h1>
                    </div>
                    <div className="grid-account">
                        <div className="left-part">
                            <h1>{this.props.users[this.props.id].name}</h1>
                            <div className="img-border">
                                <img alt="" src="https://robohash.org/77set=set10"></img>
                            </div>
                            <h1>Last weight:</h1>
                            <h1>Last excersise:</h1>

                        </div>
                        <div className="up-part">
                            <div className="single-line">
                                <h1>Calories Remaining</h1>
                                <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Change</h1></Link>
                            </div>
                            <div className="single-line">
                                <h1 id="green">{this.props.users[this.props.id].calories}</h1>
                                <div className="right-buttons">
                                    <Link to="/exercise" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button>Add Exercise</button></Link>
                                    <Link to="/food/add" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button>Add Food</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="down-part">
                            <div className="single-line">
                                <h1>Goal</h1>
                                <h1>Food</h1>
                                <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Change</h1></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default account;
