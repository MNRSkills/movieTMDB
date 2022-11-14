const axios = require("axios");

const popularRouter = require("express").Router();

popularRouter.get("/movies", async (req, res) => {
  try {
    await axios
      .get(`/movie/550?api_key=${process.env.TMDB_API_KEY}`)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error, "i probably ran out of req");
      });
  } catch (error) {
    ("There was an error");
  }
});

popularRouter.get("/popular", async (req, res) => {
  try {
    await axios
      .get(`/movie/popular?api_key=${process.env.TMDB_API_KEY}`)
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    res.status(400).json({
      Error: error,
    });
  }
});

module.exports = popularRouter;
