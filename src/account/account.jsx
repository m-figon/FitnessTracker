import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import moment from 'moment'
import bar0 from "./0.png";
import bar1 from "./10.png";
import bar2 from "./20.png";
import bar3 from "./30.png";
import bar4 from "./40.png";
import bar5 from "./50.png";
import bar6 from "./60.png";
import bar7 from "./70.png";
import bar8 from "./80.png";
import bar9 from "./90.png";
import bar10 from "./100.png";
import load from '../load.gif';

import biceps from './biceps.png';
class account extends Component {
    constructor() {
        super();
        this.state = {
            day: null,
            month: null,
            year: null,
            weight: null,
            cardio: null,
            strength: null,
            meals: null,
            tmpYear: 0,
            tmpMonth: 0,
            tmpDay: 0,
            tmpName: "",
            img: null,
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
        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Weight')
            .then(response => response.json())
            .then(data => this.setState({
                weight: data
            }, () => {
                fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'CardioExercise')
                    .then(response => response.json())
                    .then(data => this.setState({
                        cardio: data
                    }, () => {
                        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'StrengthExercise')
                            .then(response => response.json())
                            .then(data => this.setState({
                                strength: data
                            }, () => {
                                fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Meals')
                                    .then(response => response.json())
                                    .then(data => this.setState({
                                        meals: data,
                                        loading: false
                                    }));
                            }))
                    }))
            }));
    }
    sorter(element) {
        if (parseInt(element.year) > this.state.tmpYear) {
            this.setState({
                tmpYear: element.year,
                tmpMonth: element.month,
                tmpDay: element.day,
                tmpName: element.name
            })
        } else if (parseInt(element.year) === this.state.tmpYear) {
            if (parseInt(element.month) > this.state.tmpMonth) {
                this.setState({
                    tmpYear: element.year,
                    tmpMonth: element.month,
                    tmpDay: element.day,
                    tmpName: element.name
                })
            } else if (parseInt(element.month) === this.state.tmpMonth) {
                if (parseInt(element.day) > this.state.tmpDay) {
                    this.setState({
                        tmpYear: element.year,
                        tmpMonth: element.month,
                        tmpDay: element.day,
                        tmpName: element.name
                    })
                }
            }
        }
    }
    render() {
        let caloriesNumber = 0;
        let imgSrc = ""
        let remainingId;
        if (this.state.weight && this.state.cardio && this.state.strength && this.state.meals) {
            for (const item of this.state.cardio) {
                this.sorter(item);
            }
            for (const item of this.state.strength) {
                this.sorter(item);
            }
            for (const item of this.state.meals) {
                if (parseInt(item.day) === parseInt(this.state.day) && parseInt(item.month) === parseInt(this.state.month) && parseInt(item.year) === parseInt(this.state.year)) {
                    caloriesNumber += parseInt(item.quantity) * parseInt(item.calories);
                }
            }
            if (caloriesNumber / this.props.users[this.props.id].calories < 0.1) {
                imgSrc = bar0;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.1 && caloriesNumber / this.props.users[this.props.id].calories < 0.2) {
                imgSrc = bar1;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.2 && caloriesNumber / this.props.users[this.props.id].calories < 0.3) {
                imgSrc = bar2;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.3 && caloriesNumber / this.props.users[this.props.id].calories < 0.4) {
                imgSrc = bar3;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.3 && caloriesNumber / this.props.users[this.props.id].calories < 0.4) {
                imgSrc = bar4;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.4 && caloriesNumber / this.props.users[this.props.id].calories < 0.5) {
                imgSrc = bar5;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.5 && caloriesNumber / this.props.users[this.props.id].calories < 0.6) {
                imgSrc = bar6;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.6 && caloriesNumber / this.props.users[this.props.id].calories < 0.7) {
                imgSrc = bar7;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.7 && caloriesNumber / this.props.users[this.props.id].calories < 0.8) {
                imgSrc = bar8;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.8 && caloriesNumber / this.props.users[this.props.id].calories < 0.9) {
                imgSrc = bar9;
            } else if (caloriesNumber / this.props.users[this.props.id].calories >= 0.94) {
                imgSrc = bar10;
            }
            //console.log(this.state.tmpDay + "/" + this.state.tmpMonth + "/" + this.state.tmpYear + " " + this.state.tmpName);
            if (parseInt(this.props.users[this.props.id].calories) - parseInt(caloriesNumber) >= 0) {
                remainingId = "green"
            } else {
                remainingId = "red-sign";
            }
        }
        if (this.state.loading) {
            return (<div className="loading">
                <img src={load} />
            </div>)
        } else {
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
                                    <img alt="" src={biceps} alt=""></img>
                                </div>
                                <h1>Last weight:</h1>
                                <h1>{this.state.weight[this.state.weight.length - 1].weight} kg</h1>
                                <h1>Last excersise:</h1>
                                <h1>{this.state.tmpName}</h1>
                            </div>
                            <div className="up-part">
                                <div className="single-line">
                                    <h1>Calories Remaining</h1>
                                    <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Change</h1></Link>
                                    <h1>{this.state.day + "/" + this.state.month + "/" + this.state.year}</h1>
                                </div>
                                <div className="single-line">
                                    <h1 id={remainingId}>{parseInt(this.props.users[this.props.id].calories) - parseInt(caloriesNumber)}</h1>
                                    <div className="right-buttons">
                                        <Link to="/exercise" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button id="button">Add Exercise</button></Link>
                                        <Link to="/food/add" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button id="button">Add Food</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="down-part">
                                <img src={imgSrc} alt=""></img>
                                <div className="single-line">
                                    <div className="single-column">
                                        <h2>{this.props.users[this.props.id].calories}</h2>
                                        <h1>Goal</h1>
                                    </div>
                                    <div className="single-column">
                                        <h2>-</h2>
                                    </div>
                                    <div className="single-column">
                                        <h2>{caloriesNumber}</h2>
                                        <h1>Food</h1>
                                    </div>
                                    <div className="single-column">
                                        <h2>=</h2>
                                    </div>
                                    <div className="single-column">
                                        <h2>{parseInt(this.props.users[this.props.id].calories) - parseInt(caloriesNumber)}</h2>
                                        <h1>Remaining</h1>
                                    </div>
                                    <div className="single-column-right">
                                        <Link to="/weight" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><img id="scale" alt="" src="https://www.transparentpng.com/thumb/weight-scale/weighing-scale-other-icons-png-22.png"></img></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default account;
