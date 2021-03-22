import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './components/Login';
import Map from './components/Map/Map'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Login />
      
    </ChakraProvider>
  );
}

export default App;
