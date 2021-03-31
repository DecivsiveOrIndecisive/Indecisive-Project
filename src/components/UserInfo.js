import { TabList, TabPanels, Tabs, Tab, TabPanel } from "@chakra-ui/react";
import History from "./History";
import Blacklist from "./Blacklist";
import Favorites from "./Favorites";

const UserInfo = () => {
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
          <Favorites />
        </TabPanel>
        <TabPanel>
          <Blacklist />
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
