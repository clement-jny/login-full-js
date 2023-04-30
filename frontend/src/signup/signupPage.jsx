import { useState } from "react";

export const SignupPage = () => {
	const [lastname, setLastname] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
	}

	const handleSubmit = event => {
		event.preventDefault();

		alert(lastname);
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

				<input type="submit" onClick={handleClick} />
				<button type="submit" />
			</form>
		</>
	);
};