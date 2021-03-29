import {
  Heading,
  Container,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";
import Map from "./Map/Map";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MapContext } from "../context/mapContext";
import { Link } from "react-router-dom";

const Homepage = () => {
    const {fetchLocation, keyword, getRandomKeyword, restaurants, getRestaurants, getMore, center, distance, setDistance, token, moreRestaurants}  = useContext(MapContext)
    // const [distance, setDistance] = useState(8046.72)
    // const [center, setCenter] = useState({ lat: 40, lng: -111 })
    // const [keyword, setKeyword] = useState('')
    // const [list, setList] = useState(['restaurant', 'food', 'diner', 'eat', 'cafe', 'eatery' ])
    
    console.log(distance)
    console.log(center)
    console.log(restaurants)
    console.log(keyword)
    console.log(token)
    console.log(moreRestaurants)

    useEffect(() => {
        fetchLocation()
        getRandomKeyword()
        // console.log(center)
        // console.log(restaurants)
        // console.log(distance)
    }, [])

    // const fetchLocation = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         setCenter({
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         })
    //     }, _ => null)

    // }
    // const newRes = ['test4']

    // const getRestaurants = async () => {
    //     // console.log(center)
    //     const res = await axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}&distance=${distance}&keyword=${keyword}`)
    //     setRestaurants(res.data.data)
    //     setToken(res.data.token)
        

    //     // setTimeout(() => {
    //     //     axios.get(`/api/moreRestaurants?token=${res.data.token}`)
    //     //     .then(res => {
    //     //         setMoreRestaurants(res.data)
    //     //         console.log(res.data)
    //     //     }
    //     //         ).catch('weird error')
    //     //     }, 5000)

    //     // console.log(res)
    //     console.log(token)
    // }
                
    // const getRandomKeyword = function (arr) {
    //     Setkeyword(arr[Math.floor((Math.random()*arr.length))]) ;
    //   } 

    // const getMore = async () => {
    //     const res = await axios.get(`/api/moreRestaurants?token=${token}`)
    //     setMoreRestaurants(res.data)
    //     console.log(moreRestaurants)
        
    // }

        // axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}&distance=${distance}&keyword=${keyword}`)
        // .then(res => {
        //     setRestaurants(res.data.data)
        //     setToken(res.data.token)
        //     setTimeout(() => {
        //         .then(res => {
        //             // setRestaurants(restaurants.concat(res.data))
        //             console.log(res.data)
        //         }
        //         ).catch('weird error')
        //     }, 20000)
        // }
        
        // )
        
        

        // setCenter({lat: center.lat + Math.random(), lng: center.lng + Math.random() })
        // axios.get(`/api/restaurants?lat=${center.lat}&lng=${center.lng}&range=${distance}`)
        // .then(res =>{
        //     setRestaurants(restaurants.concat(res.data))

        // })
        
        // const testArr = restaurants.concat(res.data)
        
       
    
    //   const mapRestaurants = restaurants.map((food) => {
    //     return (
    //       <div key={food.reference}>
    //         <p>{food.name}</p>
    //         <p>{food.vicinity}</p>
    //         <p>{food.rating}</p>
    //       </div>
    //     );
    //   });

    // const filtered = restaurants.filter((place, i) => {

    // })

    return (
        <section>
            <Flex justify='space-between' direction={['column', 'column', 'column', 'row']}>
                <Heading as="h1" fontSize={[50, 100, 180, 200]} m={5}>Can't Decide?</Heading>
                <Container mr={['0px', '100px', '180px', `200px`]}>
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
                        <Link to='/result'>
                            <Button size='lg' onClick={getRestaurants}>Go</Button>
                        </Link>
                    </Container>
                </Container>
            </Flex>
                                       
            {/* {mapRestaurants} */}




        </section>
    )
}
export default Homepage


// Perform a nearby search.
// service.nearbySearch(
//     { location: pyrmont, radius: 500, type: "store" },
//     (results, status, pagination) => {
//       if (status !== "OK" || !results) return;
//       addPlaces(results, map);
//       moreButton.disabled = !pagination || !pagination.hasNextPage;

//       if (pagination && pagination.hasNextPage) {
//         getNextPage = () => {
//           // Note: nextPage will call the same handler function as the initial call
//           pagination.nextPage();
//         };
//       }
//     }
//   );
