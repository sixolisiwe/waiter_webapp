module.exports = function daysAvailable(pool) {
    var returnUserName;
    var getDay;

    async function usersBooked(nameEntered) {

        // check if user exist 

        if (await userExists(nameEntered)) {
            // fetch users shift
            console.log('user found');
            return [];
        } else {
            let enteredUser = await pool.query('INSERT into waiter (username) values ($1)', [nameEntered]);
            console.log('new user');
            return enteredUser;
        }
    }

    async function userExists(userName) {

        let foundUser = await pool.query('SELECT * from waiter WHERE username= ($1)', [userName]);
        if (foundUser.rowCount > 0) {
            return true;
        }
        return false;
    }

    async function addShift(userName, days) {
        let foundUser = await pool.query('SELECT * from waiter WHERE username= ($1)', [userName]);
        if (foundUser.rowCount > 0) {
            if (await checkUserShifts(foundUser.rows[0].id)) {
                await pool.query('DELETE from shift WHERE user_id = ($1)', [foundUser.rows[0].id]);
            }

            return days.forEach(async (element) => {
                await pool.query('INSERT into shift (user_id, day_id) values ($1, $2)', [foundUser.rows[0].id, element]);
            });
        }

    }

    async function checkUserShifts(userId) {

        let check = await pool.query('SELECT * from shift WHERE user_id = ($1)', [userId]);
        if (check.rowCount > 0) {
            return true;
        }
        return false;
    }


    async function getUserShifts(userName) {
        let days = await getDaysBooked();
        let foundUser = await pool.query('SELECT * from waiter WHERE username= ($1)', [userName]);
        if (foundUser.rowCount > 0) {
            let check = await pool.query('SELECT * from shift WHERE user_id = ($1)', [foundUser.rows[0].id]);
            console.log(check.rows);

            if (check.rowCount > 0) {
                for (let i = 0; i < days.length; i++) {
                    const currentDay = days[i];
                    for (let j = 0; j < check.rows.length; j++) {
                        const selectedDay = check.rows[j];
                        if (currentDay.id === selectedDay.day_id) {
                            currentDay.checked = 'checked';
                        }

                    }
                }
                ///console.log(days);
                console.log(days);

                return days;
            }

        }
        return days
    }


    async function getUserBooked() {
        returnUserName = await pool.query('SELECT * from names')


        return returnUserName.rows;
    }


    async function getUserByName(userName) {
        returnUserByName = await pool.query('SELECT * from names WHERE namesbooked = $1', [userName])


        return returnUserByName.rows;
    }



    async function daysBooked(selDay, userId) {

        console.log(selDay);
        console.log(userId);


        selDay.forEach(async (element) => {
            await pool.query('INSERT into daysAvailable (dayOfWeek, waiter_id) values ($1, $2)', [element, userId]);
        });

        if (selDay.rowCount !== '' || userId.rowCount !== undefined) {
            return
        }

        // let entered = await pool.query('INSERT into daysAvailable (dayOfWeek, waiter_id) values ($1, $2)', [selDay, userId]);        
        // return entered;

    }


    async function getDaysBooked() {
        getDay = await pool.query('SELECT * from weekdays');

        return getDay.rows;
    }


    return {
        usersBooked,
        daysBooked,
        getUserBooked,
        getDaysBooked,
        getUserByName,
        addShift,
        getUserShifts

    }
}