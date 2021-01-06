'use strict'

//  Required Modules
const express = require("express");
const mongoose = require("mongoose");
const xssFilters = require("xss-filters");
const users = require("./routes/api/users");
const party = require("./routes/api/party");
const cors = require("cors");
const path = require("path");
//	CSP for security: Only allows scripts, links, photos from the server itself.
const csp = require("helmet-csp");
const app = express();

//	Allow cors from the front end.
//	On deployment we will need to change this.
//app.use(cors({
//	origin: 'http://localhost:3000'
//}));
app.use(cors());

//  Body Parser Middleware
app.use(express.json());

//  Declaring csp headers
//app.use(csp({
//	directives:{
//		defaultSrc: ["'self'"],
//		scriptSrc: ["'self'"],
//	}
//}));

//  MongoDB Configuration
const db = require("./config/keys").mongoURI;

//  Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

	// Routes
app.use("/api/users", users);
app.use("/api/party", party);

//	Serve static assets if in production
if(process.env.NODE_ENV === "production") {
	//	Set Static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(5000, () => console.log("Backend server up and running on port 5000!"));
