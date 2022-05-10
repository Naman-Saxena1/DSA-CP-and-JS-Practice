// Given an array nums with n objects colored red, white, or blue, 
// sort them in-place so that objects of the same color are adjacent,
//  with the colors in the order red, white, and blue.

// We will use the integers 0, 1, and 2 to represent 
// the color red, white, and blue, respectively.

// You must solve this problem without using the library's sort function.

// Example 1:

// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]

// Example 2:

// Input: nums = [2,0,1]
// Output: [0,1,2]

// Constraints:

// n == nums.length
// 1 <= n <= 300
// nums[i] is either 0, 1, or 2.
 

// Follow up: 
// Could you come up with a one-pass algorithm using only constant extra space?





// Approch 1 - Simple Sorting using Merge Sort
const sortColorsMergeSort = (arrayToSort) =>{
    function merge(left, right) {
        let arr = [];
        while (left.length && right.length) {
          if (left[0] < right[0]) {
            arr.push(left.shift());
          } else {
            arr.push(right.shift());
          }
        }
        return [...arr, ...left, ...right];
    }
      
    const mergeSort = (inputArray) => {
        const half = inputArray.length / 2;
      
        if (inputArray.length < 2) {
          return inputArray;
        }
      
        const left = inputArray.splice(0, half);
        return merge(mergeSort(left), mergeSort(inputArray));
    };

    return mergeSort(arrayToSort)
}

console.log(sortColorsMergeSort([2,0,2,1,1,0]))





// Approch 2 - Sorting using Counting Sort
const sortColorsCountingSort = (arr) =>{
    let sortedArray = [];
    let count = [];
    let largestNumber = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (largestNumber<arr[i])
        {
            largestNumber = arr[i];
        }
    }

    for (let i = 0; i <= largestNumber; ++i) {
        count[i] = 0;
    }

    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    for (let i = 1; i <= largestNumber; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        sortedArray[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = sortedArray[i];
    }
    return arr
}

console.log(sortColorsCountingSort([2,0,2,1,1,0]))




// Approch 3 - Dutch National flag algorithm
const dutchNationalFlagAlgorithm = (nums) =>
{
    let low = 0;
    let mid = 0;
    let high= nums.length-1;

    while(mid<=high)
    {
        switch(nums[mid]){
            case 0: {
                let swapVar = nums[low]
                nums[low] = nums[mid]
                nums[mid] = swapVar
                low++
                mid++
                break;
            }
            case 1: {
                mid++
                break;
            }
            case 2: {
                let swapVar = nums[high]
                nums[high] = nums[mid]
                nums[mid] = swapVar
                high--
                break;
            }
        }
    }
    // Time complexity = O(n)
    // Space complexity = O(1)

    return nums
}

console.log(sortColorsCountingSort([2,0,2,1,1,0]))