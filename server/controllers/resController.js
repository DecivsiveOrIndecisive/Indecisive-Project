const axios = require("axios");
const { response } = require("express");
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

module.exports = {
  getRestaurants: async (req, res) => {
    const { lat, lng, distance, keyword, maxprice } = req.query;
    let data = { data: [], token: "" };
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${+lat},${+lng}&radius=${distance}&keyword=${keyword}&minprice=0&maxprice=${maxprice}&opennow&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then(response => {
        // console.log(response.data.results);
        data = {
          data: response.data.results,
          token: response.data.next_page_token,
        };

        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getMoreRestaurants: async (req, res) => {
    const { token } = req.query;
    console.log(token);
    let data = [];
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then(response => {
        // console.log(response);
        data = response.data.results;
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getCenterZip: async (req, res) => {
    const { zip } = req.query
    // console.log(zip)
    let data = []
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
        .then(response => {
            // console.log(response);
            data = response.data.results[0]
            // data = response.data.results;
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
  }
};
