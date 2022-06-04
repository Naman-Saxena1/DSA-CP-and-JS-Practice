// Method 1
// const frequencyOfWords = (inputString) =>
// {
//   let result = {}
//   let wordArray = []
//   let wordLiteral = ""

//   for(let i=0; i<inputString.length; i++)
//   {
//     if(inputString[i]===" ")
//     {
//       if(wordLiteral!=="")
//       {
//         wordArray.push(wordLiteral)
//         wordLiteral = ""
//       }
//     }
//     else
//     {
//       wordLiteral += inputString[i]
//     }
//   }
//   if(wordLiteral!=='')
//   {
//     wordArray.push(wordLiteral)
//   }

//   for(let word of wordArray)
//   {
//     if(Object.keys(result).includes(word))
//     {
//       result[word] += 1
//     }
//     else
//     {
//       result[word] = 1
//     }
//   }
//   return result
// }

// console.log(frequencyOfWords('  Hello  from hello to hello  '))


// Method 2
String.prototype.frequencyOfWords = function () 
{
  let temp="";
  let result = {};

  for(let i=0;i<this.length;i++) 
  {
    if(this[i]===' ') 
    {
      if(temp!=='')
      {
        result[temp] = (result[temp]??0)+1;
        temp = '';
      }
    }
    else 
    {
      temp+=this[i];
    }
        
  }
  if(temp!=='')
  {
    result[temp] = (result[temp]??0)+1;
  }
    
  return result;
}

console.log("  Hello  from hello to hello  ".frequencyOfWords());