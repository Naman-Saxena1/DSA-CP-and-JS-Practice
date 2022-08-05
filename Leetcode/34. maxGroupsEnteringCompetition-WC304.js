// You are given a positive integer array grades which represents the grades
// of students in a university. 
// You would like to enter all these students into a competition in 
// ordered non-empty groups, such that the ordering meets the following conditions:

// The sum of the grades of students in the ith group is less than the 
// sum of the grades of students in the (i + 1)th group, for all groups 
// (except the last).
// The total number of students in the ith group is less than the 
// total number of students in the (i + 1)th group, for all groups 
// (except the last).
// Return the maximum number of groups that can be formed.



// Example 1:
// Input: grades = [10,6,12,7,3,5]
// Output: 3
// Explanation: The following is a possible way to form 3 groups of students:
// - 1st group has the students with grades = [12]. Sum of grades: 12. Student count: 1
// - 2nd group has the students with grades = [6,7]. Sum of grades: 6 + 7 = 13. Student count: 2
// - 3rd group has the students with grades = [10,3,5]. Sum of grades: 10 + 3 + 5 = 18. Student count: 3
// It can be shown that it is not possible to form more than 3 groups.

// Example 2:
// Input: grades = [8,8]
// Output: 1
// Explanation: We can only form 1 group, 
// since forming 2 groups would lead to an equal number of students in both groups.


// Constraints:
// 1 <= grades.length <= 105
// 1 <= grades[i] <= 105


// Approach 1
// var maximumGroups = function(grades) {
//     let total = 0, k = 0, n = grades.length;
    
//     while(total+k+1<=n)
//     {
//         total += ++k
//     }
    
//     return k

//     // Time Complexity  - O(sqrt(n))
//     // Space Complexity - O(1) 
// };


// Approach 2
// var maximumGroups = function(grades) {
//     let n =  grades.length;
//     let f = 1;
//     while(n>0)
//     {
//         if(n-f<=f){
//             break;
//         }
//         n = n-f;
//         f++;
//     }

//     return f;

//     // Time Complexity  - O(sqrt(n))
//     // Space Complexity - O(1) 
// };

// Approach 3 - Using Binary Search
var maximumGroups = function(grades) {

    let left = 0, k, right = 446, n = grades.length;

    while (left < right) 
    {
        k = Math.floor( (left + right + 1) / 2 )
        
        if (k * (k + 1) / 2 > n) 
        {
            right = k - 1;
        } 
        else 
        {
            left = k;
        }
    }

    return left;

    // Time Complexity  - O(log(n))
    // Space Complexity - O(1) 
}

// Approach 4
// var maximumGroups = function(grades) {
//     let n = grades.length;
//     return Math.floor((-1+Math.sqrt(1+4*2*n))/2)

//     // Time Complexity  - O(logn)
//     // Space Complexity - O(1) 
// };
// https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition/discuss/2358236/Explanation-of-formula-with-proof-and-image-JavaC%2B%2BPython


console.log(maximumGroups([10,6,12,7,3,5]))