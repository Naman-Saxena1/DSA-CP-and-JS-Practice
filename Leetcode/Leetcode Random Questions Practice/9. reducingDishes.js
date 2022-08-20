// A chef has collected data on the satisfaction level of his n dishes. 
// Chef can cook any dish in 1 unit of time.

// Like-time coefficient of a dish is defined as the time taken to cook 
// that dish including previous dishes multiplied by 
// its satisfaction level i.e. time[i] * satisfaction[i].

// Return the maximum sum of like-time coefficient that the chef can obtain 
// after dishes preparation.

// Dishes can be prepared in any order and the chef can discard some dishes 
// to get this maximum value.


// Example 1:
// Input: satisfaction = [-1,-8,0,5,-9]
// Output: 14
// Explanation: After Removing the second and last dish, 
// the maximum total like-time coefficient will be equal to (-1*1 + 0*2 + 5*3 = 14).
// Each dish is prepared in one unit of time.

// Example 2:
// Input: satisfaction = [4,3,2]
// Output: 20
// Explanation: Dishes can be prepared in any order, (2*1 + 3*2 + 4*3 = 20)

// Example 3:
// Input: satisfaction = [-1,-4,-5]
// Output: 0
// Explanation: People do not like the dishes. No dish is prepared.

// Constraints:
// n == satisfaction.length
// 1 <= n <= 500
// -1000 <= satisfaction[i] <= 1000


// Approach 1
var maxSatisfaction = function(satisfaction) {
    
    satisfaction.sort((a,b)=>a-b)
    
    let startIndex = 0, currentLT, finalLT=0, n = satisfaction.length;
    
    while(startIndex<n)
    {
        currentLT = 0
        
        for(let i=startIndex,j=1; i<n; i++,j++)
        {
            currentLT +=  satisfaction[i]*j
        }
    
        if(finalLT<currentLT)
        {
            finalLT = currentLT
        }
    
        if(satisfaction[startIndex]>=0)
        {
            break;
        }
    
        ++startIndex
    }
    
    return finalLT

    // Time Complexity  - O(n logn) + O(n**2) -> ~ O(n**2)
    // Space Complexity - O(1)
};


// Approach 2
var maxSatisfaction = function(satisfaction) {
    
    satisfaction.sort((a,b)=>a-b)
    
    let res = 0, total = 0, n = satisfaction.length;
    
    for(let i = n - 1; i >= 0 && satisfaction[i] > -total; --i) 
    {
        total += satisfaction[i];
        res += total;
    }
    
    return res;

    // Time Complexity  - O(n logn)
    // Space Complexity - O(1)
};

console.log(maxSatisfaction([-1,-8,0,5,-9]))