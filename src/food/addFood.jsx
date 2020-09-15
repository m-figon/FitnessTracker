import React, { useState, useEffect } from 'react'
import '../App.css';
function  AddFood(props) {
    const [food, setFood] = useState([]);
    const [id, setId] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/Meals')
            .then(response => response.json())
            .then(data => {
                setFood(data);
            })
    }, [])
    useEffect(() => {
        console.log(food);
        setFoods(food.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.meal}</option>
            )
        }));
    }, [food])
    const addMeal = () => {
        if (id) {
            console.log('postin');
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/' + props.logedAc + 'Meals', {
                method: 'POST',
                body: JSON.stringify({
                    meal: food[id].meal,
                    quantity: quantity,
                    calories: food[id].calories,
                    carbs: food[id].carbs,
                    fats: food[id].fats,
                    protein: food[id].protein,
                    year: props.year,
                    month: props.month,
                    day: props.day
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(() => {
                props.refreshMeals();
            })


        }

    }

    return (
        <div className="food-content">
            <h2>Add Food</h2>
            <select value={id} onChange={(e) => setId(e.target.value)}>
                <option value="none">Choose meal</option>
                {foods}
            </select>
            <div className="left-side">
                <h1>Quantity:</h1>
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
            </div>
            <button id="button" onClick={() => addMeal()}>Add Checked</button>
        </div>
    )
}
export default AddFood;