import React from 'react'
import { InputForm } from '../Elements/Input/Index'
import Button from '../Elements/Button/Index'

const FormRegister = () => {
  return (
    <form action="">
        <InputForm label="Full Name" type="text" name="fullname" placeholder="John Doe" />
        <InputForm label="Email" type="email" name="email" placeholder="example@mail.com" />
        <InputForm label="Password" type="password" name="password" placeholder="*****" />
        <Button classname="bg-blue-600 w-full">Register</Button>
    </form>
  )
}

export default FormRegister