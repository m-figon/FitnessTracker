import React, { Component } from 'react'
import './food.css';
import { Link } from 'react-router-dom';
class addFood extends Component {
    constructor() {
        super();
        this.state = {
            food: [],
            id: null
        }
        this.input = React.createRef();
    }
    componentDidMount() {
        fetch('http://localhost:3000/Meals')
            .then(response => response.json())
            .then(data => this.setState({
                food: data
            })).then(()=>{
                for (const item of this.state.food) {
                    this.setState({
                        ["checkbox"+item.id]: false,
                        ["input"+item.id]: "0",
                    })
                }
            })   
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    checkboxChange(e, array, idValue) {
        for (const item of this.state.food) {
            this.setState({
                ["checkbox"+item.id]: false,
            })
        }
        this.setState({
            [array]: !(eval("this.state." + array)),
            id: idValue
        })
    }
    addMeal() {
        if (this.state.id) {
            let checkboxes = [];
            let inputs = [];
            for(const item of this.state.food){
                checkboxes.push(eval("this.state.checkbox"+item.id));
                inputs.push(eval("this.state.input"+item.id));
            }
            //console.log(checkboxes);
            //console.log(inputs);
            for (let i = 0; i < inputs.length; i++) {
                if (checkboxes[i]) {
                    //console.log(checkboxes[i])          
                    //console.log(inputs[i])
                    fetch('http://localhost:3000/' + this.props.logedAc + 'Meals', {
                        method: 'POST',
                        body: JSON.stringify({
                            meal: this.state.food[this.state.id].meal,
                            quantity: inputs[i],
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
                    <Link to="/food"><button id="button" onClick={() => this.addMeal()}>Add Checked</button></Link>
                </div>
            </div>
        )
    }
}
export default addFood;
