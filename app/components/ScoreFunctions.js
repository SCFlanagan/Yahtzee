export const deButton = (id, score)=> {
    const elem = document.getElementById(id);
    if (elem.value) {
        return false;
    }
    id = id.split('-').join(' ');
    elem.innerHTML = id + ': ' + score;
    elem.className = 'score-final';
    elem.value = 'filled';
    return true;
}

export const addOneThroughSix = (num, id, findAll) => {
    const dice = findAll();
    var score = 0;
    for (var i = 0; i < dice.length; i++) {
        if (dice[i] === num) {
            score += dice[i];
        }
    }
    const success = deButton(id, score);
    console.log('success: ', success)
    if (success) return [id, score]
    else return null;
}

export const sumArray = (arr) => {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    }
    return sum;
}

export const countDice = (all) => {
    all = all.sort(function(a,b) { return b-a;});
    var counted = [];
    var string = "";
    var ticker = 1;
    for (var i = 0; i < all.length; i++) {
        string = "";
        ticker = 1;
        for (var j = all.length-1; j >= i+1; j--) {
            if (all[i] === all[j]) {
                ticker++;
                all.splice(j, 1);
            }
        }
        string += ticker + " " + all[i];
        counted.push(string);
    }
    counted = counted.sort(function(a,b) { return Number(b[0]) - Number(a[0])});
    return counted;
}

export const score3or4k = (id, num, findAll) => {
    const all = findAll();
    console.log('******all: ', all)
    const score = sumArray(all);
    console.log('******score: ', score)
    const counted = countDice(all);
    if (Number(counted[0][0]) >= num) {
        deButton(id, score);
        console.log('******score: ', score)
        return [id, score];
    }
    // Make this a modal!!
    const title = id.split('-').join(' ');
    deButton(id, 0);
    return [id, score];
}

export const scoreFullHouse = (findAll) => {
    const all = findAll();
    const newArr = countDice(all);
    let answer = true;
    if (!all.length) {
        deButton('Full-House', 0);
        return ['Full-House', 0];
    }
    if (newArr[0][0] === "2" || newArr[0][0] === "3" || newArr[0][0] === "5") {
        if (newArr[1][0] === "2" || newArr[1][0] === "3" || newArr[0][0] === "5") {
            deButton('Full-House', 25);
            return ['Full-House', 25];
        }
    }
    deButton('Full-House', 0);
    return ['Full-House', 0];
}

export const scoreSmStr = (findAll) => {
    let newArr = [];
    let all = findAll();
    all = all.sort();
    let answer = true;
    if (scoreLgStr(findAll, true) === true) {
        deButton('Small-Straight', 30);
        return ['Small-Straight', 30];
    }
    let clone = all.slice();
    for (let i = 0; i < all.length; i++) {
        if (i === all.indexOf(all[i])) {
            newArr.push(all[i]);
        }
    }
    if (newArr.length === 5) {
        if (clone[1] - 2 === clone[0]) {
            clone.shift();
        } else if (clone[clone.length-1] - clone[clone.length-2] === 2) {
            clone.pop();
        } else {
            answer = false;
        }
        for (var k = 0; k < clone.length-1; k++) {
            if (clone[k+1] - clone[k] !== 1) {
                answer = false;
            }
        }
    } else if (newArr.length === 4) {
        for (var j = 0; j < newArr.length-1; j++) {
            if (newArr[j+1] - newArr[j] !== 1) {
                answer = false;
            }
        }
    } else {
        answer = false;
    }
    if (answer === false) {
        deButton('Small-Straight', 0);
        return ['Small-Straight', 0];
    } else {
        deButton('Small-Straight', 30);
        return ['Small-Straight', 30];
    }
}

export const scoreLgStr = (findAll, calledWithSmStr) => {
    let all = findAll();
    all = all.sort();
    let score;
    for (var i = 0; i < 4; i++) {
        if (all[i+1] - all[i] !== 1) {
            score = 0;
        }
    }
    if (calledWithSmStr === true) {
        return true;
    }
    if (score !== undefined) {
        deButton('Large-Straight', 0);
        return ['Large-Straight', 0];
    } else {
        deButton('Large-Straight', 40);
        return ['Large-Straight', 40];
    }
}

export const scoreYahtzee = (findAll) => {
    const all = findAll();
    for (var i = 0; i < 4; i++) {
        if (all[i] !== all[i+1]) {
            deButton('Yahtzee', 0);
            return ['Yahtzee', 0];
        }
    }
    // take into account if there already is a yahtzee!!
    deButton('Yahtzee', 50);
    return ['Yahtzee', 50];
}

export const scoreChance = (findAll) => {
    const all = findAll();
    const score = sumArray(all);
    deButton('Chance', score);
    return ['Chance', score];
}







// // Returns an array of elements indicating how many die feature each number, beginning with the highest and most frequent number and descending by quantity and then value. Each element of the array is the quantity, a space, then the number.
// const countDice = (all) => {
//   all = all.sort(function(a,b) { return b-a;});
//   var counted = [];
//   var string = "";
//   var ticker = 1;
//   for (var i = 0; i < all.length; i++) {
//     string = "";
//     ticker = 1;
//     for (var j = all.length-1; j >= i+1; j--) {
//       if (all[i] === all[j]) {
//         ticker++;
//         all.splice(j, 1);
//       }
//     }
//     string += ticker + " " + all[i];
//     counted.push(string);
//   }
//   counted = counted.sort(function(a,b) { return Number(b[0]) - Number(a[0])});
//   return counted;
// }

// // Sums all the elements in an array.
// const sumArray = (arr) => {
//   var sum = 0;
//   for (var i = 0; i < arr.length; i++) {
//     sum += Number(arr[i]);
//   }
//   return sum;
// }

// // Returns true if an array of dice is a yahtzee.
// const isYahtzee = (all) => {
//     for (var i = 0; i < 4; i++) {
//         if (all[i] !== all[i+1]) {
//             return false;
//         }
//     }
//     return true;
// };

// // Returns true if an array of dice is a large straight.
// const isLgStr = (all) => {
// 	all = all.sort();
// 	for (var i = 0; i < 4; i++) {
// 		if (all[i+1] - all[i] !== 1) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// // Returns true if an array of dice contains a small straight.
// const isSmStr = (all) => {
// 	if (isLgStr(all) === true) { return true; }
// 	var newArr = [];
// 	all = all.sort();
// 	var clone = all.slice();
// 	for (var i = 0; i < all.length; i++) {
// 		if (i === all.indexOf(all[i])) {
// 			newArr.push(all[i]);
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
// const isFullHouse = (all) => {
//   var newArr = countDice(all);
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
// function is4k(all) {
// 	var counted = countDice(all);
// 	for (var i = 0; i < counted.length; i++) {
// 		if (Number(counted[i][0]) >= 4) {
// 			return true;
// 		}
// 	}
// 	return false;
// }

// // Returns true if an array of dice is three of a kind.
// function is3k(all) {
// 	var counted = countDice(all);
// 	for (var i = 0; i < counted.length; i++) {
// 		if (Number(counted[i][0]) >= 3) {
// 			return true;
// 		}
// 	}
// 	return false;	
// }

// // Looks at the dice and adds the appropriate score for that category (one through six) to the top score.
// function topCategories(num, all) {
//   var score = 0;
//   var answer = "";
//   if (all.length < 1) { return; }
//   var ids = " abcdef";
//   var id = ids[num];
//   var dice = combineDice();
//   bonusYahtzees();
//   for (var j = 0; j < dice.length; j++) {
//     if (Number(dice[j]) === num) {
//       score += num;
//     }
//   }
//   if (score === 0) {
//     answer = prompt("You don't have any of this number. If you want to take a zero, type 'yes'.");
//       if (answer.toLowerCase() !== "yes") {
//         return;
//       }
//   }
//   document.getElementById(id).innerHTML += score;
//   topScore.push(score);
//   numCats++;
//   document.getElementById(id).onclick = nothing();
//   //endOfTurn();
// }

// // Adds up and displays final score.
// function totalScore() {
//   var top = sumArray(topScore);
//   finalScore = 0;
//   if (top >= 65) {
//     top += 35;
//   }
//   finalScore += sumArray(bottomScore) + top + bonus;
//   document.getElementById("total").innerHTML = finalScore;
// }

// // Finds the score for three of a kind, four of a kind, or yahtzee.
// function kind(num, id) {
//   var all = combineDice();
//   if (all.length < 1) { return; }
//   var score = 0;
//   var answer = "";
//   bonusYahtzees();
//   if (num === 3) {  
//     if (is3k() === true) {
//       score = sumArray(all);
//     } else {
//       answer = prompt("You don't have a three of a kind. If you want to take a zero, type 'yes'.");
//       if (answer.toLowerCase() !== "yes") {
//         return;
//       }
//     }
//   } else if (num === 4) {
//     if (is4k() === true) {
//       score = sumArray(all);
//     } else {
//       answer = prompt("You don't have a four of a kind. If you want to take a zero, type 'yes'.");
//       if (answer.toLowerCase() !== "yes") {
//         return;
//       }
//     }
//   } else if (num === 5) {
//     if (isYahtzee() === true) {
//       score = 50;
//       yahtzeeYN = "yes";
//     } else {
//       answer = prompt("You don't have a yahtzee. If you want to take a zero, type 'yes'.");
//       if (answer.toLowerCase() !== "yes") {
//         return;
//       }
//     }
//   }
//   bottomScore.push(score);
//   numCats++;
//   document.getElementById(id).onclick = nothing();
//   document.getElementById(id).innerHTML += score;
//   endOfTurn();
// }

// function other([func, num, cat, id]) {
//   var score = 0;
//   var answer = "";
//   var all = combineDice();
//   if (all.length < 1) { return; }  
//   bonusYahtzees();
//   if (func === true) {
//     score = num;
//   } else {
//     answer = prompt("You don't have a " + cat + ". If you want to take a zero, type 'yes'.");
//     if (answer.toLowerCase() !== "yes") {
//       return;
//     }
//   }
//   bottomScore.push(score);
//   document.getElementById(id).innerHTML += score;
//   numCats++;
//   document.getElementById(id).onclick = nothing();
//   endOfTurn();
// }

// function chance() {
//   var all = combineDice();
//   if (all.length < 1) { return; }
//   var score = sumArray(all);
//   bonusYahtzees();
//   document.getElementById("m").innerHTML += score;
//   numCats++;
//   document.getElementById("m").onclick = nothing();
//   bottomScore.push(score);
//   endOfTurn();
// }

// function bonusYahtzees() {
//   if (yahtzeeYN !== "yes") {
//     return;
//   } else {
//     if (isYahtzee() === true) {
//       bonus += 100;
//       document.getElementById("n").innerHTML += 100 + " ";
//     } else {
//       return;
//     }
//   }
// }
