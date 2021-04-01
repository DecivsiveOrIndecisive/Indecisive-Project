import React, { useEffect, useState, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  // InfoWindow
} from "@react-google-maps/api";
import mapStyleDark from "./mapStyleDark";
import { Flex } from "@chakra-ui/react";
import { MapContext } from "../../context/mapContext";
import {withRouter} from 'react-router-dom'
import { UserContext } from "../../context/userContext";



const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "85vh",
};

const options = {
  styles: mapStyleDark,
  disableDefaultUI: true,
};

function Map() {
  const { center,  restaurants } = useContext(MapContext);  
  const {favPlaces, user, getFavPlaces} = useContext(UserContext)

  
  // const [center, setCenter] = useState({
    //     lat: 0,
    //     lng: 0
    // })
    // const [restaurants, setRestaurants] = useState([])
    // console.log(restaurants)
    // useEffect(() => {
    //     fetchLocation()        
    // }, [])

    // const fetchLocation = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         setCenter({
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         })
    //     }, _ => null)
        
    // }

    // const getRestaurants = async () => {
    //     console.log(center.lat)
    //     const res = await axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}`)
    //     setRestaurants(res.data)
    // }
    
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })


    if (loadError) return 'Error loading maps!'
    if (!isLoaded) return 'Loading maps!'

    // console.log(props)
    
   const mappedRestaurants = favPlaces.map((food, i) => (
      <Marker
          key={i}          
          position={{lat: food.place_details.geometry.location.lat, lng: food.place_details.geometry.location.lng}}
      />
  ))


    return(
        <Flex>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    options={options}
                    // onClick={onMapClick}
                    // onLoad={onMapLoad}

                >
                  {mappedRestaurants}
                    {/* {restaurants.map((food, i) => (
                        <Marker
                            key={i}
                            position={{lat: food.geometry.location.lat, lng: food.geometry.location.lng}}
                        />
                    ))} */}
                   

                </GoogleMap>
                {/* <button onClick={() => getRestaurants()}>test</button> */}
                
        </Flex>
    )
}

export default withRouter(Map);
