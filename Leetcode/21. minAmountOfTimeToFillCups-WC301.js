// You have a water dispenser that can dispense cold, warm, and hot water. 
// Every second, you can either fill up 2 cups with different types of water, 
// or 1 cup of any type of water.

// You are given a 0-indexed integer array amount of length 3 where 
// amount[0], amount[1], and amount[2] denote the number of 
// cold, warm, and hot water cups you need to fill respectively. 
// Return the minimum number of seconds needed to fill up all the cups.

 

// Example 1:
// Input: amount = [1,4,2]
// Output: 4
// Explanation: One way to fill up the cups is:
// Second 1: Fill up a cold cup and a warm cup.
// Second 2: Fill up a warm cup and a hot cup.
// Second 3: Fill up a warm cup and a hot cup.
// Second 4: Fill up a warm cup.
// It can be proven that 4 is the minimum number of seconds needed.

// Example 2:
// Input: amount = [5,4,4]
// Output: 7
// Explanation: One way to fill up the cups is:
// Second 1: Fill up a cold cup, and a hot cup.
// Second 2: Fill up a cold cup, and a warm cup.
// Second 3: Fill up a cold cup, and a warm cup.
// Second 4: Fill up a warm cup, and a hot cup.
// Second 5: Fill up a cold cup, and a hot cup.
// Second 6: Fill up a cold cup, and a warm cup.
// Second 7: Fill up a hot cup.

// Example 3:
// Input: amount = [5,0,0]
// Output: 5
// Explanation: Every second, we fill up a cold cup.
 

// Constraints:
// amount.length == 3
// 0 <= amount[i] <= 100


// Approach 1
var fillCups = function(amount) {
    let res = 0;

    while( Math.max(amount[0], amount[1], amount[2]) > 0) 
    {
        amount.sort((a,b)=>a-b);
        --amount[2];
        --amount[1];
        ++res
    }
    return res;
};

// Keep sorting array in ascending order and decreasing last 2 values each time
// Keep incrementing count result each time
// [ 1, 4, 2 ]          <- res = 0  ++res
// [ 1, 1, 3 ]          <- res = 1  ++res
// [ 1, 0, 2 ]          <- res = 2  ++res
// [ 0, 0, 1 ]          <- res = 3  ++res
// res = 4


// Approach 2
var fillCups = function(amount) {
    let maxVal = 0, sum = 0;
        
    for(let a of amount) 
    {
        maxVal = Math.max(a, maxVal);
        sum += a;
    }
    
    return Math.max(maxVal, Math.trunc( (sum + 1) / 2) );
};

console.log(fillCups([1,4,2]))

// Get max value among 3 items in array -> maxVal
// Get sum of all seconds               -> sum

// For every case maxVal <= minTimeRequired
// Because it will atleast take maxVal time to fill largest cup

// For every case at max we can reduce time to sum/2
// We are using Math.trunc and +1 to sum, to get correct estimate of least sum possible for both odd and even sums

// For Eg-
// Even case: sum = 10
// Math.trunc( (10+1)/2 ) = Math.trunc(11/2) = Math.trunc(5.5) = 5

// Odd case: sum = 11
// Math.trunc( (11+1)/2 ) = Math.trunc(12/2) = Math.trunc(6)   = 6