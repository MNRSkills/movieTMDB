const axios = require("axios");

const newMovieRouter = require("express").Router();

newMovieRouter.get("/now-playing", async (req, res) => {
  try {
    await axios
      .get(
        `movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      )
      .then(function (response) {
        // console.log("new movies and more", response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error, "i probably ran out of req");
      });
  } catch (error) {
    ("There was an error");
  }
});

module.exports = newMovieRouter;
