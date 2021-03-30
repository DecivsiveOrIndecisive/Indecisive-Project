import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import {
  Flex,
  TabList,
  TabPanels,
  Tabs,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import DisplayPlace from "./DisplayPlace";
//import History from './History'
//import Blacklist from './Blacklist'
//import Favorites from './Favorites'

const UserInfo = () => {
  let history = useHistory();
  const [state, setState] = useState({
    places: [],
    blacklist: [],
    history: [],
  });
  const userContext = useContext(UserContext);

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
      getPlaces();
      getBlacklist();
      getHistory();
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

  const mappedHistory = state.history.map((e, i) => {
             return (
                <div key={i}>
                  <DisplayPlace
                    place={e}
                    user={userContext.user}
                    removeFavorite={whitelist}
                     typeOf="blacklist"
                  />
                </div>
             )
         })
  console.log(state);
  return (
    <Tabs>
      <TabList>
        <Tab>Favorites</Tab>
        <Tab>Blacklist</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
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
        </TabPanel>
        <TabPanel>
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
        </TabPanel>
        <TabPanel>
        <Flex
            justify="space-evenly"
            align="center"
            direction="row"
            wrap="wrap"
            mt={10}
          >
            {state.history.length !== 0
              ? mappedHistory
              : "You don't have a history! Start deciding now!"}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserInfo;
