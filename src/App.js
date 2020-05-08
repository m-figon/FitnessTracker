import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Weight from './weight/weight.jsx';
import MacrosChart from './macrosChart/macrosChart.jsx';
import UpperBar from './upperBar/upperBar.jsx';
import Home from './home/home.jsx';
import Goals from './goals/goals.jsx';
import Nutrition from './nutrition/nutrition.jsx';
import Login from './login/login.jsx';
import Register from './register/register.jsx';
import Food from './food/food.jsx';
import AddFood from './food/addFood.jsx';
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loged: true,
      logedAc: "SlickJoe",
      logedId: 0
    }
    this.settingState=this.settingState.bind(this);
  }
  componentDidMount() {
    console.log('app.js mountin')
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => this.setState({
        users: data
      }));
  }
  settingState(array1, value1, array2, value2,array3,value3) {
    this.setState({
      [array1]: value1,
      [array2]: value2,
      [array3]: value3
    })
  }
  render() {
    const HomePage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Home />
        </>
      );
    }
    const WeightPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Weight logedAc={this.state.logedAc}/>
        </>
      );
    }
    const GoalsPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Goals id={this.state.logedId} />
        </>
      );
    }
    const NutritionPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Nutrition users={this.state.users} id={this.state.logedId} />
        </>
      );
    }
    const FoodPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Food logedAc={this.state.logedAc} id={this.state.logedId} users={this.state.users}/>
        </>
      );
    }
    const LoginPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Login  settingState={this.settingState}/>
        </>
      );
    }
    const RegisterPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Register  settingState={this.settingState}/>
        </>
      );
    }
    const AddMeal = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <AddFood/>
        </>
      );
    }
    return (
      <div className="App">
        <Route exact path='/' component={HomePage} />
        <Route exact path='/weight' component={WeightPage} />
        <Route exact path='/goals' component={GoalsPage} />
        <Route exact path='/food' component={FoodPage} />
        <Route exact path='/food/add' component={AddMeal} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/goals/nutrition' component={NutritionPage} />
      </div>
    );
  }

}

export default App;
