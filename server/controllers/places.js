module.exports = {
  savePlace: async (req, res) => {
    const db = req.app.get("db");
    const { result, user } = req.body;

    // console.log(user.id);

    const newFav = await db.favorites.insert({
      fav_place: result,
      fav_user: user.id,
    });

    console.log(newFav);

    return res.status(200).send("good job!");
  },

  getSaved: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req.query);
    const { user_id } = req.query;

    const favorites = await db.favorites.where(`fav_user = ${user_id}`);

    console.log(favorites);

    return res.status(200).send(favorites);
  },
};
