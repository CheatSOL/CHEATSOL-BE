var express = require("express");
var router = express.Router();
const { getStockData, setStockData } = require("../utils/KISUtils");
const { returnDto } = require("../utils/DtoUtils");
const handleCompanyNews =require( "../controllers/NewsCrawling");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hello World");
});

/*
router.get("/init", async function (req, res, next) {
  try {
    const stockData = await setStockData();
    res.status(200).json(returnDto("S001", 200, stockData));
  } catch (error) {
    res
      .status(error.status || 400)
      .json(returnDto("F001", error.status || 400, error.message));
  }
*/

router.get("/news", handleCompanyNews);

module.exports = router;
