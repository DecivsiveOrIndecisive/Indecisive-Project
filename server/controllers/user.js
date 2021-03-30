const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { name, email, password } = req.body;

    const [userByEmail] = await db.users.where(`email = '${email}'`);
    if (userByEmail) return res.sendStatus(400);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const result = await db.users.insert({
      email,
      username: name,
      password: hash,
      history: null,
    });

    console.log(result);

    req.session.user = {
      id: result.user_id,
      email: result.email,
      username: result.username,
    };

    await req.session.save();

    return res.status(200).json(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    const [user] = await db.users.where(`email = '${email}'`);
    if (!user) return res.status(401).send("Incorrect Login Info");

    const auth = bcrypt.compareSync(password, user.password);
    if (!auth) return res.status(403).send("Incorrect Login Info");
    else {
      req.session.user = {
        id: user.user_id,
        email: user.email,
        username: user.username,
      };
    }
    await req.session.save();

    return res.status(200).json(req.session.user);
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.json({ isLoggedIn: false });
  },

  getUser: async (req, res) => {
    if (req.session.user) {
      return res.status(200).send(req.session.user);
    } else {
      return res.sendStatus(404);
    }
  },

  saveUserHistory: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req.body);
    const { result, user } = req.body;

    let [dbUser] = await db.users.where(`user_id = ${user.id}`);
    console.log(dbUser);

    if (!dbUser.history) {
      console.log("variant 1");
      let newHistory = {
        arr: [result],
      };
      console.log(newHistory);
      await db.users.update({ user_id: user.id }, { history: newHistory });
    } else if (dbUser.history.arr.length < 15) {
      console.log("variant 2");
      dbUser.history.arr.push(result);
      await db.users.update({ user_id: user.id }, { history: dbUser.history });
    } else if (dbUser.history.arr.length >= 15) {
      console.log("variant 3");
      dbUser.history.arr.shift();
      dbUser.history.arr.push(result);
      await db.users.update({ user_id: user.id }, { history: dbUser.history });
    } else console.log("nothing is working!");

    res.sendStatus(200);
  },

  getHistory: async (req, res) => {
    const db = req.app.get("db");

    const { user_id } = req.query;

    const [user] = await db.users.where(`user_id = ${user_id}`);

    console.log(user.history);
    const { history } = user;
    console.log(history);

    return res.status(200).send(user.history.arr);
  },
};
