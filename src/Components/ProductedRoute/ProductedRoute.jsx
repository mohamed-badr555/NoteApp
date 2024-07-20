import React, { Children } from 'react'
import Home from '../Home/Home'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProductedRoute() {

 if( localStorage.getItem("token") != undefined ){
   return  <Home/>
 }else{
   return <Login/>
 }



    
       
 
}
