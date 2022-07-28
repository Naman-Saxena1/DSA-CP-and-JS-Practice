// Design a food rating system that can do the following:

// Modify the rating of a food item listed in the system.
// Return the highest-rated food item for a type of cuisine in the system.
// Implement the FoodRatings class:

// FoodRatings(String[] foods, String[] cuisines, int[] ratings) 
// Initializes the system. The food items are described by foods, 
// cuisines and ratings, all of which have a length of n.
// foods[i] is the name of the ith food,
// cuisines[i] is the type of cuisine of the ith food, and
// ratings[i] is the initial rating of the ith food.
// void changeRating(String food, int newRating) 
// Changes the rating of the food item with the name food.
// String highestRated(String cuisine) 
// Returns the name of the food item that has the highest rating 
// for the given type of cuisine. 
// If there is a tie, return the item with the lexicographically smaller name.
// Note that a string x is lexicographically smaller than string y 
// if x comes before y in dictionary order, that is, 
// either x is a prefix of y, or if i is the first position 
// such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

 

// Example 1:
// Input
// ["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
// [[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
// Output
// [null, "kimchi", "ramen", null, "sushi", null, "ramen"]

// Explanation
// FoodRatings foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
// foodRatings.highestRated("korean"); // return "kimchi"
//                                     // "kimchi" is the highest rated korean food with a rating of 9.
// foodRatings.highestRated("japanese"); // return "ramen"
//                                       // "ramen" is the highest rated japanese food with a rating of 14.
// foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
// foodRatings.highestRated("japanese"); // return "sushi"
//                                       // "sushi" is the highest rated japanese food with a rating of 16.
// foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16.
// foodRatings.highestRated("japanese"); // return "ramen"
//                                       // Both "sushi" and "ramen" have a rating of 16.
//                                       // However, "ramen" is lexicographically smaller than "sushi".


// Constraints:
// 1 <= n <= 2 * 104
// n == foods.length == cuisines.length == ratings.length
// 1 <= foods[i].length, cuisines[i].length <= 10
// foods[i], cuisines[i] consist of lowercase English letters.
// 1 <= ratings[i] <= 108
// All the strings in foods are distinct.
// food will be the name of a food item in the system across all calls to changeRating.
// cuisine will be a type of cuisine of at least one food item in the system across all calls to highestRated.
// At most 2 * 104 calls in total will be made to changeRating and highestRated.

const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');

// Approach 1
function FoodRatings(foods, cuisines, ratings)
{
    let n = foods.length, cm = new Map(), fm = new Map(); 
    console.log("foods: ", foods, "cuisines: ",cuisines, "ratings: ",ratings)
    
    for (let i = 0; i < n; i++) 
    {
        fm.set(foods[i], [cuisines[i], ratings[i]]);
        
        // If cuisine doesn't exist in cm, 
        // add cuisine as key and pq priority queue in cm
        if (!cm.has(cuisines[i])) 
        {
            let pq = new MaxPriorityQueue({
                compare: (x, y) => {                    //Custom comparator to maintain priority queue
                    if (x[0] != y[0])
                    {
                        return y[0] - x[0];             // first priority: high rate comes first
                    }
                    return x[1].localeCompare(y[1]);    // second priority: lexical smaller comes first
                }
            });
            cm.set(cuisines[i], pq);
        }

        // In cm get priority queue of that cuisine
        // and add food and its rating
        // pq will auto sort them according to Custom comparator
        cm.get(cuisines[i]).enqueue([ratings[i], foods[i]])
    }
    
    return { changeRating, highestRated }
    
    function changeRating(food, newRating) 
    {
        let cur = fm.get(food), 
        cuisine = cur[0];
        cur[1] = newRating;
        fm.set(food, cur);
        cm.get(cuisine).enqueue([newRating, food]);
    }
    
    function highestRated(cuisine) 
    {
        // Get pq of target cuisine
        let pq = cm.get(cuisine);

        // Keep removing pq [rating, food] entries
        // If food rating in fm doesn't match with rating of food
        while ( fm.get(pq.front()[1])[1] != pq.front()[0]) pq.dequeue();     // lazy remove
        
        // Finally return food where entry matched 
        return pq.front()[1];
    }
}

let foods    = ["kimchi",     "miso",    "sushi", "moussaka",    "ramen", "bulgogi"]
let cuisines = ["korean", "japanese", "japanese",    "greek", "japanese",  "korean"]
let ratings  = [       9,         12,          8,         15,         14,         7]


var obj = new FoodRatings(foods, cuisines, ratings)

let food = "sushi"
let newRating =  16
obj.changeRating(food,newRating)

let cuisine = "japanese"
let ans_2 = obj.highestRated(cuisine)
console.log("Highest Rated: ",ans_2)


// https://www.youtube.com/watch?v=32rklOClFpo
// https://www.youtube.com/watch?v=HqPJF2L5h9U