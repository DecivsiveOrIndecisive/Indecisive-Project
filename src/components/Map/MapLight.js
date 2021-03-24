import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  // InfoWindow
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyleLight from "./mapStyleLight";
// import mapStyleDark from "./mapStyleDark";
import { Flex } from "@chakra-ui/react";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "40vh",
};

const options = {
  styles: mapStyleLight,
};

function Map() {
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
}

export default Map;
