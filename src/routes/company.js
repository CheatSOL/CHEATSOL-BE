var express = require("express");
var router = express.Router();
const { returnDto } = require("../utils/DtoUtils");
const { getSimilarityCompanies } = require("../controllers/Word2VecController");

const cacheController = require("../controllers/CacheController");

router.get("/", async function (req, res, next) {
  try {
    var searchWord = req.query.word;
    const keyword = searchWord;
    const SOCIAL = "ai";
    const PERIOD = 0;
    let cache = await cacheController.getCache(keyword, SOCIAL, PERIOD);

    if (cache === null || cache === undefined) {
      const data = JSON.stringify(await getSimilarityCompanies(searchWord));
      await cacheController.setCache(keyword, SOCIAL, PERIOD, data);
      cache = await cacheController.getCache(keyword, SOCIAL, PERIOD);
    }
    if (cacheController.isExpired(cache)) {
      const data = JSON.stringify(await getSimilarityCompanies(searchWord));
      await cacheController.updateCache(keyword, SOCIAL, PERIOD, data);
      cache = await cacheController.getCache(keyword, SOCIAL, PERIOD);
    }
    var similarities = JSON.parse(cache.dataValues.data);
    res.status(200).json(returnDto("A003", 200, similarities));
  } catch (error) {
    res.status(400).json(returnDto("E003", 400, "Error"));
  }
});

module.exports = router;
