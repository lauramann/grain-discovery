import React from 'react';
import './App.css';
import MonteCarloPi from './MonteCarloPi';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { counter: 0 };
    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="App">
        <MonteCarloPi />
      </div>
    );
  }
}

export default App;
