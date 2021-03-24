import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import { Flex, Heading, Box, Image, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";

const Favorites = () => {
  let history = useHistory();
  const [state, setState] = useState({
    places: [],
  });
  const userContext = useContext(UserContext);

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
        <Flex align="center" justify="center" direction="column">
          <Heading>{e.fav_place.name}</Heading>
          <Box
            maxW={["sm", "md", "lg", "xl"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="red">
                  {e.fav_place.opening_hours.open_now ? "Open Now!" : "Closed"}
                </Badge>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {e.fav_place.vicinity}
              </Box>

              <Box d="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < e.fav_place.rating ? "red.500" : "gray.300"}
                    />
                  ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {e.fav_place.user_ratings_total} ratings
                </Box>
              </Box>
              <Box colorScheme="red">{}</Box>
            </Box>
            {userContext.user ? <Flex justify="center" my={4}></Flex> : ""}
          </Box>
        </Flex>
      </div>
    );
  });
  console.log(state.places);
  return <Flex>{mappedPlaces}</Flex>;
};

export default Favorites;
