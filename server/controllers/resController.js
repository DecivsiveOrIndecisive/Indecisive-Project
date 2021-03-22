const axios = require('axios')
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

module.exports = {
    getRestaurants: async (req, res) => {
        const { lat, lng } = req.query
        let data = []
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${+lat},${+lng}&radius=4828.03&type=restaurant&opennow&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                data = res.data.results
            }).catch(err => res.status(404).send('Error or maybe nothing open'))
        res.status(200).send(data)
    }
}