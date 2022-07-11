// You are given an integer array coins representing coins of different
// denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. 
// If that amount of money cannot be made up by any combination of the coins, 
// return -1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:
// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

// Example 2:
// Input: coins = [2], amount = 3
// Output: -1

// Example 3:
// Input: coins = [1], amount = 0
// Output: 0

// Constraints:
// 1 <= coins.length <= 12
// 1 <= coins[i] <= 231 - 1
// 0 <= amount <= 104

var coinChange = function(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity); 
    dp[0] = 0;
    
    for(let coin of coins) 
    { 
        for (let i = coin; i <= amount; i++) 
        { 
          dp[i] = Math.min(dp[i], dp[i - coin] + 1); 
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount]; 
};

console.log(coinChange([1,2,5],11))


// Initialization
// dp = [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
//       0         1         2         3         4         5         6         7         8         9        10        11

// After checking minimum coins required to create sum 0 to 11 using coins[0] = 1
// dp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]      <- Least no. of coins need to make index sum using only coin 1
//       0  1  2  3  4  5  6  7  8  9  10  11       <- Target sum represented using indexes

// After checking minimum coins required to create sum 0 to 11 using coins[1] = 2
// dp = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5,  5,  6]      <- Least no. of coins need to make index sum using only coin 1 and 2
//       0  1  2  3  4  5  6  7  8  9  10  11       <- Target sum represented using indexes

// After checking minimum coins required to create sum 0 to 11 using coins[2] = 5
// dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3,  3,  3]      <- Least no. of coins need to make index sum using only coin 1, 2 and 5
//       0  1  2  3  4  5  6  7  8  9  10  11       <- Target sum represented using indexes

// Now we know we need atleast 3 coins (1+5+5) to make sum 11
// We will return dp[amount] = dp[11] = 3