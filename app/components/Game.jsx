import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PlayerScoreboard from './PlayerScoreboard';
import ComputerScoreboard from './ComputerScoreboard';
import { updatePlayerKeep, updateDiceRoll } from '../reducers/index';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerKeepArr: [],
            diceRollArr: [],
            computerKeepArr: [],
            rollNum: 1,
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
        this.playerKeepDice = this.playerKeepDice.bind(this);
        this.playerRemoveDice = this.playerRemoveDice.bind(this);
        this.removeValueFromArr = this.removeValueFromArr.bind(this);
        this.putDiceWhereValueIsZero = this.putDiceWhereValueIsZero.bind(this);
    }

    rollDice() {
        let value;
        let elem;
        let num;
        this.resetDice();
        if (this.state.rollNum === 1) {
            num = 5;
        } else {
            num = this.state.diceRollArr.length;
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
        if (this.state.rollNum === 3) {
            const rollButton = document.getElementById('roll-dice-button');
            rollButton.style.visibility = 'hidden';
            rollButton.onClick = () => {
                return;
            }
        }
        this.state.rollNum++;
    }

    rollOneDie() {
        return Math.ceil(Math.random() * 6)
    }

    resetDice() {
        let elem;
        for (var i = 0; i < 5; i++) {
            elem = document.getElementById(i.toString());
            elem.src = this.state.dicePicObj[0];
        }
    }

    playerKeepDice(id) {
        // Move dice to player's dice area
        const elem = document.getElementById(id);
        const value = elem.value;
        this.putDiceWhereValueIsZero(5, 9, value);
        this.state.playerKeepArr.push(value);
        this.props.updatePlayerKeep(this.state.playerKeepArr);
        // Remove dice from center area
        elem.src = this.state.dicePicObj[0];
        elem.value = 0;
        this.state.diceRollArr = this.removeValueFromArr(this.state.diceRollArr, value);
        this.props.updateDiceRoll(this.state.diceRollArr);
    }

    playerRemoveDice(id) {
        // Move dice back to center
        const elem = document.getElementById(id);
        const value = elem.value;
        this.putDiceWhereValueIsZero(0, 4, value);
        this.state.diceRollArr.push(value);
        this.props.updateDiceRoll(this.state.diceRollArr);
        // Remove dice from player's dice area
        elem.src = this.state.dicePicObj[0];
        elem.value = 0;
        this.state.playerKeepArr = this.removeValueFromArr(this.state.playerKeepArr, value);
        this.props.updatePlayerKeep(this.state.playerKeepArr);
    }


    putDiceWhereValueIsZero(startId, endId, newValue) {
        let elem;
        for (var i = startId; i <= endId; i++) {
            elem = document.getElementById(i.toString());
            if (elem.value === 0 || elem.value === undefined) {
                elem.value = newValue;
                elem.src = this.state.dicePicObj[newValue];
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
                        <img className='dice' id="0" src={this.state.dicePicObj[0]} onClick={() => {this.playerKeepDice('0')}} value='0' />
                        <img className='dice' id="1" src={this.state.dicePicObj[0]} onClick={() => {this.playerKeepDice('1')}} value='0' />
                        <img className='dice' id="2" src={this.state.dicePicObj[0]} onClick={() => {this.playerKeepDice('2')}} value='0' />
                        <img className='dice' id="3" src={this.state.dicePicObj[0]} onClick={() => {this.playerKeepDice('3')}} value='0' />
                        <img className='dice' id="4" src={this.state.dicePicObj[0]} onClick={() => {this.playerKeepDice('4')}} value='0' />
                    </div>
                    <div id="keeping-dice">
                        <div id="dice-top">
                            <img className='dice' id="5" src={this.state.dicePicObj[0]} onClick={() => {this.playerRemoveDice('5')}} value='0' />
                            <img className='dice' id="6" src={this.state.dicePicObj[0]} onClick={() => {this.playerRemoveDice('6')}} value='0' />
                        </div>
                        <div id="dice-bottom">
                            <img className='dice' id="7" src={this.state.dicePicObj[0]} onClick={() => {this.playerRemoveDice('7')}} value='0' />
                            <img className='dice' id="8" src={this.state.dicePicObj[0]} onClick={() => {this.playerRemoveDice('8')}} value='0' />
                            <img className='dice' id="9" src={this.state.dicePicObj[0]} onClick={() => {this.playerRemoveDice('9')}} value='0' />
                        </div>
                    </div>
                </div>
                <div className="game-div scoreboard right">
                    <div className="score-section"></div>
                        <ComputerScoreboard />
                </div>
                <div id="game-page-buttons">
                    <Button id="roll-dice-button" className="buttons" bsSize="large" onClick={this.rollDice}>Roll Dice</Button>
                    <Button className="buttons" bsSize="large" onClick={this.resetDice}>Reset</Button>
                </div>
            </div>
        )
    }
}



export default connect(
  (state) => {
    return {};
  }, 
  (dispatch) => {
      return {
          updatePlayerKeep: function(playerKeepArr) {
              dispatch(updatePlayerKeep(playerKeepArr));
          },
          updateDiceRoll: function(diceRollArr) {
              dispatch(updateDiceRoll(diceRollArr));
          }
      };
  }
)(Game)