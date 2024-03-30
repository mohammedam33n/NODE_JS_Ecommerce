const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/database.js");
const ApiError = require("./utils/apiError.js");
const globalError = require("./Middleware/errorMiddleware.js");
const categoryRoute = require("./routes/categoryRout.js");
const subCategoryRoute = require("./routes/subCategoryRout.js");

dbConnection();

// Load env variables from .env file.
dotenv.config({ path: "config.env" });

const app = express();

//Middleware configuration

app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

//mount Route
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);

app.all("*", (req, res, next) => {
	next(new ApiError(`can't mount ${req.originalUrl}`, 400));
});

// Global Error Handle Middleware
app.use(globalError);

const PORT = process.env.PORT;
const server = app.listen(PORT || 8000, () => {
	console.log(`Server is running on port ${PORT}`);
});

//handle error outside express
process.on("unhandledRejection", (err) => {
	// console.log(`unhandledRejection Error : ${err.name} | ${err.message}`);
	server.close(() => {
		console.log(`unhandledRejection Error : ${err.name} | ${err.message}`);
		console.log("shutting down.....");
		process.exit(1);
	});
});
