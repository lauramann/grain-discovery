import React from 'react';
import { select } from 'd3-selection'
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './D3Viz.css';

class D3Viz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pi: 0,
      r: 0,
      run: true,
      sliderVal: 100,
      numIter: '1000',
      squareColor: '#7F5AD1',
      circleColor: '#ACD15A'
    };

    // function declarations
    this.setUp = this.setUp.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.sleep = this.sleep.bind(this);
    this.resetSimulation = this.resetSimulation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  // create d3 node (circle and square)
  componentDidMount() {
    this.setUp();
  }

  // handles when user changes speed slider
  handleChange = (event, value) => {
    this.setState({ sliderVal: value });
  };

  // handles when user enters new numIter value
  inputChange = (event) => {
    this.setState({ numIter: event.target.value })
  }

  // setUp function creates d3 node (circle and square)
  setUp() {
    const node = this.node;
    select(node).html('');

    const d = Math.min(this.props.height, this.props.width);
    const r = d / 2;
    const cx = this.props.width / 2;
    const cy = this.props.height / 2;

    this.setState({ r: r })

    // append circle
    select(node).append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .style('stroke', this.state.circleColor)
      .style('fill', 'none');

    // append square
    select(node).append('rect')
      .attr('width', d)
      .attr('height', d)
      .attr('x', this.props.width / 2 - r)
      .attr('y', this.props.height / 2 - r)
      .style('stroke', this.state.squareColor)
      .style('fill', 'none');
  }

  // Sleep function adapted from https://davidwalsh.name/javascript-sleep-function
  // Takes number from slider value (0-100) and converts to corresponding speed
  sleep(ms) {
    let speed = 0
    if (ms == 0) speed = 1000
    else if (ms == 100) speed = 0
    else speed = (100 - ms) * 5

    return new Promise(resolve => setTimeout(resolve, speed));
  }

  // runSimulation function starts the simulation
  async runSimulation() {
    this.setUp()
    this.setState({ run: true })

    const node = this.node
    let randNums, randX, randY, totCount, innerCount = 0
    let i = this.state.numIter

    // generate random numbers for x & y
    function getRandXY() {
      let x = Math.random()
      let y = Math.random()
      return [x, y];
    }

    // While num iterations not at 0...
    do {
      i--
      // sleep depending on what user sets slider value
      await this.sleep(this.state.sliderVal)

      totCount += 1
      randNums = getRandXY()
      randX = randNums[0] * this.props.width
      randY = randNums[1] * this.props.width

      // Calculate whether random point is inside circle
      // If it is, increase innerCount
      let insideCirc = Math.pow(randX - (this.props.width / 2), 2) + Math.pow(randY - (this.props.width / 2), 2) < (this.state.r * this.state.r)
      if (insideCirc) innerCount += 1

      // append dot onto d3 node
      if (this.state.run) {
        select(node).append('circle')
          .attr('cx', randX)
          .attr('cy', randY)
          .attr('r', 1.5)
          .style('fill', insideCirc ? this.state.circleColor : this.state.squareColor);

        // calculate updated pi value
        this.setState({ pi: (4.0 * (innerCount / totCount)) })
      }
    } while (this.state.run && i)
  }

  // resetSimulation function resets simulation
  resetSimulation() {
    // stop running and set pi to 0
    this.setState({ run: false, pi: 0 })

    //clear the d3 viz
    this.setUp();
  }

  render() {
    return (
      <div className="App">
        <div className="left-side">
          <Typography variant="body2" gutterBottom>
            The value of Pi can be estimated by using a Monte Carlo Simulation.
            When we use a square with side length n and a circle with diameter n, and we generate
            random points inside the square, we can calculate the probability that
             the point will be inside the circle as:
      </Typography>
          <Typography className="center-bold" variant="body1" gutterBottom>Pr(inside circle) = π/4</Typography>
          <Typography variant="body2" gutterBottom>
            Therefore, we can estimate Pi by calculating:
      </Typography>
          <Typography className="center-bold" variant="body1" gutterBottom>π = 4 * (# inner points / # total points)</Typography>
          <Typography className="center-bold" variant="h5" gutterBottom>
            π : {this.state.pi.toFixed(4)}
          </Typography>
          <div className="inputs">
            <div className="left-input">
              <TextField
                id="outlined-name"
                label="Num Iterations"
                defaultValue="1000"
                value={null}
                onChange={this.inputChange}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div className="right-input">
              <Typography variant="body1" gutterBottom>Speed</Typography>
              <Slider
                value={this.state.sliderVal}
                aria-labelledby="label"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="buttons">
            <Button id="start-button" onClick={this.runSimulation} variant="contained">
              Start Simulation
            </Button>
            <Button id="reset-button" onClick={this.resetSimulation} variant="contained">
              Reset
            </Button>
          </div>
        </div>

        <div className="right-side">
          <svg ref={node => this.node = node}
            width={this.props.width} height={this.props.height}>
          </svg>
        </div>

      </div>
    );
  }
}

export default D3Viz;