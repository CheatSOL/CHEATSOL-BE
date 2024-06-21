var express = require("express");
var router = express.Router();
const { returnDto } = require("../utils/DtoUtils");
const { getSimilarityCompanies } = require("../controllers/Word2VecController");

router.get("/", async function (req, res, next) {
  try {
    var searchWord = req.query.word;
    var similarities = await getSimilarityCompanies(searchWord);
    //var similarities = "333";
    res.status(200).json(returnDto("A003", 200, similarities));
  } catch (error) {
    res.status(400).json(returnDto("E003", 400, "Error"));
  }
});

module.exports = router;
