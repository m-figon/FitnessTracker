import React, { Component } from 'react'
import './food.css';
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
        if(this.props.logedAc){
            let mealsArray = this.state.meals.map((item)=>{
                return(<div className="one-line">
                <div className="longer-gray-desc">
                    <h1>{item.meal}</h1>
                </div>
                <div className="gray-desc">
                    <h1>{item.quantity}</h1>
                </div>
                <div className="gray-desc">
                <h1>{parseInt(item.quantity)*parseInt(item.calories)}</h1>

                </div>
                <div className="gray-desc">
                    <h1>{item.carbs}</h1>
                </div>
                <div className="gray-desc">
                    <h1>{item.fats}</h1>
                </div>
                <div className="gray-desc">
                    <h1>{item.protein}</h1>
                </div>
                
            </div>);
            })
        return (
            <div className="food">
                <div className="food-content">
                    <div className="one-line">
                        <div className="desc">
                            <h2>Meals</h2>
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
                    </div>
                    {mealsArray}
                </div>
            </div>
        )
        }else{
            return(null);
        }
        
    }
}
export default Food;
