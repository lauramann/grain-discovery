import React from 'react';
import { select } from 'd3-selection'
import * as d3 from 'd3-shape';
import Slider from '@material-ui/lab/Slider';
import {TextField, Button, Typography} from '@material-ui/core';
import './D3Viz.css';

class AreaUnderCurve extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        radius: 0,
        run: true,
        sliderVal: 100,
        numIter: '1000',
        squareColor: '#7F5AD1',
        circleColor: '#ACD15A',
        innerCount: 0,
        totCount: 0,
      };
  
      this.setUp = this.setUp.bind(this);
      this.runSimulation = this.runSimulation.bind(this);
      this.sleep = this.sleep.bind(this);
      this.resetSimulation = this.resetSimulation.bind(this);
      this.handleSliderChange = this.handleSliderChange.bind(this);
      this.handleNumIterChange = this.handleNumIterChange.bind(this);
      this.getRandXY = this.getRandXY.bind(this);
      this.f = this.f.bind(this);
      this.underCurve = this.underCurve.bind(this);
      }
  
    componentDidMount() {
      this.setUp();
    }
  
    handleSliderChange = (event, value) => {
      this.setState({ sliderVal: value });
    };
  
    handleNumIterChange = (event) => {
      this.setState({ numIter: event.target.value })
    }

    f(x) {
            
            return Math.pow(x, Math.cos(x)) + 2
        }
    
  
    setUp() {
      const node = this.node;
      select(node).html('');
  
      const d = Math.min(this.props.height, this.props.width);
      const r = d / 2;
      const cx = this.props.width / 2;
      const cy = this.props.height / 2;
  
      this.setState({ radius: r })
  
      select(node).append('rect')
        .attr('width', d)
        .attr('height', d)
        .attr('x', this.props.width / 2 - r)
        .attr('y', this.props.height / 2 - r)
        .style('stroke', this.state.squareColor)
        .style('fill', 'none');

        select(node).append('circle')
            .attr('cx', 500)
            .attr('cy', d-500)
            .attr('r', 5)
            .style('fill', '#7F5AD1');


        let lineData = [...Array(d).keys()]
        console.log(lineData)

        let scale = 1

        let f = this.f

        // function f(x) {
            
        //     return Math.pow(x, Math.cos(x)) + 2
        // }

        let lineFunction = d3.line()
            .x(function(x) { return (x/1 * scale);})
            .y(function(x) { return d - (f(x/1)) * scale; })
        
            select(node).append("path")
                .attr("d", lineFunction(lineData))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none")

    }
  
    // Sleep function adapted from https://davidwalsh.name/javascript-sleep-function
    // Takes number from slider value (0-100) and converts to corresponding speed
    sleep(ms) {
      let speed = 0
      if (ms === 0) speed = 1000
      else if (ms === 100) speed = 0
      else speed = (100 - ms) * 5
  
      return new Promise(resolve => setTimeout(resolve, speed));
    }
  
    getRandXY() {
      let x = Math.random()
      let y = Math.random()
      return [x, y];
    }
  
    underCurve(x, y) {
    let res = this.f(x)
    console.log("result: " + res)
    console.log("y: " + y)
    if(y<res) console.log("under curve")
    else console.log("above curve")
      return (y < res)
    }
  
  
    async runSimulation() {
      this.setUp()
      this.setState({ run: true })
  
      const node = this.node
      let randNums, randX, randY, innerCount = 0
      let totCount = 0
      let i = this.state.numIter
  
      do {
        i--
        await this.sleep(this.state.sliderVal)
  
        totCount += 1
        randNums = this.getRandXY()
        randX = randNums[0] * this.props.width
        randY = randNums[1] * this.props.width
        let unCurve = this.underCurve(randX, randY)
  
        if (unCurve) innerCount += 1
        console.log(innerCount)
        this.setState({innerCount: innerCount, totCount: totCount})
  
        if (this.state.run) {
          select(node).append('circle')
            .attr('cx', randX)
            .attr('cy', this.props.height - randY)
            .attr('r', 1.5)
            .style('fill', unCurve ? this.state.circleColor : this.state.squareColor);
  
        //   this.setState({ pi: (4.0 * (innerCount / totCount)) })
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
              Total In: {this.state.innerCount}
            </Typography>
            <Typography className="center-bold" variant="h5" gutterBottom>
              Total Out: {this.state.totCount}
            </Typography>
            <div className="inputs">
              <div className="left-input">
                <TextField
                  id="outlined-name"
                  label="Num Iterations"
                  defaultValue="1000"
                  type="number"
                  onChange={this.handleNumIterChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="right-input">
                <Typography variant="body1" gutterBottom>Speed</Typography>
                <Slider
                  value={this.state.sliderVal}
                  aria-labelledby="label"
                  onChange={this.handleSliderChange}
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
  
  export default AreaUnderCurve;
