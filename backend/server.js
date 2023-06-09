//const http = require("http"); //import { createServer } from "http"; || import * as http from "http";
const mysql = require('mysql'); //import * as mysql from "mysql";
require("dotenv").config();// import * as dotenv from "dotenv"; || const dotenv = require("dotenv"); || import ("dotenv/config");

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
//const { checkIfExist } = require('./helper/user');

const app = express();
app.use(cors());
app.use(bodyParser.json())


const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE
});

// Database connection
connection.connect((err) => {
	if (err) {
		console.error('Error while connecting to the database: ' + err.stack);
		return;
	}
	console.log('Connected to the database.');
});


/* GET Route '/' -> send json response */
// app.get("/", (req, res) => {
// 	res.status(200).json({ message: "Connected!" });
// });

/* GET Route '/users' ->  */
app.get("/users", (req, res) => {

	/* If some queries, query db with the value */
	// if (Object.keys(req.query).length !== 0) {
	// 	const login = req.query.login.toLowerCase() + "%";

	// 	connection.query("select * from user where login like ?", login, (err, results) => {
	// 		if (err) {
	// 			console.error('Erreur de requête SQL : ' + err.stack);
	// 			res.status(500).json({message: "Erreur de serveur."});
	// 			return;
	// 		}
	
	// 		res.status(200).json(results);
	// 	});
	// } else {

	/* Fecth all users, if error send error. Send the result of the query */
	connection.query("select * from user", (err, results) => {
		if (err) {
			console.error('Error SQL query: ' + err.stack);
			res.status(500).json({ message: "Server error." });
			return;
		}

		//res.end(JSON.parse(JSON.stringify(rows[0])));
		//console.log(structuredClone(rows[0])); //JSON.parse(JSON.stringify(rows))
		//res.end(structuredClone(rows[0]));
		//res.end(JSON.stringify(rows));

		res.status(200).json(results);
	});
	//}
});


/* POST Route '/users' ->  */
app.post("/users", (req, res) => {
	// { lastname: '', firstname: 'a', login: 'a', password: 'a' }

	const { lastname, firstname, login, password } = req.body;

	//const newAccount = false;
	//const resultExist = checkIfExist(login, password);
	//console.log(resultExist);

	connection.query("insert into user (lastname, firstname, login, password) values (?, ?, ?, ?)", [lastname, firstname, login, password], (err, results) => {
		if (err) {
			console.error('Error SQL query: ' + err.stack);
			res.status(500).json({ message: "Server error." });
			return;
		}

		//console.log(results);
		res.status(201).json({ message: "You have been registred" });
	});

	//if (newAccount) {
		// connection.query("insert into user (lastname, firstname, login, password) values (?, ?, ?, ?)", [lastname, firstname, login, password], (err, results) => {
		// 	if (err) {
		// 		console.error('Error SQL query: ' + err.stack);
		// 		res.status(500).json({ message: "Server error." });
		// 		return;
		// 	}

		// 	console.log(results);
		// });

		//res.status(201).json({ message: "no res" });
	//}
});

/* GET Router '/users/id' -> send a user by an id or send error */
app.get("/users/:id", (req, res) => {
	const userId = req.params.id;

	connection.query("select * from user where id = ?", userId, (err, results) => {
		if (err) {
			console.error('Erorr SQL query: ' + err.stack);
			res.status(500).json({ message: "Server erorr." });
			return;
		}

		res.status(200).json(results.shift());
	});
});

/* Listen on the port and the host */
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
	console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});






// const requestListener = (req, res) => {
// 	res.setHeader("Content-Type", "application/json");

// 	switch (req.url) {
// 		case "/users":
// 			connection.query("select * from user", (err, rows) => {
// 				if (err) {
// 					console.error('Erreur de requête SQL : ' + err.stack);
// 					res.writeHead(500);
// 					res.end(`{"message": "Erreur de serveur."}`);
// 					return;
// 				}

// 				//res.end(JSON.parse(JSON.stringify(rows[0])));
// 				//console.log(structuredClone(rows[0])); //JSON.parse(JSON.stringify(rows))
// 				//res.end(structuredClone(rows[0]));
// 				res.end(JSON.stringify(rows));
// 			});
// 			break;

// 		case "/hello":
// 			//console.log(url.parse(req.url, true).pathname.replace(/^\/+|\/+$/g, ''));
// 			const parsedUrl = url.parse(req.url, true);
// 			const path = parsedUrl.pathname;
// 			const trimmedPath = path.replace(/^\/+|\/+$/g, '');
// 			console.log(trimmedPath);


// 			if (trimmedPath === 'hello') {
// 				const name = parsedUrl.query.name || 'World';
// 				res.setHeader('Content-Type', 'application/json');
// 				res.end(JSON.stringify({ message: `Hello, ${name}!` }));
// 			} else {
// 				res.writeHead(404);
// 				res.end();
// 			}
// 			break;


// 		default:
// 			res.writeHead(200);
// 			res.end(`{"message": "Connected!"}`);
// 			break;
// 	}
// };

// Fermer la connexion à la base de données
// connection.end((err) => {
// 	if (err) {
// 		console.error('Erreur de déconnexion de la base de données : ' + err.stack);
// 		return;
// 	}
// 	console.log('Déconnecté de la base de données.');
// });

// http.createServer(requestListener).listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
// 	console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
// });