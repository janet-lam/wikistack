const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const { db, User, Page } = require("./models");
const app = express();

const PORT = 3000;

db.authenticate().then(() => {
  console.log("connected to the database");
});

const init = async () => {
  await db.sync();
  //   await db.sync({ force: true });

  //   same as db.sync()
  //   await Page.sync();
  //   await User.sync();

  //  Why is an async function inside another async function? Is app.listen an async function?
  //  How does this work?
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};
init();

// try this out after we're done:
// db.sync();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(layout(""));
});

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
