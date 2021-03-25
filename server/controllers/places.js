module.exports = {
  savePlace: async (req, res) => {
    const db = req.app.get("db");
    const { result, user } = req.body;
    const { place_id } = result;

    // console.log(user.id);

    const newFav = await db.favorites.insert({
      place_key: place_id,
      place_details: result,
      fav_user: user.id,
    });

    console.log(newFav);

    return res.status(200).send("place saved");
  },

  getSaved: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req.query);
    const { user_id } = req.query;

    const favorites = await db.favorites.where(`fav_user = ${user_id}`);

    // console.log(favorites);

    return res.status(200).send(favorites);
  },

  deleteSaved: async (req, res) => {
    const db = req.app.get("db");

    const { place_key, user_id } = req.body;

    await db.favorites.destroy({ place_key: place_key, fav_user: user_id });

    // console.log(req.body);

    return res.status(200).send("removed from favorites");
  },
};
