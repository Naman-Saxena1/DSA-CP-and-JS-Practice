// Given an array of intervals where intervals[i] = [starti, endi], 
// merge all overlapping intervals, and return an array of the 
// non-overlapping intervals that cover all the intervals in the input.

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.


// Approach 1
function mergeSubIntervals(intervals) {
    intervals.sort((a,b)=>{
        return a[0]-b[0]
    })

    let firstIntervalStart, firstIntervalEnd, secondIntervalStart, secondIntervalEnd;
    
    for(let i=0; i<intervals.length; i++)
    {
        if(intervals[i+1]!=undefined)
        {
            firstIntervalStart = intervals[i][0]
            firstIntervalEnd   = intervals[i][1]

            for(let j=i+1; j<=intervals.length-1; j++)
            {
                secondIntervalStart = intervals[j][0]
                secondIntervalEnd   = intervals[j][1]
                
                if(firstIntervalStart==secondIntervalStart && firstIntervalEnd==secondIntervalEnd)
                {
                    intervals = [...intervals.slice(0,i),...intervals.slice(i+1)]
                    i--
                    break;
                }
                else
                {
                    if(
                        (firstIntervalEnd>=secondIntervalStart && firstIntervalEnd<=secondIntervalEnd)
                        ||(secondIntervalEnd>=firstIntervalStart && secondIntervalEnd<=firstIntervalEnd)
                    )
                    {
                        intervals[j] = [
                            (firstIntervalStart<secondIntervalStart)?firstIntervalStart:secondIntervalStart,
                            (firstIntervalEnd<secondIntervalEnd)?secondIntervalEnd:firstIntervalEnd
                        ]
                        intervals = [...intervals.slice(0,i),...intervals.slice(i+1)]
                        i--
                        break;
                    }    
                }
            }
        }
    }
    // Time complexity - O(nlogn) + O(n^2)
    // Space complexity - O(1)

    return intervals
};

console.log(mergeSubIntervals([[5,5],[1,2],[2,4],[2,3],[4,4],[5,5],[2,3],[5,6],[0,0],[5,6]]) )


// Approach 2 - Optimal Approach
function mergeSubIntervalsOptimal(intervals) {
    intervals.sort((a,b)=>{
        return a[0]-b[0]
    })
    
    let mergedIntervals = []
    let tempInterval = intervals[0]

    for(let i=0; i<intervals.length; i++)
    {
        if(tempInterval[1]>=intervals[i][0])
        {
            tempInterval[1] = tempInterval[1]<intervals[i][1]?intervals[i][1]:tempInterval[1]
        }
        else
        {
            mergedIntervals.push(tempInterval)
            tempInterval = intervals[i]
        }
    }
    mergedIntervals.push(tempInterval)
    // Time complexity - O(nlogn) + O(n)
    // O(nlogn) for sorting
    // O(n) for traversing 
    // Space complexity - O(n)

    return mergedIntervals
};

console.log(mergeSubIntervalsOptimal([[5,5],[1,2],[2,4],[2,3],[4,4],[5,5],[2,3],[5,6],[0,0],[5,6]]) )