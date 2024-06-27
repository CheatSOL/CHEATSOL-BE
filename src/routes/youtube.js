const express = require("express");
const router = express.Router();
const { searchYoutubeVideos } = require("../utils/Youtube");

const cacheController = require("../controllers/CacheController");

router.get("/", async (req, res) => {
  const word = req.query.word || "불닭"; // 기본 검색어 지정
  const limit = req.query.limit || 5; // 기본 출력 갯수 지정
  const social = "youtube-news";
  const keyword = word;
  try {
    let cache = await cacheController.getCache(keyword, social, 0);

    if (cache === null || cache === undefined) {
      const data = JSON.stringify(await searchYoutubeVideos(word, limit, res));
      await cacheController.setCache(keyword, social, 0, data);
      cache = await cacheController.getCache(keyword, social, 0);
    }
    if (cacheController.isExpired(cache)) {
      const data = JSON.stringify(await searchYoutubeVideos(word, limit, res));
      await cacheController.updateCache(keyword, social, 0, data);
      cache = await cacheController.getCache(keyword, social, 0);
    }

    const newsItems = JSON.parse(cache.dataValues.data);
    res.json(newsItems);
  } catch (err) {
    console.error("Error fetching RSS feed:", err);
    res.status(500).send("Error fetching RSS feed");
  }
});

module.exports = router;
