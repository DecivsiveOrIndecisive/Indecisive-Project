import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './components/Login';
import Nav from './components/Nav'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Login />
    </ChakraProvider>
  );
}

export default App;
