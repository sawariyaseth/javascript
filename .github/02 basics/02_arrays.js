const MY_REAL_heros = ["RAM","SHIVA","HANUMAN","KRISHNA"]
const indian_heros = ["bhagat singh","ambedkar","atal bihari vajpayee","Subhas chandra bose"]
//MY_REAL_heros.push("indian_heros")
//console.log(MY_REAL_heros);
// console.log(MY_REAL_heros[3][1]);
const allHeros = MY_REAL_heros.concat(indian_heros)
// console.log(allHeros);
const all_new_heros = [...MY_REAL_heros, ...indian_heros]

// console.log(all_new_heros);
const another_array = [1, 2, 3, [4, 5, 6], 7, [6, 7, [4, 5]]]
//let a=[1, 2, 3, [4, 5, 6], 7, [6, 7, [4, 5]]]
const real_another_array = another_array.flat(Infinity)
// b=a.flat(infinity)
console.log(real_another_array);

let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1, score2, score3));
