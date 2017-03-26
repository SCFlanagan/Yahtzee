import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ScoreFunction from './ScoreFunctions';
import { addPlayerScore } from '../reducers/index';

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
    }

    combinePlayerDice() {
        const all = this.props.playerKeepArr.concat(this.props.diceRollArr);
        return all;
    }

    render() {
        return (
            <div>
                <div className="top-score scoreboard-buttons">
                    <div id="One" className="scores" onClick={() => {
                        const scoreArr = this.addOneThroughSix(1, 'One', this.combinePlayerDice)
                        this.props.addPlayerScore(scoreArr);
                        }}>One</div>
                    <div id="Two" className="scores" onClick={() => {
                        const scoreArr = this.addOneThroughSix(2, 'Two', this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Two</div>
                    <div id="Three" className="scores" onClick={() => {
                        const scoreArr = this.addOneThroughSix(3, 'Three', this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Three</div>
                    <div id="Four" className="scores" onClick={() => {
                        const scoreArr = this.addOneThroughSix(4, 'Four', this.combinePlayerDice)
                        this.props.addPlayerScore(scoreArr);
                        }}>Four</div>
                    <div id="Five" className="scores" onClick={() => {
                        const scoreArr = this.addOneThroughSix(5, 'Five', this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Five</div>
                    <div id="Six" className="scores" onClick={() => {
                        const scoreArr = this.addOneThroughSix(6, 'Six', this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Six</div>
                </div>
                <div className="bottom-score scoreboard-buttons">
                    <div className="scores"id="Three-of-a-Kind" onClick={() => {
                        const scoreArr = this.score3or4k('Three-of-a-Kind', 3, this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Three of a Kind</div>
                    <div className="scores"id="Four-of-a-Kind" onClick={() => {
                        const scoreArr = this.score3or4k('Four-of-a-Kind', 4, this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Four of a Kind</div>
                    <div className="scores"id="Full-House" onClick={() => {
                        const scoreArr = this.scoreFullHouse(this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Full House</div>
                    <div className="scores"id="Small-Straight" onClick={() => {
                        const scoreArr = this.scoreSmStr(this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Small Straight</div>
                    <div className="scores"id="Large-Straight" onClick={() => {
                        const scoreArr = this.scoreLgStr(this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Large Straight</div>
                    <div className="scores"id="Yahtzee" onClick={() => {
                        const scoreArr = this.scoreYahtzee(this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
                        }}>Yahtzee</div>
                    <div className="scores"id="Chance" onClick={() => {
                        const scoreArr = this.scoreChance(this.combinePlayerDice);
                        this.props.addPlayerScore(scoreArr);
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
        computerScores: state.computerScores
    };
  }, 
  (dispatch) => {
      return {
          addPlayerScore: function(scoreArr) {
              dispatch(addPlayerScore(scoreArr));
          }
        //   updateDiceRoll: function(s) {
        //       dispatch(updateDiceRoll(diceRollArr));
        //   }
      };
  }
)(PlayerScoreboard)