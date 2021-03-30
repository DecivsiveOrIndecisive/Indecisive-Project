import {
  Heading,
  Container,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Button,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import Place from "./Place";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";

const History = () => {
  let history = useHistory();
  const [state, setState] = useState({
    history: [],
  });
  const userContext = useContext(UserContext);

  const getHistory = async () => {
    await axios
      .get("/api/posts/getHistory", {
        params: { user_id: userContext.user.id },
      })
      .then(res => {
        setState({ ...state, history: res.data });

        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (userContext.user) {
      getHistory();
    } else {
      history.push("/");
    }
  }, [userContext.user]);

  const mappedHistory = state.history.map((e, index) => {
    return (
      <Place
        key={index}
        name={e.name}
        alt={e.name}
        rating={e.rating}
        priceLvl={e.price_level}
        vincinity={e.vicinity}
        userRating={e.user_ratings_total}
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
        {state.history.length !== 0
          ? mappedHistory
          : "You don't have a history! Start deciding now!"}
      </Flex>
    </section>
  );
};

export default History;
