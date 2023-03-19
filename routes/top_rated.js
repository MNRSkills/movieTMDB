const axios = require("axios");

const topRatedRouter = require("express").Router();
topRatedRouter.get("/top_rated", async (req, res) => {
  try {
    await axios
      .get(`/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`)
      .then(function (response) {
        // console.log("THIS IS FROM TOPRATED");
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error, "i probably ran out of req");
      });
  } catch (error) {
    ("There was an error");
  }
});

module.exports = topRatedRouter;
