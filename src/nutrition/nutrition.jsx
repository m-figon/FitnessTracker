import React from 'react'
import './nutrition.css';
import MacrosChart from '../macrosChart/macrosChart.jsx';
function nutrition() {
    function line(type,value){
        return(<div className="settings-line">
        <div className="settings-left">
            <h1>{type} {value}</h1>
        </div>
        <div className="settings-right">
        <select value="none">
            <option value="50%">50%</option>
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
                        <input value="3000" type="text"></input>
                    </div>
                </div>
                {line("Carbohydrates","375 g")}
                {line("Fats","100 g")}
                {line("Protein","150 g")}
            </div>
            <MacrosChart/>
        </div>
    )
}

export default nutrition
