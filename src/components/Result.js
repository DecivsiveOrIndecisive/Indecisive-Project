import { Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { MapContext } from "../context/mapContext"
import DisplayResult from "./DisplayResult"
import Loading from "./Loading"

const Result = () => {
  const {
    keyword,
    restaurants,
    center,
    distance,
    token,
    getResult,
    result,
  } = useContext(MapContext)

  console.log(distance)
  console.log(center)
  console.log(restaurants)
  console.log(keyword)
  console.log(token)
  console.log(result)

  useEffect(() => {
    if (restaurants.length > 0) {
      getResult()
    }
  }, [restaurants])

  if (result) {
    return (
      <>
        <DisplayResult result={result} getResult={getResult} />
      </>
    )
  } else {
    console.log(result)
    return (
      <Flex justify="center" align="center">
        <Loading />
      </Flex>
    )
  }
}

export default Result
