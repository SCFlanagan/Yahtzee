var compTypes = [];
var compTopScore = 0;
var compBottomScore = 0;
var compCount = 1;
var options = ["1", "2", "3", "yahtzee", "lgstr", "4k", "smstr", "fullhouse", "3k", "4", "5", "6"];

//ROLL
// Returns an array of a certain number of randomly rolled die.
function roll(numDice) {
	var arr = [];
	for (var i = 0; i < numDice; i++) {
		var die = Math.ceil(Math.random() * 6);
		arr.push(die);
	}
	var clone = arr.slice();
	var string = clone.join(", ");
	return arr;
}

// //CHECK FOR ACHIEVEMENTS
// // Returns true if an array of dice is a yahtzee.
// function isYahtzee(arr) {
// 	for (var i = 0; i < 4; i++) {
// 		if (arr[i] !== arr[i+1]) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// // Returns true if an array of dice is a large straight.
// function isLgStr(arr) {
// 	arr = arr.sort();
// 	for (var i = 0; i < 4; i++) {
// 		if (arr[i+1] - arr[i] !== 1) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// // Returns true if an array of dice contains a small straight.
// function isSmStr(arr) {
// 	if (isLgStr(arr) === true) { return true; }
// 	var newArr = [];
// 	arr = arr.sort();
// 	var clone = arr.slice();
// 	for (var i = 0; i < arr.length; i++) {
// 		if (i === arr.indexOf(arr[i])) {
// 			newArr.push(arr[i]);
// 		}
// 	}
// 	if (newArr.length === 5) {
// 		if (clone[1] - 2 === clone[0]) {
// 			clone.shift();
// 		} else if (clone[clone.length-1] - clone[clone.length-2] === 2) {
// 			clone.pop();
// 		} else {
// 			return false;
// 		}
// 		for (var k = 0; k < clone.length-1; k++) {
// 			if (clone[k+1] - clone[k] !== 1) {
// 				return false;
// 			}
// 		}
// 	} else if (newArr.length === 4) {
// 		for (var j = 0; j < newArr.length-1; j++) {
// 			if (newArr[j+1] - newArr[j] !== 1) {
// 				return false;
// 			}
// 		}
// 	} else {
// 		return false;
// 	}
// 	return true;
// }

// // Returns true if an array of dice is a full house.
// function isFullHouse(arr) {
// 	newArr = countDice(arr);
// 	if (newArr.length === 2) {
// 		if (newArr[0][0] === "2" || newArr[0][0] === "3") {
// 			if (newArr[1][0] === "2" || newArr[1][0] === "3") {
// 				return true;
// 			}
// 		}
// 	} else {
// 		return false;
// 	}
// }

// // Returns true if an array of dice is a four of a kind.
// function is4k(arr) {
// 	var newArr = countDice(arr);
// 	for (var i = 0; i < newArr.length; i++) {
// 		if (newArr[i][0] === "4") {
// 			return true;
// 		}
// 	}
// 	return false;
// }

// // Returns true if an array of dice is three of a kind.
// function is3k(arr) {
// 	var newArr = countDice(arr);
// 	for (var i = 0; i < newArr.length; i++) {
// 		if (newArr[i][0] === "3") {
// 			return true;
// 		}
// 	}
// 	return false;	
// }

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




// REWRITE THESE
// Takes an array and chooses the best option to take for a score. Is used on the last roll or when you get a bonus yahtzee. Returns nothing but adds to compTypes array and the score.  COULD BE OPTIMIZED
function choose(arr) {
  var score = sumArray(arr);
  var counted = countDice(arr);
  var item = "";
  if (isYahtzee(arr) === true) {
    if (alreadyHaveComp("yahtzee") === true) {
      compBottomScore += 100;
      console.log("Computer got a bonus yahtzee for 100 points.");
    } else if (alreadyHaveComp("yahtzee") === false) {
      compTypes.push("yahtzee");
      compBottomScore += 50;
      console.log("Computer got yahtzee for 50 points.");
      return;
    }
  }
  if (isLgStr(arr) === true) {
    if (alreadyHaveComp("lgstr") === false) {
      compTypes.push("lgstr");
      compBottomScore += 40;
      console.log("Computer got a large straight for 40 points.");
      return;
    }
  }
  if (isSmStr(arr) === true) {
    if (alreadyHaveComp("smstr") === false) {
      compTypes.push("smstr");
      compBottomScore += 30;
      console.log("Computer got a small straight for 30 points.");
      return;
    }
  }
  if (isFullHouse(arr) === true) {
    if (alreadyHaveComp("fullhouse") === false) {
      compTypes.push("fullhouse");
      compBottomScore += 25;
      console.log("Computer got a full house for 25 points.");
      return;
    }
  }
  if (is4k(arr) === true) {
    if (Number(counted[0][0]) > 3) {
      if (alreadyHaveComp(counted[0][2]) === false) {
        compTypes.push(counted[0][2]);
        score = Number(counted[0][0]) * Number(counted[0][2]);
        compTopScore += score;
        console.log("Computer got " + score + " points for " + counted[0][2] + "s.");
        return;
      }
    }
    if (alreadyHaveComp("4k") === false) {
      compTypes.push("4k");
      compBottomScore += score;
      console.log("Computer got a four of a kind for " + score + " points.");
      return;
    }
  }
  if (is3k(arr) === true) {
    if (Number(counted[0][2]) > 3) {
      if (alreadyHaveComp(counted[0][2]) === false) {
        compTypes.push(counted[0][2]);
        score = Number(counted[0][0]) * Number(counted[0][2]);
        compTopScore += score;
        console.log("Computer got " + score + " points for " + counted[0][2] + "s.");
        return;
      }
    }
    if (alreadyHaveComp("3k") === false) {
      compTypes.push("3k");
      compBottomScore += score;
      console.log("Computer got a three of a kind for " + score + " points.");
      return;
    }
  }
  // THIS COULD BE OPTIMIZED. Right now the function will choose whichever number has the highest repeats. But sometimes it's best to just take a one or zero as the score for ones than to take twelve as the score for sixes. 
  for (var i = 0; i < counted.length; i++) {
    item = counted[i]
    if (alreadyHaveComp(item[2]) === false) {
      if (item[2] < 3) {
        if (alreadyHaveComp("chance") === false) {
          score = sumArray(arr);
          compTypes.push("chance");
          compBottomScore += score;
          console.log("Computer took a chance with " + score + " points.");
          return;
        } else {
          for (var m = i+1; m < counted.length; m++) {
            if (counted[m][2] === "1") {
              if (alreadyHaveComp("1") === false) {
                score = 1 * Number(counted[m][0]);
                compTypes.push("1");
                compTopScore += score;
                console.log("Computer took " + score + " points for 1s.");
                return;
              }
            } else if (counted[m][2] === "2") {
              if (alreadyHaveComp("2") === false) {
                score = 2 * Number(counted[m][0]);
                compTypes.push("2");
                compTopScore += score;
                console.log("Computer took " + score + " points for 2s.");
                return;
              }
            } else if (counted[m][2] === "3") {
              if (alreadyHaveComp("3") === false) {
                score = 3 * Number(counted[m][0]);
                compTypes.push("3");
                compTopScore += score;
                console.log("Computer took " + score + " points for 3s.");
                return;
              }
            }
          }
        }
      }
      score = Number(item[0]) * Number(item[2])
      compTypes.push(item[2]);
      compTopScore += score;
      console.log("Computer got " + score + " points for " + item[2] + "s.");
      return;
    } 
  } 
  // THIS COULD BE OPTIMIZED. Chance could be used at better times, instead of as a catch all. Could be used when there is no good option for the top area (i.e. instead of taking 6 points for 6).
  if (alreadyHaveComp("chance") === false) {
    score = sumArray(arr);
    compTypes.push("chance");
    compBottomScore += score;
    console.log("Computer took a chance with " + score + " points.");
    return;
  }
  for (var j = 0; j < options.length; j++) {
    if (alreadyHaveComp(options[j]) === false) {
      if (options[j] === "yahtzee") {
        compTypes.push("0yahtzee");
      } else {
        compTypes.push(options[j]);
      }
      console.log("Computer took a zero for " + options[j]);
      return;
    }
  }
}

// Takes an array and checks if the array fulfills yahtzee, large straight, small straight (if you already have a large), or a full house. If it doesn't it returns "none", otherwise it returns the category.
function analyze(arr) {
  if (isYahtzee(arr) === true) {
    if (alreadyHaveComp("yahtzee") === false) {
      compTypes.push("yahtzee");
      compBottomScore += 50;
      console.log("Computer got a yahtzee for 50 points.")
      return;
    } else {
      choose(arr);
      return "yahtzee";
    }
  }
  if (isLgStr(arr) === true) {
    if (alreadyHaveComp("lgstr") === false) {
      compTypes.push("lgstr");
      compBottomScore += 40;
      console.log("Computer got a large straight for 40 points.");
      return "lgstr";
    }
  }
  if (isSmStr(arr) === true && alreadyHaveComp("lgstr") === true) {
    if (alreadyHaveComp("smstr") === false) {
      compTypes.push("smstr");
      compBottomScore += 30;
      console.log("Computer got a small straight for 30 points.");
      return "smstr";
    }
  }
  if (isFullHouse(arr) === true) {
    if (alreadyHaveComp("fullhouse") === false) {
      compTypes.push("fullhouse");
      compBottomScore += 25;
      console.log("Computer got a full house for 25 points.");
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

// Takes an array of dice and chooses which to keep and which to roll (i.e. finds the best course of action). Returns an array: [# to reroll, [dice to keep]]
//COULD BE OPTIMIZED, take into account all compTypes, use better stategy
function find(arr) {
  var y = forYahtzee(arr);
  var fh = forFullHouse(arr);  
  var str = [];
  if (alreadyHaveComp("lgstr") === false) {
    str = forLgStr(arr);
  } else {
    str = forSmStr(arr);
  }
  if (fh[0] === 1 && fh[0] < y[0]) {
    return fh;
  } else if (str[0] === 1 && str[0] < y[0]) {
    return str;
  } else {
    return y;
  }
}






// Completes one computer turn.
function computer(numRoll, diceToKeepArr) {
  var analysis;
  var final;
  var diceRoll = roll(numRoll);
  if (numRoll < 5) {
    for (var i = 0; i < diceToKeepArr.length; i++) {
      diceRoll.push(diceToKeepArr[i]);
    }
  }
  console.log("Computer rolled " + diceRoll + ".");
  if (compCount === 3) {
    return choose(diceRoll);
  }
  analysis = analyze(diceRoll);
  if (analysis !== "none") {
    return;
  }
  final = find(diceRoll);
  compCount++;
  computer(final[0], final[1]);
}

// Plays through a full 13 turns (one entire game) for the computer.
function game() {
  compTypes = [];
  compTopScore = 0;
  compBottomScore = 0;
  var finalScore = 0;
  for (var i = 0; i < 13; i++) {
    compCount = 1;
    computer(5, []);
  }
  if (compTopScore >= 63) {
    compTopScore += 35;
  }
  finalScore = compTopScore + compBottomScore;
  console.log("Computer's final score is " + finalScore);
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

stats();






