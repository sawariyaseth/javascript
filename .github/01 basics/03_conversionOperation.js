// Declare a variable 'score' and assign it a string value
let score = "harshit";

// Print the value of 'score' and its type (string)
console.log("score is: ", score, typeof score);

// Reassign 'score' to a number
score = 34;

// Print the new value of 'score' and its type (number)
console.log("score is: ", score, typeof score);

// Print only the type of 'score'
console.log(typeof(score));

// Convert 'score' into a number explicitly using Number()
let valueInNumber = Number(score);

// Print the converted value and its type
console.log("valueInNumber: ", valueInNumber, typeof valueInNumber);

// Declare a variable 'isLoggedIn' with a string value
let isLoggedIn = "hitesh";

// Convert 'isLoggedIn' into a boolean
let booleanIsLoggedIn = Boolean(isLoggedIn);

// Print the boolean result (true because non-empty string is truthy)
console.log(booleanIsLoggedIn);

// Notes on Boolean conversion in JavaScript:
// 1 => true; 0 => false
// "" (empty string) => false; "harshit" (non-empty string) => true
// null => false; undefined => false


// *********************** Operations ***********************

let value = 69;

// Negate the value (turn positive into negative)
let negValue = -value;

// Print the negated value
console.log(negValue);

// console.log(negValue);

// console.log(2+2);
// console.log(2-2);
// console.log(2*2);
// console.log(2**3);
// console.log(2/3);
// console.log(2%3);

let str1 = "hello"
let str2 = " hitesh"

let str3 = str1 + str2
// console.log(str3);

// console.log("1" + 2);
// console.log(1 + "2");
// console.log("1" + 2 + 2);
// console.log(1 + 2 + "2");

// console.log( (3 + 4) * 5 % 3);

// console.log(+true);
// console.log(+"");

let num1, num2, num3

num1 = num2 = num3 = 2 + 2

let gamecounter = 100
++gamecounter;
console.log(gamecounter);