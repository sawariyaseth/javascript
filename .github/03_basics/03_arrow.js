const user = {
    username: "Harshit",
    price: 999,

    welcomeMessage: function() {
        console.log(`${this.username} , welcome to website`); // '' -> back ticks  ${} for a reference value to display it into a container which is going to display over console screen
        console.log(this);
    }

}

user.welcomeMessage()
 user.username = "sam"
 user.welcomeMessage()

 console.log(this);
 
// console.log(this);

// function chai(){
//     let username = "ram"
//     console.log(this.username);
// }

// chai()

// const chai = function () {
//     let username = "shyam"
//     console.log(this.username);
// }

const chai =  () => {
    let username = "shyam"
    console.log(this);
}


// chai()

// const addTwo = (num1, num2) => {
//     return num1 + num2
// }

// const addTwo = (num1, num2) =>  num1 + num2

// const addTwo = (num1, num2) => ( num1 + num2 )

const addTwo = (num1, num2) => ({username: "hari"})


console.log(addTwo(3, 4))


const myArray = [2, 5, 3, 7, 8]

// myArray.forEach()
// myArray.forEach(function value() {
//     console.log(value);
// }); 
myArray.forEach(()=> {
    console.log(value);
}); 