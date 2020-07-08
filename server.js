'use strict'

//  Required Modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const xssFilters = require("xss-filters");
const users = require("./routes/api/users");

//	CSP for security: Only allows scripts, links, photos from the server itself.
const csp = require("helmet-csp");
const app = express();

//  Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  Declaring csp headers
app.use(csp({
	directives:{
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
	}
}));

//  MongoDB Configuration
const db = require("./config/keys").mongoURI;

//  Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

	// Routes
app.use("/api/users", users);

app.listen(5000, () => console.log("Backend server up and running on port 5000!"));
