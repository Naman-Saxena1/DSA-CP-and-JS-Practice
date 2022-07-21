// You are given a 0-indexed array of strings nums, 
// where each string is of equal length and consists of only digits.

// You are also given a 0-indexed 2D integer array queries where queries[i] = [ki, trimi]. 
// For each queries[i], you need to:

// Trim each number in nums to its rightmost trimi digits.
// Determine the index of the kith smallest trimmed number in nums. If two trimmed numbers are equal, 
// the number with the lower index is considered to be smaller.
// Reset each number in nums to its original length.
// Return an array answer of the same length as queries, where answer[i] is the answer to the ith query.

// Note:
// To trim to the rightmost x digits means to keep removing the leftmost digit, until only x digits remain.
// Strings in nums may contain leading zeros.
 

// Example 1:
// Input: nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
// Output: [2,2,1,0]
// Explanation:
// 1. After trimming to the last digit, nums = ["2","3","1","4"]. The smallest number is 1 at index 2.
// 2. Trimmed to the last 3 digits, nums is unchanged. The 2nd smallest number is 251 at index 2.
// 3. Trimmed to the last 2 digits, nums = ["02","73","51","14"]. 
// The 4th smallest number is 73.
// 4. Trimmed to the last 2 digits, the smallest number is 2 at index 0.
//    Note that the trimmed number "02" is evaluated as 2.
   
// Example 2:
// Input: nums = ["24","37","96","04"], queries = [[2,1],[2,2]]
// Output: [3,0]
// Explanation:
// 1. Trimmed to the last digit, nums = ["4","7","6","4"]. The 2nd smallest number is 4 at index 3.
//    There are two occurrences of 4, but the one at index 0 is considered smaller than the one at index 3.
// 2. Trimmed to the last 2 digits, nums is unchanged. The 2nd smallest number is 24.
 

// Constraints:
// 1 <= nums.length <= 100
// 1 <= nums[i].length <= 100
// nums[i] consists of only digits.
// All nums[i].length are equal.
// 1 <= queries.length <= 100
// queries[i].length == 2
// 1 <= ki <= nums.length
// 1 <= trimi <= nums[i].length


// Approach 1 - Very high runtime
// Runtime: 8794 ms
// Memory Usage: 78.8 MB
// var smallestTrimmedNumbers = function(nums, queries) {
//     let output = []
    
//     for(let i=0; i<queries.length; i++)
//     {
//         let trimmedArr = nums.map((num,index)=>{
//             return [num.split('').slice(num.length-queries[i][1]).join(''),index]
//         })
        
        
//         trimmedArr.sort((a,b)=>{
            
//             if(BigInt(a[0]) > BigInt(b[0])) 
//             {
//                 return 1;
//             } else if (BigInt(a[0]) < BigInt(b[0]))
//                 {
//                     return -1;
//                 } 
//                 else 
//                 {
//                     return 0;
//                 }
//         })
//         let kthSmallestNum = trimmedArr[queries[i][0]-1]
        
//         output.push(kthSmallestNum[1])      
//     }
    
//     return output
// };


// Approach 2 - Using Bucket Sort
// Runtime: 245 ms
// Memory Usage: 52.1 MB
const bucketSort = (indices, nums, digitIndex) => {
    const buckets = new Array(10).fill(0).map(() => []);
  
    for (const idx of indices)
    {
      buckets[+nums[idx][digitIndex]].push(idx);
    }

    let current = 0;
    for (const bucket of buckets) 
    {
      for (const idx of bucket) 
      {
        indices[current] = idx;
        current += 1;
      }
    }
};

var smallestTrimmedNumbers = function (nums, queries) {
    const queriesByTrimLength = queries
      .map((_, i) => i)
      .sort((a, b) => queries[a][1] - queries[b][1]);
    
    const numIndices = nums.map((_, i) => i);
    const numLength = nums[0].length;
    let digit = 0;

  
    return queriesByTrimLength.reduce((queryAnswers, queryIdx) => { 
      const [k, trim] = queries[queryIdx];
    
      while (trim > digit) 
      {
        digit += 1;
        bucketSort(numIndices, nums, numLength - digit);
      }
    
      queryAnswers[queryIdx] = numIndices[k - 1];
      return queryAnswers;
      }, 
      queries.map(() => 0)                          //[0,0,0,0]
    );
};

console.log(smallestTrimmedNumbers(["102","473","254","854"],[[1,1],[2,3],[4,2],[1,2]]))

// console.log(smallestTrimmedNumbers(
//     [
//         "22222222222222222222222222222222222222222222222225",
//         "22222222222222222222222222222222222222222222222221",
//         "22222222222222222222222222222222222222222222222223",
//         "22222222222222222222222222222222222222222222222228",
//         "22222222222222222222222222222222222222222222222226"
//     ],
//     [[1,40],[3,40],[2,40],[5,40],[4,40]]
// ))