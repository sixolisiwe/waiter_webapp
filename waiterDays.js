module.exports = function daysAvailable(pool) {

async function usersBooked(nameEntered){
    // let upperCase = numbers.toUpperCase(2);
let enteredUser = await pool.query ('INSERT into names (namesbooked) values ($1)', [nameEntered]);

   
    // let names_table = await pool.query('SELECT * FROM names');
    // let towns_id;
    return enteredUser;

}
async function daysBooked(selDay){
let entered = await pool.query('INSERT into daysAvailable (dayOfWeek, waiter_id) values ($1, $2)', [selDay]);

return entered;
}



return{
usersBooked,
daysBooked

}
}