var express =  require('express');
var mongoose = require('mongoose');
var bodyParser =  require('body-parser');
var morgan = require('morgan');
var ejs = require('ejs');
var engine = require('ejs-mate');
var app = express();
var keys = require('./config/keys');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');

mongoose.connect('mongodb://localhost/codefree',err =>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the database");
    }
});

app.use(express.static(__dirname+'/public'));
app.engine('ejs', engine);
app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(cookieParser());
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret : keys.secret,
    store : new MongoStore({
        url : 'mongodb://localhost/codefree',
        autoReconnect : true
    })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    res.locals.user = req.user;
    next();
});

require('./routes/main')(app);
require('./routes/user')(app);

app.listen(keys.port,err => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected to port 5000");
    }
})