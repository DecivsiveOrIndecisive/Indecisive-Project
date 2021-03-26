// import {
//     Heading,
//     Container,
//     Flex,
//     Slider,
//     SliderTrack,
//     SliderThumb,
//     SliderFilledTrack,
//     Button,
//     Input,
//     useColorMode,
//   } from "@chakra-ui/react";
// import Place from './Place'

// const History = () => {
//     const mappedPlaces = places.map((e, index) => {
//         return <Place key={index} name={e.name} alt={e.name} rating={e.rating} img={e.photos[0].photo_reference} priceLvl={e.price_level} vincinity={e.vicinity} userRating={e.user_ratings_total} />
//     })

//     return (
//         <section>
//             <Flex direction={"column"}>
//                 <Container centerContent>
//                     <Heading as="h1">History</Heading>
//                     {mappedPlaces}
//                 </Container>
//             </Flex>
//         </section>
//     )
// }
// export default History