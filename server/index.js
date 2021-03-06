require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  userCtrl = require("./controllers/user"),
  placeCtrl = require("./controllers/places");

const restaurantCtrl = require("./controllers/resController");
const user = require("./controllers/user");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/../build`))

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
app.get('/api/centerZip', restaurantCtrl.getCenterZip )

//Auth Endpoints
app.post("/api/auth/register", userCtrl.register);
app.post("/api/auth/login", userCtrl.login);
app.post("/api/auth/logout", userCtrl.logout);
app.get("/api/auth/user", userCtrl.getUser);
app.put("/api/user/history", userCtrl.saveUserHistory);
app.get("/api/posts/getHistory", userCtrl.getHistory);

//* Place endpoints
app.post("/api/posts/save", placeCtrl.savePlace);
app.post("/api/posts/blacklist", placeCtrl.blacklist);
app.get("/api/posts/getSaved", placeCtrl.getSaved);
app.get("/api/posts/getBlacklist", placeCtrl.getBlacklist);
app.delete("/api/post/deleteSaved", placeCtrl.deleteSaved);
app.delete("/api/post/whitelist", placeCtrl.whitelist);
