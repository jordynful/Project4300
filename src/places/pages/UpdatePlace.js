import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { BAKERY } from './Menu';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import axios from 'axios';


export const BAKERY = [
  {
    id: 'p3',
    title: 'Bagels',
    description: 'Plain, Everything, Sesame, or Cinnamon Toast',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod/images/20191219-seo-bagel-recipe-delish-ehg-8846-1578412004.jpg',
      facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: '21',
    title: 'Assorted Muffins',
    description: 'Blueberry, Cranberry Orange, Chocolate Chip, Double Chocolate',
    imageUrl: 'https://cdn11.bigcommerce.com/s-pll9il/images/stencil/1280x1280/products/88/262/2R9A1868__70833.1592021428.jpg?c=2',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: 21,
    title: 'Coffee Cake',
    description: 'Cinnamon-Streusel Coffee Cake',
    imageUrl: 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/recipe_legacy/128-3-large.jpg?itok=6Cv5oS6m',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  }
]

const UpdatePlace = () => {
  
  const [bakery,setBakery] = useState(BAKERY);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [facts, setFacts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;


  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        console.log(data);
        setBakery(data);
        console.log(bakery);
        // wah.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  };
  const identifiedPlace = bakery.find(p => p.id === placeId);

  useEffect(() => {

    getBlogPost();
     console.log(placeId);
    console.log(identifiedPlace.title);
    if (identifiedPlace) {
      console.log("what is happening");
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  },[], [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    const payload = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value
    };


    axios({
      url: '/api/update/' + placeId,
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
      });;
    // setImageUrl(formState.inputs.imageUrl.value);
    // setFacts(formState.inputs.facts.value);
    // setBakery(...BAKERY, {title: title, description: description, imageUrl:imageUrl, facts: facts})
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
