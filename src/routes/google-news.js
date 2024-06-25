const express = require("express");
const router = express.Router();
const Parser = require("rss-parser");
const parser = new Parser();

router.get("/", async (req, res) => {
  try {
    console.log(req.query.keyword);
    const keyword = req.query.keyword;
    const feed = await parser.parseURL(
      `https://news.google.com/rss/search?q=${encodeURIComponent(
        keyword
      )}&hl=ko&gl=KR&ceid=KR:ko`
    );

    console.log(`Title: ${feed.title}`);
    console.log(`Link: ${feed.link}`);
    console.log(`Description: ${feed.description}`);

    const newsItems = feed.items.map((item) => {
      const titleParts = item.title.split(" - ");
      const title = titleParts[0];
      const source = titleParts[titleParts.length - 1] || "Unknown";

      return {
        title,
        link: item.link,
        pubDate: new Date(item.pubDate),
        contentSnippet: item.contentSnippet,
        source,
      };
    });

    newsItems.sort((a, b) => b.pubDate - a.pubDate);
    res.json(newsItems);
  } catch (err) {
    console.error("Error fetching RSS feed:", err);
    res.status(500).send("Error fetching RSS feed");
  }
});

module.exports = router;
