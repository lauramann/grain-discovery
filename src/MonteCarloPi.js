import React from 'react';

class MonteCarloPi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { r: 1, total:0, inner: 0, run: true };
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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async generateNewPoints() {
        let randNums, randX, randY, pi = 0

        for(let i=0;i<1000;i++) {
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

        
        } 

        console.log(this.state.total)
        console.log(this.state.inner)
        pi = (4.0 * (this.state.inner/this.state.total))

        console.log(pi)
    }

    stopSim() {
        this.setState({run: false})
    }

    render() {

        return (
            <div className="App">
                <p>Monte Carlo Pi Simulation</p>
                <button onClick={this.generateNewPoints}>Start Simulation</button>
                <button onClick={this.stopSim}>STOP</button>
                {/* <p>Random X: {randX}</p>
                <p>Random Y: {randX}</p> */}
            </div>
        );
    }
}

export default MonteCarloPi;
