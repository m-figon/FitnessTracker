import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeightChart from './weightChart/weightChart.jsx';
import MacrosChart from './macrosChart/macrosChart.jsx';
import UpperBar from './upperBar/upperBar.jsx';
import NavigationBar from './navigationBar/navigationBar.jsx';
import Home from './home/home.jsx';
function App() {
  {/* 
  return (
    <div className="App">
      <MacrosChart/>
    </div>
  );
  */}
  return (
    <div className="App">
      <UpperBar/>
      <NavigationBar/>
      <Home/>
    </div>
  );
}

export default App;
