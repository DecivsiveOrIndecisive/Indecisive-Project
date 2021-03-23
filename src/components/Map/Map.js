import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  // InfoWindow
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
<<<<<<< HEAD
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import mapStyleLight from './mapStyleLight'
import mapStyleDark from './mapStyleDark'
import {
    // ChakraProvider,
    // Box,
    // Text,
    // Link,
    // VStack,
    // Code,
    // Grid,
    // theme,
    // Container,
    Flex,
  } from '@chakra-ui/react';
import axios from 'axios'
const libraries = ['places']
=======
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyleLight from "./mapStyleLight";
import mapStyleDark from "./mapStyleDark";
import { Flex } from "@chakra-ui/react";

const libraries = ["places"];
>>>>>>> 34b0ce2bf5e0e20ee692324dff1734546c99bde7
const mapContainerStyle = {
  width: "100vw",
  height: "40vh",
};

const options = {
  styles: mapStyleDark,
};

function Map() {
<<<<<<< HEAD
    const [center, setCenter] = useState({
        lat: 40,
        lng: -111
    })
    // const [restaurants, setRestaurants] = useState([])
    // console.log(restaurants)
    // useEffect(() => {
    //     fetchLocation()
    //     // getRestaurants()
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

    



    return(
        <Flex>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={14}
                    center={center}
                    options={options}
                    // onClick={onMapClick}
                    // onLoad={onMapLoad}

                >

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
=======
  const [center, setCenter] = useState({
    lat: 40,
    lng: -111,
  });
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      _ => null
    );
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps!";
  if (!isLoaded) return "Loading maps!";

  return (
    <Flex>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        // onClick={onMapClick}
        // onLoad={onMapLoad}
      >
        {/* <Marker
                        position={{ lat: center.lat, lng: center.lng }}
                    /> */}
      </GoogleMap>
    </Flex>
  );
>>>>>>> 34b0ce2bf5e0e20ee692324dff1734546c99bde7
}

export default Map;
