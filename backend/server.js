const app = require("./app.js");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MongoUrl = process.env.DATABASE_URI;
const MongoPassword = process.env.DATABASE_PASSWORD;

const DB = MongoUrl.replace("<password>", MongoPassword);
mongoose.connect(DB)
  .then(() => {
    console.log("Connection successfull");
  }).catch((err) => {
    console.log("Something went wrong in connection", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is listen on port: ${PORT}`);
});