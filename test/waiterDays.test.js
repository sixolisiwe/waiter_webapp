const assert = require("assert");
const waiterDays = require('../waiterDays');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/waiterApp';


const pool = new Pool({
    connectionString,
});

describe('The basic database web app', function () {
    const WaiterInstance = waiterDays(pool);
    beforeEach(async function () {
 
        // clean the tables before each test run
        await pool.query("delete from daysAvailable;")
        await pool.query("delete from names;");
       
        await WaiterInstance.usersBooked('Sizwe');
    });

    it('should pass the db test', async function () {
        // the Factory Function is called CategoryService

        let number = await WaiterInstance.getUserBooked();
        assert.equal(number.rows);
        // assert.equal(days.rows);

    });

    it('should show the insert the booked day and user in the database', async function () {
        var names = await WaiterInstance.getUserByName("Sizwe") 
         var getId = names[0].id
            
           await WaiterInstance.daysBooked(["Monday", "Tuesday", "Friday"], getId);

        let numbers = await WaiterInstance.getDaysBooked();
        assert.equal(numbers.rows);

    });
});

    it('should return not add empty or undefined values', async function () {
        const WaiterInstance = waiterDays(pool);

        var names = await WaiterInstance.getUserByName("") 
        var getId = names.id
           
          await WaiterInstance.daysBooked([undefined], getId);

       let number = await WaiterInstance.getDaysBooked();
       assert.equal(number.rows);

    });

    // it('should return numbers for the town selected', async function () {


    //     let RegInstance = regNumb(pool);
    //     await RegInstance.setNumber("ca 183 25");
    //     await RegInstance.setNumber("cj 623 85");
    //     await RegInstance.setNumber("ca 113 55");
    //     let number = await RegInstance.getNumber();
    //     assert.equal(number.rows);
    //     var town = 'CA';

    //     let capetownRegs = await RegInstance.filterNumbers(town);
    //     assert.deepEqual(capetownRegs, ["CA 183 25", "CA 113 55"]);
    // });


    // it('should return numbers for the town selected', async function () {


    //     let RegInstance = regNumb(pool);
    //     await RegInstance.setNumber("cj 153 25");
    //     // await RegInstance.setNumber("cj 623 85")

    //     let number = await RegInstance.getNumber();
    //     assert.equal(number.rows);
    //     var town = 'CJ';

    //     let capetownRegs = await RegInstance.filterNumbers(town);
    //     assert.equal(capetownRegs, "CJ 153 25");
    // });

    // it('should return numbers for the town selected', async function () {


    //     let RegInstance = regNumb(pool);
    //     await RegInstance.setNumber("cy 113 25");
    //     // await RegInstance.setNumber("cj 623 85")

    //     let number = await RegInstance.getNumber();
    //     assert.equal(number.rows);
    //     var town = 'CY';

    //     let capetownRegs = await RegInstance.filterNumbers(town);
    //     assert.equal(capetownRegs, "CY 113 25");
    // });



    after(function () {
        pool.end();
    });
