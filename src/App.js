import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Nav from './components/Nav'
import routes from './routes'
import Map from './components/Map/Map'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      {routes}
      <Map />
    </ChakraProvider>
  );
}

export default App;
