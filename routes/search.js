const search = require("express").Router();
const axios = require("axios");
// const { json } = require("express");

search.get("/search/:query", async (req, res) => {
  try {
    await axios
      .get(
        `/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${req.params.query}&page=1&include_adult=false`
      )
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    json({ Error: error });
  }
});

module.exports = search;
