module.exports = function names(toBeBooked) {

    async function enteredNumbers(req, res) {
        let name = req.body.textBox

        let waiters = await toBeBooked.usersBooked(name);
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
    