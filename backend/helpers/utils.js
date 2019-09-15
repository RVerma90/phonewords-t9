const phoneKeyMap = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
};

const generateWords = (numbers) => {

  // map numbers which is a string to phoneKeyMap
  // i.e if number is '2' it will map to ['a', 'b', 'c']
  const numberString = numbers.split('').map(key => phoneKeyMap[key]);

  let words = [];

  // retrieve all combinations of keys based on numbers
  let allPossibleWords = generateWordsCombinations(numberString);

  words = allPossibleWords;

  return words;
}

const generateWordsCombinations = (keys) => {
  
  if (keys.length == 0) {
    return []; 
  } else if (keys.length == 1) {
    return keys[0];
  }

  const firstKey = keys[0];
  const secondKey = keys[1];
  
  console.log('dude1',keys[0]);
  console.log('dude2',keys[1]);


  let result = [];

  // Iterate over firstKey and secondKey in permutations and push each combination to result array
  for (let i = 0; i <= firstKey.length - 1; i++) {
    for (let j = 0; j <= secondKey.length - 1; j++) {
      result.push( firstKey[i] + secondKey[j]);
    }
  }

  // Return all permutations of suggested 'words'
  return generateWordsCombinations([result, ...keys.slice(2)])

}

module.exports = generateWords;