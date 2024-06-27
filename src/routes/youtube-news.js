const express = require("express");
const router = express.Router();
const Youtube = require("youtube-node");
const youtube = new Youtube();

router.get("/", async (req, res) => {
  const word = req.query.keyword; // 검색어 지정
  const limit = req.query.limit; // 출력 갯수

  youtube.setKey(process.env.YOUTUBE_KEY); // API 키 입력

  //// 검색 옵션 시작
  youtube.addParam("order", "date"); // 날짜 순으로 정렬
  youtube.addParam("type", "video"); // 타입 지정
  youtube.addParam("videoLicense", "creativeCommon"); // 크리에이티브 커먼즈 아이템만 불러옴
  //// 검색 옵션 끝

  youtube.search(word, limit, function (err, result) {
    // 검색 실행
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "서버 에러가 발생했습니다." });
    } // 에러일 경우 에러공지하고 빠져나감

    // 1. Parsing
    const items = result["items"]; // 결과 중 items 항목만 가져옴

    // 2. 영상 정보를 담을 배열
    const videos = [];

    // 3. item 돌면서 각각의 영상 정보 추출
    for (const i in items) {
      const it = items[i];
      const title = it["snippet"]["title"];
      const video_id = it["id"]["videoId"];
      const url = "https://www.youtube.com/watch?v=" + video_id;
      const thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
      const channel = it["snippet"]["channelTitle"];
      const pubDate = it["snippet"]["publishTime"];

      // 영상 정보를 객체로 저장
      const videoData = {
        title,
        video_id,
        url,
        thumbnail_url,
        channel,
        pubDate,
      };

      // 배열에 추가
      videos.push(videoData);
    }

    // 클라이언트에 JSON으로 응답
    res.json(videos);
  });
});

module.exports = router;
