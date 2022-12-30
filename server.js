const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7900;


//ROUTES TO TMDB API AND OUR POSTGRES
const popularRouter = require("./routes/popular");
const searchRouter = require("./routes/search");
const topRatedRouter = require("./routes/top_rated");
const newMovieRouter = require("./routes/newMovie");
const showRouter = require("./routes/shows");
// const db = require("./routes/pg/db");
const pgRouter = require("./routes/pg/users");

app.use(cors());
app.use(express.json());

//DEFAULT URL FOR TMDB
axios.defaults.baseURL = "https://api.themoviedb.org/3";

app.use("/", popularRouter);
app.use("/", searchRouter);
app.use("/", topRatedRouter);
app.use("/", newMovieRouter);
app.use("/", showRouter);


//DB QUERY START HERE
// app.get("/login", db.getUsers)
app.use("/db", pgRouter);




app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
