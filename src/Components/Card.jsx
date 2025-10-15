import React from "react";
import './Card.css'

const Card = ({ data }) => {
  console.log(data); // Check the data passed

  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null;
        } else {
          return (
            <div key={index} className="card">
              <img src={curItem.urlToImage} alt="" />
              <div className="content">
                <a className="title" onClick={() => window.open(curItem.url)}>
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
              </div>
              <button onClick={() => window.open(curItem.url)}>
                Read More
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
