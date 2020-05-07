import React, { Component } from 'react'
import './nutrition.css';
import { Link } from 'react-router-dom';
class nutrition extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            calories: 0,
            carbs: 0,
            fats: 0,
            protein: 0
        }
    }
    componentDidMount() {
        if(this.props.users[this.props.id]){
            this.setState({
                calories: this.props.users[this.props.id].calories,
                carbs: this.props.users[this.props.id].carbs,
                fats: this.props.users[this.props.id].fats,
                protein: this.props.users[this.props.id].protein,
            })
        }
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    changeCalories() {
        if (parseInt(this.state.carbs) + parseInt(this.state.fats) + parseInt(this.state.protein) === 100) {
            fetch('http://localhost:3000/users/' + this.props.id, {
                method: 'PUT',
                body: JSON.stringify({
                    
                    name: this.props.users[this.props.id].name,
                    mail: this.props.users[this.props.id].mail,
                    password: this.props.users[this.props.id].password,
                    calories: this.state.calories,
                    carbs: this.state.carbs,
                    fats: this.state.fats,
                    protein: this.state.protein,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            //window.location.reload();
        } else {
            alert('macronutrients must sum up to 100%')
        }

    }
    render() {
        if(this.props.users[this.props.id]){
            let optionsArray = [];
        for (let i = 0; i < 21; i++) {
            optionsArray.push(<option value={i * 5}>{i * 5}%</option>);
        }
        const line = (type, value, selectValue, stateValue) => {
            return (<div className="settings-line">
                <div className="settings-left">
                    <h1>{type} {value}</h1>
                </div>
                <div className="settings-right">
                    <select value={selectValue} onChange={(e) => this.inputChange(e, stateValue)}>
                        {optionsArray}
                    </select>
                </div>
            </div>);
        }
        return (
            <div className="goals-content">
                <div className="nutrition-settings">
                    <div className="settings-line">
                        <div className="settings-left">
                            <h1>Daily Nutrition Goals</h1>
                        </div>
                        <div className="settings-right">
                            <input value={this.state.calories} type="text" onChange={(e) => this.inputChange(e, "calories")}></input>
                        </div>
                    </div>
                    {line("Carbohydrates", Math.ceil(this.props.users[this.props.id].calories * this.props.users[this.props.id].carbs / 100 / 4) + " g", this.state.carbs, "carbs")}
                    {line("Fats", Math.ceil(this.props.users[this.props.id].calories * this.props.users[this.props.id].fats / 100 / 9) + " g", this.state.fats, "fats")}
                    {line("Protein", Math.ceil(this.props.users[this.props.id].calories * this.props.users[this.props.id].protein / 100 / 4) + " g", this.state.protein, "protein")}

                </div>
                <Link to="/goals" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button onClick={() => this.changeCalories()}>Save Changes</button></Link>
            </div>

        )
        }else{
            return(null);
        }
        
    }
}

export default nutrition
