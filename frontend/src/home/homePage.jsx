import { Button } from "./components/button";

export const HomePage = () => {
	return (
		<main>
			<h1>login-full-js</h1>

			<div>
				<Button text={"Signup"} link={"/signup"} />
				<Button text={"Signin"} link={"/signin"} />
			</div>
		</main>
	);
};