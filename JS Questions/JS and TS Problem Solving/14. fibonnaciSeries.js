"use strict";
exports.__esModule = true;
// 1,1,2,3,5,8,...
function fibonnaci(n) {
    var prevTerm = 0, currentTerm = 1, sum = 0;
    for (var i = 0; i < n; i++) {
        if (i == 0) {
            console.log(1);
        }
        else {
            sum = prevTerm + currentTerm;
            console.log(sum);
            prevTerm = currentTerm;
            currentTerm = sum;
        }
    }
}

fibonnaci(8);