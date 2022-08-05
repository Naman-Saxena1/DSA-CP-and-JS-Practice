// The n-queens puzzle is the problem of placing n queens on an n x n 
// chessboard such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle. 
// You may return the answer in any order.

// Each solution contains a distinct board configuration of the 
// n-queens' placement, where 'Q' and '.' both indicate a queen 
// and an empty space, respectively.

// Example 1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

// Example 2:
// Input: n = 1
// Output: [["Q"]]


// Approach 1
var solveNQueens = function(n) 
{
    const res = [];
    backtrack(res, n);
    return res;
};

function backtrack(res, n, board = [], currentRow = 0) 
{
    if (currentRow === n) 
    {
        // After successfully placing last queen
        // Time to add this valid configuration to our res array
        res.push(board.map(pieceCol => '.'.repeat(pieceCol) + 'Q' + '.'.repeat(n - pieceCol - 1)));
        return;
    }
    for (let currentCol = 0; currentCol < n; currentCol++) 
    {
        // When below all 3 conditions are false
        // that means we are doing right and CAN place queen at this position
        // 1. Same column as existing piece         -> pieceCol === currentCol
        // 2. Same right diagonal as existing piece -> pieceCol === currentCol + currentRow - pieceRow
        // 3. Same left diagonal as existing piece  -> pieceCol === currentCol - currentRow + pieceRow
        // 
        // Hence we push this new column value to board array
        if (!board.some((pieceCol, pieceRow) => 
            pieceCol === currentCol 
            || pieceCol === currentCol + currentRow - pieceRow 
            || pieceCol === currentCol - currentRow + pieceRow
        )) 
        {
            board.push(currentCol);
            backtrack(res, n, board, currentRow + 1);
            board.pop();
        }
    }
}


console.log(solveNQueens(4))