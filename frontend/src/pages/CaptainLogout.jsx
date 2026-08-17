import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CaptainLogout = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem('captainToken')

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('captainToken')
            navigate('/captain-login')
        }  
    })     


  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout