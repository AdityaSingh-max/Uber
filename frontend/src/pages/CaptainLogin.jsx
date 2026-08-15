import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
   
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('')
      const [captainData, setCaptainData] = useState({})
  
      const submitHandler = (e)=>{
          e.preventDefault();
          setCaptainData({
              email: email,
              password: password
          })
          setEmail('')
          serPassword('')
        }  
    
  return (
    <div className="p-5 h-screen flex flex-col justify-between">
      <div>
        <img className='w-20 mb-5' src="https://th.bing.com/th/id/OIP.-BKY45--sQQ2LaXmEd7QvgHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="" />
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base" type="email" placeholder="email@example.com" />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input required value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base" type="password" placeholder="password" />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Login</button>
        </form>
            <p className="text-center">Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin