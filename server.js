const db = require("./db");
const path = require("path");
const logger = require("morgan");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));

app.use(require("./routes/books"));

const init = async () => {
  await db.syncAndSeed();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
