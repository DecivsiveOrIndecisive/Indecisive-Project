module.exports = {
  savePlace: async (req, res) => {
    const db = req.app.get("db");
    const { result, user } = req.body;
    const { place_id } = result;

    const newFav = await db.favorites.insert({
      place_key: place_id,
      place_details: result,
      fav_user: user.id,
    });

    console.log(newFav);

    return res.status(200).send("place saved");
  },

  blacklist: async (req, res) => {
    const db = req.app.get("db");
    const { result, user } = req.body;
    const { place_id } = result;

    const newBL = await db.blacklist.insert({
      place_key: place_id,
      place_details: result,
      bl_user: user.id,
    });

    console.log(newBL);

    return res.status(200).send("place blacklisted");
  },

  getSaved: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.query;

    const favorites = await db.favorites.where(`fav_user = ${user_id}`);

    return res.status(200).send(favorites);
  },

  getBlacklist: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req.query);
    const { user_id } = req.query;

    const blacklist = await db.blacklist.where(`bl_user = ${user_id}`);


    return res.status(200).send(blacklist);
  },

  deleteSaved: async (req, res) => {
    const db = req.app.get("db");

    const { place_key, user_id } = req.body;
    console.log(`Delete has been activated`, req.body)

    await db.favorites.destroy({ place_key: place_key, fav_user: user_id });


    return res.status(200).send("removed from favorites");
  },
  whitelist: async (req, res) => {
    const db = req.app.get("db");

    const { place_key, user_id } = req.body;

    await db.blacklist.destroy({ place_key: place_key, bl_user: user_id });

    return res.status(200).send("removed from blacklist");
  },
};
