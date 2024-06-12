const axios = require("axios");
require("dotenv").config(); // dotenv 설정 불러오기
const { getAuthToken } = require("../controllers/AuthController");

const appkey = process.env.KIS_APP_KEY;
const appsecret = process.env.KIS_SECRET_KEY;
let accessToken;

async function getToken() {
  const url = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";
  const headers = { "content-type": "application/json" };
  const body = {
    grant_type: "client_credentials",
    appkey: appkey,
    appsecret: appsecret,
  };

  const response = await axios.post(url, body, { headers });
  return response.data;
}

function isExpired(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();

  return givenDate < currentDate;
}

const getStockData = async function getStockData() {
  const url =
    "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/ranking/market-cap";
  if (accessToken === undefined) {
    accessToken = await getToken();
  }
  if (!isExpired(accessToken.access_token_token_expired)) {
    accessToken = await getToken();
  }

  const authorization = accessToken.access_token;
  const token_type = accessToken.token_type;

  const headers = {
    authorization: token_type + " " + authorization,
    appkey: appkey,
    appsecret: appsecret,
    custtype: "P",
    tr_id: "FHPST01730000",
    "content-type": "utf-8",
  };
  const params = {
    fid_cond_mrkt_div_code: "J",
    fid_cond_scr_div_code: "20173",
    fid_input_iscd: "0000",
    fid_div_cls_code: "0",
    fid_input_price_1: "",
    fid_input_price_2: "",
    fid_vol_cnt: "",
    fid_input_option_1: "2023",
    fid_input_option_2: "0",
    fid_rank_sort_cls_code: "0",
    fid_blng_cls_code: "0",
    fid_trgt_exls_cls_code: "0",
    fid_trgt_cls_code: "0",
  };

  const response = await axios.get(url, { headers, params });
  console.log(response.data);
  return response.data;
};

module.exports = getStockData;
