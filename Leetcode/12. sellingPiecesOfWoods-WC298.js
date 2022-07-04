// You are given two integers m and n that represent the 
// height and width of a rectangular piece of wood. 
// You are also given a 2D integer array prices, 
// where prices[i] = [hi, wi, pricei] indicates you can sell a rectangular 
// piece of wood of height hi and width wi for pricei dollars.

// To cut a piece of wood, you must make a vertical or horizontal 
// cut across the entire height or width of the piece to split it into 
// two smaller pieces. After cutting a piece of wood into 
// some number of smaller pieces, you can sell pieces according to prices.
// You may sell multiple pieces of the same shape, 
// and you do not have to sell all the shapes. 
// The grain of the wood makes a difference, 
// so you cannot rotate a piece to swap its height and width.

// Return the maximum money you can earn after cutting an m x n piece 
// of wood.

// Note that you can cut the piece of wood as many times as you want.

// Example 1:
// Input: m = 3, n = 5, prices = [[1,4,2],[2,2,7],[2,1,3]]
// Output: 19
// Explanation: The diagram above shows a possible scenario. 
// It consists of:
// - 2 pieces of wood shaped 2 x 2, selling for a price of 2 * 7 = 14.
// - 1 piece of wood shaped 2 x 1, selling for a price of 1 * 3 = 3.
// - 1 piece of wood shaped 1 x 4, selling for a price of 1 * 2 = 2.
// This obtains a total of 14 + 3 + 2 = 19 money earned.
// It can be shown that 19 is the maximum amount of money 
// that can be earned.

// Example 2:
// Input: m = 4, n = 6, prices = [[3,2,10],[1,4,2],[4,1,3]]
// Output: 32
// Explanation: The diagram above shows a possible scenario. 
// It consists of:
// - 3 pieces of wood shaped 3 x 2, selling for a price of 3 * 10 = 30.
// - 1 piece of wood shaped 1 x 4, selling for a price of 1 * 2 = 2.
// This obtains a total of 30 + 2 = 32 money earned.
// It can be shown that 32 is the maximum amount of money 
// that can be earned.
// Notice that we cannot rotate the 1 x 4 piece of wood to obtain 
// a 4 x 1 piece of wood.

// Constraints:
// 1 <= m, n <= 200
// 1 <= prices.length <= 2 * 104
// prices[i].length == 3
// 1 <= hi <= m
// 1 <= wi <= n
// 1 <= pricei <= 106
// All the shapes of wood (hi, wi) are pairwise distinct.

var sellingWood = function(m, n, prices) 
{
    const maxProfit = Array(m + 1).fill(null).map(_ => Array(n + 1).fill(0));

    for(let p of prices)
    {
        maxProfit[p[0]][p[1]] = p[2];
    }

    for (let h = 1; h <= m; ++h) 
    {
        for (let w = 1; w <= n; ++w) 
        {
            for (let a = 1; a <= Math.floor(h / 2); ++a)
            {
                maxProfit[h][w] = Math.max(maxProfit[h][w], maxProfit[a][w] + maxProfit[h - a][w]);
            }
            for (let a = 1; a <= Math.floor(w / 2); ++a)
            {
                maxProfit[h][w] = Math.max(maxProfit[h][w], maxProfit[h][a] + maxProfit[h][w - a]);
            }
        }
    }
    return maxProfit[m][n];
};

console.log(sellingWood(3,5,[[1,4,2],[2,2,7],[2,1,3]]))

// Initial 2D array to record all prices according to width and height
// [
//     [ 0, 0, 0, 0, 0, 0 ],
//     [ 0, 0, 0, 0, 0, 0 ],
//     [ 0, 0, 0, 0, 0, 0 ],
//     [ 0, 0, 0, 0, 0, 0 ]
// ]

// After filling values provided in prices array
// [
//     [ 0, 0, 0, 0, 0, 0 ],
//     [ 0, 0, 0, 0, 2, 0 ],
//     [ 0, 3, 7, 0, 0, 0 ],
//     [ 0, 0, 0, 0, 0, 0 ]
// ]

// Will start iterating through each sub-array 1 by 1
// Iteration indexes 1,1 -> m,n
// Where m = height of wood
//   And n = width of wood
// In this case m = 3 and n = 5
// So 1,1 -> 3,5 
// Because minimum and maximum wood dimensions are 1x1 and 3x5 respectively
// [
//         0   1   2   3   4   5
//     0 [ 0,  0,  0,  0,  0,  0 ],
//     1 [ 0, *0,  0,  0,  2,  0 ],         //*item is starting 
//     2 [ 0,  3,  7,  0,  0,  0 ],
//     3 [ 0,  0,  0,  0,  0, #0 ]          //#item is the end 
// ]

// For each value of maxProfit[i][j] we check in 2 loops:
// Loop 1 to check for various heights:
// Starting from 1 to h/2

// Loop 2 to check for various widths:
// Starting from 1 to w/2

// Note: We check only till h/2 and w/2 because size patterns start repeating 
// after half height and width

// At the end, return maxProfit[m][n]
// Which is maxProfit[3][5] = 19 in this case
// [
//        0   1   2   3   4   5
//    0 [ 0,  0,  0,  0,  0,  0 ],
//    1 [ 0,  0,  0,  0,  2,  2 ],
//    2 [ 0,  3,  7, 10, 14, 17 ],
//    3 [ 0,  3,  7, 10, 16, 19 ]
// ]