import React from 'react';
// import { useParams } from 'react-router-dom';

import MenuList from '../components/vert/MenuList';
import MenuList2 from '../components/horiz/MenuList2';
import MenuList3 from '../components/pic/MenuList3';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'University of Georgia',
    description: 'From Ideas to Innovation!',
    imageUrl:
      'https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/athens/uga-arch-large-web0-cac931605056a36_cac93607-5056-a36a-0af166f0d7ed4058.jpg',
    address: 'University of Georgia, Athens, GA 30602',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const Menu = () => {
//   const userId = useParams().userId;
//   const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    const loadedPlaces = DUMMY_PLACES;
  return (
    <>
        <div>
        <MenuList2 items={loadedPlaces} />
        </div>
        <div>
        <MenuList items={loadedPlaces} />
        </div>
        <div>
        <MenuList3 items={loadedPlaces} />
        </div>
    </>
  )
};

export default Menu;