function memoizeFunc(fn, context)
{
    const result = {}

    return function (...args)
    {
        let argsCache = JSON.stringify(args);
        console.log(argsCache)
        console.log(result[argsCache])
        if(!result[argsCache])
        {
            result[argsCache] = fn.call(context || this, ...args)
        }
        return result[argsCache]
    }
}

function bigComputationFunc(num1, num2)
{
    for(let i = 0; i < 10000; i++) {}

    return num1 * num2;
}

const memoizedBigComputationFunc = memoizeFunc(bigComputationFunc)

console.time("bigComputationFunc First call")
console.log(memoizedBigComputationFunc(683,9000))
console.timeEnd("bigComputationFunc First call")

console.time("bigComputationFunc First call")
console.log(memoizedBigComputationFunc(683,9000))
console.timeEnd("bigComputationFunc First call")