import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';

const NewPlace = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const placeHolder = "Select..."
const getDisplay = () => {
  if (selectedValue) {
     return selectedValue.label; 
  }
  return placeHolder;
};
useEffect(() => {
  const handler = () => setShowMenu(false);
  window.addEventListener("click", handler);
  return () => {
      window.removeEventListener("click", handler);
  };
});
const onItemClick = (option) => {
  setSelectedValue(option);
}
const isSelected = (option) => {
  if (!selectedValue) {
      return false;
  }
  return selectedValue.value === option.value;
}
const handleInputClick = (e) => {
  e.stopPropagation();
  setShowMenu(!showMenu);
}
const options = [
  {value: "top", label: "Bakery"},
  {value: "middle", label: "Breakfast"},
  {value: "bottom", label: "Drinks"}
];
const [type, setType] = useState(null);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      facts: {
        value: '',
        isValid: false
      },
      imageUrl: {
        value: '',
        isValid: false
      },
    },
    false
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    const payload = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      facts: formState.inputs.facts.value,
      imageUrl: formState.inputs.imageUrl.value,
    };
    console.log(payload);
    console.log(selectedValue);
    console.log(options[0]);

    //series of if statements here 
    if (selectedValue.value === 'top') {
      console.log("made it to top");
    axios({
      url: '/api/vert/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });
    }
    else if (selectedValue.value === 'middle') {

      axios({
        url: '/api/save',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server');
          this.resetUserInputs();
          this.getBlogPost();
        })
        .catch(() => {
          console.log('Internal server error');
        });
        
    }
    
    else {
      axios({
        url: '/api/pic/save',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server');
          this.resetUserInputs();
          this.getBlogPost();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    }
    
  }; //submit handler

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="facts"
        element="input"
        label="Facts"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="imageUrl"
        element="input"
        label="imageUrl"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <div className='droppy'>
        <h4>Where should this menu item be placed?</h4>
        <div className="dropdown-container">
      <div onClick = {handleInputClick} className="dropdown-input">
      {getDisplay()}
        {showMenu && (
        <div className="dropdown-menu">
        

            {options.map((option) => (
                <div
                onClick ={() => onItemClick(option)} key ={option.value} 
                className = {`dropdown-item ${isSelected(option) && "selected"}`}>
                    {option.label}
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
      </div>
      <Button type="submit" disabled={!formState.isValid}>
        ADD ITEM
      </Button>
    </form>
  );
};

export default NewPlace;
