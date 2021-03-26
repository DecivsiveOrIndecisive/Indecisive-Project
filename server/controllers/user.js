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
    });

    console.log(result);

    req.session.user = {
      id: result.user_id,
      email: result.email,
      username: result.username,
    };

    await req.session.save();

    // console.log(req.session.user);

    return res.status(200).json(req.session.user);
    // return res.status(200).send("good job");
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
    // console.log(req.session.user);
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
};
