// singleton
// Object.create

// object literals

const mySum = symbol("key1")

const myuser = {
    name: "harshit",
    "full name": "harshit singh",
    [mySym]: "mykey1",
    age: 21,
    location: "Jaipur",
    email: "hari@google.com",
    isLoggedIn: false, //trying to add confirm login 
    lastLoginDays: ["Monday", "Saturday"] //in table format
  
  
}
// console.log(myuser.email)
// console.log(myuser["email"])
// console.log(myuser"full name"])
// console.log(myuser[mySym])

myuser.email= "hari@googleplay.com"
//console.freeze(myuser)
myuser.email= "hari@microsoft.com"
//console.log(myuser)

myuser.greeting = greeting(){
      console.log("hello mr.");
}
JsUser.greetingTwo = greeting(){
    console.log(`Hello user, from ${this.location}  ${this.name}`);
    
}

console.log(myuser.greeting());
console.log(myuser.greetingTwo());




