import React, { useState, useEffect } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import MacrosChart from '../macrosChart/macrosChart.jsx';
import load from '../load.gif';

function Goals(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log('mountin');
        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
        let interval1 = setInterval(() => {
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/users')
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                });
        }, 1000)
        return (() => {
            console.log('clearing interval 1')
            clearInterval(interval1);
        })
    }, [])
    const line = (type, value1, value2) => {
        return (<div className="line">
            <div className="line-left">
                <h1>{type} {value1}</h1>
            </div>
            <div className="line-right">
                <h1>{value2}</h1>
            </div>
        </div>);
    }
    if(users[props.id]){
        return (
            <>
                <div className="goals-content">
                    <div className="nutrition-goal">
                        <div className="header">
                            <div className="header-left">
                                <h1>Daily Nutrition Goals</h1>
                            </div>
                            <div className="header-right">
                                <Link to="/goals/nutrition" style={{ textDecoration: 'none', color: "rgb(76, 145, 235)" }}><button id="button2">Edit</button></Link>
                            </div>
                        </div>
                        {line("Calories", null, users[props.id].calories)}
                        {line("Carbohydrates", Math.ceil(users[props.id].calories * users[props.id].carbs / 100 / 4) + " g", users[props.id].carbs + "%")}
                        {line("Fats", Math.ceil(users[props.id].calories * users[props.id].fats / 100 / 9) + " g", users[props.id].fats + "%")}
                        {line("Protein", Math.ceil(users[props.id].calories * users[props.id].protein / 100 / 4) + " g", users[props.id].protein + "%")}
                    </div>
                    <div className="food-chart">
                        <MacrosChart users={users} id={props.id} />
                    </div>
                </div>
            </>
        )
    }else{
        return (<div className="loading">
                <img src={load} />
            </div>)
    }
 



}


export default Goals;
