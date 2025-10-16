import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Newsapp.css";
import Footer from "./Footer";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  // Use environment variable for API key (you should set it up in your deployment environment)
  const API_KEY = import.meta.env.VITE_SECRET;
  console.log("Serect", import.meta.env.VITE_SECRET);
  // console.log("API_KEY:", API_KEY);

  // Function to fetch data from the News API
  const getData = async () => {
    try {
      // Making API call with the dynamic search query and API key
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );

      // Check if the response is valid
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log(jsonData);

      // Check if articles data is present
      if (jsonData && jsonData.articles) {
        // Limit the number of articles to 12 and update state
        let dt = jsonData.articles.slice(0, 12);
        setNewsData(dt);
      } else {
        console.error("No articles found or API response is malformed.");
        setNewsData([]);
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error fetching news data:", error);
      setNewsData([]); // Set to empty array in case of error
    }
  };

  // useEffect to fetch news data whenever search changes
  useEffect(() => {
    getData();
  }, [search]);

  // Handle input change to update the search query
  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value); // Update search state with input value
  };

  // Use this function to update search based on button click (category buttons)
  const useInput = (category) => {
    setSearch(category); // Update the search state with the selected category
  };

  return (
    <>
      <div className="box">
        <div onClick={() => navigate("/")} className="header">
          <h1 className="logo-text">
            <span className="text-white" style={{ color: "#5044E4" }}>
              Quick
            </span>
            News
          </h1>
        </div>

        <div className="search-bar">
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
      </div>

      {/* Promotional AI feature banner */}
      <div className="mx-8 sm:mx-16 xl:mx-24 relative">
        <div className="text-center mt-8 mb-2">
          <div className="inline-flex items-center justify-center gap-4 py-[2px] mb-4 text-2xl text-primary">
            <p>New: AI feature integrated</p>
          </div>
        </div>
      </div>

      {/* Category buttons */}
      <div>
        <div className="categoryBtn">
          <button onClick={() => useInput("sports")}>Sports</button>
          <button onClick={() => useInput("health")}>Health</button>
          <button onClick={() => useInput("technology")}>Technology</button>
          <button onClick={() => useInput("business")}>Business</button>
          <button onClick={() => useInput("fitness")}>Fitness</button>
        </div>

        {/* Render news cards */}
        <div>{newsData ? <Card data={newsData} /> : null}</div>
      </div>

      <Footer />
    </>
  );
};

export default Newsapp;
