
import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import HomeCard from './Homecard';
import Button from '../../../shared/components/FormElements/Button';
import '../MenuList.css';

const HomeList = props => {
return (
<ul className="place-list horizontal">
{props.items.map(place => (
  <HomeCard
    title={place.title}
    description={place.description}
  />
))}
</ul>
)
};

export default HomeList;