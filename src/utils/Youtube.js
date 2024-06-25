require("dotenv").config();
const Youtube = require('youtube-node');
const youtube = new Youtube();

const youtube_key = process.env.YOUTUBE_KEY;
youtube.setKey(youtube_key); // API 키 입력

//// 검색 옵션 시작
youtube.addParam('order', 'date'); // 평점 순으로 정렬
youtube.addParam('type', 'video');   // 타입 지정
youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴
//// 검색 옵션 끝

function searchYoutubeVideos(word, limit, res) {
    youtube.search(word, limit, function (err, result) {
        if (err) { 
            console.log("dfsd", err); 
            res.status(500).send({ error: 'Error occurred while searching videos' });
            return;
        }

        const items = result["items"]; // 결과 중 items 항목만 가져옴
        const videos = items.map(it => {
            const title = it["snippet"]["title"];
            const video_id = it["id"]["videoId"];
            const url = "https://www.youtube.com/watch?v=" + video_id;
            const thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
            const channel = it["snippet"]["channelTitle"];
            const pubDate = it["snippet"]["publishTime"];
            
            return {
                pubDate: pubDate,
                channel: channel,
                title: title,
                url: url,
                thumbnail_url: thumbnail_url
            };
        });

        res.send(videos);
    });
}

module.exports = { searchYoutubeVideos };
