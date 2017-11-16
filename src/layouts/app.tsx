import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Synaptic from 'synaptic';
import XOR from '../components/xor';
import TicTacToe from '../components/tictactoe';
import Basic from '../components/basic';

export default class App extends React.Component {
  render() {
    return <TicTacToe />;
  }
}
