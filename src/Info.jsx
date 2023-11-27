// src/info.js
import React from 'react';
import { useState } from 'react';


const faqData = [
  {
    question: "How do you get your images?",
    answer: "Our images are sourced from the Metropolitan Museum of Art's public API.",
  },
  {
    question: "How are you allowed to sell products with them?",
    answer: "All the images that are availible from the Met are public domain.This means they are free for commercial use.",
  },
  {
  question: "What materials are your shirts made of?",
  answer:"Our shirts are made with organic 100% cotton."
  },
  {
    question: "When can I expect my order?",
    answer:"When shipped domestically (inside US) orders arrive no later than ten business days after the point of purchase." 
  },
  {
    question: "Do you ship internationally?",
    answer:"We do not ship internationally at this time." 
  },
  
  // Add more questions and answers here
];


function Info() {
  return (
    
    <div style={infoStyle}>
      <h1>About Us</h1>
      <p>Galeria is a marketplace to buy merchandise that features classic pieces from the Metropolitan Museum of Art. 
        <br></br>Our main goal is to make it easier for people to rediscover old forgotten masterpieces and share them with the world.
        <br></br> We hope you find a piece you like enough that you choose buy a shirt or maybe ten.</p>
       <br></br>
        <br></br>
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqData.map((item, index) => (
          <li key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </li>
        ))}
      </ul>
      <br></br>
      <br></br>

      <h3>Created By:</h3>
      <br></br>
      <h1>Grace Diacon</h1>
      <br></br>
      <h1>Pierce Farris</h1>
      <br></br>
      <h1>Brenden Latham</h1>
      <br></br>
      <h1>Jett McDowell</h1>
      <br></br>
      <h1>Hunter Sanders</h1>
      <br></br>
      <h1>Tan Truong</h1>

  </div>

  );
}
const infoStyle = {
  backgroundColor: '#15191d',
  color: 'white',
  padding: '15px',
  textAlign: 'center',
  fontSize: '20px',
  height: '100vh',

};


export default Info;
