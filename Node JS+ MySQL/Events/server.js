var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var dateFormat = require('dateformat');
var now = new Date();

app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

/*MYSQL CONNECTION*/
const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "Inventory"

});

const siteTitle = "Inventory";
const baseURL = "http://localhost:4000/";

/*EVENTS HERE*/

/*READ*/
app.get('/', function (req,res){
	
con.query("SELECT * FROM items", function(err, result) {
			res.render('pages/index',{
			siteTitle : siteTitle,
			pageTitle : "Welcome to the Inventory",
			items : result
		});
	});

});

/*ADD*/
app.get('/event/add', function (req,res){
	
			res.render('pages/add-event.ejs',{
			siteTitle : siteTitle,
			pageTitle : "Add new Item",
			items : ''
		});
});



var server = app.listen(4000,function(){
	console.log("Sever started on 4000....");
});
