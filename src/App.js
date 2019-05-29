import React from 'react';
import './App.css';
import PiEstimation from './PiEstimation';
import AreaUnderCurve from './AreaUnderCurve';
import {Button, Typography} from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pageToShow: ''}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event.target.id)
    this.setState({pageToShow: event.target.id})

  }

  render() {
    return (
      <div className="App">
        <PiEstimation width={500} height={500} />
        <AreaUnderCurve width={500} height={500} />
      </div>
    );
  }
}

export default App;
