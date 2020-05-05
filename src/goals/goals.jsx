import React from 'react'
import './goals.css';
import { Link } from 'react-router-dom';
function goals() {
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
                {line("Calories",null,3000)}
                {line("Carbohydrates","375 g","50%")}
                {line("Fats","100 g","30%")}
                {line("Protein","150 g","20%")}
            </div>
        </div>
        <div className="goals-content">
        <div className="fitness-goal">
            <div className="header">
                <div className="header-left">
                <h1>Daily Fitness Goals</h1>
                </div>
                <div className="header-right">
                <button>Edit</button>
                </div>
            </div>
            {line("Calories Burned / Week",null,"0 Calories")}
            {line("Workouts / Week",null,"0 workouts")}
            {line("Minutes/Workout",null,"0")}
        </div>
    </div>
    </>
    )
}

export default goals
