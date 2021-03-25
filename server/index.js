require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  userCtrl = require("./controllers/user");

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
app.get('/api/moreRestaurants', restaurantCtrl.getMoreRestaurants)



app.post("/api/auth/register", userCtrl.register);
app.post("/api/auth/login", userCtrl.login);
app.post("/api/auth/logout", userCtrl.logout);
app.get("/api/auth/user", userCtrl.getUser);
