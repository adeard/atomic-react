import React from 'react'
import { InputForm } from '../Elements/Input/Index'
import Button from '../Elements/Button/Index'

const FormLogin = () => {

  const handleLogin = (event) => {
    event.preventDefault()
    localStorage.setItem('email', event.target.email.value)
    localStorage.setItem('password', event.target.password.value)
    console.log(localStorage.getItem('email'))
    console.log(localStorage.getItem('password'))
    window.location.href = "/products"
  }
  return (
    <form onSubmit={handleLogin}>
        <InputForm label="Email" type="email" name="email" placeholder="example@mail.com" />
        <InputForm label="Password" type="password" name="password" placeholder="*****" />
        <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
    </form>
  )
}

export default FormLogin