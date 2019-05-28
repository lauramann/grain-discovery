import React from 'react';
import { select } from 'd3-selection'
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';

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
      // inCount: 0,
      // totalCount: 0,
      squareColor: '#FF1493',
      circleColor: '#0000FF'
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
      // this.setState({totalCount: this.state.totalCount++})
      randNums = getRandXY()
      randX = randNums[0] * 300.0
      randY = randNums[1] * 300.0
      // console.log(randX)
      // console.log(randY)

      let insideCirc = Math.pow(randX - 150, 2) + Math.pow(randY - 150, 2) < (this.state.r * this.state.r)
      if (insideCirc) innerCount += 1

      if (this.state.run) {
        select(node).append('circle')
          .attr('cx', randX)
          .attr('cy', randY)
          .attr('r', 1.5)
          .style('fill', insideCirc ? this.state.circleColor : this.state.squareColor);

        // console.log("Inner count: " + innerCount + " Total count: " + totCount)
        this.setState({ pi: (4.0 * (innerCount / totCount)) })
        // console.log(piCalc)
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
        <h3>Pi = 4*(N inner / N total)</h3>
        <h3 id="pi">Pi: {this.state.pi.toFixed(4)}</h3>
        <p></p>

        <TextField
          id="filled-name"
          label="Num"
          defaultValue="1000"
          value={null}
          onChange={this.inputChange}
          margin="normal"
          variant="filled"
        />
        <div style={{ width: "300px" }}>

          <Slider
            value={this.state.sliderVal}
            aria-labelledby="label"
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.runSimulation}>Start Simulation</button>
        <button onClick={this.resetSimulation}>Reset</button>
        <br />
        <br />
        <svg ref={node => this.node = node}
          width={this.props.width} height={this.props.height}>
        </svg>
      </div>
    );
  }
}

export default D3Viz;