// You are given a 0-indexed string pattern of length n 
// consisting of the characters 'I' meaning increasing and 'D' meaning decreasing.

// A 0-indexed string num of length n + 1 is created using the following conditions:

// num consists of the digits '1' to '9', where each digit is used at most once.
// If pattern[i] == 'I', then num[i] < num[i + 1].
// If pattern[i] == 'D', then num[i] > num[i + 1].
// Return the lexicographically smallest possible string num that meets the conditions.

 

// Example 1:
// Input: pattern = "IIIDIDDD"
// Output: "123549876"
// Explanation:
// At indices 0, 1, 2, and 4 we must have that num[i] < num[i+1].
// At indices 3, 5, 6, and 7 we must have that num[i] > num[i+1].
// Some possible values of num are "245639871", "135749862", and "123849765".
// It can be proven that "123549876" is the smallest possible num that meets the conditions.
// Note that "123414321" is not possible because the digit '1' is used more than once.

// Example 2:
// Input: pattern = "DDD"
// Output: "4321"
// Explanation:
// Some possible values of num are "9876", "7321", and "8742".
// It can be proven that "4321" is the smallest possible num that meets the conditions.
 

// Constraints:
// 1 <= pattern.length <= 8
// pattern consists of only the letters 'I' and 'D'.



// Approach 1
// var smallestNumber = function(pattern) {
//     let result = [], lastDec = 1
    
//     for(let i=1; i<=pattern.length+1; i++)
//     {
//         if(result.length != 0)
//         {
//             if(pattern[i-2] == 'I')
//             {
//                 result.push(i)
//                 lastDec = result.length-1
//             }
//             else
//             {
//                 left = result.slice(0,lastDec)
//                 right = result.slice(lastDec)
//                 lastDec = left.length
//                 result = [...left,i,...right]
//             }
//         }
//         else
//         {
//             result.push(i)
//             lastDec = result.length-1
//         }
//     }

//     return result.join('')
// };


// Approach 2
// var smallestNumber = function(pattern) {
//     const N = pattern.length
//     let nums = [...Array(N + 1)].map((_,i) => i+1);
    
//     let seq = [], k=0;
//     let last = pattern[0];
    
//     for(let i=1; i<N; i++) 
//     {
//         if(pattern[i] == last) continue;
        
//         if(last == 'I') 
//         {
//             seq.push(nums.slice(k,i));
//             k = i;
//         } 
//         else 
//         {
//             seq.push(nums.slice(k,++i).reverse())
//             k = i;
//         }

//         last = pattern[i];
//     } 
    
//     if(last == 'I') 
//     {
//         seq.push(nums.slice(k));
//     } 
//     else 
//     {
//         seq.push(nums.slice(k).reverse())
//     }
    
//     return seq.flat().join('');
// };


// Approach 3 - Greedy
var smallestNumber = function(pattern) {
    let res = "";

    for (let i = 0, j = 0; i <= pattern.length; ++i) 
    {
        res += 1+i
        
        if (i == pattern.length || pattern[i] == 'I') 
        {
            res = res.substring(0,j) + res.substring(j).split('').reverse().join('')
            j = i + 1;
        }
    }
    return res;
};


console.log(smallestNumber("IIIDIDDD"))