const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    console.log(data);
    const formattedData = data.data.map((post) => ({
      caption: post.edgeMediaToCaption,
      hashtag: post.hashTags,
      likeN: post.likeCount,
      commentN: post.commentCount,
      pubDate: post.publishedAt,
      channel: post.channel.fullName || post.channel.name,
      thumbnail_url: null,
      url: `https://www.instagram.com/p/${post.postCode}`,
    }));
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

router.get("/", async (req, res) => {
  try {
    const { keyword } = req.query;
    const url = `https://moana.mediance.co.kr/v1/instagram-tags/top-posts?keyword=${encodeURI(
      keyword
    )}&uid=${process.env.INSTA_UID_KEY}%ip=${process.env.INSTA_IP}`;
    const posts = await fetchData(url);
    console.log("posts:", posts);
    res.json(posts);
  } catch (err) {
    console.error("Error fetching Instagram posts:", err);
    res.status(500).send("Error fetching Instagram posts");
  }
});

module.exports = router;
