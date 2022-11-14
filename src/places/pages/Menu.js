import React from 'react';
// import { useParams } from 'react-router-dom';
import './menu.css';
import MenuList from '../components/vert/MenuList';
import MenuList2 from '../components/horiz/MenuList2';
import MenuList3 from '../components/pic/MenuList3';

const BREAKFAST = [
  {
    id: 'p1',
    title: 'Avocado Toast',
    description: 'A slice of sourdough bread topped with mashed avocado and an egg.',
    imageUrl:
      'https://www.thenomadicfitzpatricks.com/wp-content/uploads/2020/06/IMG_8023.jpg',
  },
  {
    id: 'p2',
    title: 'Breakfast Burrito',
    description: 'Scrambled eggs, cheddar cheese, avocado, pico de gallo, and your choice of protein.',
    imageUrl:
      'https://www.onceuponachef.com/images/2018/03/Breakfast-Burritos.jpg',
  },

];

const BAKERY = [
  {
    id: 'p3',
    title: 'Bagels',
    description: 'Plain, Everything, Sesame, or Cinnamon Toast',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod/images/20191219-seo-bagel-recipe-delish-ehg-8846-1578412004.jpg',
  },
  {
    id: 'muffin',
    title: 'Assorted Muffins',
    description: 'Blueberry, Cranberry Orange, Chocolate Chip, Double Chocolate',
    imageUrl: 'https://cdn11.bigcommerce.com/s-pll9il/images/stencil/1280x1280/products/88/262/2R9A1868__70833.1592021428.jpg?c=2',
  },
  {
    id: 'coffeecake',
    title: 'Coffee Cake',
    description: 'Cinnamon-Streusel Coffee Cake',
    imageUrl: 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/recipe_legacy/128-3-large.jpg?itok=6Cv5oS6m'
  }
]

const DRINKS = [
  {
    id: 'coffee',
    title: 'Coffee',
    description: 'Medium or Light Roast',
    imageUrl: 'https://perfectdailygrind.com/wp-content/uploads/2021/04/Coffee-Bean-Hardness-1.jpg'
  },
  {
    id: 'tea',
    title: 'Tea',
    description: 'Earl Grey, Chai, Citrus Green',
    imageUrl: 'https://post.healthline.com/wp-content/uploads/2022/01/hot-tea-steaming-steeping-732-549-feature-thumb.jpg'
  }
]

const Menu = () => {
//   const userId = useParams().userId;
//   const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
 
    const loadedPlaces = BREAKFAST;

    const idk = BAKERY;
    const bevs = DRINKS;
  return (
    <>
        <div className= "cards">
        <h2>bakery</h2>
        <MenuList items={idk} />
        </div>
        <div className="cards">
          <h2>breakfast</h2>
        <MenuList2 items={loadedPlaces} />
        </div>
        <div className = "cards">
          <h2>drinks</h2>
        <MenuList3 items={bevs} />
        </div>
    </>
  )
};

export default Menu;