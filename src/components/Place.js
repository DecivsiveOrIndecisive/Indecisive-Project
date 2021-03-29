import {Box, Container, Flex, Heading, Image, StarIcon} from '@chakra-ui/react'

const Place = props => {
    return <section>
        <Box>
            <Flex direction={'row'}>
                <Box boxSize="100px">
                    <Image
                        src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.img}&sensor=false&maxheight=${100}&maxwidth=${100}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                    />
                </Box>
                <Heading>{props.name}</Heading>
            </Flex>
        </Box>
    </section>
}
export default Place