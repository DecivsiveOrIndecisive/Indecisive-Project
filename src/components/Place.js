import {Box, Container, Flex, Heading, Image, StarIcon} from '@chakra-ui/react'

const Place = props => {
    return <section>
        <Box>
            <Flex direction={'row'}>
                <Heading>{props.name}</Heading>
            </Flex>
        </Box>
    </section>
}
export default Place