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
  useColorMode,
} from "@chakra-ui/react";
import MapDark from "./Map/Map";
import MapLight from "./Map/MapLight";

const Homepage = () => {
  const { colorMode } = useColorMode();
  if (colorMode === "dark") {
    console.log("dark!!");
  } else {
    console.log("light!!");
  }
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
          />
          <Container centerContent>
            <Heading as="h4" size="m">
              Range
            </Heading>
          </Container>
          <Slider aria-label="slider-ex-1" defaultValue={30} colorScheme="red">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {colorMode === "dark" ? <MapDark /> : <MapLight />}
          <Container centerContent m={3}>
            <Button size="lg" colorScheme="red">
              Go
            </Button>
          </Container>
        </Container>
      </Flex>
    </section>
  );
};
export default Homepage;
