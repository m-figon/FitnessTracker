import React from 'react'
import WeightChart from './weightChart.jsx';
import './weight.css';
function weight() {
    return (
        <div className="weight">
            <div className="weight-line">
                <h1>Please enter weight of the day</h1>
                <input type="text" value=""></input>
            </div>
            <button>Add</button>
            <br></br>
            <div className="weight-chart">
                <WeightChart />
            </div>
        </div>
    )
}

export default weight
