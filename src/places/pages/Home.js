import React from 'react';
import './home.css';
import HomeList from '../components/home/HomeList';
const about = [
    {
      title: 'Afternoon Tea',
      description: 'A traditional afternoon tea service, which includes a pot of tea with savories, scones, clotted cream & jam, & sweets. We also serve a Childrens Tea, as well as dairy free afternoon tea, gluten free afternoon tea, & vegan or vegetarian afternoon teas.',
    },
    {
      title: 'Homemade',
      description: 'All of our ingredients are homemade! We make our own mayonnaise, dressings & sauces, pastries & baked goods, jams, & even clotted cream. We pick our herbs from our garden, & are working on locally sourcing everything we can.',
    },
    {
        title: 'Midday Fare',
        description: 'We offer several delectable food items during breakfast and lunch that can be altered according to dietary preference and contain all natural ingredients. Our items are carefully selected by the chef and may change on a day to day basis.',
      }
  ];
  
const Home = () => {


  return (
    <>
    <div className = "aboutContent">
  <div>
    <h1 className = "titlePage">About Us</h1>
  </div>
  <div className = "mission">
    <h3>The Café on Lumpkin is housed in a historic 1920’s home, serving coffee, tea, breakfast, pastries, sandwiches, soups, salads, & other light fare.</h3>
<h3>Afternoon Tea is served the traditional way: a variety of quality teas served with three-tiered fare including tea sandwiches, British scones with housemade clotted cream & jams, & Battenberg Cake, macarons, lemons tarts, & other sweets.</h3>
  </div>
<div className = "about-cards">
<HomeList items = {about}/>
  </div>

  <div className = "about-footer">
    <h2 className = "titlePage2">Talk To Us</h2>
    <h5 className = "number">(404) 259-1368</h5>
    <h5 className = "number">jordynfulbright@gmail.com</h5>
  </div>
  </div>
  </>
    )
};

export default Home;