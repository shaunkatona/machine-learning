import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Network from '../networks/tictactoe';
import { find, isEqual } from 'lodash';

import '../styles/tictactoe.scss';

interface TicTacToeState {
  currentBoard: number[];
  currentTurnNumber: number;
  currentTurnPlayer: number;
  previousBoard: number[];
}

export default class TicTacToe extends React.Component<{}, TicTacToeState> {
  constructor(props) {
    super(props);

    this.state = {
      currentBoard: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      currentTurnNumber: 1,
      currentTurnPlayer: 1,
      previousBoard: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    };
  }

  getXO = (pos: number) => {
    switch (this.state.currentBoard[pos]) {
      case 0:
        return 'O';
      case 0.5:
        return '\u00A0';
      case 1:
        return 'X';
    }
  }

  mark = (pos: number) => {
    if (this.state.currentBoard[pos] === 0.5) {
      const currentBoard = Array.from(this.state.currentBoard);
      currentBoard[pos] = this.state.currentTurnPlayer;

      this.setState({
        ...this.state,
        currentBoard,
        currentTurnNumber: this.state.currentTurnNumber + 1,
        currentTurnPlayer: this.state.currentTurnPlayer ? 0 : 1,
        previousBoard: Array.from(this.state.currentBoard)
      }, this.cpuTurn);
    }
  }

  board = () => {
    return (
      <table>
        <tbody>
          <tr>
            <td onClick={() => this.mark(0)} className={this.getXOClass(0)}>{this.getXO(0)}</td><td onClick={() => this.mark(1)}>{this.getXO(1)}</td><td onClick={() => this.mark(2)}>{this.getXO(2)}</td>
          </tr>
          <tr>
            <td onClick={() => this.mark(3)}>{this.getXO(3)}</td><td onClick={() => this.mark(4)}>{this.getXO(4)}</td><td onClick={() => this.mark(5)}>{this.getXO(5)}</td>
          </tr>
          <tr>
            <td onClick={() => this.mark(6)}>{this.getXO(6)}</td><td onClick={() => this.mark(7)}>{this.getXO(7)}</td><td onClick={() => this.mark(8)}>{this.getXO(8)}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  getXOClass = (index: number) => {
    return '';
  }

  gameWon = () => {
    if (this.state.currentBoard[0] !== 0.5 && this.state.currentBoard[0] === this.state.currentBoard[1] && this.state.currentBoard[0] === this.state.currentBoard[2]) {
      return this.state.currentBoard[0];
    }

    if (this.state.currentBoard[3] !== 0.5 && this.state.currentBoard[3] === this.state.currentBoard[4] && this.state.currentBoard[3] === this.state.currentBoard[5]) {
      return this.state.currentBoard[3];
    }

    if (this.state.currentBoard[6] !== 0.5 && this.state.currentBoard[6] === this.state.currentBoard[7] && this.state.currentBoard[6] === this.state.currentBoard[8]) {
      return this.state.currentBoard[6];
    }

    if (this.state.currentBoard[0] !== 0.5 && this.state.currentBoard[0] === this.state.currentBoard[3] && this.state.currentBoard[0] === this.state.currentBoard[6]) {
      return this.state.currentBoard[0];
    }

    if (this.state.currentBoard[1] !== 0.5 && this.state.currentBoard[1] === this.state.currentBoard[4] && this.state.currentBoard[1] === this.state.currentBoard[7]) {
      return this.state.currentBoard[1];
    }

    if (this.state.currentBoard[2] !== 0.5 && this.state.currentBoard[2] === this.state.currentBoard[5] && this.state.currentBoard[2] === this.state.currentBoard[8]) {
      return this.state.currentBoard[2];
    }

    if (this.state.currentBoard[0] !== 0.5 && this.state.currentBoard[0] === this.state.currentBoard[4] && this.state.currentBoard[0] === this.state.currentBoard[8]) {
      return this.state.currentBoard[0];
    }

    if (this.state.currentBoard[2] !== 0.5 && this.state.currentBoard[2] === this.state.currentBoard[4] && this.state.currentBoard[2] === this.state.currentBoard[6]) {
      return this.state.currentBoard[2];
    }

    return '';
  }

  status = () => {
    const whoWon = this.gameWon();
    
    if (whoWon !== '') {
      return `${whoWon ? 'X' : 'O'} WINS`;
    } else if (this.state.currentTurnNumber === 10) {
      return `Cat's Game`;
    }

    return `${this.state.currentTurnPlayer ? 'Human X' : 'Computer O'}'s turn`;
  }

  cpuTurn = () => {
    if (this.state.currentTurnPlayer === 0 && this.state.currentTurnNumber < 9) {
      let bestMoveScore = 0;
      let bestMoveBoard;

      console.log('previousBoard', this.state.previousBoard);
      console.log('currentBoard', this.state.currentBoard);

      for (let i = 0; i < this.state.currentBoard.length; i++) {
        if (this.state.currentBoard[i] === 0.5) {
          const nextBoard = Array.from(this.state.currentBoard);
          nextBoard.splice(i, 1, 0);

          console.log('nextBoard', nextBoard);

          if (!isEqual(this.state.previousBoard, nextBoard)) {
            const nextMoveScore = Network.myNetwork.activate(Network.massageInput(nextBoard));

            if (nextMoveScore[0] >= bestMoveScore) {
              bestMoveBoard = nextBoard;
              bestMoveScore = nextMoveScore[0];
            }

            console.log(nextBoard, nextMoveScore);
          }
        }
      }

      this.setState({
        ...this.state,
        currentBoard: bestMoveBoard,
        currentTurnNumber: this.state.currentTurnNumber + 1,
        currentTurnPlayer: this.state.currentTurnPlayer ? 0 : 1,
        previousBoard: Array.from(this.state.currentBoard)
      });
    }
  }

  trainBad = () => {
    Network.myNetwork.activate(Network.massageInput(this.state.currentBoard));
    Network.myNetwork.propagate(Network.learningRate, [0]);

    Network.trainingSet.push({
      input: this.state.currentBoard,
      output: [0]
    });

    this.setState({
      currentBoard: Array.from(this.state.previousBoard),
      currentTurnNumber: this.state.currentTurnNumber - 1,
      currentTurnPlayer: this.state.currentTurnPlayer ? 0 : 1,
      previousBoard: Array.from(this.state.currentBoard)
    }, this.cpuTurn);
  }

  trainGood = () => {
    Network.myNetwork.activate(Network.massageInput(this.state.currentBoard));
    Network.myNetwork.propagate(Network.learningRate, [1]);
    
    if (!find(Network.trainingSet, { input: this.state.currentBoard })) {
      Network.trainingSet.push({
        input: this.state.currentBoard,
        output: [1]
      });
    }
  }

  clear = () => {
    Network.myNetwork.clear();

    this.setState({
      currentBoard: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      currentTurnNumber: 1,
      currentTurnPlayer: 1,
      previousBoard: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    });
  }

  printNetwork = () => {
    console.log(Network.myNetwork.toJSON());
    console.log(Network.trainingSet);
  }

  render() {
    return (
      <div>
        {this.board()}
        {this.status()}
        <br />
        <button onClick={this.cpuTurn}>Take CPU turn</button>
        <button onClick={this.trainBad}>Train as BAD</button>
        <button onClick={this.trainGood}>Train as GOOD</button>
        <br /><br />
        <button onClick={this.clear}>Clear Board</button>
        <button onClick={this.printNetwork}>Braaaaiiiiins</button>
      </div>
    );
  }
}
