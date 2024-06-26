const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const googleTrends = require("google-trends-api");

router.get("/google", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const start = req.query.startTime;

    // 현재 날짜 기준으로 30일 전부터 데이터 가져오기
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(start) + 2);
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

router.get("/youtube", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const start = req.query.startTime;

    // 현재 날짜 기준으로 30일 전부터 데이터 가져오기
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(start) + 2);
    startDate.setHours(0, 0, 0, 0);
    console.log("날짜:", startDate);

    const results = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: startDate,
      endTime: new Date(),
      property: "youtube",
    });

    res.json(results);
  } catch (err) {
    console.error("에러 발생:", err);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
});

router.post("/naver", async (req, res) => {
  const { keywords, startDate, endDate, periodOffset } = req.body;
  const requestBody = {
    startDate: startDate,
    endDate: endDate,
    timeUnit: Number(periodOffset) >= 365 ? "month" : "date",
    keywordGroups: keywords.map((keyword) => ({
      groupName: keyword,
      keywords: [keyword],
    })),
  };
  console.log("Request Body for Naver API:", requestBody);

  try {
    const response = await axios.post(
      "https://openapi.naver.com/v1/datalab/search",
      requestBody,
      {
        headers: {
          "X-Naver-Client-Id": "MrI3E2Bf2lMdJjrb6HaJ",
          "X-Naver-Client-Secret": "pAvfRnI4Lm",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("result : " + response.data.results);
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching keyword data:", error);
    res.status(500).send("Error fetching keyword data");
  }
});

module.exports = router;
