const express = require("express");
const router = express.Router();
const googleTrends = require("google-trends-api");

router.get("/", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    console.log("키워드:", keyword);

    // 현재 날짜 기준으로 30일 전부터 데이터 가져오기
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28);
    startDate.setHours(0, 0, 0, 0);
    console.log("날짜:", startDate);

    const results = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: startDate,
      endTime: new Date(),
    });

    res.json(results);
  } catch (err) {
    console.error("에러 발생:", err);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
});

module.exports = router;
