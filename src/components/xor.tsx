import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Synaptic from 'synaptic';

export default class XOR extends React.Component {
  render() {
    const inputLayer = new Synaptic.Layer(2);
    const hiddenLayer = new Synaptic.Layer(3);
    const outputLayer = new Synaptic.Layer(1);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    const myNetwork = new Synaptic.Network({
      hidden: [hiddenLayer],
      input: inputLayer,
      output: outputLayer
    });

    const learningRate = .3;

    for (let i = 0; i < 20000; i++) {
      myNetwork.activate([0, 0]);
      myNetwork.propagate(learningRate, [0]);

      myNetwork.activate([0, 1]);
      myNetwork.propagate(learningRate, [1]);

      myNetwork.activate([1, 0]);
      myNetwork.propagate(learningRate, [1]);

      myNetwork.activate([1, 1]);
      myNetwork.propagate(learningRate, [0]);
    }
    
    return (
        <div>
            {myNetwork.activate([0, 0])}
            <br/>
            {myNetwork.activate([0, 1])}
            <br/>
            {myNetwork.activate([1, 0])}
            <br/>
            {myNetwork.activate([1, 1])}
        </div>
    );
  }
}
