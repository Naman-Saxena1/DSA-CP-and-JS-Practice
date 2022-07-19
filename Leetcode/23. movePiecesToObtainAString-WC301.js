// You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:

// The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
// The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
// Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.


// Example 1:
// Input: start = "_L__R__R_", target = "L______RR"
// Output: true
// Explanation: We can obtain the string target from start by doing the following moves:
// - Move the first piece one step to the left, start becomes equal to "L___R__R_".
// - Move the last piece one step to the right, start becomes equal to "L___R___R".
// - Move the second piece three steps to the right, start becomes equal to "L______RR".
// Since it is possible to get the string target from start, we return true.

// Example 2:
// Input: start = "R_L_", target = "__LR"
// Output: false
// Explanation: The 'R' piece in the string start can move one step to the right to obtain "_RL_".
// After that, no pieces can move anymore, so it is impossible to obtain the string target from start.

// Example 3:
// Input: start = "_R", target = "R_"
// Output: false
// Explanation: The piece in the string start can move only to the right, 
// so it is impossible to obtain the string target from start.


// Constraints:
// n == start.length == target.length
// 1 <= n <= 105
// start and target consist of the characters 'L', 'R', and '_'.


var canChange = function(start, target) 
{
    let n=target.length;
    let i=0,j=0;
    
    while(i<=n && j<=n)
    {
        // Finding next letter
        // Keep on iterating till we find L/R 
        // or till we reach array out of bound(last index + 1)
        while(i<n && start[i]=='_') 
        {
            i++;
        }
        while(j<n && target[j]=='_')
        { 
            j++
        }

        // If anyone of them is out of bound 
        // or if both of them are out of bound
        // Only 1 of them is out of bound and other is on a letter, can't match 
        // -> return false
        // Both of them are out of bound, already matched
        // -> return true 
        if(i==n || j==n)
        {
            return i==n && j==n;
        }
            
        // From above loops we are certain about these points:
        // 1. Both i and j are at either L or R
        // 2. Non of them are out of array bound/ Both are inside array
        // 3. Both of them have same amount of letters to the left of current letter
        // 
        // Now there can these scenarios:
        // 1) i -> L, j -> L
        // 2) i -> R, j -> R
        // 3) i -> L, j -> R
        // 4) i -> R, j -> L 
        // 
        // return false in case 3) or 4), 
        // because there is no way we could match start and target 
        // when currentLetters are different
        // 
        // When they are same currentLetters, 
        // they may or may not match depending indexes 
        // -> We check this in next if-else validations
        if(start[i]!=target[j])
        {
            return false;
        }

        // Both are either 'L' or 'R'
        if(target[j]=='L')
        {
            // Both are 'L'
            // If index i of start is less than index j of target
            // That means we have condition similar as below one:
            // 
            // start  : "L _ _"
            //           i
            // target : "_ _ L"
            //               j
            //  
            // Basically start L is before target L 
            // and since L can only move towards left, we can't reach target
            // Hence return false 
            if(i<j)
            {
                return false;
            }
        }
        else
        {
            // Both are 'R'
            // If index i of start is greater than index j of target
            // That means we have condition similar as below one:
            // 
            // start  : "_ _ R"
            //               i
            // target : "R _ _"
            //           j
            //  
            // Basically start R is after target R 
            // and since R can only move towards right, we can't reach target
            // Hence return false 
            if(j<i)
            {
                return false;
            }
        }
            
        i++;
        j++;
    }
    
    return true;
};


// start  = "_ L _ _ R _ _ R _" 
// target = "L _ _ _ _ _ _ R R"


// start  = "_ L _ _ R _ _ R _"
//             i

// target = "L _ _ _ _ _ _ R R"
//           j