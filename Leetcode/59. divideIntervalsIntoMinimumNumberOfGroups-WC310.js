// You are given a 2D integer array intervals where 
// intervals[i] = [lefti, righti] represents the inclusive 
// interval [lefti, righti].

// You have to divide the intervals into one or more groups 
// such that each interval is in exactly one group, 
// and no two intervals that are in the same group intersect each other.

// Return the minimum number of groups you need to make.

// Two intervals intersect if there is at least one common number 
// between them. For example, the intervals [1, 5] and [5, 8] intersect.



// Example 1:
// Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
// Output: 3
// Explanation: We can divide the intervals into the following groups:
// - Group 1: [1, 5], [6, 8].
// - Group 2: [2, 3], [5, 10].
// - Group 3: [1, 10].
// It can be proven that it is not possible to divide the intervals into fewer than 3 groups.

// Example 2:
// Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
// Output: 1
// Explanation: None of the intervals overlap, so we can put all of them in one group.
 

// Constraints:
// 1 <= intervals.length <= 105
// intervals[i].length == 2
// 1 <= lefti <= righti <= 106


// Approach 1 
// Giving Wrong Answer for Test case 13/35
// Creating 20 groups rather than 19
// Probably because it is 1 way of creating groups
// but not the most optimal way to create LEAST amount of groups
// 
// var minGroups = function(intervals) {
//     let groups = [[]], isIntersecting;
    
//     for(let [start,end] of intervals)
//     {
//         if(groups[0].length==0)
//         {
//             groups[0].push([start,end])
//         }
//         else
//         {
//             for(let i=0; i<groups.length; i++)
//             {
//                 isIntersecting = false
//                 for(j=0; j<groups[i].length; j++)
//                 {
//                     if(
//                         (groups[i][j][0]<=start && start<=groups[i][j][1])
//                         || (groups[i][j][0]<=end && end<=groups[i][j][1])
//                         || (groups[i][j][0]>=start && end>=groups[i][j][1])
//                         || (groups[i][j][0]<=start && end<=groups[i][j][1])
//                     )
//                     {
//                         isIntersecting = true
//                         break;
//                     }
//                 }
                
//                 if(isIntersecting)
//                 {
//                     if(i===groups.length-1)
//                     {
//                         groups.push([[start,end]])
//                         break;
//                     }
//                     continue;
//                 }
//                 else
//                 {
//                     groups[i].push([start,end])
//                     break;
//                 }
//             }
//         }
//     }
//     console.log(groups)
//     return groups.length
// };

// console.log(minGroups(
//     [[229966,812955],[308778,948377],[893612,952735],[395781,574123],
//     [478514,875165],[766513,953839],[460683,491583],[133951,212694],
//     [376149,838265],[541380,686845],[461394,568742],[804546,904032],
//     [422466,467909],[557048,758709],[680460,899053],[110928,267321],
//     [470258,650065],[534607,921875],[292993,994721],[645020,692560],
//     [898840,947977],[33584,330630],[903142,970252],[17375,626775],
//     [804313,972796],[582079,757160],[785002,987823],[599263,997719],
//     [486500,527956],[566481,813653],[211239,863969],[808577,883125],
//     [21880,516436],[264747,412144],[327175,772333],[984807,988224],
//     [758172,916673],[23583,406006],[954674,956043],[379202,544291],
//     [688869,785368],[841735,983869],[99836,916620],[332504,740696],
//     [740840,793924],[896607,920924],[868540,922727],[125849,550941],
//     [433284,685766]]
// ))


// Approach 2 - Using Min Priority Queue (Min Heap)
const minGroups = (intervals) => {
    intervals.sort((x, y) => x[0] - y[0]);
    let pq = new MinPriorityQueue();
    
    for(const [l, r] of intervals)
    {
        if (pq.size() && pq.front().element < l)
        {
            pq.dequeue();
        }

        pq.enqueue(r);
    }
    return pq.size();
};

console.log(minGroups([[5,10],[6,8],[1,5],[2,3],[1,10]]))