import places from "../temp/places.json";
import {
  Box,
  Flex,
  Text,
  Image,
  Badge,
  Heading,
  Button,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

const Result = () => {
  const userContext = useContext(UserContext);
  const [state, setState] = useState({
    isSaved: false,
  });
  const [testResult] = places;
  const calculatePrice = () => {
    let arr = [];
    for (let i = 0; i < testResult.price_level; i++) {
      arr.push("$");
    }
    // console.log(arr);
    return arr.join("");
  };
  const price = calculatePrice();
  return (
    <Flex align="center" justify="center" direction="column">
      <Heading>{testResult.name}</Heading>
      <Box
        maxW={["sm", "md", "lg", "xl"]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${testResult.photos[0].photo_reference}&sensor=false&maxheight=${testResult.photos[0].height}&maxwidth=${testResult.photos[0].width}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="red">
              {testResult.opening_hours.open_now ? "Open Now!" : "Closed"}
            </Badge>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {testResult.vicinity}
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < testResult.rating ? "red.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {testResult.user_ratings_total} ratings
            </Box>
          </Box>
          <Box colorScheme="red">{price}</Box>
        </Box>
        {userContext.user ? (
          <Flex justify="center" my={4}>
            <Button
              colorScheme="red"
              onClick={() => setState({ ...state, isSaved: !state.isSaved })}
            >
              {state.isSaved ? "Add to Favorites" : "Remove from Favorites"}
            </Button>
          </Flex>
        ) : (
          ""
        )}
      </Box>

      <Button
        my={5}
        backgroundColor="red.500"
        borderRadius="100px"
        height="150px"
        width="150px"
      >
        NOPE
      </Button>
    </Flex>
  );
};

export default Result;
