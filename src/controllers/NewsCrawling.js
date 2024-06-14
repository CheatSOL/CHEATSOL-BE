const axios=require('axios');
const cheerio=require('cheerio');
const { Model } = require('sequelize');
const { CompanyNews, Company } = require('../models/DB');
const fetchNews = require('../utils/naverStocknews');

async function fetchNewsContent(link) {
    try {
      const response = await axios.get(link);
      const $ = cheerio.load(response.data);
      const content = $('#newsct_article').text().trim()|| $('._article_content').text().trim();
      return content;
    } catch (error) {
      console.error(`Error fetching news content from ${link}:`, error);
      return null;
    }
  }
async function saveCodes() {    
    await CompanyNews.destroy({where : {}});
    const companies = await Company.findAll();
    const companyCodes = companies.map(company => ({
        code: company.dataValues.code,
        id: company.dataValues.id
      }));
    return companyCodes;
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// 데이터베이스에 뉴스 아이템 저장 함수
async function saveNewsToDatabase(id, newsItems) {
    
  const newsData = [];
    const items = newsItems[0];
        for (let item of items) {
            const link = `https://n.news.naver.com/article/${item.officeId}/${item.articleId}`;
            
            // 1초 지연 (1000ms)
            await delay(1000);
            
            const detailedContent = await fetchNewsContent(link);
            
            newsData.push({
                title: item.title,
                content: detailedContent || item.body,
                link: link,
                company_id: id
            });
        }
    console.log("newsData ", newsData);
    await CompanyNews.bulkCreate(newsData);
}

// Express 컨트롤러 함수
const handleNewsDatas = async (data, res ) => {
    // fetchNews 함수로 뉴스 아이템들 가져오기
    await delay(1000);
    const newsItems = await fetchNews(data.code);
    // console.log("dd", newsItems);
    // 가져온 뉴스 아이템들을 데이터베이스에 저장하기
    await saveNewsToDatabase(data.id, newsItems);
    // 성공 응답 보내기

};

const handleCompanyNews=async(req, res, next)=>{
    try{
       const companyCodes =await saveCodes();
       companyCodes.map(async (data)=>await handleNewsDatas(data, res));

       res.status(200).json({ message: `Successfully fetched and saved news items.` });
  
    }catch(error){
        console.error('Error handling news data:', error);
        // 에러 응답 보내기
        res.status(500).json({ error: 'Failed to fetch and save news items.' });
    
    }
};

module.exports=handleCompanyNews;