function saymyname(){
    console.log("H")
    console.log("A")
    console.log("R")
    console.log("S")
    console.log("I")
    console.log("T")
}
saymyname()
// function addTwoNumbers(number1, number2){

//     console.log(number1 + number2);
// }
function addTwoNumbers(num1, num2){
    return num1 + num2
}
// 
const ans = addTwoNumbers(5, "😆")

console.log(ans);

/*function addTwoNumbers1(num1, num2){
    console.log(num1 + num2)
    return
}
addTwoNumbers1(4, "")
return addTwoNumbers1
*/
// console.log(addTwoNumbers1); 
function loginUserMessage(username){
//function loginUserMessage(username = "sam"){
    if(!username){
        console.log("PLease enter a username");
        return
    }
    return `${username} just logged in`
}
console.log(loginUserMessage("ram "));


function calculateCartPrice(val1, val2, ...num1){ //rest operator ...num1
    return num1
}

// console.log(calculateCartPrice(200, 400, 500, 2000))
//output-
const user = {
    username: "harshit",
    prices: 199
}

function handleObject(anyobject){
    console.log(`Username is ${anyobject.username} and price is ${anyobject.price}`);
}

// handleObject(user)
handleObject({
    username: "sam",
    price: 399
})

const myNewArray = [200,400,500,2000]

function returnSecondValue(getArray){
    return getArray[1];
}

// console.log(returnSecondValue(myNewArray));
console.log(returnSecondValue([200, 400, 500, 1000]));