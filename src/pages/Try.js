import React, { Component } from "react";
import * as tf from '@tensorflow/tfjs';

class Try extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: []
        };
    }

    async learnLinear() {
        console.log(this.state.output);
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        });

        const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
        const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

        await model.fit(xs, ys, { epochs: 500 });

        this.setState({ output: model.predict(tf.tensor2d([10], [1, 1])) });

        console.log("Done");
        console.log(this.state.output);

    }   

    componentDidMount() {
        this.learnLinear();
    }

    render() {
        return (
            <div className="card-wrapper">
            </div>
        )
    }
}

export default Try;