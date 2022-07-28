// Given a string s consisting of lowercase English letters, 
// return the first letter to appear twice.

// Note:
// A letter a appears twice before another letter b 
// if the second occurrence of a is before the second occurrence of b.
// s will contain at least one letter that appears twice.

// Approach 1
var repeatedCharacter = function(s) {
    let countMap = new Map()
    
    for(let i=0; i<s.length; i++)
    {
        if(countMap.has(s[i]))
        {
            return s[i]
        }
        else
        {
            countMap.set(s[i],1)
        }
    }
};