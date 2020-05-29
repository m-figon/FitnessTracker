import React, { Component } from 'react'
import './goals.css';
import { Link } from 'react-router-dom';
import MacrosChart from '../macrosChart/macrosChart.jsx';
class goals extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        console.log('mountin');
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => this.setState({
                users: data
            }));
    }
    render() {
        if (this.state.users[this.props.id]) {
            const line = (type, value1, value2) => {
                return (<div className="line">
                    <div className="line-left">
                        <h1>{type} {value1}</h1>
                    </div>
                    <div className="line-right">
                        <h1>{value2}</h1>
                    </div>
                </div>);
            }
            //console.log(this.state.users[this.props.id]);
            console.log(this.state.users);
            console.log(this.props.id);
            console.log(this.state.users[this.props.id])
            return (
                <>
                    <div className="goals-content">
                        <div className="nutrition-goal">
                            <div className="header">
                                <div className="header-left">
                                    <h1>Daily Nutrition Goals</h1>
                                </div>
                                <div className="header-right">
                                    <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button id="button2">Edit</button></Link>
                                </div>
                            </div>
                            {line("Calories", null, this.state.users[this.props.id].calories)}
                            {line("Carbohydrates", Math.ceil(this.state.users[this.props.id].calories * this.state.users[this.props.id].carbs / 100 / 4) + " g", this.state.users[this.props.id].carbs + "%")}
                            {line("Fats", Math.ceil(this.state.users[this.props.id].calories * this.state.users[this.props.id].fats / 100 / 9) + " g", this.state.users[this.props.id].fats + "%")}
                            {line("Protein", Math.ceil(this.state.users[this.props.id].calories * this.state.users[this.props.id].protein / 100 / 4) + " g", this.state.users[this.props.id].protein + "%")}
                        </div>
                        <div className="food-chart">
                            <MacrosChart users={this.state.users} id={this.props.id} />
                        </div>
                    </div>
                </>
            )
        } else {
            return (null);
        }
    }


}

export default goals
