import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e)=>{
        e.preventDefalut();
        setUserData({
            fullName:{
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        })
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

  return (
    <div className="p-5 h-screen flex flex-col justify-between">
      <div>
        <img className='w-16 mb-5' src="https://freepnglogo.com/images/all_img/uber-logo-c96a.png" alt="" />
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}>
            <h3 className="text-base font-medium mb-2">What's your name</h3>
            <div className='flex gap-4 mb-6'>
                <input required value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm" type="text" placeholder="First name" />
                <input value={lastName} onChange={(e)=> setLastName(e.target.value)} className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm" type="text" placeholder="Last name" />
            </div>
            <h3 className="text-base font-medium mb-2">What's your email</h3>
            <input required value={email} onChange={(e)=> setEmail(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm" type="email" placeholder="email@example.com" />
            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input required value={password} onChange={(e)=> setPassword(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm" type="password" placeholder="password" />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign up</button>
        </form>
            <p className="text-center">Already have a account? <Link to='/login' className="text-blue-600">Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By porceeding, you consent to get calls, WhatsApp or SMS messages, including by authomated means, from Uber and its affilates to the number provided</p>
      </div>
    </div>
  )
}

export default UserSignup