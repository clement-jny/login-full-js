import * as http from "http"; //import { createServer } from "http"; || const http = require("http");
import * as mysql from "mysql"; //var mysql = require('mysql');
import * as dotenv from "dotenv";
dotenv.config();

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
})

// connection.query('SELECT 1 + 1 AS solution', function (error, results) {
// 	if (error) throw error;
// 	console.log('The solution is: ', results[0].solution);
// });

// Fermer la connexion à la base de données
connection.end((err) => {
	if (err) {
		console.error('Erreur de déconnexion de la base de données : ' + err.stack);
		return;
	}
	console.log('Déconnecté de la base de données.');
});


const requestListener = function (req, res) {
	res.setHeader("Content-Type", "application/json");

	switch (req.url) {
		case "/test":
			res.writeHead(200);
			res.end(`{"message": "Page de test!"}`);
			break;

		default:
			res.writeHead(200);
			res.end(`{"message": "Connected!"}`);
			break;
	}
};

http.createServer(requestListener).listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
	console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});


// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
// 	//res.send("Hello World!");
// 	res.send("Okayyyyy");
// });

// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`);
// });
//"start": "nodemon --watch app.js app.js"