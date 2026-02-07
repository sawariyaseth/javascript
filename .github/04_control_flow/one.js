// if
// const isUserloggedIn = true
const temperature = 40

if ( temperature === 40 ){
    console.log("less than 50");
} else {
    console.log("temperature is greater than 50");
}

console.log("Execute");
 
// <,>,<=,>=,!=,===,!==, &&, ||, !

// game score 0-100
const score = 100
if (score >= 100) {
    let power = "fly'"
    console.log(`user power is ${power}`);

}
// console.log(`user power is ${power}`);
// this is block scope and hence we cannot access power variable outside the block scope of if statement

// ATM machine
const balance = 2000;
const withdrawAmount = 1500;
if (withdrawAmount >  balance) {
    console.log("Insufficient balance");
    console.log(`add balance : ${withdrawAmount - balance} and current balance is ${ balance}    `);
}else {
    console.log("Withdraw successful")
    console.log(`current balance is ${balance - withdrawAmount}`)   ;
}


// const balance = 1000

// if (balance > 500) console.log("test"),console.log("test2");

// if (balance < 500) {
//     console.log("less than 500");
// } else if (balance < 750) {
//     console.log("less than 750");
    
// } else if (balance < 900) {
//     console.log("less than 750");
    
// } else {
//     console.log("less than 1200");

// }

const userLoggedIn = true
const debitCard = true
const loggedInFromGoogle = false
const loggedInFromEmail = true

if (userLoggedIn && debitCard && 2==3) {
    console.log("Allow to buy course");
}

if (loggedInFromGoogle || loggedInFromEmail) {
    console.log("User logged in");
}