import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import DisplayPlace from './DisplayPlace'
import axios from "axios";
import {Flex} from '@chakra-ui/react'
import Place from './Place'

const Blacklist = (props) => {
  //let history = useHistory();
  //   const [state, setState] = useState({
  //   blacklist: [],
  // });
  //const userContext = useContext(UserContext);

  // const getBlacklist = async () => {
  //   await axios
  //     .get("/api/posts/getBlacklist", {
  //       params: { user_id: userContext.user.id },
  //     })
  //     .then(res => {
  //       setState({ ...state, blacklist: res.data });

  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));
  // };

  // const whitelist = async placeKey => {
  //   await axios
  //     .delete("/api/post/whitelist", {
  //       data: { place_key: placeKey, user_id: userContext.user.id },
  //     })
  //     .then(res => {
  //       console.log(res);
  //       getBlacklist();
  //     })
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   if (userContext.user) {
  //    props.getBlacklist();
  //   } else {
  //     history.push("/");
  //   }
  // }, [userContext.user]);

  const mappedBlacklist = props.blacklist.map((e, i) => {
    return (
      <Place
        key={i}
        name={e.place_details.name}
        alt={e.place_details.name}
        rating={e.place_details.rating}
        priceLvl={e.place_details.price_level}
        vincinity={e.place_details.vicinity}
        userRating={e.place_details.user_ratings_total}
        favorite={false}
        blacklist={true}
      />
    );
  });

  return (
      <section>
          <Flex
            justify="space-evenly"
            align="left"
            direction="column"
            wrap="wrap"
            mt={10}
          >
            {props.blacklist.length !== 0
              ? mappedBlacklist
              : "You have not blacklisted a place yet!"}
          </Flex>
      </section>
  )

}

export default Blacklist