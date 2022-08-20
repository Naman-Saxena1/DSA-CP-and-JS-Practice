// Given a list of words, list of  single letters (might be repeating) 
// and score of every character.

// Return the maximum score of any valid set of words formed by using the 
// given letters (words[i] cannot be used two or more times).

// It is not necessary to use all characters in letters and each letter 
// can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is 
// given by score[0], score[1], ... , score[25] respectively.

 

// Example 1:
// Input: 
//     words = ["dog","cat","dad","good"], 
//     letters = ["a","a","c","d","d","d","g","o","o"], 
//     score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
// Output: 23
// Explanation:
// Score  a=1, c=9, d=5, g=3, o=2
// Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
// Words "dad" and "dog" only get a score of 21.

// Example 2:
// Input: 
//     words = ["xxxz","ax","bx","cx"], 
//     letters = ["z","a","b","c","x","x","x"], 
//     score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
// Output: 27
// Explanation:
// Score  a=4, b=4, c=4, x=5, z=10
// Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
// Word "xxxz" only get a score of 25.

// Example 3:
// Input: 
//     words = ["leetcode"], 
//     letters = ["l","e","t","c","o","d"], 
//     score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
// Output: 0
// Explanation:
// Letter "e" can only be used once.


// Constraints:
// 1 <= words.length <= 14
// 1 <= words[i].length <= 15
// 1 <= letters.length <= 100
// letters[i].length == 1
// score.length == 26
// 0 <= score[i] <= 10
// words[i], letters[i] contains only lower case English letters.



// Approach 1 - Bit masking
// const maxScoreWords = (words, letters, score) => {
//     let cnt = Array(26).fill(0), n = words.length, res = 0;

//     for (const c of letters)
//     {
//         cnt[c.charCodeAt() - 97]++;
//     }

//     outer:
//     for (let i = 0; i < 1<<n; i++) 
//     {
//         // Iterating from 0 to 2**n
//         // For ["dog","cat","dad","good"]
//         // n = 4
//         // Hence 2**n -> 2**4 = 16
//         // i: 0 -> 15
//         // Each subset is present by i

//         let ncnt = Array(26).fill(0), sum = 0;

//         // In ncnt, store all letters required for current subset
//         for (let j = 0; j < n; j++) 
//         {
//             if (i & (1 << j)) 
//             {
//                 for (const c of words[j])
//                 {
//                     ncnt[c.charCodeAt() - 97]++;
//                 }
//             }
//         }
        
//         // If all letters are available, 
//         // keep on adding score for this subset
//         // If we don't have enough letters, stop and directly continue with next subset
//         // If this subset's score > previous res, update res
//         for (let j = 0; j < 26; j++) 
//         {
//             if (ncnt[j] > cnt[j])
//             {
//                 continue outer;
//             }
//             sum += ncnt[j] * score[j];
//         }
//         res = Math.max(res, sum);
//     }
//     return res;
// };


// Approach 2 - Backtracking
// function countScore (used, score) 
// {
//     let result = 0;
//     for (let i = 0; i < 26; i++) 
//     {
//         result += used[i] * score[i];
//     }
//     return result;
// }

// function backTracking (words, used, score, index, provideCounts) 
// {
//     // index -> Starting Index
//     if (index === words.length) 
//     {
//         return countScore(used, score);
//     }
//     let result = countScore(used, score);   
    
//     while(index < words.length) 
//     {
//         let lastUsedLetterIndex = -1
//         const word = words[index];
//         let greaterFlag = false;
        
//         for(let i = 0; i < 26; i++) 
//         {
//             used[i] += word[i];
//             ++lastUsedLetterIndex;

//             if(used[i] > provideCounts[i])
//             {
//                 // More letters needed than available
//                 // Can't create this word for this set
//                 greaterFlag = true;
//                 break;
//             }
//         }
        
//         // If greaterFlag = false
//         // Can create this word, move forward to check for next word
//         if(!greaterFlag) 
//         {
//             result = Math.max(result, backTracking(words, used, score, index + 1, provideCounts));
//         }

//         for(let i = 0; i <= lastUsedLetterIndex; i++) 
//         {
//             used[i] -= word[i];
//         }
//         index++;
//     }
//     return result;
// }

// var maxScoreWords = function (words, letters, score) 
// {
//     words = words.map((word) => {
//         const counts = new Array(26).fill(0);
        
//         for(let i = 0; i < word.length; i++) 
//         {
//             counts[word.charCodeAt(i) - 97]++;
//         }
//         return counts;
//     });
    
//     const provideCounts = new Array(26).fill(0);
    
//     for(let i = 0; i < letters.length; i++) 
//     {
//         provideCounts[letters[i].charCodeAt(0) - 97]++;
//     }

//     return backTracking(words, new Array(26).fill(0), score, 0, provideCounts);
// };


// Approach 3 - Backtracking 
var maxScoreWords = function(words, letters, score) 
{
    let counter = {}
    
    for(let c of letters) 
    {
        if(!counter[c]) counter[c] = 1;
        else counter[c]++;
    }
    let scores = [];
    
    for(let w of words) 
    {
        let sc = 0;
        for(let c of w) 
        {
            sc += score[c.charCodeAt() - 'a'.charCodeAt()];
        }
        scores.push(sc);
    }
    let ans = 0;
    
    const dfs = function(start, total) 
    {
        ans = Math.max(ans, total);
        
        for(let i=start; i<words.length; i++) 
        {
            const word = words[i];
            
            let valid = true;
            for(let c of word) 
            {
                // valid true  -> 1
                // valid false -> 0
                valid &= --counter[c] >= 0              
            }
            
            // If valid=true -> We can use this word
            // Check for next word
            if(valid) 
            {
                dfs(i+1, total+scores[i]);
            }
            
            // Add removed letters back to counter object
            for(let c of word) 
            {
                ++counter[c];
            }
        }
    }
    dfs(0, 0);
    
    return ans;
};

console.log(maxScoreWords(
    ["dog","cat","dad","good"],
    ["a","a","c","d","d","d","g","o","o"],
    [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
))