import { useState } from "react";
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

const DisplayPlace = ({ place, user, removeFavorite, typeOf }) => {
  const [state, setState] = useState({
    isOpen: false,
  });

  const deleteOpen = () => setState({ ...state, isOpen: !state.isOpen });
  const deleteClose = () => setState({ ...state, isOpen: false });

  return (
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
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              {typeOf === "favorite"
                ? "Are you sure you want to remove this as a favorite?"
                : "Are you sure you want to remove this place from your blacklist?"}
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="center">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={deleteClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => removeFavorite(place.place_key)}
                  //TODO I need to add an onclick to delete a favorite from the database!
                >
                  Delete
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>

        <Heading>{place.place_details.name}</Heading>

        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {place.place_details.vicinity}
          </Box>
          <Flex justify="center" align="center">
            <Box d="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={
                      i < place.place_details.rating ? "red.500" : "gray.300"
                    }
                  />
                ))}

              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {place.place_details.user_ratings_total} ratings
              </Box>
            </Box>
          </Flex>
        </Box>
        {user ? <Flex justify="center" my={4}></Flex> : ""}
      </Box>
    </Flex>
  );
};

export default DisplayPlace;
