import React from 'react';
import './App.css';
import MonteCarloPi from './MonteCarloPi';
import AreaUnderCurve from './AreaUnderCurve';

class App extends React.Component {

  render() {
    return (
      <div className="App">
          <h1>Area Under the Curve</h1>
        {/* <MonteCarloPi /> */}
        <AreaUnderCurve width={500} height={500} />
      </div>
    );
  }
}

export default App;
