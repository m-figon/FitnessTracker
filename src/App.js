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
import Exercise from './exercise/exercise.jsx';
import Account from './account/account.jsx';
import load from './load.gif';
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loged: true,
      logedAc: "SlickJoe",
      logedId: 0,
      day: null,
      month: null,
      year: null,
      loadingId: ""
    }
    this.settingState=this.settingState.bind(this);
  }
  componentDidMount() {
    console.log('app.js mountin')
    fetch('https://rocky-citadel-32862.herokuapp.com/Fitness/users')
      .then(response => response.json())
      .then(data => this.setState({
        users: data
      }))
      let interval=setInterval(()=>{
        if(document.readyState==="complete"){
          this.setState({
            loadingId: "hidden"
          })
          clearInterval(interval);
        }
      },500)
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
          <Food settingState={this.settingState} logedAc={this.state.logedAc} id={this.state.logedId} users={this.state.users}/>
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
    const ExcercisePage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Exercise settingState={this.settingState} logedAc={this.state.logedAc} id={this.state.logedId} users={this.state.users} day={this.state.day} month={this.state.month} year={this.state.year}/>
        </>
      );
    }
    const AccountPage = () => {
      return (
        <>
          <UpperBar settingState={this.settingState} logedAc={this.state.logedAc} loged={this.state.loged} />
          <Account id={this.state.logedId} users={this.state.users} logedAc={this.state.logedAc}/>
        </>
      );
    }
    return (
      <>
      <div className="App">
        <Route exact path='/' component={HomePage} />
        <Route exact path='/weight' component={WeightPage} />
        <Route exact path='/goals' component={GoalsPage} />
        <Route exact path='/account' component={AccountPage} />
        <Route exact path='/food' component={FoodPage} />
        <Route exact path='/exercise' component={ExcercisePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/goals/nutrition' component={NutritionPage} />
      </div>
      <div className="loading" id={this.state.loadingId}>
      <img src={load}/>
      </div>
      </>
    );
  }

}

export default App;
