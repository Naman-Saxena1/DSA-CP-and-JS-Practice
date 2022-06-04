// Input: Banana and Mango
// Token: a
// Output: [B, n, n,  ,nd M, ngo]

const tokenize = (str,token) => 
{
  let tokenArr = []
  let literals = ""
  
  for(let literal of str)
  {
    if(literal === token) 
    {
      tokenArr.push(literals)
      literals= ""
    }
    else 
    {
      literals+=literal
    }
  }
  
  tokenArr.push(literals)
  //time complexity O(n)
  //space complexity O(2n) --> O(n)

  return tokenArr
}

console.log(tokenize("Banana and Mango","a"))