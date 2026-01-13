const myArr=[]
const myfav=["coding","manhwa reading"]
const myArr2=new Array(1,2,3,4,5)

console.log(myArr)
console.log(myfav)
console.log(myArr2)
console.table(myfav,myArr2,myArr)

// Do not change the code above 👆

// Create an array named 'myFriends' and add some names (strings) in it
const myFriends=["Alice","Bob","Charlie"]

// Print the 'myFriends' array using console.log()
console.log(myFriends)


//array methods
//myFriends.push("David") //adds an element at the end
//console.log(myFriends)
//myFriends.pop() //removes the last element

//myArr.unshift(0) //adds an element at the beginning
//myArr.shift() //removes the first element
//console.log(myArr.reverse()) //reverses the array
const newArr=myArr2.concat(myfav) //concatenates two arrays
console.log(newArr)

/*OUTPUT:
[ 'Alice', 'Bob', 'Charlie' ]
[ 1, 2, 3, 4, 5, 'coding', 'manhwa reading' ]*/

//const newArr2=newArr.join()
//console.log(newArr2) //joins all elements of an array into a string
//console.log(typeof newArr2) //string

//const slicedArr=newArr.slice(0,2) //slices the array from index 0 to 2 (2 not included)
//console.log(slicedArr)

const myn1=myArr2.slice(1,3) //copying an array
console.log(myn1) //[ 2, 3 ]    
//console.log("Original array:",myArr2) //[ 1, 2, 3, 4, 5 ]
//The original array remains unchanged
//console.log("Original array after slicing:",myArr2) //[ 1, 2, 3, 4, 5 ]
