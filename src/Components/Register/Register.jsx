import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUser] = useState({
        'first_name':'',
        'last_name':'',
        'email':'',
        'password':''
    })
    const [isLoaded, setisLogged] = useState(false)
    const [error, setError] = useState('')
let navigate= useNavigate()
     
   function getUserData({target}){
    // console.log(user);
   
        setUser({...user,[target.name] :target.value})
   }
  async function register(e){
    e.preventDefault();
    // console.log(user);
    setisLogged(true)
    setError('')
 let {data}= await   axios.post("https://sticky-note-fe.vercel.app/signup",user)
 setisLogged(false)
 if(data.message == 'success'){
    navigate('/login')
 }else{
    setError(data.message)
 }
   }


  return (
    <div>

        <div className="container my-5 py-5">
    <div className="col-md-5 m-auto text-center">
    <form onSubmit={register}>
    <div className="form-group ">
                <input onChange={getUserData} autoComplete='true'  placeholder='Enter your name'  type="text" name='first_name'  className='form-control'  />
            </div>
    <div className="form-group my-2">
                <input onChange={getUserData} autoComplete='true'  placeholder='Enter your name'  type="text" name='last_name'  className='form-control'  />
            </div>
            <div className="form-group ">
                <input onChange={getUserData} autoComplete='true'  placeholder='Enter Email'  type="email" name='email'  className='form-control'  />
            </div>
            <div className="form-group my-2">
                <input onChange={getUserData} autoComplete='true'  placeholder='Enter Your Password'  type="password" name='password'  className='form-control'  />
            </div>
                <button type='submit' className={'btn btn-info w-100 ' + (isLoaded?"disabled":"")} >{isLoaded ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>:"Register"}</button>

               {error &&  <div className="alert alert-danger mt-2">
                    error
                </div>}
    </form>

    </div>
        </div>
    </div>
  )
}
