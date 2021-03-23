const axios = require('axios')
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

module.exports = {
    getRestaurants: async (req, res) => {
        const { lat, lng, range } = req.query
        let data = []
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${+lat},${+lng}&radius=${range}&keyword=food&opennow&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                data = res.data.results
            }).catch(err => res.status(404).send('Error or maybe nothing open'))
        res.status(200).send(data)
    }
}