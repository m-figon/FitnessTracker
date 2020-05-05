import React from 'react'
import './goals.css';
import { Link } from 'react-router-dom';
import MacrosChart from '../macrosChart/macrosChart.jsx';
function goals(props) {
    function line(type,value1,value2){
        return(<div className="line">
        <div className="line-left">
        <h1>{type} {value1}</h1>
        </div>
        <div className="line-right">
        <h1>{value2}</h1>
        </div>
    </div>);
    }
    console.log(props.users[props.id].calories);
    return (
        <>
        <div className="goals-content">
            <div className="nutrition-goal">
                <div className="header">
                    <div className="header-left">
                    <h1>Daily Nutrition Goals</h1>
                    </div>
                    <div className="header-right">
                    <Link to="/goals/nutrition" style={{ textDecoration: 'none', color:"rgb(76, 145, 235)" }}><button>Edit</button></Link>
                    </div>
                </div>
                {line("Calories",null,props.users[props.id].calories)}
                {line("Carbohydrates",Math.ceil(props.users[props.id].calories*props.users[props.id].carbs/100/4)+" g",props.users[props.id].carbs)}
                {line("Fats",Math.ceil(props.users[props.id].calories*props.users[props.id].fats/100/9)+" g",props.users[props.id].fats)}
                {line("Protein",Math.ceil(props.users[props.id].calories*props.users[props.id].protein/100/4)+" g",props.users[props.id].protein)}
            </div>
            <MacrosChart users={props.users} id={props.id}/>
        </div>
    </>
    )
}

export default goals
