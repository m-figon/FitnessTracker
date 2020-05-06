import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './register.css';
class register extends Component {
    constructor() {
        super();
        this.state = {
            emailValue: "Email Adress",
            emailId: "",
            accountValue: "Account Name",
            accountId: "",
            password1Value: "Password",
            password1Type: "text",
            password1Id: "",
            password2Value: "Confirm Password",
            password2Type: "text",
            password2Id: "",
            dayValue: "",
            dayId: "",
            monthValue: "",
            monthId: "",
            yearValue: "",
            yearId: "",
            alertId: "hidden",
            days: [],
            months: [],
            years: [],
            monthsNames: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        }
    }
    inputChange(e, array) {
        this.setState({
            [array]: e.target.value
        })
    }
    focusChange(e, array1, defaultValue, array2) {
        if (e.target.value === defaultValue) {
            this.setState({
                [array1]: "",
                [array2]: "password"
            })
        }
    }
    blurChange(e, array1, value1, array2, value2, defaultValue) {
        if (e.target.value === defaultValue) {
            this.setState({
                [array1]: value1,
                [array2]: value2
            })
        }
    }
    validation(condition, array) {
        if (condition) {
            this.setState({
                [array]: "red"
            })
            return false;
        } else {
            this.setState({
                [array]: ""
            })
            return true;
        }
    }
    register() {
        console.log("registration!");
        this.validation(this.state.emailValue.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null, "emailId");
        this.validation(this.state.accountValue.match(/^[a-zA-Z0-9\.\-_]{4,12}$/) === null, "accountId");
        this.validation(this.state.password1Value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null, "password1Id");
        this.validation(this.state.password1Value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null || this.state.password2Value !== this.state.password1Value, "password2Id");
        this.validation(this.state.dayValue === "", "dayId");
        this.validation(this.state.monthValue === "", "monthId");
        this.validation(this.state.yearValue === "", "yearId");

        if ((this.validation(this.state.emailValue.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null, "emailId")) &&
            (this.validation(this.state.accountValue.match(/^[a-zA-Z0-9\.\-_]{4,12}$/) === null, "accountId")) &&
            (this.validation(this.state.password1Value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null, "password1Id")) &&
            (this.validation(this.state.password1Value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null || this.state.password2Value !== this.state.password1Value, "password2Id")) &&
            (this.validation(this.state.dayValue === "", "dayId")) &&
            (this.validation(this.state.monthValue === "", "monthId")) &&
            (this.validation(this.state.yearValue === "", "yearId"))) {
            console.log('correct registration!');
            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.accountValue,
                    mail: this.state.emailValue,
                    password: this.state.password1Value,
                    birth: (this.state.dayValue + "." + this.state.monthValue + "." + this.state.yearValue),
                    calories: "2000",
                    carbs: "50",
                    fats: "30",
                    protein: "20",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        }
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
            <div>
                <div className="register">
                    <div className="register-form">
                        <div className="register-content">
                            <h1 id={this.state.alertId}>Incorrect registration values. Please try again.</h1>
                            <h2>Your Account Information</h2>
                            <h1>Email Address:</h1>
                            <input id={this.state.emailId} type="text" onFocus={(e) => this.focusChange(e, "emailValue", "Email Adress")} onBlur={(e) => this.blurChange(e, "emailValue", "Email Adress", null, null, "")} value={this.state.emailValue} onChange={(e) => this.inputChange(e, "emailValue")} />
                            <h1>Account Name:</h1>
                            <div className="one-line">
                                <input id={this.state.accountId} type="text" onFocus={(e) => this.focusChange(e, "accountValue", "Account Name")} onBlur={(e) => this.blurChange(e, "accountValue", "Account Name", null, null, "")} value={this.state.accountValue} onChange={(e) => this.inputChange(e, "accountValue")} />
                                <h1>4-12 signs</h1>
                            </div>
                            <h1>Password:</h1>
                            <div className="one-line">
                                <input id={this.state.password1Id} type={this.state.password1Type} onFocus={(e) => this.focusChange(e, "password1Value", "Password", "password1Type")} onBlur={(e) => this.blurChange(e, "password1Value", "Password", "password1Type", "text", "")} value={this.state.password1Value} onChange={(e) => this.inputChange(e, "password1Value")} />
                                <h1>6-14 signs, 1 uppercase</h1>
                            </div>
                            <h1>Confirm Password:</h1>
                            <input id={this.state.password2Id} type={this.state.password2Type} onFocus={(e) => this.focusChange(e, "password2Value", "Confirm Password", "password2Type")} onBlur={(e) => this.blurChange(e, "password2Value", "Confirm Password", "password2Type", "text", "")} value={this.state.password2Value} onChange={(e) => this.inputChange(e, "password2Value")} />
                            <h1>Birth Date:</h1>
                            <div className="one-line">
                                <select id={this.state.dayId} value={this.state.dayValue} onChange={(e) => this.inputChange(e, "dayValue")}>
                                    <option value="">Day</option>
                                    {this.state.days}
                                </select>
                                <select id={this.state.monthId} value={this.state.monthValue} onChange={(e) => this.inputChange(e, "monthValue")}>
                                    <option value="">Month</option>
                                    {this.state.months}
                                </select>
                                <select id={this.state.yearId} value={this.state.yearValue} onChange={(e) => this.inputChange(e, "yearValue")}>
                                    <option value="">Year</option>
                                    {this.state.years}
                                </select>
                            </div>
                            <button onClick={() => this.register()}>Sign up</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default register
