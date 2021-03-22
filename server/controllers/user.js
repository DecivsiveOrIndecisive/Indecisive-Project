const bcrypt = require("bcrypt");
const session = require("express-session");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, email, password } = req.body;
  },
};
