require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session");

const restaurantCtrl = require('./controllers/resController')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: null, secure: false },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then(db => {
    app.set("db", db);
    app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));
    console.log("db connected");
  })
  .catch(err => console.log(err));

  //Restautant Endpoint!!!///////////
app.get('/api/restaurants', restaurantCtrl.getRestaurants)



