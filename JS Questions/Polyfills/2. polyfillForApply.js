function printNameAge(...argumentPassed) {
    console.log(this.name, this.age, ...argumentPassed);
}

/* eslint-disable */
Function.prototype.myApply = function(ctx, args) {
    ctx.fnToCall = this;
    // console.log(ctx)
    return ctx.fnToCall(...args)
}

printNameAge.myApply({ name: "John", age: 20 },["1st arguement","2nd arguement", "3rd arguement"]);

// printNameAge.apply({ name: "John", age: 20 },["1st arguement","2nd arguement", "3rd arguement"]);