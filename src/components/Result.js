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
import { MapContext } from '../context/mapContext'
import DisplayResult from './DisplayResult'
import Loading from './Loading'


const Result = () => {
  const { fetchLocation, keyword, getRandomKeyword, restaurants, getRestaurants, getMore, center, distance, setDistance, token, moreRestaurants, getResult, result } = useContext(MapContext)

  console.log(distance)
  console.log(center)
  console.log(restaurants)
  console.log(keyword)
  console.log(token)
  // console.log(moreRestaurants)
  console.log(result)


  useEffect(() => {
    if(restaurants.length > 0) {
      getResult()
    }
    
  }, [restaurants])




  

if(result){
  return (
    <>
      <DisplayResult result={result} getResult={getResult}/>
    </>
  )
 } else {
   console.log(result)
    return (
      <Flex justify="center" align="center">
        <Loading/>
      </Flex>
    )
  }
};

export default Result;
