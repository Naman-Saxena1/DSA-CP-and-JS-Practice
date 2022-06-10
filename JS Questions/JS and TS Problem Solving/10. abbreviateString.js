const abbreviateString = (inputString) => {
    let resultString = inputString
      .split(" ")
      .map((word) => {
        if (word.length > 5) {
          return word[0] + `${word.length - 2}` + word[word.length - 1];
        } else {
          return word;
        }
      })
      .join(" ");
    return resultString;
};

console.log(abbreviateString("You should know about accessibility and js"));  