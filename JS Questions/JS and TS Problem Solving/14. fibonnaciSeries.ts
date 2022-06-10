export{}
// 1,1,2,3,5,8,...

function fibonnaci(n:number)
{
    let prevTerm = 0, currentTerm = 1, sum = 0;
    for(let i=0; i<n; i++)
    {
        if(i==0)
        {
            console.log(1)
        }
        else
        {
            sum = prevTerm+currentTerm;
            console.log(sum);
            prevTerm = currentTerm;
            currentTerm = sum
        }        
    }
}

fibonnaci(8)