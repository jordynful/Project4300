import React from 'react';
// import { useParams } from 'react-router-dom';
import './menu.css';
import MenuList from '../components/vert/MenuList';
import MenuList2 from '../components/horiz/MenuList2';
import MenuList3 from '../components/pic/MenuList3';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
const BREAKFAST = [
  {
    id: 'p1',
    title: 'Avocado Toast',
    description: 'A slice of sourdough bread topped with mashed avocado and an egg.',
    imageUrl:
      'https://www.thenomadicfitzpatricks.com/wp-content/uploads/2020/06/IMG_8023.jpg',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: 'p2',
    title: 'Breakfast Burrito',
    description: 'Scrambled eggs, cheddar cheese, avocado, pico de gallo, and your choice of protein.',
    imageUrl:
      'https://www.onceuponachef.com/images/2018/03/Breakfast-Burritos.jpg',
      facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },

];

const BAKERY = [
  {
    id: 'p3',
    title: 'Bagels',
    description: 'Plain, Everything, Sesame, or Cinnamon Toast',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod/images/20191219-seo-bagel-recipe-delish-ehg-8846-1578412004.jpg',
      facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: 21,
    title: 'Assorted Muffins',
    description: 'Blueberry, Cranberry Orange, Chocolate Chip, Double Chocolate',
    imageUrl: 'https://cdn11.bigcommerce.com/s-pll9il/images/stencil/1280x1280/products/88/262/2R9A1868__70833.1592021428.jpg?c=2',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: 'coffeecake',
    title: 'Coffee Cake',
    description: 'Cinnamon-Streusel Coffee Cake',
    imageUrl: 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/recipe_legacy/128-3-large.jpg?itok=6Cv5oS6m',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  }
]

const DRINKS = [
  {
    id: 'coffee',
    title: 'Coffee',
    description: 'Medium or Light Roast',
    imageUrl: 'https://perfectdailygrind.com/wp-content/uploads/2021/04/Coffee-Bean-Hardness-1.jpg',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: 'tea',
    title: 'Tea',
    description: 'Earl Grey, Chai, Citrus Green',
    imageUrl: 'https://post.healthline.com/wp-content/uploads/2022/01/hot-tea-steaming-steeping-732-549-feature-thumb.jpg',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  }
]

const Menu = () => {
//   const userId = useParams().userId;
//   const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
const [drinks, setDrinks] = useState(DRINKS);
const [bake, setBake] = useState(BAKERY);
const [bfast, setBfast] = useState(BREAKFAST);
useEffect(() => {
  getBlogPost();
  console.log("retreiving data");
}, []);
     const getBlogPost = () => {
        axios.get('/api')
          .then((response) => {
            const data = response.data;
            console.log(data);
            setBfast(data);
            // wah.setState({ posts: data });
            console.log('Data has been received!!');
          })
          .catch(() => {
            console.log('Error retrieving data!!!');
          });
          axios.get('/api/vert')
          .then((response) => {
            const data = response.data;
            console.log(data);
            setBake(data);
            // wah.setState({ posts: data });
            console.log('Data has been received!!');
          })
          .catch(() => {
            console.log('Error retrieving data!!!');
          });
          axios.get('/api/pic')
          .then((response) => {
            const data = response.data;
            console.log(data);
            setDrinks(data);
            // wah.setState({ posts: data });
            console.log('Data has been received!!');
          })
          .catch(() => {
            console.log('Error retrieving data!!!');
          });

      };
    
      const handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
      };
    const loadedPlaces = BREAKFAST;

    const idk = BAKERY;
    const bevs = DRINKS;

  return (
    <>
        <div className= "cards">
        <h2 className="menu">bakery</h2>
        <MenuList items={bake} />
        </div>
        <div className="cards">
          <h2 className="menu">breakfast</h2>
        <MenuList2 items={bfast} />
        </div>
        <div className = "cards">
          <h2 className="menu">drinks</h2>
        <MenuList3 items={drinks} />
        </div>
    </>
  )
};

export default Menu;