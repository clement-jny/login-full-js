//const http = require("http"); //import { createServer } from "http"; || import * as http from "http";
const mysql = require('mysql'); //import * as mysql from "mysql";
require("dotenv").config();// import * as dotenv from "dotenv"; || const dotenv = require("dotenv");

const express = require("express");
const app = express();


const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE
});

// Connecter à la base de données
connection.connect((err) => {
	if (err) {
		console.error('Erreur de connexion à la base de données : ' + err.stack);
		return;
	}
	console.log('Connecté à la base de données.');
});



app.get("/", (req, res) => {
	res.status(200).json({message: "Connected!"});
});
app.get("/users", (req , res) => {
	if (Object.keys(req.query).length !== 0) {
		const login = req.query.login.toLowerCase() + "%";

		connection.query("select * from user where login like ?", login, (err, rows) => {
			if (err) {
				console.error('Erreur de requête SQL : ' + err.stack);
				res.status(500).json({message: "Erreur de serveur."});
				return;
			}
	
			res.status(200).json(rows);
		});
	} else {
		connection.query("select * from user", (err, rows) => {
			if (err) {
				console.error('Erreur de requête SQL : ' + err.stack);
				res.status(500).json({message: "Erreur de serveur."});
				return;
			}
	
			//res.end(JSON.parse(JSON.stringify(rows[0])));
			//console.log(structuredClone(rows[0])); //JSON.parse(JSON.stringify(rows))
			//res.end(structuredClone(rows[0]));
			//res.end(JSON.stringify(rows));
	
			res.status(200).json(rows);
		});
	}
});
app.get("/users/:id", (req, res) => {
	const userId = req.params.id;

	connection.query("select * from user where id = ?", userId, (err, rows) => {
		if (err) {
			console.error('Erreur de requête SQL : ' + err.stack);
			res.status(500).json({message: "Erreur de serveur."});
			return;
		}

		res.status(200).json(rows);
	});
});


app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
	console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
})
//"start": "nodemon --watch app.js app.js"






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