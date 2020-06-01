import React, { Component } from 'react'
import './food.css';
import FoodChart from './foodChart.jsx';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddFood from './addFood';
class Food extends Component {
    constructor() {
        super();
        this.state = {
            meals: [],
            day: 2,
            month: 5,
            year: 2020,
        }
    }
    componentDidMount() {
        if (this.props.logedAc) {
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Meals')
                .then(response => response.json())
                .then(data => this.setState({
                    meals: data
                }));
        }
        setInterval(()=>{
            if (this.props.logedAc) {
                fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Meals')
                    .then(response => response.json())
                    .then(data => this.setState({
                        meals: data
                    }));
            }
        },1000)
        //05/11/2020
        let currentDate=moment().format('L');
            this.setState({
                month: parseInt(currentDate.substr(0, 2)),
                day: parseInt(currentDate.substr(3, 2)),
                year: parseInt(currentDate.substr(6, 4))
            })
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
    deleteMeal(id) {
        if (this.props.logedAc) {
            console.log('deleting');
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Meals/' + id, {
                method: 'DELETE'
            }).then(fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Meals')
                .then(response => response.json())
                .then(data => this.setState({
                    meals: data
                })))
        }

    }
    oneLine(arg1, arg2, arg3, arg4, arg5) {
        return (<div className="one-line">
            <div className="desc">
                <h1>{arg1}</h1>
            </div>
            <div className="white-desc">
            </div>
            <div className="blue-desc">
                <h1>{arg2}</h1>
            </div>
            <div className="blue-desc">
                <h1>{arg3}</h1>
            </div>
            <div className="blue-desc">
                <h1>{arg4}</h1>
            </div>
            <div className="blue-desc">
                <h1>{arg5}</h1>
            </div>
            <div className="white-desc">
            </div>
        </div>);
    }
    render() {
        if (this.props.logedAc && this.props.users) {
            let caloriesNumber = 0;
            let carbsNumber = 0;
            let fatsNumber = 0;
            let proteinNumber = 0;
            let mealsArray = this.state.meals.map((item) => {
                if (parseInt(item.day) === this.state.day && parseInt(item.month) === this.state.month && parseInt(item.year) === this.state.year) {
                    caloriesNumber += parseInt(item.quantity) * parseInt(item.calories);
                    carbsNumber += parseInt(item.quantity) * parseInt(item.carbs);
                    fatsNumber += parseInt(item.quantity) * parseInt(item.fats);
                    proteinNumber += parseInt(item.quantity) * parseInt(item.protein);
                    return (<div className="one-line">
                        <div className="longer-gray-desc">
                            <h1>{item.meal}</h1>
                        </div>
                        <div className="gray-desc">
                            <h1>{item.quantity}</h1>
                        </div>
                        <div className="gray-desc">
                            <h1>{parseInt(item.quantity) * parseInt(item.calories)}</h1>
                        </div>
                        <div className="gray-desc">
                            <h1>{parseInt(item.quantity) * parseInt(item.carbs)}</h1>
                        </div>
                        <div className="gray-desc">
                            <h1>{parseInt(item.quantity) * parseInt(item.fats)}</h1>
                        </div>
                        <div className="gray-desc">
                            <h1>{parseInt(item.quantity) * parseInt(item.protein)}</h1>
                        </div>
                        <div className="gray-desc">
                            <button onClick={() => this.deleteMeal(item.id)}></button>
                        </div>
                    </div>);
                }
            })
            return (
                <div className="food">
                    <div className="food-content">
                        <div className="date-line">
                            <h2>Your Food Diary For:</h2>
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
                                    <h2>Meals</h2>
                                </div>
                            </div>
                            <div className="blue-desc">
                                <h1>Quantity</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>Calories</h1>
                                <h1>kcal</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>Carbs</h1>
                                <h1>g</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>Fat</h1>
                                <h1>g</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>Protein</h1>
                                <h1>g</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                        </div>
                        {mealsArray}
                        {this.oneLine("Totals", caloriesNumber, carbsNumber, fatsNumber, proteinNumber)}
                        {this.oneLine("Your Daily Goal", this.props.users[this.props.id].calories, Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].carbs) / 100 / 4), Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].fats) / 100 / 9), Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].protein) / 100 / 4))}
                        {this.oneLine("Remaining", parseInt(this.props.users[this.props.id].calories) - caloriesNumber, Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].carbs) / 100 / 4) - carbsNumber, Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].fats) / 100 / 9) - fatsNumber, Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].protein) / 100 / 4) - proteinNumber)}
                    </div>
                    <AddFood  logedAc={this.props.logedAc} day={this.state.day} month={this.state.month} year={this.state.year}/>
                    <div className="food-chart">
                    <FoodChart carbs={Math.round(carbsNumber * 4 * 100 / caloriesNumber)} fats={Math.round(fatsNumber * 9 * 100 / caloriesNumber)} protein={Math.round(proteinNumber * 4 * 100 / caloriesNumber)} />
                    </div>
                </div>
            )
        } else {
            return (null);
        }

    }
}
export default Food;
