import { useState } from "react";

export const SignupPage = () => {
	const [lastname, setLastname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
	}

	const handleSubmit = event => {
		event.preventDefault();

		fetch("http://localhost:3001/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				login: "admin",
				password: "admin"
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error))
	}

	const handleChange = (e) => {
		setLastname(e.target.value);
	}

	return (
		<>
			<p>inscription</p>

			<form onSubmit={handleSubmit}>
				<label>
					Lastname
					<input type="text" name="lastname" onChange={handleChange} />
				</label>

				<label>
					Firstname
					<input type="text" name="firstname" />
				</label>

				<label>
					Login
					<input type="text" name="login" />
				</label>

				<label>
					Password
					<input type="text" name="password" />
				</label>

				{/* <input type="submit" onClick={handleClick} /> */}
				<button type="submit">sub</button>
			</form>
		</>
	);
};