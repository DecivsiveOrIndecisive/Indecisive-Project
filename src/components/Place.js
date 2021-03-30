import {Box, Container, Flex, Heading, Image, Button, Spacer, IconButton} from '@chakra-ui/react'
import {NotAllowedIcon, StarIcon} from '@chakra-ui/icons'
import {createContext, useContext} from 'react'
import { UserContext } from '../context/userContext'

const Place = props => {
    const {savePlace, blacklistPlace} = useContext(UserContext)

    return <section>
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
                    <Box>
                        <IconButton aria-label="Favorite" icon={<StarIcon />} size={'lg'} onClick={() => savePlace} m={1} />
                        <IconButton aria-label="Blacklist" icon={<NotAllowedIcon />} size={'lg'} onClick={() => blacklistPlace} m={1}/>
                    </Box>
                </Flex>
            </Box>
    </section>
}
export default Place
