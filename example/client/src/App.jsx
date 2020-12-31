import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import Home from "./views/home";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
