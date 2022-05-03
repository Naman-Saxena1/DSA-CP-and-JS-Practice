function printNameAge(...argumentPassed) {
    console.log(this.name, this.age, ...argumentPassed);
}

/* eslint-disable */
Function.prototype.newBindWithoutApply = function (ctx, ...args) {

    let allArguments = args;
  
    ctx.fnToCall = this;
    
    //  Returning the new method with context
    return function (...args1) {
        allArguments = [...allArguments, ...args1];
        //  console.log(ctx)
        return ctx.fnToCall(...allArguments);
    };
};

let boundFunction1 = printNameAge.newBindWithoutApply({ name: "Alexa", age: 20 },"1st arguement");
boundFunction1("2nd arguement");

// let boundFunction2 = printNameAge.bind({ name: "Alexa", age: 20 },"1st arguement");
// boundFunction2("2nd arguement");