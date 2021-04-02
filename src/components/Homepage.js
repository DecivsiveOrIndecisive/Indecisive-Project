import {
  Heading,
  Container,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Button,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Map from "./Map/Map";
import MapLight from "./Map/MapLight";
import React, { useEffect, useContext } from "react";
import { MapContext } from "../context/mapContext";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Homepage = () => {
  const {
    fetchLocation,
    keyword,
    getRandomKeyword,
    restaurants,
    getRestaurants,
    center,
    distance,
    setDistance,
    token,
    moreRestaurants,
    zip,
    setZip,
    getCenterZip,
    maxPrice,
    setMaxPrice,
    minPrice,
    setMinPrice
  } = useContext(MapContext);
  const {favPlaces, user, getFavPlaces} = useContext(UserContext)
  const { colorMode } = useColorMode();

  console.log(distance);
  console.log(center);
  console.log(restaurants);
  console.log(keyword);
  console.log(token);
  console.log(moreRestaurants);
  console.log(favPlaces);
  

  useEffect(() => {
    fetchLocation();
    getRandomKeyword();
    if(user !== null){
      getFavPlaces()
    }
  }, []);

  return (
    <section>
      <Flex
        justify="space-between"
        direction={["column", "column", "column", "row"]}
      >
        <Heading as="h1" fontSize={[50, 100, 180, 200]} m={5}>
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
            onChange={e => setZip(e.target.value)}
          />
          <Container centerContent m={3}>
            {/* <Input variant="flushed" placeholder="enter zip" onChange={e => setZip(e.target.value)}/> */}
            {console.log(zip)}
            <Button size="lg" onClick={getCenterZip} colorScheme="red">
                Go To
              </Button>
          </Container>
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
            step={8046.72}
            onChange={setDistance}
            colorScheme="red"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>search radius: {Math.round(distance / 1609)} miles</Text>

          {/* <Slider
            aria-label="slider-ex-1"
            defaultValue={1}
            min={1}
            max={4}
            step={1}
            onChange={setMinPrice}
            colorScheme="red"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>min price level: {minPrice}</Text>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={2}
            min={1}
            max={4}
            step={1}
            onChange={setMaxPrice}
            colorScheme="red"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>max price level: {maxPrice}</Text> */}
          
          {colorMode === "dark" ? <Map /> : <MapLight />}
          <Container centerContent m={3}>
            <Link to="/result">
              <Button size="lg" onClick={getRestaurants} colorScheme="red">
                Go
              </Button>
            </Link>
          </Container>
          {/* <Container centerContent m={3}>
            <Input variant="flushed" placeholder="enter zip" onChange={e => setZip(e.target.value)}/>
            {console.log(zip)}
            <Button size="lg" onClick={getCenterZip} colorScheme="red">
                Get Coor
              </Button>
          </Container> */}
        </Container>
      </Flex>
    </section>
  );
};
export default Homepage;
