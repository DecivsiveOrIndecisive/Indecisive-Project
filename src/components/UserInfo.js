import {
  TabList,
  TabPanels,
  Tabs,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import History from './History'
import Blacklist from './Blacklist'
import Favorites from './Favorites'

const UserInfo = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Favorites</Tab>
        <Tab>Blacklist</Tab>
        <Tab>History</Tab>
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
      </TabPanels>
    </Tabs>
  );
};

export default UserInfo;
