import {
  Heading,
  Container,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";
import Map from "./Map/Map";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MapContext } from "../context/mapContext";
import { Link } from "react-router-dom";

const Homepage = () => {
  const {
    fetchLocation,
    keyword,
    getRandomKeyword,
    restaurants,
    getRestaurants,
    getMore,
    center,
    distance,
    setDistance,
    token,
    moreRestaurants,
  } = useContext(MapContext);
  // const [distance, setDistance] = useState(8046.72)
  // const [center, setCenter] = useState({ lat: 40, lng: -111 })
  // const [keyword, setKeyword] = useState('')
  // const [list, setList] = useState(['restaurant', 'food', 'diner', 'eat', 'cafe', 'eatery' ])

  console.log(distance);
  console.log(center);
  console.log(restaurants);
  console.log(keyword);
  console.log(token);
  console.log(moreRestaurants);

  useEffect(() => {
    fetchLocation();
    getRandomKeyword();
  }, []);

  return (
    <section>
      <Flex
        justify="space-between"
        direction={["column", "column", "column", "row"]}
      >
        <Heading as="h1" fontSize={[50, 100, 180, 250]} m={5}>
          Can't Decide?
        </Heading>
        <Container mr={["0px", "100px", "180px", `200px`]}>
          <Container centerContent>
            <Heading as="h3" size="lg">
              Enter Your Location
            </Heading>
          </Container>
          <Input
            textAlign="center"
            type="text"
            name="Map Search"
            placeholder="Type Something Here..."
            focusBorderColor="red.400"
            borderRadius="100px"
            m={2}
          />
          <Container centerContent>
            <Heading as="h4" size="m">
              Range
            </Heading>
          </Container>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={8046.72}
            min={8046.72}
            max={32186.9}
            onChange={setDistance}
            colorScheme="red"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Map />
          <Container centerContent m={3}>
            <Link to="/result">
              <Button
                size="lg"
                onClick={() => getRestaurants()}
                colorScheme="red"
              >
                Go
              </Button>
            </Link>
          </Container>
        </Container>
      </Flex>

      {/* {mapRestaurants} */}
    </section>
  );
};
export default Homepage;

// Perform a nearby search.
// service.nearbySearch(
//     { location: pyrmont, radius: 500, type: "store" },
//     (results, status, pagination) => {
//       if (status !== "OK" || !results) return;
//       addPlaces(results, map);
//       moreButton.disabled = !pagination || !pagination.hasNextPage;

//       if (pagination && pagination.hasNextPage) {
//         getNextPage = () => {
//           // Note: nextPage will call the same handler function as the initial call
//           pagination.nextPage();
//         };
//       }
//     }
//   );
