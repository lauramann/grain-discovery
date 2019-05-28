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
      numIter: 1000,
      pi: 0,
      r: 0,
      run: true,
      sliderVal: 100,
      input: '1000',
      squareColor: '#7F5AD1',
      circleColor: '#ACD15A'
    };
    this.setUp = this.setUp.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.sleep = this.sleep.bind(this);
    this.resetSimulation = this.resetSimulation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  componentDidMount() {
    this.setUp();
  }

  handleChange = (event, value) => {
    this.setState({ sliderVal: value });
    // console.log(value)
  };

  inputChange = (event) => {
    // console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  // REVISE
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

  // Sleep function taken from https://davidwalsh.name/javascript-sleep-function
  sleep(ms) {
    let speed = 0
    if (ms == 0) speed = 1000
    else if (ms == 100) speed = 0
    else speed = (100 - ms) * 5

    return new Promise(resolve => setTimeout(resolve, speed));
  }

  async runSimulation() {
    console.log("run called")
    console.log(this.state.input)
    this.setState({ run: false })
    console.log(this.state.input)
    this.setUp()
    this.setState({ run: true })
    const node = this.node
    console.log("Number of iterations: " + this.state.input)

    function getRandXY() {
      let x = Math.random()
      let y = Math.random()
      return [x, y];
    }

    let randNums, randX, randY = 0
    let totCount = 0
    let innerCount = 0
    // let i = this.state.numIter
    let i = this.state.input

    do {
      i--
      await this.sleep(this.state.sliderVal)
      totCount += 1
      randNums = getRandXY()
      randX = randNums[0] * this.props.width
      randY = randNums[1] * this.props.width

      let insideCirc = Math.pow(randX - (this.props.width / 2), 2) + Math.pow(randY - (this.props.width / 2), 2) < (this.state.r * this.state.r)
      if (insideCirc) innerCount += 1

      if (this.state.run) {
        select(node).append('circle')
          .attr('cx', randX)
          .attr('cy', randY)
          .attr('r', 1.5)
          .style('fill', insideCirc ? this.state.circleColor : this.state.squareColor);

        this.setState({ pi: (4.0 * (innerCount / totCount)) })
      }
    } while (this.state.run && i)

  }

  resetSimulation() {
    this.setState({ run: false, pi: 0 })
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