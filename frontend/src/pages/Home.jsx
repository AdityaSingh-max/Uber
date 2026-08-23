import React, { useContext, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import {SocketDataContext} from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')

    // Which input is currently being edited?
    const [activeInput, setActiveInput] = useState('')

    // Suggestions received from backend
    const [suggestions, setSuggestions] = useState([])

    const [panelOpen, setPanelOpen] = useState(false)

    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)

    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [fare, setFare] = useState({})
    const [vehicleType, setvehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const navigate = useNavigate()


    const {socket} =  useContext(SocketDataContext)
    const {user} = useContext(UserDataContext)

    useEffect(()=>{
        if(!user) return;
        socket.emit("join", {userType: "user", userId:user._id}) 
    }, [user])

    socket.on('ride-confirmed', ride=>{
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride=>{
        setWaitingForDriver(false)
        navigate('/riding')
        navigate('/riding', {state: {ride}})
    })

    // Get suggestions from backend
    const getSuggestions = async (value) => {

        if (!value || value.length < 3) {
            setSuggestions([])
            return
        }

        try {

            const token = localStorage.getItem('token')

            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: {
                        input: value
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSuggestions(response.data)

        } catch (error) {

            console.error(
                'Error fetching suggestions:',
                error
            )

            setSuggestions([])
        }
    }


    const handlePickupChange = (e) => {

        const value = e.target.value

        setPickup(value)
        setActiveInput('pickup')

        getSuggestions(value)
    }


    const handleDestinationChange = (e) => {

        const value = e.target.value

        setDestination(value)
        setActiveInput('destination')

        getSuggestions(value)
    }


    // Called when user clicks a suggestion
    const handleSuggestionClick = (location) => {

        if (activeInput === 'pickup') {
            setPickup(location.description)
        }

        if (activeInput === 'destination') {
            setDestination(location.description)
        }

        setSuggestions([])
        // setPanelOpen(false)

        // Open vehicle panel only after destination is selected
        if (
            activeInput === 'destination' &&
            pickup &&
            location
        ) {
            // setVehiclePanel(true)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
    }


    // Location panel animation
    useGSAP(() => {

        if (panelOpen) {

            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24,
                opacity: 1
            })

            gsap.to(panelCloseRef.current, {
                opacity: 1
            })

        } else {

            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
                opacity: 0
            })

            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }

    }, [panelOpen])


    // Vehicle panel animation
    useGSAP(() => {

        if (vehiclePanel) {

            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })

        } else {

            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [vehiclePanel])


    // Confirm ride panel animation
    useGSAP(() => {

        if (confirmRidePanel) {

            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })

        } else {

            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [confirmRidePanel])


    // Vehicle found panel animation
    useGSAP(() => {

        if (vehicleFound) {

            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })

        } else {

            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [vehicleFound])


    // Waiting for driver animation
    useGSAP(() => {

        if (waitingForDriver) {

            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })

        } else {

            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [waitingForDriver])

    async function findTrip(){
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
            params: {pickup, destination},
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFare(response.data)
    }

    async function createRide(){
        const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
            pickup, destination, vehicleType
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(responce.data)
    }

    return (

        <div className='h-screen relative overflow-hidden'>

            <img
                className='w-16 absolute left-5 top-5'
                src="https://freepnglogo.com/images/all_img/uber-logo-c96a.png"
                alt=""
            />

            <div className='h-screen w-screen'>

               <LiveTracking/>

            </div>


            <div className='flex flex-col justify-end absolute h-screen top-0 w-full'>

                <div className='h-[30%] p-6 bg-white relative'>

                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 top-6 right-6 text-2xl'
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>


                    <h4 className='text-2xl font-semibold'>
                        Find a trip
                    </h4>


                    <form onSubmit={submitHandler}>

                        <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full">
                        </div>


                        {/* PICKUP */}

                        <input
                            onFocus={() => {
                                setActiveInput('pickup')
                                setPanelOpen(true)

                                if (pickup.length >= 3) {
                                    getSuggestions(pickup)
                                }
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg mt-5 w-full"
                            type="text"
                            placeholder="Add a pick-up location"
                        />


                        {/* DESTINATION */}

                        <input
                            onFocus={() => {
                                setActiveInput('destination')
                                setPanelOpen(true)

                                if (destination.length >= 3) {
                                    getSuggestions(destination)
                                }
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg mt-3 w-full"
                            type="text"
                            placeholder="Enter your destination"
                        />

                    </form>

                    <button onClick={findTrip} className='mt-6 px-4 py-1 rounded-xl text-2xl bg-black text-white w-full'>
                        Find Trip
                    </button>

                </div>


                {/* LOCATION SEARCH PANEL */}

                <div
                    ref={panelRef}
                    className='bg-white h-0'
                >

                    <LocationSearchPanel
                        suggestions={suggestions}
                        onSuggestionClick={handleSuggestionClick}
                    />

                </div>

            </div>


            {/* VEHICLE PANEL */}

            <div
                ref={vehiclePanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
            >

                <VehiclePanel
                    selectVehicle={setvehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />

            </div>


            {/* CONFIRM RIDE */}

            <div
                ref={confirmRidePanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
            >

                <ConfirmedRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />

            </div>


            {/* LOOKING FOR DRIVER */}

            <div
                ref={vehicleFoundRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
            >

                <LookingForDriver
                    pickup={pickup}
                    createRide={createRide}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />

            </div>


            {/* WAITING FOR DRIVER */}

            <div
                ref={waitingForDriverRef}
                className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'
            >

                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={vehicleFound}
                    setWaitingForDriver={waitingForDriver}
                    setWaitingForDriver={setWaitingForDriver}
                />

            </div>

        </div>
    )
}

export default Home