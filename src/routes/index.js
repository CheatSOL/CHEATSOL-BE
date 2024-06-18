var express = require("express");
var router = express.Router();
const { getStockData, setStockData } = require("../utils/KISUtils");
const { returnDto } = require("../utils/DtoUtils");
const handleCompanyNews =require( "../controllers/NewsCrawling");
const { authCurrentPrice, getCurrentPrice}=require( "../controllers/stockdetail/CurrentPrice");
const {auth, getDailyPrice}=require("../controllers/stockdetail/DailyPrice");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hello World");
});

router.get("/news", handleCompanyNews);


router.get('/current-price', async (req, res) => {
  const symbol = req.query.symbol || '005930';
  try {
    // await authCurrentPrice();
    const price = await getCurrentPrice(symbol); // 현재 삼성전자로 하드코딩
    console.log('ㅓㅓ',price);
    res.json(price);
  }
  catch (error) {
      console.error('Error fetching data from external API:', error);
      res.status(500).json({ error: 'Error fetching data from external API' });
  }
});

router.get('/daily-price', async (req, res) => {
  const symbol = req.query.symbol || '005930';
  try {
    // await auth();
    const price = await getDailyPrice(symbol); // 현재 삼성전자로 하드코딩
    console.log('ㅇㅇ',price);
    res.json(price);
  }
  catch (error) {
      console.error('Error fetching data from external API:', error);
      res.status(500).json({ error: 'Error fetching data from external API' });
  }
});


module.exports = router;
