const axios = require("axios");

const getToken = async ({ request, response }) => {
  try {
    const res = await axios.post(
      "https://github.com/login/oauth/access_token",
      request.body
    );

    response.status = 200;
    response.body = {
      token: new URLSearchParams(res.data).get("access_token"),
    };
  } catch (e) {
    response.status = 500;
    response.body = {
      error: e.message,
    };
  }
};

module.exports = { getToken };
