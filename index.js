const express = require('express'); //importing express
const bodyParser = require('body-parser'); //import bp
const exphbs = require('express-handlebars'); //reference express-hbs after download

const  bookingApp = require('./waiterDays');
const routes = require('./route');
const app = express(); //instance of app

const flash = require('express-flash');
const session = require('express-session');


const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost';


const pool = new Pool({
    connectionString

});

const toBeBooked = bookingApp(pool);
const myRoutes = routes(toBeBooked);


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars'); //configure handlebars

app.use(session({
    secret: "enter here",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json()); //config as per line13

app.use(express.static('public'));

app.get('/', myRoutes.enteredNumbers);
// app.post('/waiters/:username', myRoutes.add);
// app.get('/days', myRoutes.filtersApp);

const PORT = process.env.PORT || 5001; //config port to use default and define new port
app.listen(PORT, function () {
    console.log("App listening at port:", PORT);
});