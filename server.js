const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//make env know where the config env file is
dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();

//use body parser middleware
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//app.get("/", (req, res) => res.send("Hello"));
app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
