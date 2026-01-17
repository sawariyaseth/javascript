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


const obj1 = {1: "a", 2: "b"}
const obj2 = {3: "a", 4: "b"}
const obj4 = {5: "a", 6: "b"}

// const obj3 = { obj1, obj2 }
// const obj3 = Object.assign({}, obj1, obj2, obj4)

const obj3 = {...obj1, ...obj2}
// console.log(obj3);
/*Spread operator ...

Takes values out

Puts them into new object
*/

const users = [
    {
        id: 1,
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
}

// course.courseInstructor

const {courseInstructor: instructor} = course

// console.log(courseInstructor);
console.log(instructor);


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
