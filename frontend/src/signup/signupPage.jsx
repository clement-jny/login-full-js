import { useEffect, useState } from "react";

export const SignupPage = () => {
	const [inputs, setInputs] = useState({});
	//const errorMessage = "Some fields are empty!";
	//const [showError, setShowError] = useState(false);
	// const [inputs, setInputs] = useState({
	// 	lastname: "",
	// 	firstname: "",
	// 	login: "",
	// 	password: "",
	//// 	confirmPassword: ""
	// });

	useEffect(() => {
		const inputElements = document.getElementById("form").getElementsByTagName("input");
		const inputsName = {};
		
		for (const element of inputElements) {
			inputsName[element.name] = "";
		}

		setInputs(structuredClone(inputsName));
	}, []);

	// useEffect(() => {
	// 	if (showError) {
	// 		alert(errorMessage);
	// 	}
	// }, [showError]);


	const handleInputChange = event => {
		const { name, value, type, checked } = event.target;
		const newValue = type === 'checkbox' ? checked : value;
		setInputs({ ...inputs, [name]: newValue });
	};
	
	const handleFormSubmit = event => {
		event.preventDefault();
		
		for (const key in inputs) {
			if (inputs[key].trim().length === 0) {
				//console.log(`-${key}: vide`);
				//alert("Some fields are empty!");
				//setShowError(true);
			}
		}


		//if (!showError) {
			fetch("http://localhost:3001/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(inputs)
			})
			.then(response => response.json())
			.then(data => alert(data.message))
			.catch(error => console.error(error))
		//}

		//setShowError(false);
	};

	return (
		<>
			<p>Signup</p>

			<form id="form" onSubmit={handleFormSubmit}>
				<label>
					Lastname
					<input type="text" name="lastname" onChange={handleInputChange} />
				</label>

				<label>
					Firstname
					<input type="text" name="firstname" onChange={handleInputChange} />
				</label>

				<label>
					Login
					<input type="text" name="login" onChange={handleInputChange} />
				</label>

				<label>
					Password
					<input type="password" name="password" onChange={handleInputChange} />
				</label>

				{/* <label>
					Confirm password
					<input type="password" name="confirmPassword" onChange={handleInputChange} />
				</label> */}

				<button type="submit">Submit</button>
			</form>
		</>
	);
};