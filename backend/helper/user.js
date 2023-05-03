// const mysql = require('mysql');

// const connection = mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASS,
// 	database: process.env.DB_DATABASE
// });


// export const checkIfExist = (login, password) => {
// 	connection.query("select * from user where login = ? and password = ?", [login, password], (err, results) => {
// 		if (err) {
// 			console.error('Error SQL query: ' + err.stack);
// 			res.status(500).json({ message: "Server error." });
// 			return;
// 		}

// 		if (results.length !== 0) {
// 			return (true);
// 		} else {
// 			return (false);
// 		}
// 	});
// };

// export const signup = (lastname, firstname, login, password) => {

// };

// export const signin = () => {

// }