import React from 'react';
import { select } from 'd3-selection'

class D3Viz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numIter: 1000,
      speed: 0,
      pi: 0,
      r:0,
      run: true,
      // inCount: 0,
      // totalCount: 0,
      squareColor: '#FF1493',
      circleColor: '#0000FF'
    };
    this.setUp = this.setUp.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.sleep = this.sleep.bind(this);
    this.resetSimulation = this.resetSimulation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setUp();
  }

  // REVISE
  setUp() {
    const node = this.node;
    select(node).html('');

    const d = Math.min(this.props.height, this.props.width);
    const r = d / 2;
    const cx = this.props.width / 2;
    const cy = this.props.height / 2;

    this.setState({r:r})

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
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async runSimulation() {
    // console.log("doc value: " + document.getElementById("N").value)
    let val = document.getElementById("N").value
    console.log("val: " + val)
    if(val) {
      console.log("changed val")
      this.setState({numIter: val})}
    else console.log("Nothing")
    // if(document.getElementById("N").value) this.setState({numIter: document.getElementById("N").value})
    this.setUp()
    this.setState({run:true})
    const node = this.node
    console.log("Number of iterations: " +this.state.numIter)

    function getRandXY() {
      let x = Math.random()
      let y = Math.random()
      return [x, y];
    }

    let randNums, randX, randY = 0
    let totCount = 0
    let innerCount = 0
    let i = this.state.numIter

    do {
      i--
      await this.sleep(this.state.speed)
      totCount+=1
      // this.setState({totalCount: this.state.totalCount++})
      randNums = getRandXY()
      randX = randNums[0] * 300.0
      randY = randNums[1] * 300.0
      // console.log(randX)
      // console.log(randY)

      let insideCirc = Math.pow(randX - 150, 2) + Math.pow(randY - 150, 2) < (this.state.r * this.state.r)
      if (insideCirc) innerCount+=1

      if (this.state.run) {
      select(node).append('circle')
        .attr('cx', randX)
        .attr('cy', randY)
        .attr('r', 1.5)
        .style('fill', insideCirc ? this.state.circleColor : this.state.squareColor);

      // console.log("Inner count: " + innerCount + " Total count: " + totCount)
      this.setState({pi: (4.0 * (innerCount/totCount))})
      // console.log(piCalc)
      }
    } while (this.state.run && i)
    
  }

  resetSimulation() {
    this.setState({run: false, pi: 0})
    this.setUp();
  }

  onSubmit() {
    let n = document.getElementById("N").value
    this.setState({numIter: n})
    console.log(n)
  }

  render() {

    return (
      <div className="App">
        <h3>Pi = 4*(N inner / N total)</h3>
        <h3>Pi: {this.state.pi.toFixed(4)}</h3>
        <p></p>

        <label>Number of Iterations</label>
        <input type="number" id="N"></input>
        <button onClick={this.onSubmit}>Submit</button>
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

