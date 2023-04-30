import { Button } from "./components/button";
import { useEffect, useState } from "react";

export const HomePage = () => {
	const [users, setUsers] = useState([]);


	useEffect(() => {
		fetch("http://localhost:3001/users")
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error(res.status);
			}
		})
		.then((res) => {
			console.log(res);
			setUsers(res);
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
		<main>
			<h1>login-full-js</h1>

			<div>
				<Button text={"Signup"} link={"/signup"} />
				<Button text={"Signin"} link={"/signin"} />
			</div>

			{
				users.length === 0 ? <p>pas users</p> : 
				users.map((user) => (
					<p key={user.login}>{user.login}</p>
				))
			}
		</main>
	);
};