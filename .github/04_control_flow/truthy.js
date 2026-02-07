const useremail = [];
if (useremail) {
    console.log("you got email");
}
else {
    console.log("don't have email");
}

// falsey values in javascript
// // false , 0 , null , 0-, undefined , NaN , bigint 0n 

// truthy values in javascript
// true , 1 , " ", [] , {} , function(){} , bigint 1n


// if (userEmail.length === 0) {
//     console.log("Array is empty");
// }

const emptyobject = {}
if (Object.keys(emptyobject).length === 0) {
    console.log("object is empty");
}


// Nullish Coalescing Operator (??): null undefined

let val1;
// val1 = 5 ?? 10
// val1 = null ?? 10
// val1 = undefined ?? 15
val1 = null ?? 10 ?? 20



console.log(val1);

// Terniary Operator

// condition ? true : false

const iceTeaPrice = 100
iceTeaPrice <= 80 ? console.log("less than 80") : console.log("more than 80")