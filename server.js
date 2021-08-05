const db = require("./db");
const express = require("express");
const app = express();
app.use(require("method-override")("_method"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => res.redirect("/books"));
app.use("/books", require("./routes/books"));

const init = async () => {
  await db.syncAndSeed();
  const port = process.env.PORT || 1731;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
