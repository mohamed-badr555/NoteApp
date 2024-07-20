import React, { Children } from 'react'
import Home from '../Home/Home'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function ProductedRoute() {
 let token=   localStorage.getItem("token")
 try {
    jwtDecode(token)
 } catch (error) {
    return <Navigate to={'/login'} />
 }

  return  <Home/>
    
       
 
}
