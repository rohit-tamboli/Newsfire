import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Newsapp.css";
import Footer from "./Footer";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  const API_KEY = "cabea7c017e1400d8990e6adf991f493";
 
  const getData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    );
    const jsonData = await response.json();
    console.log(jsonData.articles);
    let dt = jsonData.articles.slice(0, 12);
    setNewsData(dt);
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value); // Update search state with input value
  };

  // Use this function to update search based on button click
  const useInput = (category) => {
    setSearch(category); // Update the search state with the selected category
  };

  return (
    <>
      <div className="box ">
        <div onClick={() => navigate("/")} className="header">
          <h1 className="logo-text">
            <span className="text-white" style={{ color: "#5044E4" }}>
              Quick
            </span>
            News
          </h1>
        </div>

        <div className="search-bar ">
          <input
            type="text"
            placeholder="Search News"
            onChange={handleInput}
            className="search-input"
            value={search}
          />
          <button className="search-button" onClick={getData}>
            Search
          </button>
        </div>

        {/* <button
          onClick={() => navigate("/admin")}
          className="login-button"
        >
          Login
        </button> */}
      </div>



      {/* ----------- */}

      <div className="mx-8 sm:mx-16 xl:mx-24 relative">
        <div className="text-center mt-8 mb-2">
          <div className="inline-flex items-center justify-center gap-4 py-[2px] mb-4  text-2xl text-primary">
            <p>New: AI feature integreted</p>
          </div>
        </div>
      </div>

      {/*  */}

      <div>
        <div className="categoryBtn">
          {/* Corrected onClick to pass category value */}
          <button onClick={() => useInput("sports")}>Sports</button>
          <button onClick={() => useInput("health")}>Health</button>
          <button onClick={() => useInput("technology")}>Technology</button>
          <button onClick={() => useInput("business")}>Business</button>
          <button onClick={() => useInput("fitness")}>Fitness</button>
        </div>

        <div>{newsData ? <Card data={newsData} /> : null}</div>
      </div>

      <Footer />
    </>
  );
};

export default Newsapp;
