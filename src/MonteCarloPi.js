import React from 'react';
import D3Viz from './D3Viz';

class MonteCarloPi extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="App">
                <h1>Monte Carlo Pi Simulation</h1>
                <D3Viz width={300} height={300} />
            </div>
        );
    }
}

export default MonteCarloPi;
