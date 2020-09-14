import React, { Component } from 'react'
import WeightChart from './weightChart.jsx';
import '../App.css';
import load from '../load.gif';

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
            weightArray: [],
            loading: true
        }
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    componentDidMount() {
        fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/'+this.props.logedAc+'Weight')
            .then(response => response.json())
            .then(data => this.setState({
                weightArray: data,
                loading: false
            }));
    }
    addWeight(){
        let dateExists=false;
        let existingId;
        for(const item of this.state.weightArray){
            if(item.day===this.state.day&& item.month===this.state.month&& item.year===this.state.year){
                dateExists=true;
                existingId=item.id;
            }
        }
        let oldestDate=true;
        for(const item of this.state.weightArray){
            if(parseInt(item.year)>parseInt(this.state.year)){
                oldestDate=false;
                console.log("year" + item.year);
            }else if(parseInt(item.year)===parseInt(this.state.year)){
                if(parseInt(item.month)>parseInt(this.state.month)){
                    oldestDate=false;
                    console.log("month" + item.month);
                }else if(parseInt(item.month)===parseInt(this.state.month)){
                    if(parseInt(item.day)>parseInt(this.state.day)){
                        oldestDate=false;
                        console.log("day" + item.day);
                    }
                }
            }
        }
        if(dateExists && this.state.weight!==""){
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/'+this.props.logedAc+'Weight/'+existingId, {
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
        }else if(!dateExists && oldestDate && this.state.weight!==""){
            fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/'+this.props.logedAc+'Weight', {
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
        
    }
    render() {
        if(this.props.logedAc!==""){
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
            if (this.state.loading) {
                return (<div className="loading">
                    <img src={load} />
                </div>)
            }
            else{
                return (
                    <div className="weight">
                        <div className="weight-line">
                            <h1>Please enter date</h1>
                            <select value={this.state.day} onChange={(e) => this.inputChange(e, "day")}>
                                <option value="none">Day</option>
                                {this.state.days}
                            </select>
                            <select value={this.state.month} onChange={(e) => this.inputChange(e, "month")}>
                                <option value="none">Month</option>
                                {this.state.months}
                            </select>
                            <select value={this.state.year} onChange={(e) => this.inputChange(e, "year")}>
                                <option value="none">Year</option>
                                {this.state.years}
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
    }
}

export default Weight
