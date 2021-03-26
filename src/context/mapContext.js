import { createContext, useEffect, useState } from "react"
import { useHistory, useLocation, withRouter } from "react-router"
import axios from 'axios'


export const MapContext = createContext()
export const MapProvider = (props => {
    const [distance, setDistance] = useState(8046.72)
    const [center, setCenter] = useState({ lat: 40, lng: -111 })
    const [keyword, Setkeyword] = useState('')
    const [list, setList] = useState(['restaurant', 'food', 'diner', 'eat', 'cafe', 'eatery' ])
    const [restaurants, setRestaurants] = useState([])
    const [token, setToken] = useState('')
    const [moreRestaurants, setMoreRestaurants] = useState([])
   
    
    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, _ => null)

    }

    const getRandomKeyword = function () {
        Setkeyword(list[Math.floor((Math.random()*list.length))]) ;
      } 

    const getRestaurants = async () => {
        // console.log(center)
        const res = await axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}&distance=${distance}&keyword=${keyword}`)
        setRestaurants(res.data.data)
        setToken(res.data.token)
        
        ////////////// TEST LATER///////////////////
        // setTimeout(() => {
        //     axios.get(`/api/moreRestaurants?token=${res.data.token}`)
        //     .then(res => {
        //         // setRestaurants(restaurants.concat(res.data))
        //         console.log(res.data)
        //     }
        //         ).catch('weird error')
        //     }, 3000)
    }

    const getMore = async () => {
        const res = await axios.get(`/api/moreRestaurants?token=${token}`)
        setMoreRestaurants(res.data)
        console.log(moreRestaurants)
        
    }

    return (
        <MapContext.Provider value={{fetchLocation, keyword, getRandomKeyword, restaurants, getRestaurants, getMore, center, distance, setDistance, token, moreRestaurants}}>
            {props.children}
        </MapContext.Provider>
    )

})