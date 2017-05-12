import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PlayerScoreboard from './PlayerScoreboard';
import ComputerScoreboard from './ComputerScoreboard';
import { updatePlayerKeep, updateDiceRoll, updateComputerKeep, updateRollNum, fireBool, changeTurn, resetRollNum } from '../reducers/index';
import * as Strategy from './ComputerStrategyFunctions';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerKeepArr: [],
            diceRollArr: [],
            computerKeepArr: [],
            bool: true,
            computerTopScore: 0,
            computerBottomScore: 0,
            compTypes: [],
            showModal: false,
            modalText: '',
            result: null,
            computerTotal: null,
            playerTotal: null,
            dicePicObj: {
                0: 'http://colornames.facts.co/darkredcolorcode/darkredcolor.png', 
                1: 'http://www.clipartkid.com/images/160/dice-1-clip-art-at-clker-com-vector-clip-art-online-royalty-free-GIXbjz-clipart.png', 
                2: 'http://www.clipartkid.com/images/160/dice-2-clip-art-at-clker-com-vector-clip-art-online-royalty-free-dyonra-clipart.png', 
                3: 'http://www.clipartkid.com/images/160/dice-3-clip-art-at-clker-com-vector-clip-art-online-royalty-free-UvzDUn-clipart.png', 
                4: 'http://www.clipartkid.com/images/569/dice-4-clip-art-at-clker-com-vector-clip-art-online-royalty-free-4iJRbH-clipart.png', 
                5: 'http://www.clipartkid.com/images/376/dice-5-clip-art-at-clker-com-vector-clip-art-online-royalty-free-Y8iA1w-clipart.png', 
                6: 'http://www.clipartkid.com/images/160/dice-6-clip-art-at-clker-com-vector-clip-art-online-royalty-free-Lt9d80-clipart.png'
            }
        }
        this.rollDice = this.rollDice.bind(this);
        this.resetDice = this.resetDice.bind(this);
        this.keepDice = this.keepDice.bind(this);
        this.removeDice = this.removeDice.bind(this);
        this.removeValueFromArr = this.removeValueFromArr.bind(this);
        this.putDiceWhereValueIsZero = this.putDiceWhereValueIsZero.bind(this);
        this.computerMovesOneTwo = this.computerMovesOneTwo.bind(this);
        this.resetTurn = this.resetTurn.bind(this);
        this.combineComputerDice = this.combineComputerDice.bind(this);
        this.computerMoveDice = this.computerMoveDice.bind(this);
        this.computerMoveThree = this.computerMoveThree.bind(this);
        this.consoleLogValues = this.consoleLogValues.bind(this);
        this.endGame = this.endGame.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate() {
        let boolean;
        if (this.state.compTypes.length === 13) {
            if (this.state.result) {
                return;
            }
            console.log('bottom: ', this.state.computerBottomScore)
            console.log('top: ', this.state.computerTopScore)
            let total = 0;
            if (this.state.computerTopScore >= 63) total += 35;
            total += this.state.computerBottomScore + this.state.computerTopScore;
            console.log('total: ', total);
            console.log('player scores: ', this.props.playerScores)
            console.log('comp types: ', this.state.compTypes)
            // OPEN A MODAL HERE THAT WILL TELL YOU THE RESULTS OF THE GAME
            this.endGame(total);
            return;
        }
        if (this.props.fire === true) {
           this.props.fireBool();
           this.resetTurn();
           setTimeout(this.rollDice, 2000);
           setTimeout(() => {
               console.log(this.state.bool);
               this.state.bool = this.computerMovesOneTwo(this.state.bool)}, 3000);
           setTimeout(this.rollDice, 4000);
           setTimeout(() => {
               console.log(this.state.bool);
               this.state.bool = this.computerMovesOneTwo(this.state.bool)}, 5000);
           setTimeout(this.rollDice, 6000);
           setTimeout(() => {
               console.log(this.state.bool)
               this.computerMoveThree(this.state.bool)}, 7000);
           setTimeout(this.resetTurn, 8000)
           setTimeout(() => {
                this.props.changeTurn('player');
           }, 9000)
           setTimeout(() => {
                const rollButton = document.getElementById('roll-dice-button');
                rollButton.style.visibility = 'visible';
           }, 10000);
       }
    }

    endGame(compTotal) {
        const scores = this.props.playerScores;
        let total = scores['One'] + scores['Two'] + scores['Three'] + scores['Four'] +  scores['Five'] +  scores['Six'];
        if (total >= 63) {
            total += 35;
        }
        total += (scores['Three-of-a-Kind'] + scores['Four-of-a-Kind'] + scores['Full-House'] + scores['Small-Straight'] + scores['Large-Straight'] + scores['Yahtzee'] + scores['Chance']);
        if (total > compTotal) {
            console.log(`You Win! You have a score of ${total} and the computer has a ${compTotal}.`);
            this.setState({result: 'Won', computerTotal: compTotal, playerTotal: total, showModal: true});
        } else if (compTotal > total) {
            console.log(`You Lose! You have a score of ${total} and the computer has a ${compTotal}.`);
            this.setState({result: 'Lost', computerTotal: compTotal, playerTotal: total, showModal: true});
        } else {
            console.log(`You Tied! You both have a score of ${total}.`);
            this.setState({result: 'Tied', computerTotal: compTotal, playerTotal: total, showModal: true});
        }
    }

    rollDice() {
        let value;
        let elem;
        let num;
        this.resetDice();
        if (this.props.rollNum === 1) {
            num = 5;
        } else {
            num = this.props.diceRollArr.length;
        }
        this.state.diceRollArr = [];
        for (var i = 0; i < num; i++) {
            value = this.rollOneDie();
            elem = document.getElementById(i.toString());
            elem.src = this.state.dicePicObj[value];
            elem.value = value;
            this.state.diceRollArr.push(value);
        }
        this.props.updateDiceRoll(this.state.diceRollArr);
        if (this.props.rollNum === 3) {
            const rollButton = document.getElementById('roll-dice-button');
            if (this.props.turn === 'player') {
                rollButton.style.visibility = 'hidden';
            }
        }
        this.props.updateRollNum();
    }

    resetDice() {
        let elem;
        for (var i = 0; i < 5; i++) {
            elem = document.getElementById(i.toString());
            elem.src = this.state.dicePicObj[0];
        }
    }

    rollOneDie() {
        return Math.ceil(Math.random() * 6)
    }

    resetTurn() {
        this.state.playerKeepArr = [];
        this.state.computerKeepArr = [];
        this.state.diceRollArr = [];
        this.props.updateComputerKeep(this.state.computerKeepArr);
        this.props.updatePlayerKeep(this.state.playerKeepArr);
        this.props.updateDiceRoll(this.state.diceRollArr);
        this.props.resetRollNum()
        let elem;
        for (var i = 0; i < 10; i++) {
            elem = document.getElementById(i.toString());
            elem.src = this.state.dicePicObj[0];
            elem.value = 0;
        }
        this.state.bool = true;
        // Make player score buttons unclickable
    }

    consoleLogValues() {
        let elem;
        for (let i = 0; i < 10; i++) {
            elem = document.getElementById(i.toString());
            console.log({i: elem.value});
        }
        console.log('playerKeep: ', this.props.playerKeepArr)
        console.log('diceRoll: ', this.props.diceRollArr);
        console.log('computerKeep: ', this.props.computerKeep);
        console.log('num roll: ', this.props.numRoll);
    }

    keepDice(id, player) {
        // Move dice to keep area
        const elem = document.getElementById(id);
        const value = elem.value;
        this.putDiceWhereValueIsZero(5, 9, value);
        if (player === 'player') {
            this.state.playerKeepArr.push(value);
            this.props.updatePlayerKeep(this.state.playerKeepArr);
        } else {
            this.state.computerKeepArr.push(value);
            this.props.updateComputerKeep(this.state.computerKeepArr);
        }
        // Remove dice from center area
        elem.src = this.state.dicePicObj[0];
        elem.value = 0;
        this.state.diceRollArr = this.removeValueFromArr(this.state.diceRollArr, value);
        this.props.updateDiceRoll(this.state.diceRollArr);
        this.consoleLogValues();
    }

    removeDice(id, player) {
        // Move dice back to center
        const elem = document.getElementById(id);
        const value = elem.value;
        this.putDiceWhereValueIsZero(0, 4, value);
        this.state.diceRollArr.push(value);
        this.props.updateDiceRoll(this.state.diceRollArr);
        // Remove dice from keep area
        elem.src = this.state.dicePicObj[0];
        elem.value = 0;
        if (player === 'player') {
            this.state.playerKeepArr = this.removeValueFromArr(this.state.playerKeepArr, value);
            this.props.updatePlayerKeep(this.state.playerKeepArr);
        } else {
            this.state.computerKeepArr = this.removeValueFromArr(this.state.computerKeepArr, value);
            this.props.updateComputerKeep(this.state.computerKeepArr);
        }
        this.consoleLogValues();
    }


    putDiceWhereValueIsZero(startId, endId, newValue) {
        let elem;
        for (var i = startId; i <= endId; i++) {
            elem = document.getElementById(i.toString());
            console.log('elem.value: ', elem.value);
            if (elem.value === 0 || elem.value === undefined) {
                console.log('newValue: ', newValue)
                elem.src = this.state.dicePicObj[newValue];
                elem.value = newValue;
                break;
            }
        }
    }

    removeValueFromArr(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    }

    combineComputerDice() {
        const all = this.props.computerKeepArr.concat(this.props.diceRollArr);
        return all;
    }

    computerMoveDice(diceToKeep) {
        let elem;
        let value;
        for (let i = 0; i < 5; i++) {
            elem = document.getElementById(i.toString());
            elem.value = 0;
            elem.src = this.state.dicePicObj[0];
        }
        let keepIndex = diceToKeep.length + 5;
        for (let j = 5; j < 10; j++) {
            elem = document.getElementById(j.toString());
            if (j <= keepIndex) {
                value = diceToKeep[j-5];
                elem.value = value;
                elem.src = this.state.dicePicObj[value];
            } else {
                elem.value = 0;
                elem.src = this.state.dicePicObj[0];
            }
        }
        this.props.updateComputerKeep(diceToKeep);
        let lengthDiceRoll = 5 - diceToKeep.length;
        let newKeepArr = [];
        for (let k = 0; k < lengthDiceRoll; k++) {
            newKeepArr.push(0);
        }
        this.props.updateDiceRoll(newKeepArr);
    }

    computerMovesOneTwo(bool) {
        if (bool === true) {
            const diceArr = this.combineComputerDice();
            const analysis = Strategy.analyze(diceArr);
            let diceToKeep = [];
            if (analysis !== "none") {
                const choice = Strategy.choose(diceArr);
                this.state.computerBottomScore += choice[1];
                this.state.compTypes.push(choice[0]);
                const elem = document.getElementById(choice[0]);
                elem.className = 'score-final';
                const title = choice[0].split('-').join(' ');
                elem.innerHTML = title.slice(1) + ': ' + choice[1];
                return false;
            } else {
                diceToKeep = Strategy.find(diceArr);
                this.computerMoveDice(diceToKeep);
                return true;
            }
        } else {
            const rollButton = document.getElementById('roll-dice-button');
            rollButton.style.visibility = 'visible';
            return false;
        }
    }

    computerMoveThree(bool) {
        if (bool === true) {
            const diceArr = this.combineComputerDice();
            const choice = Strategy.choose(diceArr);
            console.log('CHOICE!!!!!!!!!!!!!!!', choice)
            const elem = document.getElementById(choice[0]);
            elem.className = 'score-final';
            console.log('choice[0]:', choice[0]);
            if (choice[0] === 'COne' || choice[0] === 'CTwo' || choice[0] === 'CThree' || choice[0] === 'CFour' || choice[0] === 'CFive' || choice[0] === 'CSix') {
                this.state.computerTopScore += choice[1];
            } else {
                this.state.computerBottomScore += choice[1]
            }
            this.state.compTypes.push(choice[0]);
            const title = choice[0].split('-').join(' ');
            elem.innerHTML = title.slice(1) + ': ' + choice[1];
            this.setState({ modalText: choice[3], showModal: true })
            return true;
        } else {
            const rollButton = document.getElementById('roll-dice-button');
            rollButton.style.visibility = 'visible';
            return false;
        }
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div id="game-page">
                <div className="game-div scoreboard left">
                    <div className="score-section">
                        <PlayerScoreboard />
                    </div>
                </div>
                <div className="inner-div game-div" id="center-game">
                    <div id="rolling-dice">
                        <img className='dice' id="0" src={this.state.dicePicObj[0]} onClick={() => {this.keepDice('0', 'player')}} value='0' />
                        <img className='dice' id="1" src={this.state.dicePicObj[0]} onClick={() => {this.keepDice('1', 'player')}} value='0' />
                        <img className='dice' id="2" src={this.state.dicePicObj[0]} onClick={() => {this.keepDice('2', 'player')}} value='0' />
                        <img className='dice' id="3" src={this.state.dicePicObj[0]} onClick={() => {this.keepDice('3', 'player')}} value='0' />
                        <img className='dice' id="4" src={this.state.dicePicObj[0]} onClick={() => {this.keepDice('4', 'player')}} value='0' />
                    </div>
                    <div id="keeping-dice">
                        <div id="dice-top">
                            <img className='dice' id="5" src={this.state.dicePicObj[0]} onClick={() => {this.removeDice('5', 'computer')}} value='0' />
                            <img className='dice' id="6" src={this.state.dicePicObj[0]} onClick={() => {this.removeDice('6', 'computer')}} value='0' />
                        </div>
                        <div id="dice-bottom">
                            <img className='dice' id="7" src={this.state.dicePicObj[0]} onClick={() => {this.removeDice('7', 'computer')}} value='0' />
                            <img className='dice' id="8" src={this.state.dicePicObj[0]} onClick={() => {this.removeDice('8', 'computer')}} value='0' />
                            <img className='dice' id="9" src={this.state.dicePicObj[0]} onClick={() => {this.removeDice('9', 'computer')}} value='0' />
                        </div>
                    </div>
                </div>
                <div className="game-div scoreboard right">
                    <div className="score-section"></div>
                        <ComputerScoreboard />
                </div>
                <div id="game-page-buttons">
                    <Button id="roll-dice-button" className="buttons" bsSize="large" onClick={this.rollDice}>Roll Dice</Button>
                </div>
                {this.state.showModal ? 
                    <div id='modal'> 
                        <h3>{this.state.modalText}</h3>
                        <Button id='modal-button' onClick={this.closeModal}>Ok</Button>
                    </div>
                    : null}
            </div>
        )
    }
}



export default connect(
  (state) => {
    return {
        turn: state.turn,
        rollNum: state.rollNum,
        computerKeepArr: state.computerKeepArr,
        diceRollArr: state.diceRollArr,
        fire: state.fire,
        playerScores: state.playerScores
    };
  }, 
  (dispatch) => {
      return {
          updatePlayerKeep: function(playerKeepArr) {
              dispatch(updatePlayerKeep(playerKeepArr));
          },
          updateComputerKeep: function(computerKeepArr) {
              dispatch(updateComputerKeep(computerKeepArr));
          },
          updateDiceRoll: function(diceRollArr) {
              dispatch(updateDiceRoll(diceRollArr));
          },
          updateRollNum: function() {
              dispatch(updateRollNum());
          },
          fireBool: function() {
              dispatch(fireBool());
          },
          changeTurn: function(player) {
              dispatch(changeTurn(player));
          },
          resetRollNum: function() {
              dispatch(resetRollNum());
          }
      };
  }
)(Game)