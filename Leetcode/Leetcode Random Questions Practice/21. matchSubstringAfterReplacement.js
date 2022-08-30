// You are given two strings s and sub. 
// You are also given a 2D character array mappings where mappings[i] = [oldi, newi] 
// indicates that you may perform the following operation any number of times:

// Replace a character oldi of sub with newi.
// Each character in sub cannot be replaced more than once.

// Return true if it is possible to make sub a substring of s by 
// replacing zero or more characters according to mappings. 
// Otherwise, return false.

// A substring is a contiguous non-empty sequence of characters within a string.

 

// Example 1:
// Input: s = "fool3e7bar", sub = "leet", mappings = [["e","3"],["t","7"],["t","8"]]
// Output: true
// Explanation: Replace the first 'e' in sub with '3' and 't' in sub with '7'.
// Now sub = "l3e7" is a substring of s, so we return true.

// Example 2:
// Input: s = "fooleetbar", sub = "f00l", mappings = [["o","0"]]
// Output: false
// Explanation: The string "f00l" is not a substring of s and no replacements can be made.
// Note that we cannot replace '0' with 'o'.

// Example 3:
// Input: 
//     s = "Fool33tbaR", 
//     sub = "leetd", 
//     mappings = [["e","3"],["t","7"],["t","8"],["d","b"],["p","b"]]
// Output: true
// Explanation: Replace the first and second 'e' in sub with '3' and 'd' in sub with 'b'.
// Now sub = "l33tb" is a substring of s, so we return true.

 

// Constraints:
// 1 <= sub.length <= s.length <= 5000
// 0 <= mappings.length <= 1000
// mappings[i].length == 2
// oldi != newi
// s and sub consist of uppercase and lowercase English letters and digits.
// oldi and newi are either uppercase or lowercase English letters or digits.



// Approach 1 
// var matchReplacement = function(s, sub, mappings) {
//     let m = s.length, n = sub.length;
//     let canReplaceArr = [], currentArr;
    
//     for(let i=0; i<256; i++)
//     {
//         currentArr = Array.from({length: 256}, (v, i) => false)
//         currentArr[i] = true
//         canReplaceArr.push(currentArr)
//     }
    
//     for(let [str,replacement] of mappings)
//     {
//         canReplaceArr[str.charCodeAt(0)][replacement.charCodeAt(0)] = true
//     }
    
//     for(let start=0; start<m-n+1; start++)
//     {
//         let flag = true;
        
//         for(let j=0; j<n; j++)
//         {
//             if(!canReplaceArr[sub[j].charCodeAt()][s[start+j].charCodeAt()])
//             {
//                 flag = false;
//             }
//         }
        
//         if(flag)
//         {
//             return true
//         }
//     }
    
//     return false
// };


// Approach 2 
// Letter and Replacement in a set as a String
// and then use that while validating pattern with main string
//
// var matchReplacement = function(s, sub, mappings) {
//     const len = s.length - sub.length;
//     const set = new Set();
    
//     for(const [from, to] of mappings)
//     {
//         set.add(from + to);
//     }
    
//     const valid = (index) => {
//         for(let i = 0; i < sub.length; ++i) 
//         {
//             if(s[index] === sub[i] || set.has(sub[i] + s[index]))
//             {
//                 ++index;
//             }
//             else
//             {
//                 return false;
//             }
//         }
//         return true;
//     };
    
//     for(let i = 0; i <= len; ++i) 
//     {
//         if(valid(i) === true)
//         {
//             return true;
//         }
//     }
    
//     return false;
// };


// Approach 3 - Using RegEx
const makeRegExp = function (sub, mappings) 
{
    // sub: leet
    // mappings: [ [ 'e', '3' ], [ 't', '7' ], [ 't', '8' ] ] 
    const mappingSets = {}
  
    for(const mapping of mappings) 
    {
        const sc = mapping[0]
        const rc = mapping[1]
    
        if(!mappingSets[sc]) 
        {
            mappingSets[sc] = new Set([sc])
        }
        mappingSets[sc].add(rc)
    }

    // mappingSets: { e: Set(2) { 'e', '3' }, t: Set(3) { 't', '7', '8' } }
    
    const patterns = sub.split('')
    // patterns: [ 'l', 'e', 'e', 't' ]
    
    for(const sc of Object.keys(mappingSets)) 
    {
        const set = mappingSets[sc]
        const newSubstr = `[${Array.from(set.values()).join('')}]`
    
        for(let i=0; i<patterns.length; i++) 
        {
            const sc0 = patterns[i]
      
            if(sc0 !== sc)
            {
                continue
            }
            patterns[i] = newSubstr
        }
    }
    // patterns: [ 'l', '[e3]', '[e3]', '[t78]' ]

    return new RegExp(patterns.join(''))
}

const matchReplacement = function (s, sub, mappings) 
{
    const  re = makeRegExp(sub, mappings)        // re = /l[e3][e3][t78]/
    return re.test(s)
}


console.log(matchReplacement("fool3e7bar", "leet", [["e","3"],["t","7"],["t","8"]]))


// https://leetcode.com/problems/match-substring-after-replacement/discuss/2140523/Problems-with-the-KMP-approach-or-Java-O(mn)-solution