var express = require("express");
var router = express.Router();
const { getSimilarityCompanies } = require("../controllers/Word2VecController");
const { getInstagramInfo } = require("../controllers/social/instagram");

router.get("/instagram", async (req, res, next) => {
  try {
    // console.log("req word:", req.query.word);
    let data = await getInstagramInfo(req.query.word);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ b: 1 });
  }
});

module.exports = router;
