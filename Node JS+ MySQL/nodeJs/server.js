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
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

var server = app.listen(4000,function()){
	console.log("Sever started on 4000....");
});
