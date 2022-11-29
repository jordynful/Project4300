import { Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import React, { Component } from 'react'
import axios from 'axios';

export function Login() {
    function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            email: form[0].value,
            password: form[1].value
        }

        fetch("../login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
        })
    }

    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? Redirect("/"): null)
    }, [])

    return (
        <form onSubmit={event => handleLogin(event)}>
            <input required type = "email"/>
            <input required type = "password"/>
            <input type="submit" value="Login"/>
        </form>
    )
}