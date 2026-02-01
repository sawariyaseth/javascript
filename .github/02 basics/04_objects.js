<<<<<<< HEAD
const tinderUser = new Object()
// const tinderUSer ={}
tinderUser.id="1";
tinderUser.name= "ramu lal"

tinderUser.isLogconsgedIn = true
//console.log(tinderUser);


const regularUser = {
    email: "some@gmail.com",
    fullname: {
        userfullname: {
            firstname: "ramu",
            lastname: "lal"
        }
    }
}
//console.log(regularUser);
=======
const tinderUser = {}
// const tinderUser = new Object()

tinderUser.id = "123abc"
tinderUser.name = "Sammy"
tinderUser.isLoggedIn = false

// console.log(tinderUser);

const regularUser = {
    email: "see@gmail.com",
    fullname: {
        userfullname: {
            firstname: "harshit",
            lastname: "baroliya"
        }
    }
}


// console.log(regularUser.fullname.userfullname.firstname);
>>>>>>> 83d46bc08be020293b94cbdfbbac49733fa93868


const obj1 = {1: "a", 2: "b"}
const obj2 = {3: "a", 4: "b"}
const obj4 = {5: "a", 6: "b"}

// const obj3 = { obj1, obj2 }
// const obj3 = Object.assign({}, obj1, obj2, obj4)

const obj3 = {...obj1, ...obj2}
<<<<<<< HEAD
//console.log(obj3);

=======
// console.log(obj3);
/*Spread operator ...

Takes values out

Puts them into new object
*/
>>>>>>> 83d46bc08be020293b94cbdfbbac49733fa93868

const users = [
    {
        id: 1,
<<<<<<< HEAD
        email: "h@gmail.com"
    },
    {
        id: 1,
        email: "hi@gmail.com"
    },
    {
        id: 1,
        email: "hii@gmail.com"
    },
]
console.log(users[2].email)
 

// console.log(tinderUser);

// console.log(Object.keys(tinderUser));
// console.log(Object.values(tinderUser));
// console.log(Object.entries(tinderUser));

// console.log(tinderUser.hasOwnProperty('isLoggedIn'));


const course = {
    coursename: "js in hindi",
    price: "999",
    courseInstructor: "hitesh"
=======
        email: "beta@gmail.com"
    },
    {
        id: 2,
        email: "bgam@gmail.com"
    },
    {
        id: 3,
        email: "alpha@gmail.com"
    },
]
user[1].email
// console.log(tinderUser);


const course = {
    coursename: "EARN FAST",
    price: 009,
    courseInstructor: "harshit"
>>>>>>> 83d46bc08be020293b94cbdfbbac49733fa93868
}

// course.courseInstructor

const {courseInstructor: instructor} = course

// console.log(courseInstructor);
console.log(instructor);

<<<<<<< HEAD
// {
//     "name": "hitesh",
//     "coursename": "js in hindi",
//     "price": "free"
// }

[
    {},
    {},
    {}
]

=======

// {
//     "name": "harshit",
//     "coursename": "EARN FAST",
//     "price": "free"
// }



/*Mental Model

{} → Object

[] → Array

. → Access object

... → Copy / merge

{} on left → destructuring*/
>>>>>>> 83d46bc08be020293b94cbdfbbac49733fa93868
