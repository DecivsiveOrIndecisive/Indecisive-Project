import { createContext, useState } from "react"
import axios from 'axios'
import { UserContext } from "./userContext";



export const MapContext = createContext()
export const MapProvider = (props => {
    
    const [distance, setDistance] = useState(8046.72)
    const [center, setCenter] = useState({ lat: 40, lng: -111 })
    const [keyword, setKeyword] = useState('')
    const [list, setList] = useState(['restaurant', 'food', 'diner', 'eat', 'cafe', 'eatery'])
    const [restaurants, setRestaurants] = useState([])
    const [token, setToken] = useState('')
    const [moreRestaurants, setMoreRestaurants] = useState([])
    const [result, setResult] = useState(null)
    const [zip, setZip] = useState('84111')
    const [maxPrice, setMaxPrice] = useState(2)
    const [minPrice, setMinPrice] = useState(1)
    
    const {favPlaces} = useContext(UserContext)

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, _ => null)

    }

    const getRandomKeyword = function () {
        setKeyword(list[Math.floor((Math.random() * list.length))]);
    }

    const getResult = function () {
        setResult(restaurants[Math.floor((Math.random() * restaurants.length))]);
    }

    const getRestaurants = async () => {
        const favPlaceDetails = []
        console.log(favPlaceDetails)
            favPlaces.forEach(place => {
                favPlaceDetails.push(place.place_details)
            })
        
        const res = await axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}&distance=${distance}&minprice=${minPrice}&maxprice=${maxPrice}&keyword=${keyword}`)
        const restaurantResult = (res.data.data)
        // console.log(restaurantResult)
        
        const finalResult = restaurantResult.concat(favPlaceDetails)
        // console.log(favPlaces)
        
        setRestaurants(finalResult)
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

    const getCenterZip = async () => {
        const res = await axios.get(`/api/centerZip?zip=${zip}`)
        setCenter({ lat: res.data.geometry.location.lat, lng: res.data.geometry.location.lng })
        // console.log(center)
    }

    return (
        <MapContext.Provider
            value={{
                fetchLocation,
                keyword,
                getRandomKeyword,
                getRandomKeyword,
                restaurants,
                getRestaurants,
                getMore,
                center,
                distance,
                setDistance,
                token,
                moreRestaurants,
                getResult,
                result,
                zip,
                setZip,
                getCenterZip,
                maxPrice,
                setMaxPrice,
                minPrice,
                setMinPrice
            }}>
            {props.children}
        </MapContext.Provider>
    )
})