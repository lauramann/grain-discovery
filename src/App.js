import React from 'react';
import './App.css';
import MonteCarloPi from './MonteCarloPi';
import AreaUnderCurve from './AreaUnderCurve';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MonteCarloPi />
      </div>
    );
  }
}

export default App;
