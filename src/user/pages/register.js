import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import axios from 'axios';

export function Register() {

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            email: form[1].value,
            password: form[2].value
        }

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? Redirect("/") : null)
    }, [])

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input required type = "email"/>
            <input required type = "password"/>
            <input type="submit" value="Register"/>
        </form>
    )
}