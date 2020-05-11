import React, { Component } from 'react'
import './exercise.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
class Exercise extends Component {
    constructor() {
        super();
        this.state = {
            cardio: [],
            strength: [],
            day: 2,
            month: 5,
            year: 2020,
            name1: "",
            minutes: "",
            caloriesBurned: "",
            name2: "",
            sets: "",
            reps: "",
            weight: ""
        }
    }
    componentDidMount() {
        let currentDate=moment().format('L');
            this.setState({
                month: parseInt(currentDate.substr(0, 2)),
                day: parseInt(currentDate.substr(3, 2)),
                year: parseInt(currentDate.substr(6, 4))
            })
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
            setInterval(() => {
                fetch('http://localhost:3000/' + this.props.logedAc + 'CardioExercise')
                    .then(response => response.json())
                    .then(data => this.setState({
                        cardio: data
                    })).then(fetch('http://localhost:3000/' + this.props.logedAc + 'StrengthExercise')
                        .then(response => response.json())
                        .then(data => this.setState({
                            strength: data
                        })))
            }, 2000)
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
    deleteExercise(id, exercise, array) {
        if (this.props.logedAc) {
            fetch('http://localhost:3000/' + this.props.logedAc + exercise + "/" + id, {
                method: 'DELETE'
            })
            fetch('http://localhost:3000/' + this.props.logedAc + exercise)
                .then(response => response.json())
                .then(data => this.setState({
                    [array]: data
                }))
        }
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    singleLine = (name, value) => {
        return (
            <div className="single-line">
                <div className="left">
                    <h1>{name}</h1>
                </div>
                <div className="right">
                    <input type="text" value={eval("this.state." + value)} onChange={(e) => this.inputChange(e, value)}></input>
                </div>
            </div>
        );
    }
    addExercise(type) {
        if (type === "Cardio") {
            fetch('http://localhost:3000/' + this.props.logedAc + type + "Exercise", {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name1,
                    minutes: this.state.minutes,
                    calories: this.state.caloriesBurned,
                    year: this.state.year,
                    month: this.state.month,
                    day: this.state.day
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(fetch('http://localhost:3000/' + this.props.logedAc + type + "Exercise")
                .then(response => response.json())
                .then(data => this.setState({
                    cardio: data,
                    name1: "",
                    minutes: "",
                    caloriesBurned: ""
                })))
        } else if (type === "Strength") {
            fetch('http://localhost:3000/' + this.props.logedAc + type + "Exercise", {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name2,
                    reps: this.state.reps,
                    sets: this.state.sets,
                    weight: this.state.weight,
                    year: this.state.year,
                    month: this.state.month,
                    day: this.state.day
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(fetch('http://localhost:3000/' + this.props.logedAc + type + "Exercise")
                .then(response => response.json())
                .then(data => this.setState({
                    strength: data,
                    name2: "",
                    sets: "",
                    reps: "",
                    weight: ""
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
                            <h1>{item.calories}</h1>
                        </div>
                        <div className="gray-desc-exercise">
                            <button onClick={() => this.deleteExercise(item.id, "CardioExercise", "cardio")}></button>
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
                            <button onClick={() => this.deleteExercise(item.id, "StrengthExercise", "strength")}></button>
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
                        <div className="adding-exercise-line">
                            {this.singleLine("Name", 'name1')}
                            {this.singleLine("Minutes", 'minutes')}
                            {this.singleLine("Calories Burned", 'caloriesBurned')}
                            <button onClick={() => this.addExercise("Cardio")}>Add exercise</button>

                        </div>
                    </div>
                    <div className="food-content">
                        <div className="one-line">
                            <div className="desc">
                                <div className="one-line">
                                    <h2>Strength Training</h2>
                                    <Link
                                        to={"/exercise/add/strength"}
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
                        <div className="adding-exercise-line">
                            {this.singleLine("Name", "name2")}
                            {this.singleLine("Sets", 'sets')}
                            {this.singleLine("Reps", 'reps')}
                            {this.singleLine("Weight", 'weight')}
                            <button onClick={() => this.addExercise("Strength")}>Add exercise</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (null);
        }

    }
}
export default Exercise;
