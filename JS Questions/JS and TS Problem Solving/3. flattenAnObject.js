let user = {
    name : {
        firstName: "Naman",
        lastName : "Saxena"
    },
    age : 23,
    address : {
        location: {
            city : "New Delhi", 
            state: "Delhi"
        },
        country : "India",
        pincode : 999999
    },
}

// Expected Output
// user = {
//     user_name_firstName: "Naman",
//     user_name_lastName : "Saxena",
//     user_age: 23,
//     user_address_location_city : "New Delhi",
//     user_address_location_state: "Delhi",
//     user_address_country       : "India",
//     user_address_pincode       : 999999
// }

function flatNestedObject(originalObj,topKeyName)
{
    let resultObj = {}
    
    function flat(currentObj, parentKeyName = "")
    {
        for(let key in currentObj)
        {
            if(typeof currentObj[key] == "object")
            {
                flat(currentObj[key], parentKeyName+key+"_")
            }
            else
            {
                resultObj[parentKeyName + key] = currentObj[key]
            }
        }
    }
    flat(originalObj,topKeyName)

    return resultObj
}

console.log(flatNestedObject(user,"user_"))