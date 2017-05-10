import { combineReducers } from 'redux'

const initialState = {
  playerKeepArr: [],
  computerKeepArr: [],
  diceRollArr: [],
  turn: 'player',
  rollNum: 1,
  fire: false,
  playerScores: { 
    length: 0,
    One: null,
    Two: null,
    Three: null,
    Four: null,
    Five: null,
    Six: null,
    'Three-of-a-Kind': null,
    'Four-of-a-Kind': null,
    'Full-House': null,
    'Small-Straight': null,
    'Large-Straight': null,
    'Yahtzee': null,
    'Chance': null
   },
  computerScores: { 
    length: 0,
    One: null,
    Two: null,
    Three: null,
    Four: null,
    Five: null,
    Six: null,
    'Three-of-a-Kind': null,
    'Four-of-a-Kind': null,
    'Full-House': null,
    'Small-Straight': null,
    'Large-Straight': null,
    'Yahtzee': null,
    'Chance': null
   }
}


const rootReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {

    case 'UPDATE_PLAYER_KEEP':
      newState.playerKeepArr = action.playerKeepArr
      break;

    case 'UPDATE_COMPUTER_KEEP':
      newState.computerKeepArr = action.computerKeepArr
      break;

    case 'UPDATE_DICE_ROLL':
      newState.diceRollArr = action.diceRollArr
      break;

    case 'ADD_PLAYER_SCORE':
      if (newState.playerScores[action.scoreType] === null) {
        newState.playerScores.length++;
        newState.playerScores[action.scoreType] = action.score;
      }
      break;

    case 'ADD_COMPUTER_SCORE':
      if (!newState.computerScores[action.scoreType] === null) {
        newState.computerScores.length++;
        newState.computerScores[action.scoreType] = action.score;
      }
      break;

    case 'CHANGE_TURN':
      newState.turn = action.turn;
      break;

    case 'RESET_ROLL_NUM':
      newState.rollNum = 1;
      break;

    case 'UPDATE_ROLL_NUM':
      newState.rollNum++;
      break;

    case 'FIRE_BOOL': 
      newState.fire = !newState.fire;
      break;

    default: return state;

  }
  return newState
}



export const updatePlayerKeep = (playerKeepArr) => {
  return {
    type: 'UPDATE_PLAYER_KEEP',
    playerKeepArr
  }
}

export const updateComputerKeep = (computerKeepArr) => {
  return {
    type: 'UPDATE_COMPUTER_KEEP',
    computerKeepArr
  }
}

 export const updateDiceRoll = (diceRollArr) => {
  return {
    type: 'UPDATE_DICE_ROLL',
    diceRollArr
  }
}

export const addPlayerScore = (scoreArr) => {
    return {
      type: 'ADD_PLAYER_SCORE',
      scoreType: scoreArr[0],
      score: scoreArr[1]
    }
}

export const addComputerScore = (scoreArr) => {
  return {
      type: 'ADD_COMPUTER_SCORE',
      scoreType: scoreArr[0],
      score: scoreArr[1]
    }
}

export const changeTurn = (turn) => {
  return {
    type: 'CHANGE_TURN',
    turn
  }
}

export const resetRollNum = () => {
  return {
    type: 'RESET_ROLL_NUM',
    rollNum: 1
  }
}

export const updateRollNum = () => {
  return {
    type: 'UPDATE_ROLL_NUM'
  }
}

export const fireBool = () => {
  return {
    type: 'FIRE_BOOL'
  }
}


export default rootReducer