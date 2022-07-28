// Given a 0-indexed n x n integer matrix grid, 
// return the number of pairs (Ri, Cj) such that row Ri and column Cj are equal.

// A row and column pair is considered equal if they contain the same elements 
// in the same order (i.e. an equal array).



// Example 1:
// Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
// Output: 1
// Explanation: There is 1 equal row and column pair:
// - (Row 2, Column 1): [2,7,7]

// Example 2:
// Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// Output: 3
// Explanation: There are 3 equal row and column pairs:
// - (Row 0, Column 0): [3,1,2,2]
// - (Row 2, Column 2): [2,4,2,2]
// - (Row 3, Column 2): [2,4,2,2]


// Approach 1
var equalPairs = function(grid) {
    let count = 0, subArr;
    
    for(let i=0; i<grid.length; i++)
    {
        for(let k=0; k<grid.length; k++)
        {
            subArr = []
            for(let j=0; j<grid.length; j++)
            {
                subArr.push(grid[j][k])
            }
        
            if(grid[i].join(',')==subArr.join(','))
            {
                count++
            }
        }
    }
    
    return count
};


// Approach 2 
// Same O(n^3) Time complexity but significantly better solution
var equalPairs = function(grid) {
    let count = 0, n = grid.length;
    
    for (let i = 0; i < n; ++i) 
    {
        for (let j = 0, k = 0; j < n; ++j) 
        {
            for (k = 0; k < n; ++k) 
            {
                if (grid[i][k] != grid[k][j])
                {
                    break;
                }
            }
            if(k == n)
            {
                count ++
            }
        }
    }
    return count;
};


// Approach 3 - Using Map
var equalPairs = function(grid) {
    let res = 0, n = grid.length;
    let m = new Map()

    for (let j = 0; j < n; ++j) 
    {
        let col = [];

        for (let i = 0; i < n; ++i)
        {
            col.push(grid[i][j]);
        }
        
        if(m.get(JSON.stringify(col)) == undefined)
        {
            m.set(JSON.stringify(col),1)
        }
        else
        {
            m.set(JSON.stringify(col), m.get(JSON.stringify(col))+1)
        }
    }

    for(let row of grid)
    {
        if(m.get(JSON.stringify(row))!=undefined)
        {
            res += m.get(JSON.stringify(row));
        }
    }
    return res;
};

// Revisit
// Approach 4 - Using Trie
function equalPairs (grid) {
    const m = grid.length,
          n = grid[0].length,
          trie = {}
    
    for (let i = 0; i < m; i++) 
    {
      let dict = trie
      for (let j = 0; j < n; j++) 
      {
        const char = grid[i][j]
        if (!dict[char]) dict[char] = {}
        dict = dict[char]
      }
      dict.count = (dict.count || 0) + 1
    }
    
    let count = 0
    for (let i = 0; i < n; i++) 
    {
      let dict = trie
      for (let j = 0; j < m; j++) 
      {
        const char = grid[j][i]
        if (!dict[char]) break
        dict = dict[char]
      }
      if (dict.count) count += dict.count
    }
    return count
}

// Revisit
// C++ Trie solution for reference
// struct Trie {
//     unordered_map<int, Trie*> m;
//     int cnt = 0;
//     int insert(vector<vector<int>>& g, int i, int j, bool row) 
//     {
//         auto node = this;
//         for (; max(i, j) < g.size(); i += row, j += !row) 
//         {
//             auto it = node->m.find(g[i][j]);
//             if (it == end(node->m)) 
//             {
//                 if (row)
//                     return 0; // no match.
//                 it = node->m.insert({g[i][j], new Trie()}).first;
//             }
//             node = it->second;
//         }
//         return node->cnt += !row;
//     }
// };
// int equalPairs(vector<vector<int>>& g) 
// {
//     Trie t;
//     int res = 0;
//     for (int i = 0; i < g.size(); ++i)
//         t.insert(g, i, 0, false);
//     for (int j = 0; j < g.size(); ++j)
//         res += t.insert(g, 0, j, true);
//     return res;
// }



console.log(equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]))

// https://leetcode.com/problems/equal-row-and-column-pairs/discuss/2324688/Cubic-(432)-vs.-Three-Map-(95)-vs.-Trie-(137)
// https://leetcode.com/problems/equal-row-and-column-pairs/discuss/2324929/JavaScript-Trie