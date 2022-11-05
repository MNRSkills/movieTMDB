const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7900;

const popularRouter = require("./routes/popular");

app.use(cors());
app.use(express.json());

app.use("/", popularRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
