const bucketSort = (arr) => {
    let size = arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    const buckets = Array.from(
        { length: Math.floor((max - min) / size) + 1 },
        () => []
    );

    arr.forEach(val => {
        buckets[Math.floor((val - min) / size)].push(val);
    });
    
    return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);   
}

let arrayToSort = [69, 1020, 865, 420, 32, 3]
console.log(bucketSort(arrayToSort));