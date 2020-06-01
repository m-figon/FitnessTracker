import React, { Component } from 'react'
import './food.css';
import { Link } from 'react-router-dom';
class addFood extends Component {
    constructor() {
        super();
        this.state = {
            food: [],
            id: "",
            quantity: 0,
        }
        this.input = React.createRef();
    }
    componentDidMount() {
        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/Meals')
            .then(response => response.json())
            .then(data => this.setState({
                food: data
            }))
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    addMeal() {
        if (this.state.id) {
            console.log('postin');
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + this.props.logedAc + 'Meals', {
                method: 'POST',
                body: JSON.stringify({
                    meal: this.state.food[this.state.id].meal,
                    quantity: this.state.quantity,
                    calories: this.state.food[this.state.id].calories,
                    carbs: this.state.food[this.state.id].carbs,
                    fats: this.state.food[this.state.id].fats,
                    protein: this.state.food[this.state.id].protein,
                    year: this.props.year,
                    month: this.props.month,
                    day: this.props.day
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })


        }

    }
    render() {
        let foods = this.state.food.map((item) => {
            return (
                <option value={item.id}>{item.meal}</option>
            )
        })
        return (
                <div className="food-content">
                    <h2>Add Food</h2>
                    <select value={this.state.id} onChange={(e) => this.inputChange(e, "id")}>
                        <option value="none">Choose meal</option>
                        {foods}
                    </select>
                    <div className="left-side">
                        <h1>Quantity:</h1>
                        <input type="text" value={this.state.quantity} onChange={(e) => this.inputChange(e, "quantity")}></input>
                    </div>
                    <button id="button" onClick={() => this.addMeal()}>Add Checked</button>
                </div>
        )
    }
}
export default addFood;
