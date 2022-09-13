// You are given two positive integers startPos and endPos. 
// Initially, you are standing at position startPos on an 
// infinite number line. With one step, 
// you can move either one position to the left, or one position to the right.

// Given a positive integer k, return the number of different ways to 
// reach the position endPos starting from startPos, such that you 
// perform exactly k steps. Since the answer may be very large, 
// return it modulo 109 + 7.

// Two ways are considered different if the order of the steps made 
// is not exactly the same.

// Note that the number line includes negative integers.


// Example 1:
// Input: startPos = 1, endPos = 2, k = 3
// Output: 3
// Explanation: We can reach position 2 from 1 in exactly 3 steps in three ways:
// - 1 -> 2 -> 3 -> 2.
// - 1 -> 2 -> 1 -> 2.
// - 1 -> 0 -> 1 -> 2.
// It can be proven that no other way is possible, so we return 3.

// Example 2:
// Input: startPos = 2, endPos = 5, k = 10
// Output: 0
// Explanation: It is impossible to reach position 5 from position 2 in exactly 10 steps.


// Constraints:
// 1 <= startPos, endPos, k <= 1000


// Approach 1 - Top-down DP
// let dp = [], mod = 1000000007;

// for(let i=0; i<1002; i++)
// {
//     dp.push(Array.from({length:1001},v=>0))
// }

// const numberOfWays = (startPos, endPos, k) => {
//  
//     function dfs(k, d) 
//     {
//         if(k <= d)
//         {
//             return d == k;
//         }
//
//         if(dp[k][d] == 0)
//         {   
//             dp[k][d] = (1 + dfs(k - 1, d + 1) + dfs(k - 1, Math.abs(d - 1))) % mod;
//         }
//         return dp[k][d] - 1;
//     } 
//
//     return dfs(k, Math.abs(startPos - endPos));
// }

// We are adding extra 1 in dp[k][d] and then while returning reducing 1
// Because in the recursion it used if dp[d][k] == 0 to determine 
// whether we should enter the recursion or not. But there're some cells in the 
// dp table are actually 0 because there's no way to do it. But if we label these 
// cells with 0 then for each time we enter such cells we will enter the recursion again 
// and this may cause TLE. Therefore we add 1 for each cell and avoid such situation and 
// for each time when we need a value in a cell we simple take the value and minus 1.





// Approach 2 - Bottom-Up DP
// let dp = [], mod = 1000000007;

// for(let i=0; i<1002; i++)
// {
//     dp.push(Array.from({length:1001},v=>0))
// }

// const numberOfWays = (startPos, endPos, k) => {

//     if(dp[1][1] == 0)
//     {
//         for(let k=1; k<=1000; ++k) 
//         {
//             dp[k][k] = 1;

//             for (let i=0; i<k; ++i)
//             {
//                 dp[k][i] = (dp[k - 1][Math.abs(i - 1)] + dp[k - 1][i + 1]) % mod;
//             }
//         }
//     }

//     return dp[k][Math.abs(startPos - endPos)];
// }



// Approach 3 - nCr
const ll = BigInt, mod = ll(1e9 + 7), N = 1005;
let fact, ifact, inv;

const comb_init = () => {

    fact = Array(N).fill(0);
    ifact = Array(N).fill(0);
    inv = Array(N).fill(0);
    fact[0] = ifact[0] = inv[1] = 1n;

    for(let i=2; i<N; i++)
    {
        inv[i] = (mod - mod / ll(i)) * inv[mod % ll(i)] % mod;
    }

    for(let i=1; i<N; i++) 
    {
        fact[i] = fact[i - 1] * ll(i) % mod;
        ifact[i] = ifact[i - 1] * inv[i] % mod;
    }
};

const comb = (n, r) => {
    if (n < r || r < 0) return 0;
    return fact[n] * ifact[r] % mod * ifact[n - r] % mod;
};

const numberOfWays = (startPos, endPos, k) => {
    comb_init();
    let res = 0n;

    for(let i=0; i<=k; i++)
    {
        let moveRight = i, moveLeft = k - i;

        if(startPos + moveRight - moveLeft == endPos)
        {
            res += comb(k, i);
        }
    }
    return res;
};


console.log(numberOfWays(1,2,3))


// Further reading:
// https://cp-algorithms.com/algebra/module-inverse.html#finding-the-modular-inverse-using-binary-exponentiation
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/modular-inverses
// https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/discuss/2527267/Top-Down-%2B-Bottom-Up-DP
// https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/discuss/2527687/javascript-combination