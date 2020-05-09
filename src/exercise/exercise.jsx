import React, { Component } from 'react'
import './exercise.css';
import { Link } from 'react-router-dom';
class Exercise extends Component {
    constructor() {
        super();
        this.state = {
            cardio: [],
            strength: [],
            day: 2,
            month: 5,
            year: 2020,
        }
    }
    componentDidMount() {
        if (this.props.logedAc) {
            fetch('http://localhost:3000/' + this.props.logedAc + 'CardioExercise')
                .then(response => response.json())
                .then(data => this.setState({
                    cardio: data
                })).then(fetch('http://localhost:3000/' + this.props.logedAc + 'StrengthExercise')
                .then(response => response.json())
                .then(data => this.setState({
                    strength: data
                })))
        }
    }
    changeDate(operation) {
        if (operation === "+") {
            if (this.state.day < 30) {
                this.setState({
                    day: this.state.day + 1
                })
            } else if (this.state.day >= 30) {
                if (this.state.month < 12) {
                    this.setState({
                        day: 1,
                        month: this.state.month + 1
                    })
                }
            }
        } else if (operation === "-") {
            if (this.state.day > 1) {
                this.setState({
                    day: this.state.day - 1
                })
            } else if (this.state.day === 1) {
                if (this.state.month > 1) {
                    this.setState({
                        month: this.state.month - 1,
                        day: 30
                    })
                }
            }
        }
    }
    deleteExercise(id,exercise,array) {
        if (this.props.logedAc) {
            fetch('http://localhost:3000/' + this.props.logedAc + exercise+"/" + id, {
                method: 'DELETE'
            }).then(fetch('http://localhost:3000/' + this.props.logedAc + exercise)
                .then(response => response.json())
                .then(data => this.setState({
                    [array]: data
                })))
        }
    }
    render() {
        if (this.props.logedAc && this.props.users) {
            let cardioArray = this.state.cardio.map((item) => {
                if (parseInt(item.day) === this.state.day && parseInt(item.month) === this.state.month && parseInt(item.year) === this.state.year) {
                    return (<div className="one-line">
                        <div className="longer-gray-desc">
                            <h1>{item.name}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <h1>{item.minutes}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <h1>{parseInt(item.minutes) * parseInt(item.calories)}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <button onClick={() => this.deleteExercise(item.id,"CardioExercise","cardio")}></button>
                        </div>
                    </div>);
                }
            })
            let strengthArray = this.state.strength.map((item) => {
                if (parseInt(item.day) === this.state.day && parseInt(item.month) === this.state.month && parseInt(item.year) === this.state.year) {
                    return (<div className="one-line">
                        <div className="longer-gray-desc">
                            <h1>{item.name}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <h1>{item.sets}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <h1>{item.reps}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <h1>{item.weight}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <button onClick={() => this.deleteExercise(item.id,"StrengthExercise","strength")}></button>
                        </div>
                    </div>);
                }
            })
            return (
                <div className="food">
                    <div className="food-content">
                        <div className="date-line">
                            <h2>Your Exercise Diary for:</h2>
                            <div className="calendar">
                                <div id="left-arrow" className="calendar-wings" onClick={() => { this.changeDate('-') }}>
                                </div>
                                <h1>{this.state.day}/</h1>
                                <h1>{this.state.month}/</h1>
                                <h1>{this.state.year}</h1>
                                <div id="right-arrow" className="calendar-wings" onClick={() => { this.changeDate('+') }}>
                                </div>
                            </div>
                        </div>
                        <div className="one-line">
                            <div className="desc">
                                <div className="one-line">
                                    <h2>Cardiovascular</h2>
                                    <Link
                                        to={"/exercise/cardio/add"}
                                    ><button onClick={() => this.props.settingState("day", this.state.day, "month", this.state.month, "year", this.state.year)}>Add exercise</button></Link>
                                </div>
                            </div>
                            <div className="blue-desc-exercise">
                                <h1>Minutes</h1>
                            </div>
                            <div className="blue-desc-exercise">
                                <h1>Calories Burned</h1>
                            </div>
                            <div className="white-desc-exercise">
                            </div>
                        </div>
                        {cardioArray}
                    </div>
                    <div className="food-content">
                        <div className="one-line">
                            <div className="desc">
                                <div className="one-line">
                                    <h2>Strength Training</h2>
                                    <Link
                                        to={"/exercise/strength/add"}
                                    ><button onClick={() => this.props.settingState("day", this.state.day, "month", this.state.month, "year", this.state.year)}>Add exercise</button></Link>
                                </div>
                            </div>
                            <div className="blue-desc-exercise">
                                <h1>Sets</h1>
                            </div>
                            <div className="blue-desc-exercise">
                                <h1>Reps</h1>
                            </div>
                            <div className="blue-desc-exercise">
                                <h1>Weight</h1>
                            </div>
                            <div className="white-desc-exercise">
                            </div>
                        </div>
                        {strengthArray}

                    </div>
                </div>
            )
        } else {
            return (null);
        }

    }
}
export default Exercise;
