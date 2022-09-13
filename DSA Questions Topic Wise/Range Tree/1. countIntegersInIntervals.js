// Given an empty set of intervals, implement a data structure that can:

// Add an interval to the set of intervals.
// Count the number of integers that are present in at least one interval.
// Implement the CountIntervals class:

// CountIntervals() Initializes the object with an empty set of intervals.
// void add(int left, int right) Adds the interval [left, right] to the set of intervals.
// int count() Returns the number of integers that are present in at least one interval.
// Note that an interval [left, right] denotes all the integers x where left <= x <= right.


// Example 1:
// Input
// ["CountIntervals", "add", "add", "count", "add", "count"]
// [[], [2, 3], [7, 10], [], [5, 8], []]
// Output
// [null, null, null, 6, null, 8]

// Explanation
// CountIntervals countIntervals = new CountIntervals(); // initialize the object with an empty set of intervals. 
// countIntervals.add(2, 3);  // add [2, 3] to the set of intervals.
// countIntervals.add(7, 10); // add [7, 10] to the set of intervals.
// countIntervals.count();    // return 6
//                            // the integers 2 and 3 are present in the interval [2, 3].
//                            // the integers 7, 8, 9, and 10 are present in the interval [7, 10].
// countIntervals.add(5, 8);  // add [5, 8] to the set of intervals.
// countIntervals.count();    // return 8
//                            // the integers 2 and 3 are present in the interval [2, 3].
//                            // the integers 5 and 6 are present in the interval [5, 8].
//                            // the integers 7 and 8 are present in the intervals [5, 8] and [7, 10].
//                            // the integers 9 and 10 are present in the interval [7, 10].


// Constraints:
// 1 <= left <= right <= 109
// At most 105 calls in total will be made to add and count.
// At least one call will be made to count.



var CountIntervals = function () {
  this.root = new TreeNode(1, 10 ** 9);
};


CountIntervals.prototype.add = function (left, right) {
  this.root.addInterval(left, right);
};

CountIntervals.prototype.count = function () {
  return this.root.total;
};

class TreeNode {
  constructor(min, max) 
  {
    this.min = min;
    this.max = max;
    this.currentMin = -1;
    this.currentMax = -1;
    this.total = 0;
    this.left = null;
    this.right = null;
  }

  
  addInterval(left, right) 
  {
    // No interval has been set, so just add it
    if(this.currentMin < 0) 
    {
      this.currentMin = left;
      this.currentMax = right;
      this.total = right - left + 1;
      return this.total;
    }

    const mid = (this.min + this.max) >> 1;

    // We have children, so just add the interval to the children if it overlaps
    if(this.left)
    {
      if (left <= mid) this.left.addInterval(left, Math.min(mid, right));
      if (right > mid) this.right.addInterval(Math.max(mid + 1, left), right);

      this.total = this.left.total + this.right.total;
      return;
    }

    // We don't have children,
	  // update the current interval if the new one overlaps with it
    if(left <= this.currentMax + 1 && right >= this.currentMin - 1) 
    {
      this.currentMin = Math.min(this.currentMin, left);
      this.currentMax = Math.max(this.currentMax, right);
      this.total = this.currentMax - this.currentMin + 1;
      return;
    }
    
    // The interval doesn't overlap and we don't have children
	  // create left + right children and split our current interval amongst them
	  // along with adding the new interval to the children if it overlaps
    this.left = new TreeNode(this.min, mid);
    this.right = new TreeNode(mid + 1, this.max);

    if(left <= mid) 
    {
      this.left.addInterval(left, Math.min(mid, right));
    }
        
    if(right > mid) 
    {
      this.right.addInterval(Math.max(left, mid + 1), right);
    }
        
    if(this.currentMin <= mid) 
    {
      this.left.addInterval(this.currentMin, Math.min(mid, this.currentMax));
    }
        
    if (this.currentMax > mid) 
    {
      this.right.addInterval(Math.max(mid + 1, this.currentMin),this.currentMax);
    }

    this.total = this.left.total + this.right.total;
  }
}


// https://leetcode.com/problems/count-integers-in-intervals/discuss/2040939/JavaScript-Binary-Range-Tree-700-1000ms