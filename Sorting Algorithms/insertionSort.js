const insertionSort = (arr, lengthOfArray) =>
{
	let i, key, j;
	for(i = 1; i < lengthOfArray; i++)
	{
		key = arr[i];
		j = i - 1;

		/* Move elements of arr[0..i-1], that are
		greater than key, to one position ahead
		of their current position */
		while (j >= 0 && arr[j] > key)
		{
			arr[j + 1] = arr[j];
			j = j - 1;
		}
		arr[j + 1] = key;
	}
    return arr
}

let arrayToSort = [69, 1020, 865, 420, 32, 3]
let arrayLength = arrayToSort.length;
console.log( insertionSort(arrayToSort, arrayLength) )