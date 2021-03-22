import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
// import { Logo } from './Logo';
import Map from './components/Map/Map'

function App() {
  return (
    <ChakraProvider theme={theme}>
      

        
    </ChakraProvider>
  );
}

export default App;
