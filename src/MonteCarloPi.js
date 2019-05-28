import React from 'react';
import D3Viz from './D3Viz';

class MonteCarloPi extends React.Component {

    render() {

        return (
            <div className="App">
                <h1>Monte Carlo Pi Simulation</h1>
                <D3Viz width={500} height={500} />
            </div>
        );
    }
}

export default MonteCarloPi;
