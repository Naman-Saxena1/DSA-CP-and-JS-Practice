function printNameAge(...argumentPassed) {
    console.log(this.name, this.age, ...argumentPassed);
}

/* eslint-disable */
Function.prototype.myCall = function(ctx, ...args) {
    ctx.fnToCall = this;
    // console.log(ctx)
    return ctx.fnToCall(...args)
}

printNameAge.myCall({ name: "Jane", age: 20 },"1st arguement","2nd arguement", "3rd arguement");

// printNameAge.call({ name: "Jane", age: 20 },"1st arguement","2nd arguement", "3rd arguement");