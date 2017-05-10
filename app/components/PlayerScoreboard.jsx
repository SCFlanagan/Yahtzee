import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ScoreFunction from './ScoreFunctions';
import { addPlayerScore, changeTurn, resetRollNum, fireBool } from '../reducers/index';

class PlayerScoreboard extends Component {
    constructor(props) {
        super(props);

        this.combinePlayerDice = this.combinePlayerDice.bind(this);
        this.addOneThroughSix = ScoreFunction.addOneThroughSix.bind(this);
        this.deButton = ScoreFunction.deButton.bind(this);
        this.countDice = ScoreFunction.countDice.bind(this);
        this.score3or4k = ScoreFunction.score3or4k.bind(this);
        this.sumArray = ScoreFunction.sumArray.bind(this);
        this.scoreFullHouse = ScoreFunction.scoreFullHouse.bind(this);
        this.scoreYahtzee = ScoreFunction.scoreYahtzee.bind(this);
        this.scoreChance = ScoreFunction.scoreChance.bind(this);
        this.scoreSmStr = ScoreFunction.scoreSmStr.bind(this);
        this.scoreLgStr = ScoreFunction.scoreLgStr.bind(this);
        this.addScoreChangeTurn = this.addScoreChangeTurn.bind(this);
    }

    combinePlayerDice() {
        const all = this.props.playerKeepArr.concat(this.props.diceRollArr);
        return all;
    }

    addScoreChangeTurn(scoreArr) {
        console.log('scoreArr in addscorechangeturn: ', scoreArr)
        if (scoreArr === null) return;
        console.log('ScoreARR!!!! ', scoreArr)
        this.props.addPlayerScore(scoreArr);
        this.props.changeTurn('computer');
        this.props.resetRollNum();
        const rollButton = document.getElementById('roll-dice-button');
        rollButton.style.visibility = 'hidden';
        this.props.fireBool();
    }

    render() {
        return (
            <div>
                <div className="top-score scoreboard-buttons">
                    <div id="One" className="scores" onClick={() => {
                        this.addScoreChangeTurn(this.addOneThroughSix(1, 'One', this.combinePlayerDice));
                        }}>One</div>
                    <div id="Two" className="scores" onClick={() => {
                        this.addScoreChangeTurn(this.addOneThroughSix(2, 'Two', this.combinePlayerDice));
                        }}>Two</div>
                    <div id="Three" className="scores" onClick={() => {
                        this.addScoreChangeTurn(this.addOneThroughSix(3, 'Three', this.combinePlayerDice));
                        }}>Three</div>
                    <div id="Four" className="scores" onClick={() => {
                        this.addScoreChangeTurn(this.addOneThroughSix(4, 'Four', this.combinePlayerDice));
                        }}>Four</div>
                    <div id="Five" className="scores" onClick={() => {
                        this.addScoreChangeTurn(this.addOneThroughSix(5, 'Five', this.combinePlayerDice));
                        }}>Five</div>
                    <div id="Six" className="scores" onClick={() => {
                        this.addScoreChangeTurn(this.addOneThroughSix(6, 'Six', this.combinePlayerDice));
                        }}>Six</div>
                </div>
                <div className="bottom-score scoreboard-buttons">
                    <div className="scores"id="Three-of-a-Kind" onClick={() => {
                        this.addScoreChangeTurn(this.score3or4k('Three-of-a-Kind', 3, this.combinePlayerDice));
                        }}>Three of a Kind</div>
                    <div className="scores"id="Four-of-a-Kind" onClick={() => {
                        this.addScoreChangeTurn(this.score3or4k('Four-of-a-Kind', 4, this.combinePlayerDice));
                        }}>Four of a Kind</div>
                    <div className="scores"id="Full-House" onClick={() => {
                        this.addScoreChangeTurn(this.scoreFullHouse(this.combinePlayerDice));
                        }}>Full House</div>
                    <div className="scores"id="Small-Straight" onClick={() => {
                        this.addScoreChangeTurn(this.scoreSmStr(this.combinePlayerDice));
                        }}>Small Straight</div>
                    <div className="scores"id="Large-Straight" onClick={() => {
                        this.addScoreChangeTurn(this.scoreLgStr(this.combinePlayerDice));
                        }}>Large Straight</div>
                    <div className="scores"id="Yahtzee" onClick={() => {
                        this.addScoreChangeTurn(this.scoreYahtzee(this.combinePlayerDice));
                        }}>Yahtzee</div>
                    <div className="scores"id="Chance" onClick={() => {
                        this.addScoreChangeTurn(this.scoreChance(this.combinePlayerDice));
                        }}>Chance</div>
                </div>
            </div>
        )
    }
}




export default connect(
  (state) => {
    return {
        playerKeepArr: state.playerKeepArr,
        diceRollArr: state.diceRollArr,
        playerScores: state.playerScores,
        turn: state.turn
    };
  }, 
  (dispatch) => {
      return {
          addPlayerScore: function(scoreArr) {
              dispatch(addPlayerScore(scoreArr));
          },
          changeTurn: function(turn) {
              dispatch(changeTurn(turn));
          },
          resetRollNum: function() {
              dispatch(resetRollNum());
          },
          fireBool: function() {
              dispatch(fireBool());
          }
      };
  }
)(PlayerScoreboard)