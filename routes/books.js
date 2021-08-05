const db = require("../db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => res.redirect("/books"));

router.get("/books", async (req, res, next) => {
  try {
    const books = await db.models.Book.findAll();
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='styles.css'>
        </head>
        <body>
          <h1>Books</h1>
          <div>
          ${books
            .map((book) => {
              if (book.year > 0) {
                var year = book.year;
              } else {
                var year = Math.abs(book.year) + " B.C.";
              }
              // please help, unsure why image is not working and don't know how to put new line while using flex box
              return `<span>
              <a href='./books/${book.id}'><img src=${book.imageLink}></a>
                ${book.title}, \n By ${book.author}: \n Written in ${year}
            </span>`;
            })
            .join("")}
          </div>
        </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

router.get("/books/:id", async (req, res, next) => {
  try {
    const books = await db.models.Book.findAll({
      where: {
        id: req.params.id,
      },
    });
    const book = books[0];
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='styles.css'>
        </head>
        <body>
          <a href = '../'><h1>Return to Books</h1></a>
          <h2>${book.title}</h2>
          <h3>By ${book.author}</h3>
          <ul>
            <li>YEAR WRITTEN: ${book.year}</li>
            <li>WIKI: <a href=${book.link} target='_blank'>${book.link}</a></li>
            <li>COUNTRY: ${book.country}</li>
            <li>LANGUAGE: ${book.language}</li>
            <li>NUMBER OF PAGES: ${book.pages}</li>
          </ul>
        </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
