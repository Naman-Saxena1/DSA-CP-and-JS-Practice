// You are given an array of strings ideas that represents a
// list of names to be used in the process of naming a company. 
// The process of naming a company is as follows:

// Choose 2 distinct names from ideas, call them ideaA and ideaB.
// Swap the first letters of ideaA and ideaB with each other.
// If both of the new names are not found in the original ideas, 
// then the name ideaA ideaB (the concatenation of ideaA and ideaB, 
// separated by a space) is a valid company name.
// Otherwise, it is not a valid name.
// Return the number of distinct valid names for the company.

// Example 1:
// Input: ideas = ["coffee","donuts","time","toffee"]
// Output: 6
// Explanation: The following selections are valid:
// - ("coffee", "donuts"): The company name created is "doffee conuts".
// - ("donuts", "coffee"): The company name created is "conuts doffee".
// - ("donuts", "time"): The company name created is "tonuts dime".
// - ("donuts", "toffee"): The company name created is "tonuts doffee".
// - ("time", "donuts"): The company name created is "dime tonuts".
// - ("toffee", "donuts"): The company name created is "doffee tonuts".
// Therefore, there are a total of 6 distinct company names.

// The following are some examples of invalid selections:
// - ("coffee", "time"): The name "toffee" formed after swapping already exists in the original array.
// - ("time", "toffee"): Both names are still the same after swapping and exist in the original array.
// - ("coffee", "toffee"): Both names formed after swapping already exist in the original array.

// Example 2:
// Input: ideas = ["lack","back"]
// Output: 0
// Explanation: There are no valid selections. Therefore, 0 is returned.


// Constraints:
// 2 <= ideas.length <= 5 * 104
// 1 <= ideas[i].length <= 10
// ideas[i] consists of lowercase English letters.
// All the strings in ideas are unique.


// Approach 1 - Using Array of Sets
var distinctNames = function(ideas) {

    let result = 0;
    let arrayOfSetsOfSuffixes = new Array(26).fill(0).map(s => new Set());

    for (let idea of ideas) 
    {
        // Add each suffix to each initial
        let pos = idea[0].charCodeAt(0) - 'a'.charCodeAt(0);
        arrayOfSetsOfSuffixes[pos].add(idea.slice(1));
    }
    
    for (let i = 0; i < arrayOfSetsOfSuffixes.length; i++)                      //Runs exact 26 times for each letter 
    {
        for (let j = i + 1; j < arrayOfSetsOfSuffixes.length; j++)              //Runs exact 325 times = 25 + 24 + 23 + ... + 1
        {
            let commonSuffixesCount = 0;

            // Count the suffix shared by the two sets
            for (let sfx of arrayOfSetsOfSuffixes[i])                           //Runs through all suffixes in a Set for each alphabet
            {
                commonSuffixesCount += arrayOfSetsOfSuffixes[j].has(sfx) ? 1 : 0;
            }
            
            // 2 * unique in A * unique in B
            // Multiply ONLY uniques count because swapping 1st letters of common suffixes will generate word that is already present in original array
            // Multiply result by 2 because valid ideaA and ideaB can 2 valid names "ideaA ideaB" and "ideaB ideaA" 
            result += 2 * (arrayOfSetsOfSuffixes[i].size - commonSuffixesCount) * (arrayOfSetsOfSuffixes[j].size - commonSuffixesCount);          
        }
    }    
    return result;
}

console.log(distinctNames(["coffee","donuts","time","toffee"]))


// arrayOfSetsOfSuffixes = [
//     Set(0) {},
//     Set(0) {},
//     Set(1) { 'offee' },
//     Set(1) { 'onuts' },
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(2) { 'ime', 'offee' },
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {},
//     Set(0) {}
// ]


// Approach 2 - Using Map of Sets
// var distinctNames = function (ideas) {
//     let map = new Map(), result = 0, keys = [];

//     for (let idea of ideas) 
//     {
//       let firstCharIndex = idea.charCodeAt(0) - "a".charCodeAt(0);
//       map.set(firstCharIndex, (map.get(firstCharIndex) || (keys.push(firstCharIndex) && new Set())).add(idea.substr(1)));
//     }

//     console.log(map)

//     for (let i = 0; i < keys.length; i++) 
//     {
//       for (let j = i + 1; j < keys.length; j++) 
//         {
//             let setA = map.get(keys[i]);
//             let setB = map.get(keys[j]);
//             const common = new Set([...setA].filter(element => setB.has(element)));
//             result += (setA.size - common.size) * (setB.size - common.size);
//         }
//     }
//     return 2 * result; 
// };

// console.log(distinctNames(["coffee","donuts","time","toffee"]))