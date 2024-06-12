const AuthToken = require("../models/AuthToken");

async function getAuthToken(ApiHost) {
  try {
    const authTokens = await AuthToken.find(ApiHost);
    authTokens.forEach((token) => console.log(token.toJSON()));
  } catch (error) {
    console.error("Error fetching AuthTokens:", error);
  }
}
