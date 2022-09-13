// You are given an integer n. There are n rooms numbered from 0 to n - 1.

// You are given a 2D integer array meetings where 
// meetings[i] = [starti, endi] means that a meeting will be held 
// during the half-closed time interval [starti, endi). 
// All the values of starti are unique.

// Meetings are allocated to rooms in the following manner:
// Each meeting will take place in the unused room with the lowest number.
// If there are no available rooms, the meeting will be delayed until a room becomes free. 
// The delayed meeting should have the same duration as the original meeting.
// When a room becomes unused, meetings that have an earlier original start time should be given the room.
// Return the number of the room that held the most meetings. 
// If there are multiple rooms, return the room with the lowest number.

// A half-closed interval [a, b) is the interval between a and b including a and not including b.

 

// Example 1:
// Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
// Output: 0
// Explanation:
// - At time 0, both rooms are not being used. The first meeting starts in room 0.
// - At time 1, only room 1 is not being used. The second meeting starts in room 1.
// - At time 2, both rooms are being used. The third meeting is delayed.
// - At time 3, both rooms are being used. The fourth meeting is delayed.
// - At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
// - At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
// Both rooms 0 and 1 held 2 meetings, so we return 0. 

// Example 2:
// Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
// Output: 1
// Explanation:
// - At time 1, all three rooms are not being used. The first meeting starts in room 0.
// - At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
// - At time 3, only room 2 is not being used. The third meeting starts in room 2.
// - At time 4, all three rooms are being used. The fourth meeting is delayed.
// - At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
// - At time 6, all three rooms are being used. The fifth meeting is delayed.
// - At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
// Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1. 


// Constraints:
// 1 <= n <= 100
// 1 <= meetings.length <= 105
// meetings[i].length == 2
// 0 <= starti < endi <= 5 * 105
// All the values of starti are unique.

// Approach 1 - Using Self created Priority Queue 
// Time Complexity: O(m log(m) + m log(n))
// Space Complexity: O(n)
// 
// class PriorityQueue {
//     constructor(comparator = ((a, b) => a - b)) 
//     {
//         this.values = [];
//         this.comparator = comparator;
//         this.size = 0;
//     }

//     add(val)
//     {
//         this.size++;
//         this.values.push(val);
//         let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);

//         while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0)
//         {
//             [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
//             idx = parentIdx;
//             parentIdx = Math.floor((idx - 1) / 2);
//         }
//     }

//     remove() 
//     {
//         if (this.size === 0) return -1;
//         this.size--;
//         if (this.size === 0) return this.values.pop();
//         let removedVal = this.values[0];
//         this.values[0] = this.values.pop();
//         let idx = 0;

//         while (idx < this.size && idx < Math.floor(this.size / 2)) 
//         {
//             let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
//             if(rightIdx === this.size)
//             {
//                 if(this.comparator(this.values[leftIdx], this.values[idx]) > 0)
//                 {
//                     break;
//                 }

//                 [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
//                 idx = leftIdx;
//             } 
//             else if(this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0)
//                 {
//                     if(this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0)
//                     {
//                         [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
//                         idx = leftIdx;
//                     }
//                     else
//                     {
//                         [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
//                         idx = rightIdx;
//                     }
//                 } 
//                 else 
//                 {
//                     break;
//                 }
//         }
      
//         return removedVal;
//     }

//     top()
//     {
//         return this.values[0];
//     }

//     isEmpty()
//     {
//         return this.size === 0;
//     }
// }

// var mostBooked = function(n, meetings) {
//     let available = new PriorityQueue((a, b) => a[0] - b[0]); // [room index, next available time]
//     let occupied = new PriorityQueue((a, b) => a[1] - b[1]);

//     for(let i = 0; i < n; i++)
//     {
//         available.add([i, 0]);
//     }
  
//     meetings.sort((a, b) => a[0] - b[0]);
//     let count = Array(n).fill(0);

//     for (let [start, end] of meetings)
//     {
//         let duration = end - start;

//         while(!occupied.isEmpty() && occupied.top()[1] <= start) 
//         {
//             available.add(occupied.remove());
//         }
        
//         if(available.isEmpty())
//         {
//             let [roomIndex, availableTime] = occupied.remove();
//             available.add([roomIndex, availableTime]);

//             while(!occupied.isEmpty() && occupied.top()[1] === availableTime)
//             {
//                 available.add(occupied.remove());
//             }
//         }

//         let [roomIndex, availableTime] = available.remove();
//         count[roomIndex]++;
//         occupied.add([roomIndex, Math.max(start, availableTime) + duration]);
//     }
    
//     let ans = 0;

//     for(let i = 1; i < n; i++)
//     {
//         if(count[i] > count[ans])
//         {
//             ans = i;
//         }
//     }
//     return ans;
// };


// Approach 2 - Using built-in Priority Queue
// var mostBooked = function(n, meetings) {
//     meetings.sort((a,b)=> a[0]-b[0]);

//     // available: sort by index
//     const q1 = new MinPriorityQueue({ priority: (el) => el[0]}); 

//     // in use: sort by endTime
//     const q2 = new MinPriorityQueue({ priority: (el) => el[1]*500000 + el[0]}); 
    
//     for(let i=0; i<n; i++)
//     {
//         q1.enqueue([i, 0]);
//     }

//     const res = new Array(n).fill(0);

//     for(let [startTime,endTime] of meetings)
//     {
//         // 1. check any possible available room again before startTime
//         while(!q2.isEmpty() && startTime >= q2.front().element[1])
//         {
//             q1.enqueue([...q2.dequeue().element]);
//         }

//         // 2. check if any empty room can be used
//         if(!q1.isEmpty())
//         {
//             const cur = q1.dequeue().element;
//             cur[1] = endTime;
//             res[cur[0]]++;
//             q2.enqueue([...cur]);
//         }
//         else
//         {
//             // 3. if no empty room, always use the 1st one that finish in future
//             const first = q2.dequeue().element;
//             first[1] += endTime - startTime;
//             res[first[0]]++;
//             q2.enqueue([...first]);
//         }
//     }

//     // 4. return the max room index
//     let j;
//     let max = 0;

//     for(let i=0; i<n; i++)
//     {
//         if(res[i] > max)
//         {
//             j = i;
//             max = res[i];
//         }
//     }
//     return j;
// };


// Approach 3
var mostBooked = function(n, meetings) {

    let roomsMeetingCount=[], roomsSchedule=[];
    
    //Intially all the rooms are available and meeting count for eacy room is set to 0
    for(let i=0;i<n;i++)
    {
        roomsSchedule[i]=-1;
        roomsMeetingCount[i]=0;
    }
    
    //Sort meeting by their start time
    meetings.sort(function(a,b){return a[0]-b[0]});
    
    for(let i=0;i<meetings.length;i++)
    {
        let start =  meetings[i][0];
        let end = meetings[i][1];
        let earliestRoom=-1,earliestTime=Number.MAX_SAFE_INTEGER,freeRoomFound=false;

        for(let i=0; i<n; i++)
        {
            //This is the room with the smallest index which is free on or before start time of the current meeting
            if(roomsSchedule[i]<=start)
            {
                roomsMeetingCount[i]++;
                roomsSchedule[i]=end;           //This room will be avialable at 'end' time of the current meeting.
                freeRoomFound=true;
                break;
            }

            //Let's keep track of the "room with smallest index and being available at the earliest"
            if(roomsSchedule[i]<earliestTime)
            {
                earliestTime = roomsSchedule[i];
                earliestRoom = i;
            }
        }

        //If we couldn't find any meeting room then we will wait for the "room with smallest index and being available at the earliest" 
        if(freeRoomFound===false)
        {
            roomsSchedule[earliestRoom]+=(end-start);       //Time to vacant for the room will be increased by the duration of current meeting.
            roomsMeetingCount[earliestRoom]++;
        }
    }

    //Now we have count of meetings for each meeting. Can just need to find the room index with the maximum number of meetings.
    let max=0,maxIdx=-1;

    for(let i=0;i<n;i++)
    {
        if(roomsMeetingCount[i]>max)
        {
            max = roomsMeetingCount[i];
            maxIdx=i;
        }
    }
    return maxIdx;
};

console.log(mostBooked(2,[[0,10],[1,5],[2,7],[3,4]]))