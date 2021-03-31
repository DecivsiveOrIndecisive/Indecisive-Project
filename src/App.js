import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "./components/Nav";
import routes from "./routes";
import customTheme from "./components/customThemeTwo";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Nav />
      {routes}
    </ChakraProvider>
  );
}

export default App;
