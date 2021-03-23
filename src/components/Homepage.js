import {Heading, Container, Flex, Slider, SliderTrack, SliderThumb, SliderFilledTrack, Button, Input } from '@chakra-ui/react'
import Map from './Map/Map'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Homepage = () => {
    const [distance, setDistance] = useState(8046.72)
    {console.log(distance)}

    const [center, setCenter] = useState({
        lat: 40,
        lng: -111
    })
    const [restaurants, setRestaurants] = useState([])
    console.log(restaurants)
    useEffect(() => {
        fetchLocation()
    }, [])
    console.log(center)
    
    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, _ => null)
        
    }

    const getRestaurants = async () => {
        console.log(center)
        const res = await axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}&range=${distance}`)
        setRestaurants(res.data)
    }


    return (
        <section>
            <Flex justify='space-between' direction={['column', 'column', 'row', 'row']}>
                <Heading as="h1" fontSize={[50, 100, 180, 250]} m={5}>Can't Decide?</Heading>
                <Container mr='200px'>
                    <Container centerContent>
                        <Heading as='h3' size='lg'>Enter Your Location</Heading>
                    </Container>
                    <Input textAlign="center" type="text" name="Map Search" placeholder="Type Something Here..." focusBorderColor="red.400" borderRadius="100px" m={2} />
                    <Container centerContent>
                        <Heading as='h4' size='m'>Range</Heading>
                    </Container>
                    <Slider aria-label="slider-ex-1" defaultValue={8046.72} min={8046.72} max={32186.9} onChange={setDistance}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Map />
                    <Container centerContent m={3}>
                        <Button size='lg' onClick={() => getRestaurants()}>Go</Button>
                    </Container>
                </Container>
            </Flex>
        </section>
    )
}
export default Homepage