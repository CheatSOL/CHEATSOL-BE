const axios = require('axios');

const url = "https://www.youtube.com/youtubei/v1/search?prettyPrint=false";

const headers = {
  "accept": "*/*",
  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "authorization": "SAPISIDHASH 1719375110_4742d5b209093c0beb2b85bee55aff684c57a939",
  "content-type": "application/json",
  "cookie": "VISITOR_INFO1_LIVE=nQQ6liUFzLc; VISITOR_PRIVACY_METADATA=CgJLUhIEGgAgRg%3D%3D; PREF=f7=4100&f4=4000000&tz=Asia.Seoul; __Secure-3PSID=g.a000kghMcqh-cIuClOwMohMHlCt0uTHhajgopNMnNVGC-jerIrMJKl_2eZXP1LamY_ojLu8vwwACgYKAfgSARMSFQHGX2MisM7_H1glm5EwcSLk801wwBoVAUF8yKos_BsCI-Ma_sJe3y_5koIn0076; __Secure-3PAPISID=6NEpbD3nPX708GUf/AvO77JbwcuDZP6vDH; __Secure-1PSIDTS=sidts-CjIB3EgAEovSnefj4gsdqm_PfzrcF40Dl9gtVNRSAURT04-Orm-W0ucXVCpMPRy5S0SiHxAA; __Secure-3PSIDTS=sidts-CjIB3EgAEovSnefj4gsdqm_PfzrcF40Dl9gtVNRSAURT04-Orm-W0ucXVCpMPRy5S0SiHxAA; __Secure-3PSIDCC=AKEyXzXHyTkVItAsgKvHQEgYx5x_fkq93KMnUmKa_n0tWcG5P0fGnTXQ-6hp4FFvG1C5lRl91p0; YSC=_3HJoINWmvM; GPS=1",
};





async function searchYoutubeVideos(word, res){
    try {
        const data = {
            "context": {
              "client": {
                "hl": "ko",
                "gl": "KR",
                "remoteHost": "1.231.165.73",
                "deviceMake": "Apple",
                "deviceModel": "",
                "visitorData": "CgtuUVE2bGlVRnpMYyjmqe6zBjIKCgJLUhIEGgAgRg%3D%3D",
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36,gzip(gfe)",
                "clientName": "WEB",
                "clientVersion": "2.20240624.06.00",
                "osName": "Macintosh",
                "osVersion": "10_15_7",
                "originalUrl": `https://www.youtube.com/results?search_query=${word}`,
                "screenPixelDensity": 2,
                "platform": "DESKTOP",
                "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                "configInfo": {
                  "appInstallData": "COap7rMGEMeEsQUQopKwBRCU_rAFEPex_xIQ6sOvBRCmmrAFEMOMsQUQgIuxBRDr6P4SEI_EsAUQ-vCwBRDH_bAFEKXC_hIQieiuBRCs-7AFEJPvsAUQ5fSwBRDWi7EFEJ2msAUQxv-wBRDbr68FEJrwrwUQsO6wBRCk7bAFEM3XsAUQgqL_EhCEjrEFEPur_xIQzN-uBRDrk64FENShrwUQyvmwBRDPqLAFEOOt_xIQ4tSuBRDViLAFELfvrwUQ3_WwBRD0q7AFEND6sAUQntCwBRCQsrAFEO6irwUQqJqwBRCnt7AFELHcsAUQjcywBRCA5bAFEJT8rwUQlp__EhCXg7EFEMT1sAUQ1d2wBRC9tq4FENCNsAUQo_iwBRCN2rAFEIjjrwUQ6YmxBRDJ17AFEL6AsQUQ3ej-EhDX6a8FEMn3rwUQ49GwBRDbirEFEMnmsAUQ4eywBRDT4a8FEL2KsAUQ2cmvBRC9mbAFEParsAUQzIqxBRC3q7AFEKrYsAUQtbH_EhD8hbAFEO_NsAUQooGwBRCUibEFELfq_hIQi8-wBRCIh7AFENjdsAUQlpWwBRDTw7AFEI-4_xIqIENBTVNFaFVKb0wyd0ROSGtCcUNROUF2TDFBUWRCdz09"
                },
                "screenDensityFloat": 2,
                "userInterfaceTheme": "USER_INTERFACE_THEME_LIGHT",
                "timeZone": "Asia/Seoul",
                "browserName": "Chrome",
                "browserVersion": "126.0.0.0",
                "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "deviceExperimentId": "ChxOek00TkRZMU9UY3pNRGt6TnpNd05EUXlNQT09EOap7rMGGOap7rMG",
                "screenWidthPoints": 464,
                "screenHeightPoints": 752,
                "utcOffsetMinutes": 540,
                "connectionType": "CONN_CELLULAR_4G",
                "memoryTotalKbytes": "8000000",
                "mainAppWebInfo": {
                  "graftUrl": "https://www.youtube.com/results?search_query=%EB%B6%88%EB%8B%AD",
                  "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED",
                  "webDisplayMode": "WEB_DISPLAY_MODE_BROWSER",
                  "isWebNativeShareAvailable": false
                }
              },
              "user": {
                "lockedSafetyMode": false
              },
              "request": {
                "useSsl": true,
                "internalExperimentFlags": [],
                "consistencyTokenJars": []
              },
              "clickTracking": {
                "clickTrackingParams": "CAEQt6kLGAIiEwj3x42ns_iGAxXAYvUFHXQgCuY="
              },
              "adSignalsInfo": {
                "params": [
                  {
                    "key": "dt",
                    "value": "1719375079025"
                  },
                  {
                    "key": "flash",
                    "value": "0"
                  },
                  {
                    "key": "frm",
                    "value": "0"
                  },
                  {
                    "key": "u_tz",
                    "value": "540"
                  },
                  {
                    "key": "u_his",
                    "value": "3"
                  },
                  {
                    "key": "u_h",
                    "value": "956"
                  },
                  {
                    "key": "u_w",
                    "value": "1470"
                  },
                  {
                    "key": "u_ah",
                    "value": "844"
                  },
                  {
                    "key": "u_aw",
                    "value": "1470"
                  },
                  {
                    "key": "u_cd",
                    "value": "30"
                  },
                  {
                    "key": "bc",
                    "value": "31"
                  },
                  {
                    "key": "bih",
                    "value": "752"
                  },
                  {
                    "key": "biw",
                    "value": "449"
                  },
                  {
                    "key": "brdim",
                    "value": "0,37,0,37,1470,37,1470,839,464,752"
                  },
                  {
                    "key": "vis",
                    "value": "1"
                  },
                  {
                    "key": "wgl",
                    "value": "true"
                  },
                  {
                    "key": "ca_type",
                    "value": "image"
                  }
                ],
                "bid": "ANyPxKqm5ai55LRtZsG7MMUIobjG2oKgSIvUoCmFqst6Tv_-cASntF1lspkrEMHo9-8lXBIl3_z5L5ROQNDh-r3neqomj87HeQ"
              }
            },
            "continuation": "Ep8DEgbrtojri60alANTQ2lDQVF0Sk5IRldSVE5xVGxOMlk0SUJDemhMZW5Fd05uQkJNVFJ2Z2dFTFIzVkxialZqZDBRNVVYZUNBUXRSVFVRM01XeEdRVTF0VllJQkMweFhWVTVwVVV0V1QwVTBnZ0VMY2xoaU5XWjVTMk56VkVXQ0FRdFZiVk5QTVhkR2RqbHRPSUlCQzBNeU1reHhlVU5SVUhKRmdnRUxZWGQ0WVRZd1QzWkplRkdDQVF0d1VGSlRiVU50T1dOTGI0SUJDelZpZDJsTmRFcG1ZV0ZWZ2dFTGJHZFNXSGczUkVwaVExbUNBUXR4UWkxak5saFlNalUxYTRJQkMwNWpVMk5LUzFwVlkzcEJnZ0VMZDFkS1gwWklhR1JrZFZtQ0FRdFplRzVXYlV4RFkwUmhNSUlCQzA5RE4wWnliMHRzUjFscmdnRUxWREYwT1hwcGJVZDRabXVDQVFzM2RGQmhTRTV2VlZabGM0SUJDekl6U0UweFpXMXJja2wzc2dFR0NnUUlNUkFENmdFRUNBUVFZdyUzRCUzRBiB4OgYIgtzZWFyY2gtZmVlZA%3D%3D"
          }
        const response = await axios.post(url, JSON.stringify(data), { headers });
        const contents = response.data.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems[0].itemSectionRenderer.contents;
        res.json(contents);
    } catch (error) {
        console.error("Error:", error.message);
    }

}
module.exports = {searchYoutubeVideos};