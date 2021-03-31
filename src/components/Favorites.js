import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import DisplayPlace from "./DisplayPlace"
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import { MapContext } from "../context/mapContext";
import mapStyleDark from "../components/Map/mapStyleDark";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  // InfoWindow
} from "@react-google-maps/api";
import Map from './Map/Map'

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "40vh",
};

const options = {
  styles: mapStyleDark,
  disableDefaultUI: true,
};

const Favorites = () => {
  let history = useHistory();
  const [state, setState] = useState({
    places: [],
  });
  const { center } = useContext(MapContext);
  const userContext = useContext(UserContext)

  const getPlaces = async () => {
    await axios
      .get("/api/posts/getSaved", {
        params: { user_id: userContext.user.id },
      })
      .then(res => {
        setState({ ...state, places: res.data });

        console.log(res.data);
      });
  };

  const removeFavorite = async placeKey => {
    await axios
      .delete("/api/post/deleteSaved", {
        data: { place_key: placeKey, user_id: userContext.user.id },
      })
      .then(res => {
        console.log(res);
        getPlaces();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (userContext.user) {
      getPlaces();
    } else {
      history.push("/");
    }
  }, [userContext.user]);

  const mappedPlaces = state.places.map((e, i) => {
    return (
      <div key={i}>
        <DisplayPlace
          place={e}
          user={userContext.user}
          removeFavorite={removeFavorite}
          typeOf="favorite"
        />
      </div>
    );
  });

  const mapOfFavs = () => { }



  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })


  if (loadError) return 'Error loading maps!'
  if (!isLoaded) return 'Loading maps!'

  return (
    <Flex
      justify="space-evenly"
      align="center"
      direction="row"
      wrap="wrap"
      mt={10}
    >
      {/* {mappedPlaces} */}
      {state.places.length !== 0
        ? mappedPlaces
      
        : "You do not have any saved places yet!"}


{/* <Map/> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
        {/* {mappedFavs} */}
        {state.places.map((food, i) => (
          <Marker
            key={food.place_details.place_id}
            position={{ lat: food.place_details.geometry.location.lat, lng: food.place_details.geometry.location.lng }}
          />
        ))}



      </GoogleMap>
    </Flex>
  )
}

export default Favorites