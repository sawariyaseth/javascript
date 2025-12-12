const accountID='1234567890';
let userName='Harshit baroliya';
var 
accountCity='jaipur';
let accountState='Rajasthan';

accountEmail ="hc@hc.com";
accountpassword='harshit1234';
accountcity='delhi';
// accountID='0987654321'; // This will cause an error because accountID is a constant


console.log(`
  Account ID: ${accountID}
  Email: ${accountEmail}
  Password: ${accountpassword}
  City: ${accountcity}
  State: ${accountState}
`);

/*Option 1: Array of arrays
console.table(['Account ID:', accountID],['accountemail',accountEmail],['accountpassword' ,accountpassword],['accountcity',accountcity],['accountstate',accountState]);

Option 2: : Using Object.assign() with an empty object
console.table(Object.assign({}, {
  accountID,
  accountEmail,
  accountpassword,
  accountcity,
  accountState
}));

*/

/*Option 3: Single object (cleaner)
console.table({
  'Account ID': accountID,
  'Email': accountEmail,
  'Password': accountpassword,
  'City': accountcity,
  'State': accountState
});
*/
/*Option 4: Array of objects
console.table([{
  'Account ID': accountID,
  'Email': accountEmail,
  'Password': accountpassword,
  'City': accountcity,
  'State': accountState
}]);
*/

/*Option 5: Formatted string output
console.log(`
  Account ID: ${accountID}
  Email: ${accountEmail}
  Password: ${accountpassword}
  City: ${accountcity}
  State: ${accountState}
`);
*/ 
