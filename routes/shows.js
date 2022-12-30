const axios = require("axios");

const showRouter = require("express").Router();

showRouter.get("/tv-shows", async (req, res) => {
  try {
    await axios
      .get(`/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
          json({
           error: `${error}`
       });
      });
  } catch (error) {
    res.status(400).json({
        Error: error,
    });
  }
});

module.exports = showRouter;