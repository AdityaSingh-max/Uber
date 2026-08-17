import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [vehicleColor, setVehicleColor] = useState('')
        const [vehiclePlate, setVehiclePlate] = useState('')
        const [vehicleCapacity, setVehicleCapacity] = useState('')
        const [vehicleType, setVehicleType] = useState('')

        const { captain, setCaptain } = React.useContext(CaptainDataContext)
    
        const submitHandler = async (e)=>{
            e.preventDefault();
            const captainData = {
                fullname:{
                    firstname: firstName,
                    lastname: lastName
                },
                email: email,
                password: password,
                vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType
                }
            }

            console.log("Sending data:", captainData);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/captains/register`,
            captainData
        );

        console.log("Response:", response.data);

        if (response.status === 201 || response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('captainToken', data.token)
            navigate('/captain-home');
        }

    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Backend errors:",
        JSON.stringify(error.response?.data, null, 2));
        console.log("Full error:", error);
    }

            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setVehicleColor('')
            setVehiclePlate('')
            setVehicleCapacity('')
            setVehicleType('')
        }

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img className='w-20 mb-5' src="https://th.bing.com/th/id/OIP.-BKY45--sQQ2LaXmEd7QvgHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="" />
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}>
            <h3 className="text-base font-medium mb-2">What's our Captain's name</h3>
            <div className='flex gap-4 mb-6'>
                <input required value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm" type="text" placeholder="First name" />
                <input value={lastName} onChange={(e)=> setLastName(e.target.value)} className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm" type="text" placeholder="Last name" />
            </div>
            <h3 className="text-base font-medium mb-2">What's our Captain's email</h3>
            <input required value={email} onChange={(e)=> setEmail(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm" type="email" placeholder="email@example.com" />
            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input required value={password} onChange={(e)=> setPassword(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm" type="password" placeholder="password" />

            <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
            <div className='flex gap-4'>
                <input required value={vehicleColor} onChange={(e)=> setVehicleColor(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm" type="text" placeholder="vehicle color" />
                <input required value={vehiclePlate} onChange={(e)=> setVehiclePlate(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm" type="text" placeholder="vehicle plate number" />
            </div>
            <div className='flex gap-4 mb-3'>
                <input required value={vehicleCapacity} type="number" onChange={(e)=> setVehicleCapacity(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm" placeholder="vehicle capacity" />
                <select required value={vehicleType} onChange={(e)=> setVehicleType(e.target.value)} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2  text-base placeholder:text-sm">
                    <option value="">Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Bike</option>
                    <option value="auto">Auto</option>
                </select>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Create Captain Account</button>
        </form>
            <p className="text-center">Already have a account? <Link to='/captain-login' className="text-blue-600">Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup