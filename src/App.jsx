import axios from "axios";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function App() {
	const [response, setResponse] = useState("");
	const {
		isLoading,
		isAuthenticated,
		error,
		user,
		loginWithPopup,
		loginWithRedirect,
		logout,
		getAccessTokenSilently,
	} = useAuth0();

	const getRouteData = () => {
		axios
			.get("http://localhost:8080/")
			.then((response) => setResponse(response.data))
			.catch((err) => console.error(err.message));
	};

	const getProtectedRouteData = async () => {
		const token = await getAccessTokenSilently();

		axios
			.get("http://localhost:8080/protected", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setResponse(response.data))
			.catch((err) => console.error(err.message));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Oops... {error.message}</div>;
	}

	return (
		<div>
			<h1>Auth0 - Authentication</h1>
			<ul>
				<li>
					<button onClick={loginWithPopup}>Login with popup</button>
				</li>
				<li>
					<button onClick={loginWithRedirect}>Login with redirect</button>
				</li>
				<li>
					<button onClick={logout}>Log out</button>
				</li>
			</ul>
			<p>{isAuthenticated ? "Logged In" : "Not logged In"}</p>
			{isAuthenticated && <pre>{JSON.stringify(user, null, 2)}</pre>}

			<div>
				<button onClick={getRouteData}>Get data from &quot;/&quot; route</button>
			</div>
			<div>
				<button onClick={getProtectedRouteData}>
					Get data from &quot;/protected&quot; route
				</button>
			</div>
			<div>
				<h2>My data:</h2>
				<p>{response}</p>
			</div>
		</div>
	);
}

export default App;
