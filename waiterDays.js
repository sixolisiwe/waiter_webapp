module.exports = function daysAvailable(pool) {
    var returnUserName;
    var getDay;
    var duplicate = "";
    async function usersBooked(nameEntered) {

        let enteredUser = await pool.query('INSERT into names (namesbooked) values ($1)', [nameEntered]);
        
        return enteredUser;

    }


    async function getUserBooked() {
    returnUserName = await pool.query('SELECT * from names')

      
        return returnUserName.rows;
    }


    async function getUserByName(userName) {
        returnUserByName = await pool.query('SELECT * from names WHERE namesbooked = $1',[userName])
    
          
            return returnUserByName.rows;
        }



    async function daysBooked(selDay, userId) {

       console.log(selDay);
       console.log(userId);
       

       selDay.forEach(async (element) => {
        await pool.query('INSERT into daysAvailable (dayOfWeek, waiter_id) values ($1, $2)', [element, userId]);
       });
       
       if (selDay.rowCount !== '' || userId.rowCount !== undefined){
        return
       }
        
        // let entered = await pool.query('INSERT into daysAvailable (dayOfWeek, waiter_id) values ($1, $2)', [selDay, userId]);        
        // return entered;

    }


    async function getDaysBooked() {
       getDay = await pool.query('SELECT * from daysAvailable');
    
        return getDay.rows;
    }


    return {
        usersBooked,
        daysBooked,
        getUserBooked,
        getDaysBooked,
        getUserByName

    }
}