function selectionSort(arr) 
{
    for (let i = 0; i < arr.length; i++) 
    {
      let lowest = i
      
      for (let j = i + 1; j < arr.length; j++) 
      {
        if (arr[j] < arr[lowest]) {
          lowest = j
        }
      }
      
      if (lowest !== i) 
      {
        // Swap
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
      }
    }
    return arr
}

let arrayToSort = [69, 1020, 865, 420, 32, 3]
console.log(selectionSort(arrayToSort)) 