function  promiseAllPolyfill(tasks){
    let result=[]
    let itemsCompleted=0
    return new Promise((resolve,reject)=>{

        tasks.forEach((element,index )=> {
            element.then(res=>{
                result[index]=res
                itemsCompleted++
                if(itemsCompleted===tasks.length){

                    resolve(result)
                }
            }).catch(error=>{
                reject(error)
            })
        })
    });
}

function asyncFunc1(time){

    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(time)
        },time)
    })
}

let list=[asyncFunc1(2500),asyncFunc1(1100),asyncFunc1(3500)]

promiseAllPolyfill(list).then(res=>console.log(res))