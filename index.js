var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var http = require('http');
var app = new express();
var server = http.createServer(app);
var url = 'mongodb://172.104.167.197:27017/tutor';
var mysql = require('mysql');
var request = require('request');
var mm = require('underscore');
var mysqlPool = mysql.createPool({
    host     : '172.104.167.197',
    user     : 'root',
    password : 'my-secret-pw',
    database : 'tutordb'
});
/*
MongoClient.connect(url,function(err,db){
    if(err)
    {
        console.log(err);

    }
    else
    {	
        console.log("Connected to db");
		var course_id1 = 123456;
		if (err) throw err;
			db.collection('course_chat').find({course_id : course_id1}).forEach(function(doc) {
			var user_id = doc.chat_text;
			console.log(doc);
			
		
			});

		db.close();
		
	}

})
*/
app.get('/',function(req,res) {
	res.send('kuy');
})


/*
app.get('/get_course_chat',function(req,res) {
	res.send('sda');
	mysqlPool.getConnection(function(err, connection) {
	  if(err) throw err;
	  //var course_id1 = req.params.courseid;
	  var course_id1 = 1511693785921;
	  MongoClient.connect(url,function(req,db){
		db.collection('course_chat').find({course_id : course_id1}).forEach(function(doc){
			var user_id = doc.user_id;
			var query = "SELECT u.fname , u.lname , u.user_img FROM user u WHERE u.user_id =  "+user_id+" ";
			connection.query(query, function(err, rows){
				res.send(rows);
				//connection.release();
				//res.end();
			})
			console.log('mysql' + user_id)
			
		})
	  
	  })
	  
	})
})*/


app.get('/get_course_chat',function(req,res) {
	res.send('sda');
			var o = {}
			var key = 'user';
			o[key] = [];
	  //var course_id1 = req.params.courseid;
	  var course_id1 = 1511693785921;
	  MongoClient.connect(url,function(req,db){
		db.collection('course_chat').find({course_id : course_id1}).forEach(function(doc){
			var user_id = doc.user_id;
			var txt = doc.chat_text;
			
			request('http://localhost:4000/user/'+user_id+'', function (error, response, body) {
			/*if (!error && response.statusCode == 200) {
		
        console.log(body) // Print the google web page.
			}*/
			
			 
	// console.log("body = " + body )
//console.log("[" + JSON.stringify(doc) +"]");
			//console.log('body = ' + body);
			//console.log("////");
			var jsonData = JSON.parse(body);
			var conuter = jsonData[0];
			//console.log('fname = ');
			//console.log(conuter.fname);

			
			var data = {
    firstname: conuter.fname,
    lastname: conuter.lname,
	chat_text: doc.chat_text
	};
	o[key].push(data);
	console.log(JSON.stringify(o));
})	
			
		})
	  
	  })
	  
	
})



app.get('/user/:user_id',function(req,res) {
	mysqlPool.getConnection(function(err, connection) {
	  if(err) throw err;
	  var user_id = req.params.user_id
		var query = "SELECT fname , lname FROM `user` WHERE user_id = "+user_id+""
		connection.query(query, function(err, rows) {
		res.json(rows);
		connection.release();
      res.end();
	  });
	})
});



var port = 4000;
server.listen(port ,function(){
console.log('server running on port: ' + port);
});

