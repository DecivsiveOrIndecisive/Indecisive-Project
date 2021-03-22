const bcrypt = require("bcrypt");
const session = require("express-session");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, email, password } = req.body;

    const test = await db.users.where("id = 1");
    console.log(test);

    return res.status(200).send("good job");
  },
};
