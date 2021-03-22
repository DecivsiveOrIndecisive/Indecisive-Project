import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Nav from './components/Nav'
import routes from './routes'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      {routes}
     
    </ChakraProvider>
  );
}

export default App;
