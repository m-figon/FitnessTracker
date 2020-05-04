import React, { Component } from 'react'
import WeightChart from './weightChart.jsx';
import './weight.css';
class Weight extends Component {
    constructor() {
        super();
        this.state = {
            weight: "",
            day: "",
            month: "",
            year: "",
            days: [],
            months: [],
            monthsNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            years: []
        }
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    addWeight(){
        fetch('http://localhost:3000/GogobatmanWeight', {
            method: 'POST',
            body: JSON.stringify({
                date: (this.state.day+"."+this.state.month+"."+this.state.year),
                weight: this.state.weight,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.reload();
    }
    render() {
        for (let i = 1; i < 31; i++) {
            if (i < 10) {
                this.state.days.push(<option value={"0" + i}>0{i}</option>)
            } else {
                this.state.days.push(<option value={i}>{i}</option>)
            }
        }
        for (let i = 0; i < 12; i++) {
            this.state.months.push(<option value={this.state.monthsNames[i]}>{this.state.monthsNames[i]}</option>)
        }
        for (let i = 2020; i >= 1920; i--) {
            this.state.years.push(<option value={i}>{i}</option>)
        }
        return (
            <div className="weight">
                <div className="weight-line">
                    <h1>Please enter date</h1>
                    <select value={this.state.day} onChange={(e) => this.inputChange(e, "day")}>
                        <option value="none">Day</option>
                        {this.state.days}}
                    </select>
                    <select value={this.state.month} onChange={(e) => this.inputChange(e, "month")}>
                        <option value="none">Month</option>
                        {this.state.months}}
                    </select>
                    <select value={this.state.year} onChange={(e) => this.inputChange(e, "year")}>
                        <option value="none">Year</option>
                        {this.state.years}}
                    </select>
                </div>
                <div className="weight-line">
                    <h1>Please enter weight of the day</h1>
                    <input type="text" value={this.state.weight} onChange={(e) => this.inputChange(e, "weight")}></input>
                </div>
                <button onClick={()=>this.addWeight()}>Add</button>
                <br></br>
                <div className="weight-chart">
                    <WeightChart />
                </div>
            </div>
        )
    }

}

export default Weight
