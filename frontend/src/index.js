//import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from './home/homePage';
import { SignupPage } from "./signup/signupPage";
import { SigninPage } from "./signin/signinPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/signup",
		element: <SignupPage />
	},
	{
		path: "/signin",
		element: <SigninPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);