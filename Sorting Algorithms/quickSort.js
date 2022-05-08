function swap(items, startIndex, endIndex){
    let temp = items[startIndex];
    items[startIndex] = items[endIndex];
    items[endIndex] = temp;
}

function partition(items, start, end) 
{
    let pivot   = items[Math.floor((start + end) / 2)], //middle element
        i       = start, //start pointer
        j       = end; //end pointer

    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swapping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, start, end) {
    let index;
    if (items.length > 1) 
    {
        index = partition(items, start, end); //index returned from partition
        
        if (start < index - 1) 
        { 
            //more elements on the start side of the pivot
            quickSort(items, start, index - 1);
        }
        
        if (index < end) 
        { 
            //more elements on the end side of the pivot
            quickSort(items, index, end);
        }
    }
    return items;
}

let arrayToSort = [69, 1020, 865, 420, 32, 3]
let arrayLength = arrayToSort.length;
console.log( quickSort(arrayToSort, 0, arrayLength-1) );