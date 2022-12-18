const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7900;

const popularRouter = require("./routes/popular");
const searchRouter = require("./routes/search");
const topRatedRouter = require("./routes/top_rated");
const newMovieRouter = require("./routes/newMovie");

app.use(cors());
app.use(express.json());

axios.defaults.baseURL = "https://api.themoviedb.org/3";

app.use("/", popularRouter);
app.use("/", searchRouter);
app.use("/", topRatedRouter);
app.use("/", newMovieRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
