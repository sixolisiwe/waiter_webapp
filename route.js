module.exports = function names(toBeBooked) {

    async function enteredNumbers(req, res) {

        let waiters = await toBeBooked.usersBooked();
        res.render('index', {
            waiter_App: waiters
     
        });


        
    };
    return {
        enteredNumbers,
        // add,
        // filtersApp
    };
};
    