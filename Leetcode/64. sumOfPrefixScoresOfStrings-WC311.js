// You are given an array words of size n consisting of non-empty strings.

// We define the score of a string word as the number of strings words[i] 
// such that word is a prefix of words[i].

// For example, if words = ["a", "ab", "abc", "cab"], 
// then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
// Return an array answer of size n where answer[i] 
// is the sum of scores of every non-empty prefix of words[i].

// Note that a string is considered as a prefix of itself.

 

// Example 1:
// Input: words = ["abc","ab","bc","b"]
// Output: [5,4,3,2]
// Explanation: The answer for each string is the following:
// - "abc" has 3 prefixes: "a", "ab", and "abc".
// - There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
// The total is answer[0] = 2 + 2 + 1 = 5.
// - "ab" has 2 prefixes: "a" and "ab".
// - There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
// The total is answer[1] = 2 + 2 = 4.
// - "bc" has 2 prefixes: "b" and "bc".
// - There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
// The total is answer[2] = 2 + 1 = 3.
// - "b" has 1 prefix: "b".
// - There are 2 strings with the prefix "b".
// The total is answer[3] = 2.

// Example 2:
// Input: words = ["abcd"]
// Output: [4]
// Explanation:
// "abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
// Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.


// Constraints:
// 1 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] consists of lowercase English letters.


// Approach 1 - Brute Force Approach
// Gives TLE on 28/38 test case
// var sumPrefixScores = function(words) {
//     let currPrefix, currCount, ans = [], wordsToConsider, wordsToConsiderForNextPrefix;
    
//     for(let word of words)
//     {
//         currPrefix = ""
//         currCount = 0
//         wordsToConsider = [...words]
        
//         for(let i=0; i<word.length; i++)
//         {
//             currPrefix += word[i]
//             wordsToConsiderForNextPrefix = []
//             wordsToConsider.forEach(word=>{
//                 if(word.split('').slice(0,i+1).join('')==currPrefix)
//                 {
//                     ++currCount;
//                     wordsToConsiderForNextPrefix.push(word)
//                 }
//             })
//             wordsToConsider = wordsToConsiderForNextPrefix
//         }
        
//         ans.push(currCount)
//     }
    
//     return ans
// };




// Approach 2 - Self attempt for Trie solution
// Accepted but lookup with array index is much faster than key lookup in object.
// So Approach 3 is faster
// function getScore(currWord,wordsAsTrie,i)
// {
//     let score = 0

//     if(wordsAsTrie.hasOwnProperty(currWord[i]))
//     {
//         score += wordsAsTrie[currWord[i]].count
//     }
//     else
//     {
//         return 0
//     }

//     return score + getScore(currWord,wordsAsTrie[currWord[i]],i+1)
// }

// var sumPrefixScores = function(words) {
//     let wordsAsTrie = [], dict, ans = [];

//     // Iterate through all words and create Trie for them with count of each letter
//     for(let word of words)
//     {
//         dict = wordsAsTrie;
//         for(let i=0; i<word.length; i++)
//         {
//             if(i==0)
//             {
//                 if(dict[word[0].charCodeAt()-97]==undefined)
//                 {
//                     dict[word[0].charCodeAt()-97] = {count:1}
//                 }
//                 else
//                 {
//                     ++dict[word[0].charCodeAt()-97].count;
//                 }
//                 dict = dict[word[0].charCodeAt()-97]
//             }
//             else
//             {
//                 if(!dict[word[i]])
//                 {
//                     dict[word[i]] = {count:1}
//                 }
//                 else
//                 {
//                     ++dict[word[i]].count;
//                 }
//                 dict = dict[word[i]]
//             }
//         }
//     }

//     let currentScore;

//     // Iterate through each word and use Trie to calculate Total Score of it
//     for(let word of words)
//     {
//         if(wordsAsTrie[word[0].charCodeAt()-97])
//         {
//             currentScore = wordsAsTrie[word[0].charCodeAt()-97].count + getScore(word,wordsAsTrie[word[0].charCodeAt()-97],1)
//         }

//         ans.push(currentScore)
//     }

//     return ans;
// }



// Approach 3 - Using Trie
// Using arrays for letters sub-tries
// const getScore = (node, word, i) => {
//     if(i === word.length)
//     {
//         return 0;
//     }

//     const charCode = word.charCodeAt(i) - 97;
//     const next = node.children[charCode];
//     const score = next.count;
//     return score + getScore(next, word, i + 1);
// }

// const insert = (node, word, i = 0) => {
//     node.count++;

//     if(i === word.length)
//     {
//         return;
//     }
//     const charCode = word.charCodeAt(i) - 97;

//     if(!node.children[charCode])
//     {
//         node.children[charCode] = createNode();
//     }
//     insert(node.children[charCode], word, i+ 1);
// }

// const createNode = () => {
//     return {
//         count: 0,
//         children: new Array(26),
//     };
// }

// var sumPrefixScores = function(words) {
//     const scores = {};

//     // Create group obj with all word's 1st letter as property
//     // groups: { a: [ 'abc', 'ab' ], b: [ 'bc', 'b' ] }
//     const groups = words.reduce((groups, word) =>
//     {
//         if(!groups[word[0]])
//         {
//             groups[word[0]] = [];
//         }
//         groups[word[0]].push(word);
//         return groups;
//     }, {});
    
//     // For each group create separate trie and calculate score
//     // for each word in that group
//     for(const group of Object.values(groups))
//     {
//         const root = createNode();

//         for(let i = 0; i < group.length; i++)
//         {
//             const word = group[i];
//             insert(root, word);
//         }

//         for(let i = 0; i < group.length; i++)
//         {
//             const word = group[i];
//             scores[word] = getScore(root, word, 0);
//         }
//     }
	
//     return words.map(word => scores[word]);
// };



// Revisit to understand when have time
// Approach 4
var sumPrefixScores = function(words) {
    const sorted = words.map((_, i) => i);
    const sizes = words.map(() => 0);
    const totals = words.map(() => 0);
    
    const aCode = 'a'.codePointAt(0);
    const zCode = 'z'.codePointAt(0);
    const max = words.reduce((max, word) => Math.max(max, word.length), 0);
    const buckets = new Array(zCode + 1).fill(0).map(() => []);
    let end = words.length - 1;
    let prev = words.map(() => -1);
    let next = words.map(() => -1)

    // sorted : [ 0, 1, 2, 3 ]
    // sizes  : [ 0, 0, 0, 0 ]
    // totals : [ 0, 0, 0, 0 ]
    // aCode  : 97
    // zCode  : 122
    // max    : 3
    // 
    // buckets: [
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [], [], [], [], [], [], [], [], [], 
    //            [], [], [], [],
    //            ... 23 more items
    // ]
    // 
    // end  : 3
    // prev : [ -1, -1, -1, -1 ]
    // next : [ -1, -1, -1, -1 ]

    console.log("sorted:",sorted)
    console.log("sizes:",sizes)
    console.log("totals:",totals)
    console.log("aCode:",aCode)
    console.log("zCode:",zCode)
    console.log("max:",max)
    console.log("buckets:",buckets)
    console.log("end:",end)
    console.log("prev:",prev)
    console.log("next:",next)
    
    // Max word length, max = 3
    // Last word index, end = 3
    // i = 0->max
    // i = 0->3
    // i = 0,1,2
    for(let i=0; i<max; i+=1)
    {
        for(let j=end; j>=0; j-=1)
        {
            const idx = sorted[j];
            const word = words[idx];
            
            if(i >= word.length)
            {
                end -= 1;
                continue;
            }

            buckets[word.codePointAt(i)].push(idx);
        }
        
        let current = 0;

        for(let bucket=aCode; bucket<=zCode; bucket+=1)
        {
            let last = -1;

            while(buckets[bucket].length)
            {
                const idx = buckets[bucket].pop();
                sorted[current] = idx;

                if(!current || prev[last] !== prev[idx] || words[last][i] !== words[idx][i])
                {
                    next[idx] = idx;
                    sizes[idx] = 1;
                }
                else
                {
                    next[idx] = next[last];
                    sizes[next[idx]] += 1;
                }
                
                last = idx;
                current += 1;
            }
        }
        
        for(let j = 0; j < current; j += 1)
        {
            totals[sorted[j]] += sizes[next[sorted[j]]];
        }
        
        [prev, next] = [next, prev];
    }
    
    return totals;
};


console.log(sumPrefixScores(["abc","ab","bc","b"]))