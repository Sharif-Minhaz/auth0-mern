import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";

const jwtCheck = auth({
	audience: "http://localhost:8080/",
	issuerBaseURL: "https://dev-du5cl03u6snq26r1.us.auth0.com/",
	tokenSigningAlg: "RS256",
});

const app = express();
app.use(cors());

app.get("/", (req, res) => {
	res.send("This is home page' data");
});

app.get("/protected", jwtCheck, async (req, res) => {
	const accessToken = req.headers.authorization.split(" ")[1];
	const response = await axios.get("https://dev-du5cl03u6snq26r1.us.auth0.com/userinfo", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	console.log(response);
	res.send("This is a protected route' data");
});

app.listen(8080, () => {
	console.log("Server is running at: http://localhost:8080/");
});
