import React from 'react';
import D3Viz from './D3Viz';

class MonteCarloPi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { r: 1, total:0, inner: 0, run: true, pi: 0 };
        this.getRandXY = this.getRandXY.bind(this);
        this.generateNewPoints = this.generateNewPoints.bind(this);
        this.stopSim = this.stopSim.bind(this);
        this.sleep = this.sleep.bind(this);
    }

    getRandXY() {
        let x = Math.random();
        let y = Math.random();
        return [x, y];
    }

    // Sleep function taken from https://davidwalsh.name/javascript-sleep-function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async generateNewPoints() {
        let randNums, randX, randY = 0

        for(let i=0;i<3000;i++) {
            await this.sleep(0)
            this.state.total++
            randNums = this.getRandXY()
            randX = randNums[0]
            randY = randNums[1]
            console.log(randX)
            console.log(randY)

            if((randX * randX) + (randY * randY) < (this.state.r * this.state.r)) {
                console.log("Point is in the circle")
                this.state.inner++
            }

            //if the point is outside of the circle
        else console.log("Point is out of the circle")

        this.setState({pi: (4.0 * (this.state.inner/this.state.total))})
        // pi = (4.0 * (this.state.inner/this.state.total))

        
        } 

        console.log(this.state.total)
        console.log(this.state.inner)
        // pi = (4.0 * (this.state.inner/this.state.total))

        // console.log(pi)
    }

    stopSim() {
        this.setState({run: false})
    }

    render() {

        return (
            <div className="App">
                <p>Monte Carlo Pi Simulation</p>
                {/* <button onClick={this.generateNewPoints}>Start Simulation</button> */}
                <p>Pi: {this.state.pi}</p>
                <D3Viz width={300} height={300} />
            </div>
        );
    }
}

export default MonteCarloPi;
