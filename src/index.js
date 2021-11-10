export default function solution(input) {

  let inputCopy = [...input];

  let numberCounterOriginal = {
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
  };
  let requiredMemoryLocations = 0;
  let i = 0;


  while (inputCopy.length !== 0) {
    let numberCounter = { ...numberCounterOriginal };

    inputCopy.forEach((number, index) => {
      if (number[i] !== undefined) {
        numberCounter[number[i]].push(index);
      } else {
        inputCopy.splice(index, 1);
      }
    })

    Object.values(numberCounter).forEach(indexList => {
      if (indexList.length === 1) {
        requiredMemoryLocations += inputCopy[indexList[0]].length - i;

        inputCopy.splice(indexList[0], 1);
      } else if (indexList.length !== 0) {
        requiredMemoryLocations++;
      }
    })

    i++;
  }

  return requiredMemoryLocations;
}
