const express = require("express");
const router = express.Router();
const { searchYoutubeVideos } = require('../utils/Youtube');

router.get("/", (req, res) => {
    const word = req.query.word || '불닭'; 
    searchYoutubeVideos(word, res);
});

module.exports = router;
