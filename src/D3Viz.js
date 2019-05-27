import React from 'react';
import { select } from 'd3-selection'

class D3Viz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      N: 10000,
      speed: 0,
      pi: 0,
      r:0,
      // inCount: 0,
      // totalCount: 0,
      squareColor: '#FF1493',
      circleColor: '#0000FF'
    };
    this.setUp = this.setUp.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.sleep = this.sleep.bind(this);
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
    const node = this.node

    function getRandXY() {
      let x = Math.random()
      let y = Math.random()
      return [x, y];
    }

    let randNums, randX, randY = 0
    let totCount = 0
    let innerCount = 0
    let piCalc = 0

    for (let i = 0; i < this.state.N; i++) {
      await this.sleep(this.state.speed)
      totCount+=1
      // this.setState({totalCount: this.state.totalCount++})
      randNums = getRandXY()
      randX = randNums[0] * 300.0
      randY = randNums[1] * 300.0
      console.log(randX)
      console.log(randY)

      let insideCirc = Math.pow(randX - 150, 2) + Math.pow(randY - 150, 2) < (this.state.r * this.state.r)
      if (insideCirc) innerCount+=1

      select(node).append('circle')
        .attr('cx', randX)
        .attr('cy', randY)
        .attr('r', 1.5)
        .style('fill', insideCirc ? this.state.circleColor : this.state.squareColor);

      console.log("Inner count: " + innerCount + " Total count: " + totCount)
      piCalc = (4.0 * (innerCount/totCount))
      this.setState({pi: (4.0 * (innerCount/totCount))})
      console.log(piCalc)
    }
  }

  render() {

    return (
      <div className="App">
        <h3>Pie = 4*(N inner / N total)</h3>
        <h3>Pi: {this.state.pi}</h3>
        <p></p>

        <button onClick={this.runSimulation}>Start Simulation</button>
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

