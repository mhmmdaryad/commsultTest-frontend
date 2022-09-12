import React, { Component } from "react";
import "./App.css";

import Login from "./layouts/loginPage";
import Product from "./layouts/productPage";
import { createBrowserHistory } from "history";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const history = createBrowserHistory();
function App() {
  return (
    <>
      <Router history={history}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exac path="/product" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
