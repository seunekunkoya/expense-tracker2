const express = require("express");
const router = express.Router();

const {getTransactions} = require('../controllers/transactions')

router.get("/", (req, res) => res.send("Hello"));

module.exports = router;
