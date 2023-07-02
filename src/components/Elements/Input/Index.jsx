import React from 'react'
import Label from './Label'
import Input from './Input'

export const InputForm = (props) => {
    const {label, type, name, placeholder} = props
  return (
    <div className="mb-6">
        <Label htmlFor={name}>{label}</Label>
        <Input name={name} type={type} placeholder={placeholder} />
    </div>
  )
}
