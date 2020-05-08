import React, { Component } from 'react'
import './food.css';
import FoodChart from './foodChart.jsx';
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
    render() {
        if (this.props.logedAc && this.props.users) {
            let caloriesNumber=0;
            let carbsNumber=0;
            let fatsNumber=0;
            let proteinNumber=0;
            let mealsArray = this.state.meals.map((item) => {
                caloriesNumber+=parseInt(item.quantity) * parseInt(item.calories);
                carbsNumber+=parseInt(item.quantity) * parseInt(item.carbs);
                fatsNumber+=parseInt(item.quantity) * parseInt(item.fats);
                proteinNumber+=parseInt(item.quantity) * parseInt(item.protein);
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
                        <button>Del</button>
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
                                <button>Add meal</button>
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
                        <div className="one-line">
                            <div className="desc">
                                <h1>Totals</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                            <div className="blue-desc">
                                <h1>{caloriesNumber}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{carbsNumber}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{fatsNumber}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{proteinNumber}</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                        </div>
                        <div className="one-line">
                            <div className="desc">
                                <h1>Your Daily Goal</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                            <div className="blue-desc">
                                <h1>{this.props.users[this.props.id].calories}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].carbs)/100/4)}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].fats)/100/9)}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].protein)/100/4)}</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                        </div>
                        <div className="one-line">
                            <div className="desc">
                                <h1>Remaining</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                            <div className="blue-desc">
                                <h1>{parseInt(this.props.users[this.props.id].calories)-caloriesNumber}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].carbs)/100/4)-carbsNumber}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].fats)/100/9)-fatsNumber}</h1>
                            </div>
                            <div className="blue-desc">
                                <h1>{Math.round(parseInt(this.props.users[this.props.id].calories) * parseInt(this.props.users[this.props.id].protein)/100/4)-proteinNumber}</h1>
                            </div>
                            <div className="white-desc">
                            </div>
                        </div>
                    </div>
                    <FoodChart carbs={Math.round(carbsNumber*4*100/caloriesNumber)} fats={Math.round(fatsNumber*9*100/caloriesNumber)} protein={Math.round(proteinNumber*4*100/caloriesNumber)}/>
                </div>
            )
        } else {
            return (null);
        }

    }
}
export default Food;
