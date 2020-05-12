import React, { Component } from 'react'
import './account.css';
import { Link } from 'react-router-dom';
import moment from 'moment'
import bar0 from "./0.png";
import bar1 from "./25.png";
import bar2 from "./50.png";
import bar3 from "./75.png";
import bar4 from "./100.png";

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
            img: null
        }
    }
    componentDidMount() {
        let currentDate = moment().format('L');
        this.setState({
            month: parseInt(currentDate.substr(0, 2)),
            day: parseInt(currentDate.substr(3, 2)),
            year: parseInt(currentDate.substr(6, 4))
        })
        fetch('http://localhost:3000/' + this.props.logedAc + 'Weight')
            .then(response => response.json())
            .then(data => this.setState({
                weight: data
            }));
        fetch('http://localhost:3000/' + this.props.logedAc + 'CardioExercise')
            .then(response => response.json())
            .then(data => this.setState({
                cardio: data
            }))
        fetch('http://localhost:3000/' + this.props.logedAc + 'StrengthExercise')
            .then(response => response.json())
            .then(data => this.setState({
                strength: data
            }))
        fetch('http://localhost:3000/' + this.props.logedAc + 'Meals')
            .then(response => response.json())
            .then(data => this.setState({
                meals: data
            }));
    }
    sorter(element) {
        console.log('element');
        console.log(element);
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
        console.log(this.state.weight);
        console.log(this.state.cardio);
        console.log(this.state.strength);
        let caloriesNumber=0;
        let imgSrc=""
        if (this.state.weight && this.state.cardio && this.state.strength && this.state.meals) {
            for (const item of this.state.cardio) {
                this.sorter(item);
            }
            for (const item of this.state.strength) {
                this.sorter(item);
            }
            for (const item of this.state.meals) {
                if(parseInt(item.day)===parseInt(this.state.day) && parseInt(item.month)===parseInt(this.state.month) && parseInt(item.year)===parseInt(this.state.year)){
                    caloriesNumber += parseInt(item.quantity) * parseInt(item.calories);
                }
            }
            if(caloriesNumber/this.props.users[this.props.id].calories<0.25){
                imgSrc=bar0;
            }else if(caloriesNumber/this.props.users[this.props.id].calories>=0.25 && caloriesNumber/this.props.users[this.props.id].calories<0.50){
                imgSrc=bar1;
            }else if(caloriesNumber/this.props.users[this.props.id].calories>=0.50 && caloriesNumber/this.props.users[this.props.id].calories<0.75){
                imgSrc=bar2;
            }else if(caloriesNumber/this.props.users[this.props.id].calories>=0.75 && caloriesNumber/this.props.users[this.props.id].calories<1.0){
                imgSrc=bar3;
            }else if(caloriesNumber/this.props.users[this.props.id].calories>=1.0){
                imgSrc=bar4;
            }
            console.log(this.state.tmpDay + "/" + this.state.tmpMonth + "/" + this.state.tmpYear + " " + this.state.tmpName);
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
                                <h1>{this.state.weight[this.state.weight.length - 1].weight} kg</h1>
                                <h1>Last excersise:</h1>
                                <h1>{this.state.tmpName}</h1>
                            </div>
                            <div className="up-part">
                                <div className="single-line">
                                    <h1>Calories Remaining</h1>
                                    <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><h1>Change</h1></Link>
                                    <h1>{this.state.day+"/"+this.state.month+"/"+this.state.year}</h1>
                                </div>
                                <div className="single-line">
                                    <h1 id="green">{parseInt(this.props.users[this.props.id].calories)-parseInt(caloriesNumber)}</h1>
                                    <div className="right-buttons">
                                        <Link to="/exercise" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button>Add Exercise</button></Link>
                                        <Link to="/food/add" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button>Add Food</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="down-part">
                                <img src={imgSrc} alt=""></img>
                                <div className="single-line">
                                    <h1>Goal</h1>
                                    <h1>Food</h1>
                                    <h1>Remaining</h1>
                                </div>
                                <div className="single-line">
                                    <h1>{this.props.users[this.props.id].calories}</h1>
                                    <h1>{caloriesNumber}</h1>
                                    <h1>{parseInt(this.props.users[this.props.id].calories)-parseInt(caloriesNumber)}</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else {
            return (null);
        }

    }

}

export default account;
