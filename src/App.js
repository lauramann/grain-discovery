import React from 'react';
import './App.css';
import PiEstimation from './PiEstimation';
import AreaUnderCurve from './AreaUnderCurve';
import Fab from '@material-ui/core/Fab';
import ScrollableAnchor from 'react-scrollable-anchor'

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
        <div className="fab">
        <Fab href="#auc" id="fab" color="primary" aria-label="Add">
        
        Next
      </Fab>
      </div>
      
        <PiEstimation width={500} height={500} />

        <ScrollableAnchor id={'auc'}>
        <AreaUnderCurve id="auc" width={500} height={500} />
        </ScrollableAnchor>
        
      </div>
    );
  }
}

export default App;
