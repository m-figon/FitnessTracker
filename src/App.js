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
class App extends Component {
  constructor(){
    super();
    this.state={
      users: [],
      logedId: 0
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => this.setState({
                users: data
            }));
  }
  render(){
    const HomePage = ()=>{
      return(
        <>
        <UpperBar/>
        <Home/>
        </>
      );
    }
    const WeightPage = ()=>{
      return(
        <>
        <UpperBar/>
        <Weight/>
        </>
      );
    }
    const GoalsPage = ()=>{
      return(
        <>
        <UpperBar/>
        <Goals users={this.state.users} id={this.state.logedId}/>
        </>
      );
    }
    const NutritionPage = ()=>{
      return(
        <>
        <UpperBar/>
        <Nutrition users={this.state.users} id={this.state.logedId}/>
        </>
      );
    }
    console.log(this.state.users);
    return (
      <div className="App">
      <Route exact path='/' component={HomePage} />
      <Route exact path='/weight' component={WeightPage} />
      <Route exact path='/goals' component={GoalsPage} />
      <Route exact path='/goals/nutrition' component={NutritionPage} />
      </div>
    );
  }
  
}

export default App;
