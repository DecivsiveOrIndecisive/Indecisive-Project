import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import DisplayPlace from './DisplayPlace'
import axios from "axios";
import {Flex} from '@chakra-ui/react'

const Blacklist = () => {
    let history = useHistory();
    const [state, setState] = useState({
    blacklist: [],
  });
  const userContext = useContext(UserContext);

  const getBlacklist = async () => {
    await axios
      .get("/api/posts/getBlacklist", {
        params: { user_id: userContext.user.id },
      })
      .then(res => {
        setState({ ...state, blacklist: res.data });

        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const whitelist = async placeKey => {
    await axios
      .delete("/api/post/whitelist", {
        data: { place_key: placeKey, user_id: userContext.user.id },
      })
      .then(res => {
        console.log(res);
        getBlacklist();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (userContext.user) {
      getBlacklist();
    } else {
      history.push("/");
    }
  }, [userContext.user]);

  const mappedBlacklist = state.blacklist.map((e, i) => {
    return (
      <div key={i}>
        <DisplayPlace
          place={e}
          user={userContext.user}
          removeFavorite={whitelist}
          typeOf="blacklist"
        />
      </div>
    );
  });

  return (
      <section>
          <Flex
            justify="space-evenly"
            align="center"
            direction="row"
            wrap="wrap"
            mt={10}
          >
            {state.blacklist.length !== 0
              ? mappedBlacklist
              : "You have not blacklisted a place yet!"}
          </Flex>
      </section>
  )

}

export default Blacklist