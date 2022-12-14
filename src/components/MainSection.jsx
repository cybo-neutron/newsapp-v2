import React, { Component } from "react";
import News from "./News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export class MainSection extends Component {
  render() {
    return (
      <div className="">
        <HeroSection />

        <Routes>
          <Route
            path="/"
            element={<News key="general" category="general" pageSize={10} />}
          />
          <Route
            path="/business"
            element={<News key="business" category="business" pageSize={10} />}
          />
          <Route
            path="/sports"
            element={<News key="sports" category="sports" pageSize={10} />}
          />
          <Route
            path="/health"
            element={<News key="health" category="health" pageSize={10} />}
          />
          <Route
            path="/science"
            element={<News key="science" category="science" pageSize={10} />}
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                category="entertainment"
                pageSize={10}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News key="technology" category="technology" pageSize={10} />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default MainSection;

class HeroSection extends Component {
  render() {
    return (
      <div className="h-64 bg-gray-600 relative">
        <img
          src="tempImage.gif"
          alt=""
          className="h-full object-cover w-full"
        />
        <div className="absolute h-full w-full bg-gradient-to-t from-transparent to-orange-400 via-orange-300 opacity-40 top-0"></div>
      </div>
    );
  }
}
