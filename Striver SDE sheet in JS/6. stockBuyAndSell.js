// You are given an array of prices where prices[i] 
// is the price of a given stock on an ith day.

// You want to maximize your profit by choosing a single day 
// to buy one stock and choosing a different day in the future to sell that stock. 
// Return the maximum profit you can achieve from this transaction. 
// If you cannot achieve any profit, return 0.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

// Example 2:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.





// Approach 1 - Brute Force approach
const maxProfit = (prices) => {
    let maximumProfit = 0
    
    for(let i=0; i<prices.length; i++)
    {
        for(j=i+1; j<prices.length; j++)
        {
            if(prices[j]-prices[i]>maximumProfit)
            {
                maximumProfit = prices[j]-prices[i]
            }
        }
    }
    // Time complexity = O(n^2)
    // Space complexity = O(1)

    return maximumProfit
}

// console.log(maxProfit([7,1,5,3,6,4]))





// Approach 2 - Optimal Solution
const maxProfitOptimal = (prices) => {
    let maximumProfit = 0
    let minimalValue = prices[0]
    
    for(let i=1; i<prices.length; i++)
    {
        if(prices[i]<minimalValue)
        {
            minimalValue = prices[i]
        }
        if(prices[i]-minimalValue>maximumProfit)
        {
            maximumProfit = prices[i]-minimalValue
        }
    }
    // Time complexity = O(n)
    // Space complexity = O(1)

    return maximumProfit
}

console.log(maxProfitOptimal([7,1,5,3,6,4]))