var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require("cors");

//var path = require('');
// const port = 3306;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance',
    port: 3306
});
// app.get('/post', cors(), function(req, res) {
//     res.send();
// });


var app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get('/', function(request, response) {
//  response.sendFile(path.join(__dirname + '/signup.component.html'));



// res.writeHead(200, { 'Content-Type': 'text/plain' });

// Send back a response and end the connection
// res.end('Hello World!\n');//
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})
app.post('/auth', function(req, res) {

    var sql = "INSERT INTO student(rollno,first_name,last_name)" + "VALUES('" + req.body.roll + "','" + req.body.firstName + "','" + req.body.lastName + "');";
    connection.query(sql, function(err, result, field) {
        if (result != null) {
            res.json({ msg: "Inserted" });
            console.log(req.body);
        } else {
            res.json({ msg: "Not Inserted" + sql });
        }

    });
});

app.get('/edit', (req, res) => {
    connection.query('SELECT * FROM student', function(err, rows, field) {


        if (rows != null) {
            console.log("rows not null");
            console.log(rows);

        } else {
            console.log("rows null");

        }
        res.send(rows);

    });
});

app.put('/auth2', function(req, res) {

    var sql = "UPDATE student SET first_name='" + req.body.firstName + "', last_name='" + req.body.lastName + "' WHERE rollno=" + req.body.roll;
    connection.query(sql, function(err, result, field) {
        if (result != null) {
            res.json({ msg: "Inserted" });
            console.log(req.body);
        } else {
            res.json({ msg: "Not Inserted" + sql });
        }

    });
});

app.delete('/edit/:roll', function(req, res) {

    console.log(req.params.roll);

    var sql = "DELETE from student where rollno = " + req.params.roll;
    connection.query(sql, function(err, rows, field) {
        if (rows != null) {
            console.log("Deleted value successfully");
        } else {
            console.log("Not Deleted" + sql);
            // res.json({ msg: "Not deleted" + req.body });

        }


    })

})


//app.listen(5000);
app.listen(5000, () => console.log(`This app listening on port 5000!`))