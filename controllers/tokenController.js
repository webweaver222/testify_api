const axios = require("axios");

const getToken = async ({ request, response }) => {
  try {
    const res = await axios.post(
      "https://github.com/login/oauth/access_token",
      request.body
    );

    const token = new URLSearchParams(res.data).get("access_token");

    const user = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${token}` },
    });

    response.status = 200;
    response.body = {
      user: user.data,
      token,
    };
  } catch (e) {
    console.log("warn");
    response.status = 500;
    response.body = {
      error: e.message,
    };
  }
};

module.exports = { getToken };
