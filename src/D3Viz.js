import React from 'react';
import { select } from 'd3-selection'

class D3Viz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      N: 100,
      d: 0,
      r: 0,
      inCount: 0,
      totalCount: 0,
      squareColor: '#FF1493',
      circleColor: '#0000FF',
      pi: 0
    };
    this.createSimulation = this.createSimulation.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
  }

  componentDidMount() {
    this.createSimulation();
  }

  // REVISE
  createSimulation() {
    // reset svg
    console.log(this)
    const node = this.node;
    console.log(node)
    select(node).html('');

    const d = Math.min(this.props.height, this.props.width);
    const r = d / 2;
    const cx = this.props.width / 2;
    const cy = this.props.height / 2;

    this.setState({d: d, r:r})

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

  runSimulation() {
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

    for (let i = 0; i < 3000; i++) {
      // await this.sleep(0)
      totCount+=1
      // this.setState({totalCount: this.state.totalCount++})
      randNums = getRandXY()
      randX = randNums[0] * 150
      randY = randNums[1] * 150
      console.log(randX)
      console.log(randY)

      console.log((randX * randX) + (randY * randY))

      if ((randX * randX) + (randY * randY) < (this.state.r * this.state.r)) {
        console.log("inside the circle")
        // this.setState({inCount: this.state.inCount++})
        innerCount+=1
      }
      
      else console.log("outside the circle")

      select(node).append('circle')
        .attr('cx', randX*2)
        .attr('cy', randY*2)
        .attr('r', 3)
      // .style('fill', this.isIn(p) ? this.state.circleColor : this.state.squareColor);

      // this.setState({ pi: (4.0 * (this.state.inCount / this.state.totalCount)) })
      // console.log(this.state.pi)
      console.log("Inner count: " + innerCount + " Total count: " + totCount)
      piCalc = (4.0 * (innerCount/totCount))
      console.log(piCalc)


    }
  }


  render() {

    return (
      <div className="App">
        <p>Vizualization</p>
        <button onClick={this.runSimulation}>Start Simulation</button>
        <svg ref={node => this.node = node}
          width={this.props.width} height={this.props.height}>
        </svg>
      </div>
    );
  }
}

export default D3Viz;

