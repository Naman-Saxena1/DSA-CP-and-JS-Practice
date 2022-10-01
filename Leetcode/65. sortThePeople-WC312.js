// You are given an array of strings names, and an array heights that consists of distinct positive integers. 
// Both arrays are of length n.

// For each index i, names[i] and heights[i] denote the name and height of the ith person.

// Return names sorted in descending order by the people's heights.

 

// Example 1:
// Input: names = ["Mary","John","Emma"], heights = [180,165,170]
// Output: ["Mary","Emma","John"]
// Explanation: Mary is the tallest, followed by Emma and John.

// Example 2:
// Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]
// Output: ["Bob","Alice","Bob"]
// Explanation: The first Bob is the tallest, followed by Alice and the second Bob.
 

// Constraints:
// n == names.length == heights.length
// 1 <= n <= 103
// 1 <= names[i].length <= 20
// 1 <= heights[i] <= 105
// names[i] consists of lower and upper case English letters.
// All the values of heights are distinct.



// Approach 1
var sortPeople = function(names, heights) {
    let arr1 = []
    
    for(let i=0; i<names.length; i++)
    {
        arr1.push([names[i],heights[i]])
    }
    
    function merge(left, right)
    {
        let arr = []
        
        while(left.length && right.length)
        {
            if(left[0][1]>=right[0][1])
            {
                arr.push(left.shift())
            }
            else
            {
                arr.push(right.shift())
            }
        }
        return [...arr,...left,...right]
    }
    
    function mergeSort(arr)
    {
        if(arr.length<2)
        {
            return arr;
        }
        
        let left = arr.splice(0,Math.floor(arr.length/2))
        
        return merge(mergeSort(left),mergeSort(arr))
    }

    // Time Complexity
    // Creating paired array -> O(n)
    // Merge Sort -> O(n logn)
    // JS map function -> O(n)
    // Total -> O(n) + O(n logn) + O(n) -> O(n logn)
    // 
    // Space Complexity - O(n)                    -> O(n)
    
    return mergeSort(arr1).map(element=>element[0])
};

console.log(sortPeople(["Mary","John","Emma"], [180,165,170]))

// Note: Can use in-built sort function for sorting