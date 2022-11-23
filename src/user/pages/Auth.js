import React, { useState, useContext } from 'react';
import {useEffect} from 'react'
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
 
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
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

  const RoutesModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    console.log("here");
    auth.login();
  };
    const navigate = useNavigate();
    const location = useLocation();
    
    // We are consuming our user-management context to
    // get & set the user details here
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
    
    // We are using React's "useState" hook to keep track
    //  of the form values.
    const [form, setForm] = useState({
      email: "",
      password: ""
    });
    
    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };
    
    // This function will redirect the user to the
    // appropriate page once the authentication is done.
    const redirectNow = () => {
      const redirectTo = location.search.replace("?redirectTo=", "");
      navigate(redirectTo ? redirectTo : "/");
    }
    
    // Once a user logs in to our app, we don’t want to ask them for their
    // credentials again every time the user refreshes or revisits our app, 
    // so we are checking if the user is already logged in and
    // if so we are redirecting the user to the home page.
    // Otherwise we will do nothing and let the user to login.
    const loadUser = async () => {
      if (!user) {
        const fetchedUser = await fetchUser();
        if (fetchedUser) {
          // Redirecting them once fetched.
          redirectNow();
        }
      }
    }
    
    // This useEffect will run only once when the component is mounted.
    // Hence this is helping us in verifying whether the user is already logged in
    // or not.
    useEffect(() => {
      loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // This function gets fired when the user clicks on the "Login" button.
    const onSubmit = async (event) => {
      try {
        // Here we are passing user details to our emailPasswordLogin
        // function that we imported from our realm/authentication.js
        // to validate the user credentials and log in the user into our App.
        const user = await emailPasswordLogin(form.email, form.password);
        if (user) {
          redirectNow();
        }
      } catch (error) {
          if (error.statusCode === 401) {
             alert("Invalid username/password. Try again!");
         } else {
             alert(error);
         }
    
      }
    };
    
  return (
    <Card className="authentication">
      <h2 className= "login">Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
            
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
          value={form.email}
          onChange={onFormInputChange}
          
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
          value={form.password}
          onChange={onFormInputChange}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={RoutesModeHandler}>
        Routes TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
