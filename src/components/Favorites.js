import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import {
  Flex,
  Heading,
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const Favorites = () => {
  let history = useHistory();
  const [state, setState] = useState({
    places: [],
    isOpen: false,
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

  const deleteOpen = () => setState({ ...state, isOpen: !state.isOpen });
  const deleteClose = () => setState({ ...state, isOpen: false });

  const mappedPlaces = state.places.map((e, i) => {
    return (
      <div key={i}>
        <Flex align="center" justify="center" direction="column" m={4}>
          <Box
            // maxW={["sm", "md", "lg", "xl"]}
            w={["xs", "sm", "md", "lg"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            textAlign="center"
          >
            <Popover
              returnFocusOnClose={false}
              isOpen={state.isOpen}
              onClose={deleteClose}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <IconButton
                  colorScheme="red"
                  size="md"
                  onClick={deleteOpen}
                  icon={<DeleteIcon />}
                  variant="ghost"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Confirmation
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Are you sure you want to remove this as a favorite?
                </PopoverBody>
                <PopoverFooter d="flex" justifyContent="center">
                  <ButtonGroup size="sm">
                    <Button variant="outline" onClick={deleteClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => removeFavorite(e.place_key)}
                      //TODO I need to add an onclick to delete a favorite from the database!
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            <Heading>{e.place_details.name}</Heading>

            <Box p="6">
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {e.place_details.vicinity}
              </Box>
              <Flex justify="center" align="center">
                <Box d="flex" mt="2" alignItems="center">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={
                          i < e.place_details.rating ? "red.500" : "gray.300"
                        }
                      />
                    ))}

                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {e.place_details.user_ratings_total} ratings
                  </Box>
                </Box>
              </Flex>
            </Box>
            {userContext.user ? <Flex justify="center" my={4}></Flex> : ""}
          </Box>
        </Flex>
      </div>
    );
  });

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
    </Flex>
  );
};

export default Favorites;
