// On day 1, one person discovers a secret.
// You are given an integer delay, 
// which means that each person will share the secret with a new person 
// every day, starting from delay days after discovering the secret. 
// You are also given an integer forget, which means that each person will 
// forget the secret forget days after discovering it. 
// A person cannot share the secret on the same day they forgot it, 
// or on any day afterwards.
// Given an integer n, return the number of people who know the 
// secret at the end of day n. Since the answer may be very large, 
// return it modulo 109 + 7.


// Example 1:
// Input: n = 6, delay = 2, forget = 4
// Output: 5
// Explanation:
// Day 1: Suppose the first person is named A. (1 person)
// Day 2: A is the only person who knows the secret. (1 person)
// Day 3: A shares the secret with a new person, B. (2 people)
// Day 4: A shares the secret with a new person, C. (3 people)
// Day 5: A forgets the secret, and B shares the secret with a new person, D. (3 people)
// Day 6: B shares the secret with E, and C shares the secret with F. (5 people)

// Example 2:
// Input: n = 4, delay = 1, forget = 3
// Output: 6
// Explanation:
// Day 1: The first person is named A. (1 person)
// Day 2: A shares the secret with B. (2 people)
// Day 3: A and B share the secret with 2 new people, C and D. (4 people)
// Day 4: A forgets the secret. B, C, and D share the secret with 3 new people. (6 people)

// Constraints:
// 2 <= n <= 1000
// 1 <= delay < forget <= n



// Approach 1
var peopleAwareOfSecret = function(n, delay, forget) {
    const mod = 1e9 + 7;
    let dp = Array(n + 1).fill(0), res = 0; 
    dp[1] = 1;
    
    for (let d = 2; d <= n; d++) {
        for (let i = 1; i < d; i++) { 
            if (d - i >= delay && d - i < forget) { 
                dp[d] += dp[i];
                dp[d] %= mod;
            }
        }
    }
    
    for (let i = 1; i <= n; i++) 
    {
        if (n - i < forget) res = (res + dp[i]) % mod;
    }
    return res;
    
};

console.log(peopleAwareOfSecret(6,2,4))

// n = 6    -> Day on which we want to count
// delay = 2
// forget = 4

// dp = [0, 1, 0, 1, 1, 1, 2]       -> Represents number of who discovered secret on index day
// Day      1  2  3  4  5  6

// In next for loop we count number of people who would NOT forget secret on day 6
// If 6 - i < forget, people on index i will remember secret on day 6
// dp = [0, 1, 0, 1, 1, 1, 2]
// Day      1  2  3  4  5  6
//                1 +1 +1 +2 = 5 people will remember