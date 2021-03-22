import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Register />
    </ChakraProvider>
  );
}

export default App;
