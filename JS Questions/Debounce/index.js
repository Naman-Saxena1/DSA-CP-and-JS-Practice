const inputField = document.querySelector(".input-field")
const outputPara = document.querySelector(".output-para")

const debounce = (callback, delay) => {
    let timeoutId;

    return (event) => {
        if(timeoutId)
        {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(
            ()=>{
                callback(event)
            },
            delay
        )
    }
}

const addInputToPara = (event, newArguement) => {
    console.log(newArguement)
    outputPara.innerText = event.target.value
}

inputField.addEventListener(
    'keyup', 
    debounce((event)=>addInputToPara(event,"Extra arguement") , 6000)      
    //debounce(callback, delay)
)

// 1. debounce gets called immediately and returns a function
//    to be executed on keyup event

// 2. Returned anonymous function gets "event" passed as arguement on the keyup event

// 3. And timeout is set with delay that was provided to debounce function.

// 4. If keyup event is fired again before timeout is finished,
//    timeout is reset 

// 5. Once timeout gets over, callback is called with event arguement.
//    callback = (event)=>addInputToPara(event,"Extra arguement")

// 6. addInputToPara(event, newArguement) gets 2 arguements and finally executes 

// Use Case - Search Bar in E-Commerce