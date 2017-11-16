import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Synaptic from 'synaptic';
import * as Utils from '../utils';

export default class Basic extends React.Component {
  NN = (m1: number, m2: number, w1: number, w2: number, b: number) => {
    const z = (m1 * w1) + (m2 * w2) + b;
    return Utils.sigmoid(z);
  }

  render() {
    const w1 = Math.random();
    const w2 = Math.random();
    const b = Math.random();

    return (
      <div>
        Red: {this.NN(3, 1.5, w1, w2, b)}
        <br/>
        Blue: {this.NN(2, 1, w1, w2, b)}
      </div>
    );
  }
}
