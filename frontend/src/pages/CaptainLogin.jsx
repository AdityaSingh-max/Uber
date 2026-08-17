import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext)

  
      const submitHandler = async(e)=>{
          e.preventDefault();
          const captian = {
              email: email,
              password: password
          }

          try{

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captian)

          if(response.status === 200){
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('captainToken', data.token)
            navigate('/captain-home')
          }
          
        } catch(error){
            console.log("Status:", error.response?.status);
            console.log("Backend errors:",
            JSON.stringify(error.response?.data, null, 2));
            console.log("Full error:", error);
          }  

          setEmail('')
          setPassword('')
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