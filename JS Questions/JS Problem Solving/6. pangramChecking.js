// We have to check if the string contains all the english alphabet

// Method 1 - Using in-built .includes() function 
// let checkPangram = (sentence) => {

//   for(let i=97; i<123; i++)
//   {
//     if(!sentence.includes(String.fromCharCode(i)))
//     {
//       return false
//     }
//   }
//   return true
// }

// Method 2 - Using in-built new Set() 
let checkPangram = (sentence) => {
  return new Set([...sentence]).size === 26;
}

console.log(checkPangram("thequickbrownfoxjumpsoverthelazydog"))