const axios = require('axios');

const APP_KEY = "PSFtwDMJ9zt5YJhtqwpL7MOKYaYwclKaSMLZ";
const APP_SECRET = "TX8lP5381dlQ/DfTFF/gj1VEr7KUkvBXi614ES/ffRzELJLzWkQT1vdILWHwScuUowmfVacdfzEvoq3QsiyPDLp8iwElirja12Ir91lzftG+agWBs8wb3QFAkWoe1ErAyre/G7zXNMJXao25J2fEAk3KqY64X6EnH7PBaw1BLuVbeJKCpiA=";
let ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjRhY2VmYWYzLWNjNDQtNDNhNS1hMzcxLWNjNmRlMjg4ZDllMCIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODc2MzM0MSwiaWF0IjoxNzE4Njc2OTQxLCJqdGkiOiJQU0Z0d0RNSjl6dDVZSmh0cXdwTDdNT0tZYVl3Y2xLYVNNTFoifQ.RGbpI1bKYroe9adL4HG4id9HOGLQWsUfbgkFXkf4gtSigZSY6G6D93IYDkr8lZejDJCpAD75mRBo3tcttrQeeA";
const URL_BASE = "https://openapi.koreainvestment.com:9443";

// 인증 요청
const auth = async () => {
    const headers = { "content-type": "application/json" };
    const body = {
        "grant_type": "client_credentials",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET
    };
    const PATH = "oauth2/tokenP";
    const URL = `${URL_BASE}/${PATH}`;

    try {
        const response = await axios.post(URL, body, { headers });
        ACCESS_TOKEN = response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.message);
        throw new Error('Failed to fetch access token');
    }
};

// 일별 주식 가격 요청
const getDailyPrice = async (symbol) => {
    const PATH = "uapi/domestic-stock/v1/quotations/inquire-daily-price";
    const URL = `${URL_BASE}/${PATH}`;

    const headers = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ACCESS_TOKEN}`,
        "appKey": APP_KEY,
        "appSecret": APP_SECRET,
        "tr_id": "FHKST01010400"
    };

    const params = {
        "fid_cond_mrkt_div_code": "J",
        "fid_input_iscd": symbol,
        "fid_period_div_code": "D",
        "fid_org_adj_prc": "1"
    };

    try {
        const response = await axios.get(URL, { headers, params });
        console.log('response.data',response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.status, error.response.statusText);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw new Error('Failed to fetch daily price');
    }
};

module.exports = { getDailyPrice, auth };
