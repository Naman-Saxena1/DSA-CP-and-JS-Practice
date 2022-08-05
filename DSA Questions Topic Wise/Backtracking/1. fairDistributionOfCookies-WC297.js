// You are given an integer array cookies, 
// where cookies[i] denotes the number of cookies in the ith bag. 
// You are also given an integer k that denotes the number of children 
// to distribute all the bags of cookies to. All the cookies in the 
// same bag must go to the same child and cannot be split up.

// The unfairness of a distribution is defined as 
// the maximum total cookies obtained by a single child in the distribution.

// Return the minimum unfairness of all distributions.

// Example 1:
// Input: cookies = [8,15,10,20,8], k = 2
// Output: 31
// Explanation: One optimal distribution is [8,15,8] and [10,20]
// - The 1st child receives [8,15,8] which has a total of 8 + 15 + 8 = 31 cookies.
// - The 2nd child receives [10,20] which has a total of 10 + 20 = 30 cookies.
// The unfairness of the distribution is max(31,30) = 31.
// It can be shown that there is no distribution with an unfairness less than 31.

// Example 2:
// Input: cookies = [6,1,3,2,2,4,1,2], k = 3
// Output: 7
// Explanation: One optimal distribution is [6,1], [3,2,2], and [4,1,2]
// - The 1st child receives [6,1] which has a total of 6 + 1 = 7 cookies.
// - The 2nd child receives [3,2,2] which has a total of 3 + 2 + 2 = 7 cookies.
// - The 3rd child receives [4,1,2] which has a total of 4 + 1 + 2 = 7 cookies.
// The unfairness of the distribution is max(7,7,7) = 7.
// It can be shown that there is no distribution with an unfairness less than 7.

// Constraints:
// 2 <= cookies.length <= 8
// 1 <= cookies[i] <= 105
// 2 <= k <= cookies.length 

var distributeCookies = function(cookies, k) {
    let ans = Infinity;
    let bags = Array(k).fill(0)
    function backtrack(i) 
    {
        
        if(i >= cookies.length) 
        {
            let max = -Infinity;
            for(let bag of bags) 
            {
                max = Math.max(max, bag);
            }
            ans = Math.min(ans, max);
            return;
        }
        for(let j=0;j<k;j++) {
            bags[j] += cookies[i];      
            backtrack(i+1);
            bags[j] -= cookies[i];
            if(bags[j]==0) 
            {
                break;
            }
        }
    }
    backtrack(0);
    return ans;
};

console.log(distributeCookies([8,15,10],3))

// Backtracking
// [  0,  0,  0 ]
// [  8,  0,  0 ]  
// [ 23,  0,  0 ] 
// [ 33,  0,  0 ] 
// [ 23, 10,  0 ]
// [ 23,  0, 10 ]
// [  8, 15,  0 ] 
// [ 18, 15,  0 ]
// [  8, 25,  0 ] 
// [  8, 15, 10 ]
// [  8,  0, 15 ] 
// [ 18,  0, 15 ]
// [  8, 10, 15 ]
// [  8,  0, 25 ]
// [  0,  8,  0 ]
// [ 15,  8,  0 ]
// [ 25,  8,  0 ]
// [ 15, 18,  0 ]
// [ 15,  8, 10 ]
// [  0, 23,  0 ]
// [ 10, 23,  0 ]
// [  0, 33,  0 ]
// [  0, 23, 10 ]
// [  0,  8, 15 ]
// [ 10,  8, 15 ]
// [  0, 18, 15 ]
// [  0,  8, 25 ]
// [  0,  0,  8 ]
// [ 15,  0,  8 ]
// [ 25,  0,  8 ]
// [ 15, 10,  8 ]
// [ 15,  0, 18 ]
// [  0, 15,  8 ]
// [ 10, 15,  8 ]
// [  0, 25,  8 ]
// [  0, 15, 18 ]
// [  0,  0, 23 ]
// [ 10,  0, 23 ]
// [  0, 10, 23 ]
// [  0,  0, 33 ]
// 15

// Explaination from line 56-59
// Optimization
// Let cookies = [8,15,10] and k=2.
// Then the subsets we calculate are [33,0] , [23,10], [18,15], [8,25], [25,8], [15,18], [10,23], [0,33].
// Here we observe [33,0] and [0,33] refers to same subset and similary other.
// So we can reduce the duplicates by breaking the loop if bags[i] is equal to 0, 
// as it will be covered in the other subset.
// In the for loop of above code, we break the loop if bags[i] is equal to 0, 
// because without this line we are just calculating the same subset with different combinations which is unnecessary.
// So now the subsets we calculate will only be: [33,0] , [23,10], [18,15], [8,25].
