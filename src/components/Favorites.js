import {Flex} from '@chakra-ui/react'
import Place from './Place'

const Favorites = (props) => {
  
    const mappedPlaces = props.places.map((e, i) => {
      console.log(e.place_details)
      console.log(e.place_details.place_key)
        return (
          <Place
            key={i}
            placeKey={e.place_details.place_id}
            name={e.place_details.name}
            alt={e.place_details.name}
            rating={e.place_details.rating}
            priceLvl={e.place_details.price_level}
            vincinity={e.place_details.vicinity}
            userRating={e.place_details.user_ratings_total}
            favorite={true}
            blacklist={false}
          />
        );
      });

      return (
        <Flex
          justify="space-evenly"
          align="left"
          direction="column"
          wrap="wrap"
          mt={10}
        >
          {props.places.length !== 0
            ? mappedPlaces
            : "You do not have any saved places yet!"}
        </Flex>
      )
}

export default Favorites