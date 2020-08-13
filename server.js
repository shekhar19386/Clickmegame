// load the things we need
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
global.config = require("./config/config");

//Import the mongoose module
const mongoose = require('mongoose');

// Create instance of user Controller
var UserController = require("./controllers/UserController");

const app = express();

app.use(session({
	cookieName: 'session',
	secret: 'random_string_goes_here',
	usersession: 'user_sessiondata_object_goes_here',
	userresult: 'user_data_object_goes_here',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// defining body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// defining public folder path
app.use(express.static(__dirname + '/public'));

//Set up default mongoose connection
mongoose.Promise = global.Promise;
if (config.databaseAuth == false) {
  mongoose.connect(config.database, {    
    debug: true
  });
} else {
  mongoose.connect(config.database, {    
    user: config.dbUser,
    pass: config.dbPassword,
    debug: true
  });
}

// this will log all the queries which will run during request and response
mongoose.set('debug', true);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Routing Starts from here */
// index page 
app.get('/', function(req, res) {
	res.render('pages/index', {'pagetitle':'Home', 'pageslug': 'home'});
});

// lobby page 
app.get('/lobby', async function(req, res) {
	let Usercontroller = new UserController();
	let isValidUser = Usercontroller.validateUserSession(req, res);
	if(isValidUser){		
		let allusersdata = await Usercontroller.getAllUsers(req, res);
		// console.log('allusersdata-------', JSON.stringify(allusersdata));		
	}else{
		res.status(200).redirect('/');
	}
});

// game-room page 
app.get('/game-room', function(req, res) {
	let Usercontroller = new UserController();
	let isValidUser = Usercontroller.validateUserSession(req, res);
	if(isValidUser){		
		res.render('pages/game-room', {'pagetitle':'Game Room', 'pageslug': 'game-room'});
	}else{
		res.status(200).redirect('/');
	}
});

// play game page 
app.get('/play-game', function(req, res) {
	let Usercontroller = new UserController();
	let isValidUser = Usercontroller.validateUserSession(req, res);
	if(isValidUser){		
		res.render('pages/play-game', {'pagetitle':'Play Game', 'pageslug': 'play-game'});
	}else{
		res.status(200).redirect('/');
	}	
});

// scoreboard page 
app.get('/scoreboard', async function(req, res) {
	let Usercontroller = new UserController();
	let isValidUser = Usercontroller.validateUserSession(req, res);
	if(isValidUser){		
		let scoreboarddata = await Usercontroller.getScoreBoardData(req, res);		
	}else{
		res.status(200).redirect('/');
	}	
});

// logout 
app.get('/logout', async function(req, res) {
	let Usercontroller = new UserController();		
	await Usercontroller.logoutUser(req, res);	
});

// save user 
app.post('/saveuser', async function(req, res) {	
	let Usercontroller = new UserController();
	let userres = await Usercontroller.saveUser(req, res);
	res.status(200).send({'status':200,'data':userres});
});

//save user click
app.post('/saveuserclick', async function(req, res) {	
	let Usercontroller = new UserController();
	let userres = await Usercontroller.saveUserScore(req, res);
	res.status(200).send({'status':200,'data':userres});	
});


app.listen(8080);
console.log('8080 is the magic port');