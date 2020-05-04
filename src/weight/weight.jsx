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
            monthsNames: ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            years: [],
            weightArray: []
        }
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    componentDidMount() {
        fetch('http://localhost:3000/GogobatmanWeight')
            .then(response => response.json())
            .then(data => this.setState({
                weightArray: data
            }));
            
    }
    addWeight(){
        //console.log(this.state.weightArray[this.state.weightArray.length-1]);
        //if not last PUT
        //if last
        let dateExists=false;
        let tmpId;
        for(const item of this.state.weightArray){
            if(item.day===this.state.day&& item.month===this.state.month&& item.year===this.state.year){
                dateExists=true;
                tmpId=item.id;
            }
        }
        if(dateExists){
            fetch('http://localhost:3000/GogobatmanWeight/'+tmpId, {
            method: 'PUT',
            body: JSON.stringify({
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                weight: this.state.weight,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        }else{
            fetch('http://localhost:3000/GogobatmanWeight', {
            method: 'POST',
            body: JSON.stringify({
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                weight: this.state.weight,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        }
        
        window.location.reload();
    }
    render() {
        for (let i = 1; i < 31; i++) {
            if (i < 10) {
                this.state.days.push(<option value={i}>0{i}</option>)
            } else {
                this.state.days.push(<option value={i}>{i}</option>)
            }
        }
        for (let i = 1; i < 13; i++) {
            this.state.months.push(<option value={i}>{this.state.monthsNames[i]}</option>)
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
                    <WeightChart weight={this.state.weightArray}/>
                </div>
            </div>
        )
    }

}

export default Weight
