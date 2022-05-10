const countingSort = (arr) => {

    let sortedArray = [];
    let count = [];
    let largestNumber = arr[0];

    // Find the largest element of the array
    for (let i = 1; i < arr.length; i++) {
        if (largestNumber<arr[i])
        {
            largestNumber = arr[i];
        }
    }

    // Initialize count array with all zeros.
    for (let i = 0; i <= largestNumber; ++i) {
        count[i] = 0;
    }

    // Store the count of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    // Now count array has count of all nums in original array

    // Store the cummulative count of each 
    for (let i = 1; i <= largestNumber; i++) {
        count[i] += count[i - 1];
    }

    // Find the index of each element of the original array in count array, and
    // place the elements in sortedArray 
    for (let i = arr.length - 1; i >= 0; i--) {
        sortedArray[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    // [     ,     ,     ,     ,     ,     ,     ,     ,     ]
    // [    3,     ,     ,     ,     ,     ,     ,     ,     ]
    // [    3,     ,     ,    8,     ,     ,     ,     ,     ]
    // [    3,     ,    8,    8,     ,     ,     ,     ,     ]
    // [    3,     ,    8,    8,   32,     ,     ,     ,     ]
    // [    3,     ,    8,    8,   32,     ,  420,     ,     ]
    // [    3,    8,    8,    8,   32,     ,  420,     ,     ]
    // [    3,    8,    8,    8,   32,     ,  420,  865,     ]
    // [    3,    8,    8,    8,   32,     ,  420,  865, 1020]
    // [    3,    8,    8,    8,   32,   69,  420,  865, 1020]

    // Copy the sorted elements into original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = sortedArray[i];
    }
    return arr
}

let arrayToSort = [69, 1020, 865, 8, 420, 32, 8, 8, 3]
console.log(countingSort(arrayToSort));