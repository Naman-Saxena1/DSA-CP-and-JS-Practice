const inputField = document.querySelector(".input-field")
const outputPara = document.querySelector(".output-para")

const throttle = (callback, limit) => {
    let lastTimeEventFired = 0;

    return (event) => {
        const currentTime = new Date().getTime()    //Current time in miliseconds

        if(currentTime-lastTimeEventFired < limit)
        {
            //Event fired before limit completion, return nothing
            return;
        }

        // Event fired after limit completion
        // Update lastTimeEventFired to currentTime for future events
        // And execute callback(event)
        lastTimeEventFired = currentTime;
        return callback(event)
    }
}

const addInputToPara = (event, newArguement) => {
    console.log(newArguement)
    outputPara.innerText = event.target.value
}

inputField.addEventListener(
    'keyup', 
    throttle((event)=>{ addInputToPara(event,"Extra arguement") }, 6000)      
    //thottle(callback, limit)
)

// 1. throttle gets called immediately and returns a function
//    to be executed on keyup event

// 2. Returned anonymous function gets "event" passed as arguement on the keyup event

// 3. "currentTime" gets Current time in milliseconds

// 4. If event is fired before limit, return nothing

// 5. Else 
//      Update lastTimeEventFired = currentTime 
//      And execute callback(event)
//      callback = (event)=>{ addInputToPara(event,"Extra arguement") }

// 6. addInputToPara(event, newArguement) gets 2 arguements and finally executes 

// Use Case - Limiting API calls to NOT overload server