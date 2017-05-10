import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ScoreFunction from './ScoreFunctions';
import { addComputerScore } from '../reducers/index';

class ComputerScoreboard extends Component {
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
                    <div id="COne" className="scores">One</div>
                    <div id="CTwo" className="scores">Two</div>
                    <div id="CThree" className="scores">Three</div>
                    <div id="CFour" className="scores">Four</div>
                    <div id="CFive" className="scores">Five</div>
                    <div id="CSix" className="scores">Six</div>
                </div>
                <div className="bottom-score scoreboard-buttons">
                    <div className="scores"id="CThree-of-a-Kind">Three of a Kind</div>
                    <div className="scores"id="CFour-of-a-Kind">Four of a Kind</div>
                    <div className="scores"id="CFull-House">Full House</div>
                    <div className="scores"id="CSmall-Straight">Small Straight</div>
                    <div className="scores"id="CLarge-Straight">Large Straight</div>
                    <div className="scores"id="CYahtzee">Yahtzee</div>
                    <div className="scores"id="CChance" >Chance</div>
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
        computerScores: state.computerScores
    };
  }, 
  (dispatch) => {
      return {
        addComputerScore: function(scoreArr) {
            dispatch(addComputerScore(scoreArr));
        }
      };
  }
)(ComputerScoreboard)