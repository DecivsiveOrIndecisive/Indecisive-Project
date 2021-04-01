import { Box, Flex, Heading, Spacer, IconButton, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton, Button, ButtonGroup}  from '@chakra-ui/react'
import { NotAllowedIcon, StarIcon } from '@chakra-ui/icons'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { useHistory } from 'react-dom'


const Place = props => {
    const {savePlace, blacklistPlace} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)
    const [state, setState] = useState({
    places: [],
    });

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
          close()
      };

    //   useEffect(() => {
    //     console.log(`test`)
    //   }, [])

    const buttonMapping = () => {
        if(props.favorite) {
            return (
                <Box>
                    <Popover
                        returnFocusOnClose={false}
                        isOpen={isOpen}
                        onClose={close}
                        placement="right"
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <IconButton aria-label="Favorite" icon={<StarIcon />} size={'lg'} onClick={open} m={1} isActive={props.favorite} colorScheme='green'/>
                        </PopoverTrigger>
                        <PopoverContent>
                        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            Are you sure you want to remove this from your favorites?
                        </PopoverBody>
                        <PopoverFooter d="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                            <Button variant="outline" onClick={close}>Cancel</Button>
                            <Button colorScheme="red" onClick={() => removeFavorite(props.placeKey)}>Yes</Button>
                            </ButtonGroup>
                        </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Box>
            )
        } else if(props.blacklist) {
            return (
                <Box>
                    <Popover
                        returnFocusOnClose={false}
                        isOpen={isOpen}
                        onClose={close}
                        placement="right"
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <IconButton aria-label="Blacklist" icon={<NotAllowedIcon />} size={'lg'} onClick={open} m={1} isActive={props.blacklist} colorScheme='red' />
                        </PopoverTrigger>
                        <PopoverContent>
                        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            Are you sure you want to remove this from your blacklist?
                        </PopoverBody>
                        <PopoverFooter d="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                            <Button variant="outline" onClick={close}>Cancel</Button>
                            <Button colorScheme="red">Yes</Button>
                            </ButtonGroup>
                        </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Box>
            )
        } else {
            return (
                <Box>
                    <IconButton aria-label="Favorite" icon={<StarIcon />} size={'lg'} onClick={savePlace} m={1} isActive={props.favorite} />
                    <IconButton aria-label="Blacklist" icon={<NotAllowedIcon />} size={'lg'} onClick={blacklistPlace} m={1} isActive={props.blacklist} />
                </Box>
            )
        }
    }

    return <section key={props.key}>
            <Box p={5} shadow="md" borderWidth="1px" >
                <Flex direction='row' flexWrap>
                    <Flex direction={'column'}>
                        <Heading fontSize="xl" maxWidth={[100, 200, 300, 1000]}>{props.name}</Heading>
                        <Box as='h4' mt="1">
                            {props.vincinity}
                        </Box>
                        <Flex direction='row'>
                            <Box d="flex" mt="2" alignItems="center">
                                {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                        <StarIcon
                                        key={i}
                                        color={i < props.rating ? "red.500" : "gray.300"}
                                        />
                                    ))}
                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                    {props.userRating} ratings
                                </Box>
                            </Box>
                        </Flex>
                    </Flex>
                    <Spacer />  
                    {buttonMapping()}
                </Flex>
            </Box>
    </section>
}
export default Place
