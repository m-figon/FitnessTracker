import React, { Component } from 'react'
import './food.css';
import FoodChart from './foodChart.jsx';
import { Link } from 'react-router-dom';
class Food extends Component {
    constructor() {
        super();
        this.state = {
            meals: []
        }
    }
    componentDidMount() {
        if (this.props.logedAc) {
            fetch('http://localhost:3000/' + this.props.logedAc + 'Meals')
                .then(response => response.json())
                .then(data => this.setState({
                    meals: data
                }));
        }
    }
    deleteMeal(id) {
        if (this.props.logedAc) {
            fetch('http://localhost:3000/' + this.props.logedAc + 'Meals/' + id, {
                method: 'DELETE'
            }).then(fetch('http://localhost:3000/' + this.props.logedAc + 'Meals')
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
                        <button onClick={() => this.deleteMeal(item.id)}>x</button>
                    </div>
                </div>);
            })
            return (
                <div className="food">
                    <div className="food-content">
                        <div className="one-line">
                            <div className="desc">
                                <div className="one-line">
                                    <h2>Meals</h2>
                                    <Link
                                        to={"/food/add"}
                                    ><button>Add meal</button></Link>
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
                        {this.oneLine("Totals",caloriesNumber,carbsNumber,fatsNumber,proteinNumber)}
                        {this.oneLine("Your Daily Goal",this.props.users[this.props.id].calories,Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].carbs) / 100 / 4),Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].fats) / 100 / 9),Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].protein) / 100 / 4))}
                        {this.oneLine("Remaining",parseInt(this.props.users[this.props.id].calories) - caloriesNumber,Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].carbs) / 100 / 4) - carbsNumber,Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].fats) / 100 / 9) - fatsNumber,Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].protein) / 100 / 4) - proteinNumber)}
                    </div>
                    <FoodChart carbs={Math.round(carbsNumber * 4 * 100 / caloriesNumber)} fats={Math.round(fatsNumber * 9 * 100 / caloriesNumber)} protein={Math.round(proteinNumber * 4 * 100 / caloriesNumber)} />
                </div>
            )
        } else {
            return (null);
        }

    }
}
export default Food;
