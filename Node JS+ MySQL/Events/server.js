var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var dialogs = require('dialogs');



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

/*SEARCH*/
app.post('/event/search', function (req,res){
			con.query("SELECT * FROM items WHERE id='"+req.body.search+"' OR name= '"+req.body.search+"' OR name LIKE '"+req.body.search+"%'" , function(err, result) {
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


/*POST METHOD-ADD*/
app.post('/event/add',function(req,res){
	var name = req.body.name;
	var qty = req.body.qty;
	var amount = req.body.amount;
	var query = "INSERT INTO items (name, qty, amount) VALUES(" +
		" '" + name+ "','" + qty+ "','" + amount+ "')";

	con.query(query, function(err,result){
		res.redirect(baseURL);
	});
});


/*EDIT*/

app.get('/event/edit/:id', function(req,res){
	con.query("SELECT * FROM items where id='"+ req.params.id+ "'" , function(err,result){

		res.render('pages/edit-event',{
			siteTitle : siteTitle,
			pageTitle : "Editing event: " + result[0].name,
			items : result
		});
	});
});


/*POST METHOD-EDIT*/
app.post('/event/edit/:id',function(req,res){
	var name = req.body.name;
	var qty = req.body.qty;
	var amount = req.body.amount;
	var id = req.body.id;
	var query = "UPDATE items SET";
		query+= " name = '" + name+ "',";
		query+= " qty = '" + qty+ "',";
		query+= " amount = '" + amount+ "'";
		query+= " WHERE id = " + id+ "";

	con.query(query, function(err,result){
		if(result.affectedRows){
			res.redirect(baseURL);
		}	
	});
});

/*DELETE*/
app.get('/event/delete/:id', function(req,res){

		con.query("DELETE FROM items WHERE id='"+ req.params.id+ "'" , function(err,result){
		
			if(result.affectedRows){	
				res.redirect(baseURL);
			}
	});
});


var server = app.listen(4000,function(){
	console.log("Sever started on 4000....");
});

