import React, { Component } from 'react'
import './food.css';
import {Link} from 'react-router-dom';
class addFood extends Component {
    constructor() {
        super();
        this.state = {
            food: [],
            input0: "0",
            checkbox0: false,
            input1: "0",
            checkbox1: false,
            input2: "0",
            checkbox2: false,
            input3: "0",
            checkbox3: false,
            input4: "0",
            checkbox4: false,
            input5: "0",
            checkbox5: false,
            input6: "0",
            checkbox6: false,
            id: null
        }
        this.input = React.createRef();
    }
    componentDidMount() {
        fetch('http://localhost:3000/Meals')
            .then(response => response.json())
            .then(data => this.setState({
                food: data
            }));
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    checkboxChange(e, array, idValue) {
        this.setState({
            checkbox0: false,
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            [array]: !(eval("this.state." + array)),
            id: idValue
        })
    }
    addMeal() {
        if (this.state.id) {
            console.log('postin1')
            let checkboxes = [this.state.checkbox0, this.state.checkbox1, this.state.checkbox3, this.state.checkbox4, this.state.checkbox5, this.state.checkbox6];
            let inputs = [this.state.input0, this.state.input1, this.state.input2, this.state.input3, this.state.input4, this.state.input5, this.state.input6];
            for (let i = 0; i < inputs.length; i++) {
                if (checkboxes[i]) {
                    console.log('postin')
                    fetch('http://localhost:3000/' + this.props.logedAc + 'Meals', {
                        method: 'POST',
                        body: JSON.stringify({
                            meal: this.state.food[this.state.id].meal,
                            quantity: inputs[i],
                            calories: this.state.food[this.state.id].calories,
                            carbs: this.state.food[this.state.id].carbs,
                            fats: this.state.food[this.state.id].fats,
                            protein: this.state.food[this.state.id].protein,
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                }
            }
        }

    }
    render() {
        let foods = this.state.food.map((item) => {
            return (<div className="meal-one-line">
                <div className="left-side">
                    <input type="checkbox" onClick={(e) => this.checkboxChange(e, "checkbox" + item.id, item.id)} checked={eval("this.state.checkbox" + item.id)}></input>
                    <h1>{item.meal}</h1>
                </div>
                <div className="right-side">
                    <h1>Quantity:</h1>
                    <input type="text" value={eval("this.state.input" + item.id)} onChange={(e) => this.inputChange(e, ("input" + item.id))}></input>
                </div>
            </div>)
        })
        return (
            <div className="food">
                <div className="food-content-2">
                    <h2>Add Food</h2>
                    {foods}
                    <Link to={"/food"}><button onClick={() => this.addMeal()}>Add Checked</button></Link>
                </div>
            </div>
        )
    }
}
export default addFood;
