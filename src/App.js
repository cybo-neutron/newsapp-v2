import React, { Component } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "./components/News";
export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <MainSection />

        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
