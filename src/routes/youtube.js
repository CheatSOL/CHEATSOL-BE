const express = require("express");
const router = express.Router();
const { searchYoutubeVideos } = require('../utils/Youtube');

router.get("/", (req, res) => {
    const word = req.query.word || '불닭'; // 기본 검색어 지정
    const limit = req.query.limit||5; // 기본 출력 갯수 지정
    searchYoutubeVideos(word, limit, res);
});

module.exports = router;
