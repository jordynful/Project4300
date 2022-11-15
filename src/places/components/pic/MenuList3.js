import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import PictureItem from './PictureItem';
import Button from '../../../shared/components/FormElements/Button';
import '../MenuList.css';

const MenuList3 = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list horizontal">
      {props.items.map(place => (
        <PictureItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          facts = {place.facts}
        />
      ))}
    </ul>
  );
};

export default MenuList3;
