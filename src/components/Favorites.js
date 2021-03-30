import {Flex} from '@chakra-ui/react'
import axios from 'axios'
import DisplayPlace from "./DisplayPlace"
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";

const Favorites = () => {
    let history = useHistory();
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
      };

    useEffect(() => {
        if (userContext.user) {
          getPlaces();
        } else {
          history.push("/");
        }
      }, [userContext.user]);

    const mappedPlaces = state.places.map((e, i) => {
        return (
          <div key={i}>
            <DisplayPlace
              place={e}
              user={userContext.user}
              removeFavorite={removeFavorite}
              typeOf="favorite"
            />
          </div>
        );
      });

      return (
        <Flex
        justify="space-evenly"
        align="center"
        direction="row"
        wrap="wrap"
        mt={10}
      >
        {/* {mappedPlaces} */}
        {state.places.length !== 0
          ? mappedPlaces
          : "You do not have any saved places yet!"}
      </Flex>
      )
}

export default Favorites