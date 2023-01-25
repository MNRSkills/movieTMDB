const newPool = require("./db");

const listRouter = require("express").Router();

// THIS ROUTE NEEDS TO BE PROTECTED.
listRouter.post("/adding-to-list/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const adding_id = await newPool.query(
      `INSERT INTO fav_list (movie_id) VALUES ($1) RETURNING *`,
      [id]
    );
    res.json({ adding_id: ["Movie ID Added", adding_id.rows[0]] });
  } catch (error) {
    res.status(401).json({
      errorMsg: "Please enter a value",
      ERROR: `${error}`,
    });
  }
});

module.exports = listRouter;
