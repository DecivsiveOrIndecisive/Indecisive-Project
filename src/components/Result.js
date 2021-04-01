import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { MapContext } from "../context/mapContext";
import { UserContext } from "../context/userContext";
import DisplayResult from "./DisplayResult";
import Loading from "./Loading";

const Result = () => {
  const {
    keyword,
    restaurants,
    center,
    distance,
    token,
    getResult,
    result,
  } = useContext(MapContext);

  const { user } = useContext(UserContext);

  console.log(distance);
  console.log(center);
  console.log(restaurants);
  console.log(keyword);
  console.log(token);
  console.log(result);

  useEffect(() => {
    if (restaurants.length > 0) {
      getResult();
    }
  }, [restaurants]);

  const saveHistory = () => {
    if (result && user) {
      axios
        .put("/api/user/history", { result, user })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    saveHistory();
  }, [result]);

  if (result) {
    return (
      <>
        <DisplayResult result={result} getResult={getResult} />
      </>
    );
  } else {
    return (
      <Flex justify="center" align="center" height="80vh">
        <Loading />
      </Flex>
    );
  }
};

export default Result;
