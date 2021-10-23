import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Karakterler from "./Karakterler";
import Karakter from "./Karakter";
import Konumlar from "./Konumlar";
import "./App.css";
import logo from "./logo.png";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});
function App() {
  const [tab, tabset] = useState("Karakterler");
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt="Rick and Morty"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <button
            className="btn btn-link"
            onClick={() => tabset("Karakterler")}
          >
            Karakterler
          </button>
          <button className="btn btn-link" onClick={() => tabset("Konumlar")}>
            Konumlar
          </button>

          {tab === "Karakterler" ? (
            <Route exact path="/" component={Karakterler} />
          ) : (
            <Route exact path="/" component={Konumlar} />
          )}
          <Route exact path="/karakter/:id" component={Karakter} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
