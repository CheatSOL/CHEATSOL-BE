var express = require("express");
var router = express.Router();
const getStockData = require("../utils/KISUtils");
const handleCompanyNews =require( "../controllers/NewsCrawling");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hello World");
});

/*
router.get("/test", async function (req, res, next) {
  try {
    const stockData = await getStockData();

    res.status(200).json(stockData);
  } catch (error) {
    res.status(400).json(error);
  }
}); */
router.get("/news", handleCompanyNews);
module.exports = router;
