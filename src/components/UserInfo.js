import { TabList, TabPanels, Tabs, Tab, TabPanel, useColorMode } from "@chakra-ui/react";
import History from "./History";
import Blacklist from "./Blacklist";
import Favorites from "./Favorites";
import BigMapDark from './Map/BigMapDark'
import BigMapLight from './Map/BigMapLight'

const UserInfo = () => {
  const { colorMode } = useColorMode();
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
        <TabPanel>{colorMode === "dark" ? <BigMapDark /> : <BigMapLight />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserInfo;
