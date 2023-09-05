import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DarkMode } from '../../context/DarkMode'

const Navigation = ({type}) => {
  if (type === "login") {
    return (
      <p className='text-sm mt-5 text-center'>
        Don't have an account ? 
        <Link to="/register" className='font-bold text-blue-600'>Sign Up</Link>
      </p>
    )
  } else {
    return (
      <p className='text-sm mt-5 text-center'>
        Already have an account ? 
        <Link to="/login" className='font-bold text-blue-600'>Login</Link>
      </p>
    )
  }
}

const AuthLayout = (props) => {
  const {children, title, type} = props
  const {isDarkMode, setIsDarkMode} = useContext(DarkMode)

  console.log(isDarkMode)
  return (
    <div className={`flex justify-center min-h-screen items-center ${isDarkMode && "bg-slate-900"}`}>
      <div className="w-full max-w-xs">
        <button className='absolute right-2 top-2 bg-blue-600 p-2 text-white rounded' onClick={() => {
          setIsDarkMode(!isDarkMode)
        }}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
          <h1 className="text-3xl text-blue-600 font-bold mb-2">{title}</h1>
          <p className="font-medium text-slate-500 mb-8">
          Welcome, please enter your details !
          </p>
          {children}        
          <Navigation type={type}></Navigation>
          {/* <p className='text-sm mt-5 text-center'>
            {type === "login" ? "Don't have an account ? ": "Already have an account ? "}
            
            {type === "login" && <Link to="/register" className='font-bold text-blue-600'>Sign Up</Link>}
            {type === "register" && <Link to="/login" className='font-bold text-blue-600'>Login</Link>}
            
          </p> */}
      </div>
    </div>
  )
}

export default AuthLayout