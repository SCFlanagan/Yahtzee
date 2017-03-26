//CHECK FOR ACHIEVEMENTS
// Returns true if an array of dice is a yahtzee.
export const isYahtzee = (arr) => {
	for (var i = 0; i < 4; i++) {
		if (arr[i] !== arr[i+1]) {
			return false;
		}
	}
	return true;
}

// Returns true if an array of dice is a large straight.
export const isLgStr = (arr) => {
	arr = arr.sort();
	for (var i = 0; i < 4; i++) {
		if (arr[i+1] - arr[i] !== 1) {
			return false;
		}
	}
	return true;
}

// Returns true if an array of dice contains a small straight.
export const isSmStr = (arr) =>{
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
export const isFullHouse = (arr) => {
	newArr = countDice(arr);
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
export const is4k = (arr) => {
	var newArr = countDice(arr);
	for (var i = 0; i < newArr.length; i++) {
		if (newArr[i][0] === "4") {
			return true;
		}
	}
	return false;
}

// Returns true if an array of dice is three of a kind.
export const is3k = (arr) => {
	var newArr = countDice(arr);
	for (var i = 0; i < newArr.length; i++) {
		if (newArr[i][0] === "3") {
			return true;
		}
	}
	return false;	
}