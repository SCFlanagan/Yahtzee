var compTypes = [];
var compTopScore = 0;
var compBottomScore = 0;
var compCount = 1;
var options = ["1", "2", "3", "yahtzee", "lgstr", "4k", "smstr", "fullhouse", "3k", "4", "5", "6"];


//ROLL
// Returns an array of a certain number of randomly rolled die.
// function roll(numDice) {
// 	var arr = [];
// 	for (var i = 0; i < numDice; i++) {
// 		var die = Math.ceil(Math.random() * 6);
// 		arr.push(die);
// 	}
// 	var clone = arr.slice();
// 	var string = clone.join(", ");
// 	return arr;
// }

//CHECK FOR ACHIEVEMENTS
// Returns true if an array of dice is a yahtzee.
function isYahtzee(arr) {
	for (var i = 0; i < 4; i++) {
		if (arr[i] !== arr[i+1]) {
			return false;
		}
	}
	return true;
}

// Returns true if an array of dice is a large straight.
function isLgStr(arr) {
	arr = arr.sort();
	for (var i = 0; i < 4; i++) {
		if (arr[i+1] - arr[i] !== 1) {
			return false;
		}
	}
	return true;
}

// Returns true if an array of dice contains a small straight.
function isSmStr(arr) {
	if (isLgStr(arr) === true) { return true; }
	var newArr = [];
	arr = arr.sort();
	var clone = arr.slice();
	for (var i = 0; i < arr.length; i++) {
		if (i === arr.indexOf(arr[i])) {
			newArr.push(arr[i]);
		}
	}
	if (newArr.length === 5) {
		if (clone[1] - 2 === clone[0]) {
			clone.shift();
		} else if (clone[clone.length-1] - clone[clone.length-2] === 2) {
			clone.pop();
		} else {
			return false;
		}
		for (var k = 0; k < clone.length-1; k++) {
			if (clone[k+1] - clone[k] !== 1) {
				return false;
			}
		}
	} else if (newArr.length === 4) {
		for (var j = 0; j < newArr.length-1; j++) {
			if (newArr[j+1] - newArr[j] !== 1) {
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

// Returns true if an array of dice is a full house.
function isFullHouse(arr) {
	let newArr = countDice(arr);
	if (newArr.length === 2) {
		if (newArr[0][0] === "2" || newArr[0][0] === "3") {
			if (newArr[1][0] === "2" || newArr[1][0] === "3") {
				return true;
			}
		}
	} else {
		return false;
	}
}

// Returns true if an array of dice is a four of a kind.
function is4k(arr) {
  if (isYahtzee(arr)) return true;
	var newArr = countDice(arr);
	for (var i = 0; i < newArr.length; i++) {
		if (newArr[i][0] === "4") {
			return true;
		}
	}
	return false;
}

// Returns true if an array of dice is three of a kind.
function is3k(arr) {
  if (isYahtzee(arr)) return true;
  if (is4k(arr)) return true;
	var newArr = countDice(arr);
	for (var i = 0; i < newArr.length; i++) {
		if (newArr[i][0] === "3") {
			return true;
		}
	}
	return false;	
}

//ANALAYZE
// Checks the compTypes array to see if the computer already has that category filled.
function alreadyHaveComp(type) {
  for (var i = 0; i < compTypes.length; i++) {
    if (type === compTypes[i]) {
      return true;
    }
  }
  return false;
}

// Returns an array of elements indicating how many die feature each number, beginning with the highest and most frequent number and descending by quantity and then value.
function countDice(arr) {
	var newArr = [];
	var item = "";
	var ticker = 1;
	arr.sort();
	for (var i = arr.length-1; i >= 0; i--) {
		item = "";
		ticker = 1;
		if (i === arr.lastIndexOf(arr[i])) {
			for (var j = i-1; j >= 0; j--) {
				if (arr[i] === arr[j]) {
					ticker++;
				}
			}
			item += ticker + " " + arr[i];
		}
		if (item !== "") {
			newArr.push(item);
		}
	}	
	return newArr.sort(function(a,b) { return Number(b[0]) - Number(a[0]);});
}

// Sums all the elements in an array.
function sumArray(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Takes an array and returns a new array without duplicates.
function noRepArr(arr) {
	var noRepeats = [];
	arr.sort();
	for (var i = 0; i < arr.length; i++) {
		if (i === arr.indexOf(arr[i])) {
			noRepeats.push(arr[i]);
		}
	}
	return noRepeats;
}


export const choose = (arr) => {
  let score = 0;
  let countedDice = countDice(arr);
  let bonus = false;
  let title;

  console.log('compTypes: ', compTypes);
  
  // Check for yahtzee. 
  if (isYahtzee(arr) === true) {
    if (alreadyHaveComp("yahtzee") === true) {
      bonus = true;
      console.log("Computer got a bonus yahtzee for 100 points.");
    } else if (alreadyHaveComp("yahtzee") === false) {
      compTypes.push("yahtzee");
      console.log("Computer got yahtzee for 50 points.");
      return ['CYahtzee', 50, bonus];
    }
  }
  if (isLgStr(arr) === true) {
    if (alreadyHaveComp("lgstr") === false) {
      compTypes.push("lgstr");
      console.log("Computer got a large straight for 40 points.");
      return ['CLarge-Straight', 40, bonus];
    }
  } else {
    if (isSmStr(arr) === true) {
      if (!alreadyHaveComp("smstr")) {
        compTypes.push("smstr");
        console.log("Computer got a small straight for 30 points.");
        return ['CSmall-Straight', 30, bonus];
      }
    }
  }
  if (isFullHouse(arr) === true) {
    console.log('its a full house in choose')
    if (!alreadyHaveComp("fullhouse")) {
      console.log('you do not have a full house')
      compTypes.push("fullhouse");
      console.log("Computer got a full house for 25 points.");
      return ['CFull-House', 25, bonus];
    }
  }
  if (is4k(arr) || is3k(arr)) {
    let type;
    if (is4k(arr) && !alreadyHaveComp('4k')) type = 4;
    else type = 3;
    let name = type + 'k';
    let outcome;
    let value = Number(countedDice[0][2]);
    if (!alreadyHaveComp(name)) {
      if (value > 3) {
        console.log('value in 3k/4k: ', value)
        if (!alreadyHaveComp(value.toString())) {
          outcome = 'value';
        } else {
          if (!alreadyHaveComp(name)) {
            outcome = 'kind';
          }
        }
      } else {
        if (!alreadyHaveComp(name)) {
          outcome = 'kind';
        }
      }
    } else {
      if (!alreadyHaveComp(value.toString())) {
        outcome = 'value';
      }
    }
    if (outcome === 'value') {
      let number = +countedDice[0][0];
      let val = +countedDice[0][2];
      score += (number * val);
      title = changeToId('' + value);
      compTypes.push(value.toString());
      console.log("Computer got a " + value + " for " + score + " points.");
      console.log('a:', value.toString())
      return [title, score, bonus];
    } else if (outcome === 'kind') {
      score += sumArray(arr);
      compTypes.push(name);
      console.log("Computer got a " + name + " for " + score + " points.");
      if (type === 4) {
        return ['CFour-of-a-Kind', score, bonus];
      } else if (type === 3) {
        return ['CThree-of-a-Kind', score, bonus];
      }
    }
  }
  if (!alreadyHaveComp('chance') && sumArray(arr) > 20) {
    score += sumArray(arr);
    compTypes.push('chance');
    console.log('Computer took a chance for ' + score + ' points.');
    return ['CChance', score, bonus];
  }
  // Find best spot out of 1-3. Find how much you would get and compare it to the total you could get, then compare to each other.
  let scores = {};
  let index;
  let combined = countedDice.join('/') + '/';;
  let sum;
  let mostPossible;
  for (let i = 1; i < 4; i++) {
    if (!alreadyHaveComp(i.toString())) {
      index = combined.indexOf(i+ '/');
      sum = Number(combined[index-2]) * i;
      mostPossible = i * 6;
      scores[i] = sum / mostPossible;
    }
  }
  // loop through object, if the value is a number and it is bigger than the number you start with switch them. return value.
  let ratio;
  let category;
  for (let key in scores) {
    if (!ratio) {
      ratio = scores[key];
      category = key;
    } 
    if (!isNaN(scores[key])) {
      if (scores[key] > ratio) {
        ratio = scores[key];
        category = key;
      }
    }
  }
  if (ratio) {
    let indexTwo = combined.indexOf(category + '/');
    let amount = combined[indexTwo-2];
    score += amount * Number(category);
    title = changeToId(category);
    compTypes.push(category.toString());
    console.log("Computer got a " + category + " for " + score + " points.");
    return [title, score, bonus];
  }
  // Chance
  if (!alreadyHaveComp('chance')) {
    score += sumArray(arr);
    compTypes.push('chance');
    console.log('Computer took a chance for ' + score + ' points.');
    return ['CChance', score, bonus];
  }
  const remaining = [1, 2, 3, 4, 5, 6, 'yahtzee', 'lgstr', '4k', 'smstr', '3k', 4, 5, 6];
  for (let j = 0; j < remaining.length; j++) {
    let x = remaining[j];
    console.log('x: ', x)
    if (j === 3 || j === 4 || j === 5) {
      if (!alreadyHaveComp(x.toString())) {
        let indexTwo = combined.indexOf(x + '/');
        let amount = combined[indexTwo-2];
        let thisScore = amount * Number(x);
        if (thisScore) {
          title = changeToId(x.toString());
          console.log("Computer got a " + x + " for " + score + " points.");
          return [title, score, bonus];
        }
      }
    } else if (!alreadyHaveComp(x.toString())) {
      title = changeToId(x.toString());
      compTypes.push(x.toString());
      console.log('Computer took a zero for ' + x);
      return [title, 0, bonus];
    }
  }
}

const changeToId = (name) => {
  switch (name) {
    case '1': 
      return 'COne';
    case '2':
      return 'CTwo';
    case '3':
      return 'CThree';
    case '4': 
      return 'CFour';
    case '5': 
      return 'CFive';
    case '6': 
      return 'CSix';
    case 'yahtzee':
      return 'CYahtzee';
    case 'lgstr':
      return 'CLarge-Straight';
    case 'fullhouse':
      return 'CFull-House';
    case 'smstr':
      return 'CSmall-Straight';
    case '4k':
      return 'CFour-of-a-Kind';
    case '3k':
      return 'CThree-of-a-Kind';
    default: 
      return name;
  }
}


// Takes an array and checks if the array fulfills yahtzee, large straight, small straight (if you already have a large), or a full house. If it doesn't it returns "none", otherwise it returns the category.
export const analyze = (arr) => {
  if (isYahtzee(arr)) {
    return "yahtzee";
  }
  if (isLgStr(arr)) {
    if (!alreadyHaveComp("lgstr")) {
      return "lgstr";
    }
  }
  if (isSmStr(arr) && alreadyHaveComp("lgstr")) {
    if (!alreadyHaveComp("smstr")) {
      return "smstr";
    }
  }
  if (isFullHouse(arr)) {
    if (!alreadyHaveComp("fullhouse")) {
      return "fullhouse";
    }
  }
  return "none";
}

// FIND
// Takes an array of dice and returns an array with how many dice to roll and an inner array of which dice to keep to go for a yahtzee. COULD BE OPTIMIZED by going for certain numbers (ones you don't already have).
function forYahtzee(arr) {
  var counted = countDice(arr);
  var string = counted[0];
  if (counted[0][0] === counted[1][0]) {
    if (alreadyHaveComp(counted[0]) === false) {
      string = counted[0];
    } else {
      string = counted[1];
    }
  }
  var numToKeep = Number(string[0]);
  var reroll = 5 - numToKeep
  var keep = [];
  var final = [];
  for (var i = 0; i < numToKeep; i++) {
    keep.push(Number(string[2]));
  }
  final.push(reroll);
  final.push(keep);
  return final;
}


// Takes an array of dice and returns an array with how many dice to reroll and an inner array of which dice to keep to go for a large straight.
// COULD BE OPTIMIZED by considering which large straight has a greater chance of getting a small straight, if you fail.
function forLgStr(arr) {
  var noRep = noRepArr(arr);
  var reroll = 0;
  var firstKeep = [];
  var secondKeep = [];
  var keep = [];
  var final = [];
  for (var i = 1; i < 6; i++) {
    for (var j = 0; j < noRep.length; j++) {
      if (i === noRep[j]) {
        firstKeep.push(i);
      }
    }
  }
  for (var k = 2; k < 7; k++) {
    for (var l = 0; l < noRep.length; l++) {
      if (k === noRep[l]) {
        secondKeep.push(k);
      }
    }
  }
  if (secondKeep >= firstKeep) {
    keep = secondKeep;
  } else {
    keep = firstKeep;
  }
  reroll = 5 - keep.length;
  final.push(reroll);
  final.push(keep);
  return final;
}

// Takes an array of dice and returns an array with how many dice to reroll and an inner array of which dice to keep to go for a small straight.
// COULD BE OPTIMIZED?
function forSmStr(arr) {
  var noRep = noRepArr(arr);
  var reroll = 0;
  var firstKeep = [];
  var secondKeep = [];
  var thirdKeep = [];
  var keep = [];
  var final = [];
  for (var i = 1; i < 5; i++) {
    for (var j = 0; j < noRep.length; j++) {
      if (i === noRep[j]) {
        firstKeep.push(i);
      }
    }
  }
  for (var k = 2; k < 6; k++) {
    for (var l = 0; l < noRep.length; l++) {
      if (k === noRep[l]) {
        secondKeep.push(k);
      }
    }
  }
  for (var m = 3; m < 7; m++) {
    for (var n = 0; n < noRep.length; n++) {
      if (m === noRep[n]) {
        thirdKeep.push(m);
      }
    }
  }
  if (secondKeep >= firstKeep && secondKeep >= thirdKeep) {
    keep = secondKeep;
  } else if (thirdKeep >= firstKeep && thirdKeep >= secondKeep) {
    keep = thirdKeep;
  } else {
    keep = firstKeep;
  }
  reroll = 5 - keep.length;
  final.push(reroll);
  final.push(keep);
  return final;
}

// Takes an array of dice and returns an array with how many dice to reroll and an inner array of which dice to keep to go for a full house.
function forFullHouse(arr) {
  var counted = countDice(arr);
  var keep = [];
  var reroll = 0;
  var final = [];
  if (Number(counted[0][0]) > 2) {
    for (var i = 0; i < 3; i++) {
      keep.push(Number(counted[0][2]));
    }
  } else {
    for (var j = 0; j < Number(counted[0][0]); j++) {
      keep.push(Number(counted[0][2]));
    }
  }
  if (keep.length < 5) {
    if (Number(counted[1][0]) === 2) {
      for (var k = 0; k < 2; k++) {
        keep.push(Number(counted[1][2]));
      }
    } else {
      keep.push(Number(counted[1][2]));
    }
  }
  reroll = 5 - keep.length;
  final.push(reroll);
  final.push(keep);
  return final;
}

// // Takes an array of dice and chooses which to keep and which to roll (i.e. finds the best course of action). Returns an array: [# to reroll, [dice to keep]]
// //COULD BE OPTIMIZED, take into account all compTypes, use better stategy
// // Change so it doesn't return the first part of the array, just dice to keep.
// export const find = (arr) => {
//   var y = forYahtzee(arr);
//   var fh = forFullHouse(arr); 
//   var str = [];
//   if (alreadyHaveComp("lgstr") === false) {
//     str = forLgStr(arr);
//   } else {
//     str = forSmStr(arr);
//   }
//   if (fh[0] === 1 && fh[0] < y[0]) {
//     return fh[1];
//   } else if (str[0] === 1 && str[0] < y[0]) {
//     return str[1];
//   } else {
//     return y[1];
//   }
// }

export const find = (arr) => {
  const sorted = noRepArr(arr.sort());
  const countedDice = countDice(arr);
  console.log('counted: ', countedDice);
  const combined = countedDice.join('/') + '/';
  console.log('combined: ', combined);
  
  // FIRST ROLL
  // if you have a pair or more of 4-6
  // start at 6 and loop to 4, is the i or 3k or 4k open?
    // If so, go for that one
  let threeOrFour = false;
  let keepArr = [];
  if (+combined[0] > 2 && +combined[2] > 3) {
    if (!alreadyHaveComp('3k') || !alreadyHaveComp('4k')) {
      threeOrFour = true
    }
    for (let i = 2; i < combined.length; i+=4) {
      if (+combined[i] > 3) {
        if (!alreadyHaveComp(combined[i]) || threeOrFour === true) {
          for (let n = 0; n < +combined[i-2]; n++) {
            keepArr.push(+combined[i]);
          }
          break;
        }
      }
    }
    console.log('keepArr: ', keepArr)
    return keepArr;
  }
  // if you have 3 consecutive numbers
    // if you don't have a large or small straight, go for that.  
  let sequence = 1;
  keepArr = [];
  for (let j = 0; j < sorted.length; j++) {
    if (sorted[j+1] - sorted[j] === 1) {
      sequence++;
    } else {
      sequence = 1;
    }
    console.log('sequence: ', sequence)
    console.log(sorted[j])
    keepArr = [sorted[j-1]];
    if (sequence === 3) {
      for (let k = j-1; k < sorted.length; k++) {
        if (sorted[k+1] - sorted[k] === 1) {
          keepArr.push(sorted[k+1]);
        } else {
          break;
        }
      }
      if (!alreadyHaveComp('smstr') || !alreadyHaveComp('lgstr')) {
        console.log('keepArr: ', keepArr)
        return keepArr;
      }
    }
  }
  // take the number with the most that you dont have yet
  keepArr = [];
  for (let l = 2; l < combined.length; l+=4) {
    if (!alreadyHaveComp(combined[l])) {
      for (let m = 0; m < combined[l-2]; m++) {
        keepArr.push(+combined[l]);
      }
      break;
    }
  }
  console.log('keepArr: ', keepArr)
  return keepArr;
}






// Completes one computer turn.
// function computer(numToRoll, keepArr, diceArr, rollNum) {
//   var analysis;
//   var final;
// //   var diceRoll = roll(numToRoll);
// //   if (numToRoll < 5) {
// //     for (var i = 0; i < diceToKeepArr.length; i++) {
// //       diceRoll.push(diceToKeepArr[i]);
// //     }
// //   }
// //   if (rollNum === 3) {
// //       return choose(keepArr.concat(diceArr));
// //   }
// //   console.log("Computer rolled " + diceRoll + ".");
// //   if (compCount === 3) {
// //     return choose(diceRoll);
// //   }
//   analysis = analyze(diceRoll);
//   if (analysis !== "none") {
//     return [true, analysis];
//   }
//   final = find(diceRoll);
// }

// Plays through a full 13 turns (one entire game) for the computer.
function game() {
  compTypes = [];
  compTopScore = 0;
  compBottomScore = 0;
  var finalScore = 0;
  for (var i = 0; i < 13; i++) {
    compCount = 1;
    //computer(5, []);
  }
  if (compTopScore >= 63) {
    compTopScore += 35;
  }
  finalScore = compTopScore + compBottomScore;
  //console.log("Computer's final score is " + finalScore);
  return finalScore;
}













var diego = [];
function stats() {
  var temp = 0;
  for (var i = 0; i < 50; i++) {
    temp = game();
    diego.push(temp);
  }
  var average = sumArray(diego) / 50;
  console.log("Average: " + average);
  diego.sort(function(a,b){return a-b;});
  console.log("Highest: " + diego[diego.length-1]);
  console.log("Lowest: " + diego[0]);
}








