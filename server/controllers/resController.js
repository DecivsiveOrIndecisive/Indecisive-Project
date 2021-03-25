const axios = require('axios')
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

module.exports = {
    getRestaurants: async (req, res) => {
        const { lat, lng, distance, keyword } = req.query
        let data = {data: [], token: ''}        
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${+lat},${+lng}&radius=${distance}&keyword=${keyword}&opennow&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                // console.log(res)
                data = {data: res.data.results, token: res.data.next_page_token}
                
            }).catch(err => res.status(404).send('Error or maybe nothing open'))
        res.status(200).send(data)
    },

    getMoreRestaurants: async (req, res) => {
        const {token} = req.query
        let data = []
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                console.log(res)
                data = res.data.results
            }).catch(err => res.status(404).send('Error or maybe nothing open'))
            res.status(200).send(data)
    }
}