import React, { Component } from 'react'
import './food.css';
class addFood extends Component {
    constructor() {
        super();
        this.state = {
            food: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/Meals')
            .then(response => response.json())
            .then(data => this.setState({
                food: data
            }));
    }
    render() {
        let foods = this.state.food.map((item) => {
            return (<div className="meal-one-line">
                <div className="left-side">
                    <input type="checkbox"></input>
                    <h1>{item.meal}</h1>
                </div>
                <div className="right-side">
                    <h1>Quantity:</h1>
                    <input type="text" value=""></input>
                </div>

            </div>)
        })
        return (
            <div className="food">
                <div className="food-content">
                    <h2>Add Food</h2>
                    {foods}
                </div>
            </div>
        )
    }
}
export default addFood;
