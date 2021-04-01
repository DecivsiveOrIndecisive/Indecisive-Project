import { TabList, TabPanels, Tabs, Tab, TabPanel } from "@chakra-ui/react";
import History from "./History";
import Blacklist from "./Blacklist";
import Favorites from "./Favorites";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import axios from 'axios'

const UserInfo = () => {
  let history = useHistory();
  // const [state, setState] = useState({
  //   places: [],
  //   blacklist: [],
  //   });
  const [placeState, setPlaceState] = useState([]) 

  const [blacklistState, setBlacklistState] = useState([])

    const userContext = useContext(UserContext)
    
    const getPlaces = async () => {
        await axios
          .get("/api/posts/getSaved", {
            params: { user_id: userContext.user.id },
          })
          .then(res => {
            //setState({ ...state, places: res.data });
            setPlaceState(res.data)
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

      const getBlacklist = async () => {
        await axios
          .get("/api/posts/getBlacklist", {
            params: { user_id: userContext.user.id },
          })
          .then(res => {
            //setState({ ...state, blacklist: res.data });
            setBlacklistState(res.data)
    
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
          getPlaces();
          getBlacklist()

        } else {
          history.push("/");
        }
      }, [userContext.user]);

  return (
    <Tabs colorScheme="brand">
      <TabList>
        <Tab>Favorites</Tab>
        <Tab>Blacklist</Tab>
        <Tab>History</Tab>
        <Tab>Map</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Favorites places={placeState} />
        </TabPanel>
        <TabPanel>
          <Blacklist blacklist={blacklistState}/>
        </TabPanel>
        <TabPanel>
          <History />
        </TabPanel>
        <TabPanel>PUT YOUR COOL MAP HERE</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserInfo;
