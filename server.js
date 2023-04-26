const express = require("express"); //requiring express and pointing to db route
const db = require("./config/connection");
const routes = require ("./routes");
// const helpers = require("./utils/helpers")
//port
const PORT = process.env.PORT || 3001;
//initializing express
const app = express();


  app.use(express.urlencoded({ extended: true }));// express middleware
  app.use(express.json());
  app.use(routes);
 
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API listening at http://localhost:${PORT}`)
    });
  });

  