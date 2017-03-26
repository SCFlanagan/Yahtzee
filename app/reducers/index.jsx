import { combineReducers } from 'redux'

const initialState = {
  playerKeepArr: [],
  diceRollArr: [],
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
  computerScores: { length: 0 }
}


const rootReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {

    case 'UPDATE_PLAYER_KEEP':
      newState.playerKeepArr = action.playerKeepArr
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

    default: return state;

  }
  console.log(newState.playerScores);
  return newState
}



export const updatePlayerKeep = (playerKeepArr) => {
  return {
    type: 'UPDATE_PLAYER_KEEP',
    playerKeepArr
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



export default rootReducer