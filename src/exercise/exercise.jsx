import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import load from '../load.gif';

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
            weight: "",
            loading: true
        }
    }
    componentDidMount() {
        let currentDate = moment().format('L');
        this.setState({
            month: parseInt(currentDate.substr(0, 2)),
            day: parseInt(currentDate.substr(3, 2)),
            year: parseInt(currentDate.substr(6, 4))
        })
        if (this.props.logedAc) {
            this.refreshExcersise('cardio');
            this.refreshExcersise('strength');
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
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + exercise + "/" + id, {
                method: 'DELETE'
            }).then(() => {
                fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + exercise)
                    .then(response => response.json())
                    .then(data => this.setState({
                        [array]: data
                    }))
            })

        }
    }
    refreshExcersise(type) {
        if (type === 'cardio') {
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'CardioExercise')
                .then(response => response.json())
                .then(data => this.setState({
                    cardio: data,
                    loading: false
                }))
        }
        else if (type === 'strength') {
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'StrengthExercise')
                .then(response => response.json())
                .then(data => this.setState({
                    strength: data,
                    loading: false
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
            <div className="single-ex-line">
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
        if (type === "Cardio" && this.state.name1 && this.state.minutes && this.state.caloriesBurned) {
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + type + "Exercise", {
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
            }).then(fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + type + "Exercise")
                .then(response => response.json())
                .then(data => this.setState({
                    cardio: data,
                    name1: "",
                    minutes: "",
                    caloriesBurned: ""
                }, () => {
                    this.refreshExcersise('cardio');
                })))
        } else if (type === "Strength" && this.state.name2 && this.state.reps && this.state.sets && this.state.weight) {
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + type + "Exercise", {
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
            }).then(fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + type + "Exercise")
                .then(response => response.json())
                .then(data => this.setState({
                    strength: data,
                    name2: "",
                    sets: "",
                    reps: "",
                    weight: ""
                }, () => {
                    this.refreshExcersise('strength');
                })))
        }
    }
    render() {
        if (this.state.loading) {
            return (<div className="loading">
                <img src={load} />
            </div>)
        }
        else if (this.props.logedAc && this.props.users) {
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
                <div className="exercise">
                    <div className="exercise-content">
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
                            <button id="button" onClick={() => this.addExercise("Cardio")}>Add exercise</button>
                        </div>
                    </div>
                    <div className="exercise-content">
                        <div className="one-line">
                            <div className="desc">
                                <div className="one-line">
                                    <h2>Strength Training</h2>
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
                            <button id="button" onClick={() => this.addExercise("Strength")}>Add exercise</button>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
export default Exercise;
