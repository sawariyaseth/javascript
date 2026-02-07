// Immediately Invoked Function Expressions (IIFE)

(function chai() {
    //named IIFE
    console.log('DB CONNECTED');
})();
//this is iife means immediately invoked function expressions (IIFE) which means those global function which are polluted and hence for using we are using IIFE 
( (name) => {
    console.log(`DB CONNECTED TWO ${name}`);
} )('hitesh')