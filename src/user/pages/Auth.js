import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: undefined
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);

    if (!isLoginMode) {
     
      const payload = {
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
        email: formState.inputs.email.value,
      };
      axios.post('/api/auth/signup', payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
       
        
    }
    else {
      const payload = {
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
        // email: formState.inputs.email.value,
      };
      axios.post('/api/auth/signin', payload)
      .then(function (response) {
        console.log(response);
        auth.login();
        console.log("PLS WORK")
        
        localStorage.setItem("token", response.data.accessToken);

      })
      .catch(function (error) {
        console.log(error);
      });
    }

  };
  useEffect(()=> {
  
 console.log(localStorage.getItem("token"));
    axios.get('/api/auth/token', {
  headers: {
    'x-access-token': localStorage.getItem("token")
  }
})
.then(function (response) {
  console.log(response);
  if (response.data === "Authenticated") {
    history.push("/");
    auth.login();
  }
})
.catch(function (error) {
  console.log(error);
});
 },[])
  return (
    <Card className="authentication">
      <h2 className= "login">Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
        <Input
        element="input"
        id="email"
        type="email"
        label="E-Mail"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email address."
        onInput={inputHandler}
      />
        )}
                  <Input
            element="input"
            id="username"
            type="text"
            label="Your UserName"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
