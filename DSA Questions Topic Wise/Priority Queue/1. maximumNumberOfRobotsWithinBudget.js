// You have n robots. 
// You are given two 0-indexed integer arrays, chargeTimes and runningCosts, 
// both of length n. The ith robot costs chargeTimes[i] units to charge 
// and costs runningCosts[i] units to run. 
// You are also given an integer budget.

// The total cost of running k chosen robots is equal to 
// max(chargeTimes) + k * sum(runningCosts), where max(chargeTimes) 
// is the largest charge cost among the k robots and sum(runningCosts) 
// is the sum of running costs among the k robots.

// Return the maximum number of consecutive robots you can run 
// such that the total cost does not exceed budget.


// Example 1:
// Input: chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
// Output: 3
// Explanation: 
// It is possible to run all individual and consecutive pairs of robots within budget.
// To obtain answer 3, consider the first 3 robots. 
// The total cost will be max(3,6,1) + 3 * sum(2,1,3) = 6 + 3 * 6 = 24 which is less than 25.
// It can be shown that it is not possible to run more than 3 consecutive robots within budget, so we return 3.

// Example 2:
// Input: chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19
// Output: 0
// Explanation: No robot can be run that does not exceed the budget, so we return 0.
 

// Constraints:
// chargeTimes.length == runningCosts.length == n
// 1 <= n <= 5 * 104
// 1 <= chargeTimes[i], runningCosts[i] <= 105
// 1 <= budget <= 1015



// Approach 1 - Gives TLE at 69/82 test cases
// var maximumRobots = function(chargeTimes, runningCosts, budget) {
//     let maxNumOfRobots=0, totalCost=0;
//     let runCostPrefixSum=0, maxChargeCost=0, i=0;
    
//     for(let j=0; j<chargeTimes.length; j++)
//     {
//         runCostPrefixSum += runningCosts[j]
//         if(j==0)
//         {
//             maxChargeCost = Math.max(...chargeTimes.slice(i,j+1))
//         }
//         else
//         {
//             if(maxChargeCost<chargeTimes[j])
//             {
//                 maxChargeCost = chargeTimes[j]
//             }
//         }
        
//         totalCost = maxChargeCost + (j-i+1) * runCostPrefixSum
        
//         if(totalCost>budget)
//         {
//             runCostPrefixSum -= runningCosts[i]
//             if(maxChargeCost == chargeTimes[i])
//             {
//                 if(i==j)
//                 {
//                     maxChargeCost = 0
//                 }
//                 else
//                 {
//                     maxChargeCost = Math.max(...chargeTimes.slice(i+1,j+1))
//                 }
//             }
//             ++i;
//             while(
//                 i<=j &&
//                 budget<(maxChargeCost + j-i+1 * runCostPrefixSum)
//             )
//             {
//                 runCostPrefixSum -= runningCosts[i]
//                 if(maxChargeCost == chargeTimes[i])
//                 {
//                     if(i==j)
//                     {
//                         maxChargeCost = 0
//                     }
//                     else
//                     {
//                         maxChargeCost = Math.max(...chargeTimes.slice(i+1,j+1))
//                     }
//                 }
//                 ++i;
//             }
//         }
//         else
//         {
//             if(maxNumOfRobots<j-i+1)
//             {
//                 maxNumOfRobots = j-i+1
//             }
//         }
//     }
    
//     return maxNumOfRobots;
// };


// Approach 2 - Using Max Priority Queue and Sliding Window
// var maximumRobots = function (chargeTimes, runningCosts, budget) {
//     let sumCost = 0;
//     let maxRobots = 0;
//     let window_start = 0;

//     const pq = new MaxPriorityQueue({
//         compare: (a, b) => chargeTimes[b] - chargeTimes[a],         // Sorting in chargeTimes Descending Order
//     });

//     for(let i=0; i<runningCosts.length; i++)
//     {
//         pq.enqueue(i);
//         const runningCost = runningCosts[i];
//         sumCost += runningCost;

//         while(sumCost * (i - window_start + 1) + chargeTimes[pq.front()] > budget)
//         {
//             sumCost -= runningCosts[window_start];
//             window_start++;
//
//             // Rather than searching max charge each time Window moves from left
//             // we re-search on Max Priority Queue only when left side of window crosses current max no. index
//             while(pq.size() && (pq.front()<window_start))
//             {
//                 pq.dequeue();
//             }
//         }
//         maxRobots = Math.max(i - window_start + 1, maxRobots);
//     }
//     return maxRobots;
// };


// Approach 3 - Using Monotonic Decreasing Stack and Sliding Window
var maximumRobots = function(chargeTimes, runningCosts, budget) {
    let left = 0;
    let right = 0;
    
    let results = 0;
    let cur = 0;
    const stack = [];
    
    while(right < runningCosts.length)
    {
        cur+=runningCosts[right]
        
        // Maintaining Decreasing stack of indexes in chargeTimes decreasing order
        while(stack.length > 0 && chargeTimes[stack[stack.length-1]] <= chargeTimes[right])
        {
            stack.pop()
        }
        
        stack.push(right)
            
        if(chargeTimes[stack[0]] + (right-left+1)*cur > budget)
        {
            if(stack[0] === left)
            {
                stack.shift()
            }
            cur-=runningCosts[left]
            left++
        }

        results = Math.max(results, right-left+1)
        right++
    }
    
    return results
};

console.log(maximumRobots([3,6,1,3,4], [2,1,3,4,5], 25))