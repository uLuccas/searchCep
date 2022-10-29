import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/global.css";
import { AppRoutes } from "./routes";

function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
