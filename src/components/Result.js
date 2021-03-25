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
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";

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

  const savePlace = () => {
    alert(userContext.user);
    setState({ ...state, isSaved: true });
    userContext.savePlace(testResult);
  };

  const getPlaces = async () => {
    if (userContext.user) {
      await axios
        .get("/api/posts/getSaved", {
          params: { user_id: userContext.user.id },
        })
        .then(res => {
          const saved = res.data;
          const filtered = saved.filter(
            place => place.place_key === testResult.place_id
          );
          console.log(filtered);
          console.log(testResult);
          if (filtered.length > 0) {
            console.log("setting true!");
            setState({ ...state, isSaved: true });
          } else {
            setState({ ...state, isSaved: false });
            console.log("setting false!");
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

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
              onClick={() => savePlace()}
              isDisabled={state.isSaved ? true : false}
            >
              {!state.isSaved ? "Add to Favorites" : "Added to Favorites!"}
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
