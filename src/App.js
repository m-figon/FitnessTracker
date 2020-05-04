import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Weight from './weight/weight.jsx';
import MacrosChart from './macrosChart/macrosChart.jsx';
import UpperBar from './upperBar/upperBar.jsx';
import Home from './home/home.jsx';
import { Route } from 'react-router-dom';
class App extends Component {
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
    return (
      <div className="App">
      <Route exact path='/' component={HomePage} />
      <Route exact path='/weight' component={WeightPage} />
      </div>
    );
  }
  
}

export default App;
