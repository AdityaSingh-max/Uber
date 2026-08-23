const rideServie = require('../services/ride.service')
const {validationResult} = require('express-validator')
const mapService = require("../services/maps.service")
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userId, pickup, destination, vehicleType} = req.body;

    try{
        const ride = await rideServie.createRide({user: req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride);
        const pickupCordinates = await mapService.getAddressCoordinates(pickup);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCordinates.ltd, pickupCordinates.lng, 2)
        ride.otp = ""


        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user')
       captainsInRadius.map(captain => {
        sendMessageToSocketId(captain.socketId,{
            event: 'new-ride',
            data: rideWithUser
        })
        });
    } catch(err){
        return res.status(500).json({message: err.message});
    }
}


module.exports.getFare = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination} = req.query;

    try{
        const fare = await rideServie.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch(err){
        return res.status(500).json({message: err.message});
    }
}


module.exports.confirmRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId} = req.body;

    try{
        const ride = await rideServie.confirmRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed', 
            data: ride
        })
        return res.json(ride)
    } catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports.startRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId, otp} = req.query;

    try{
        const ride = await rideServie.startRide({rideId, otp, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch(err){
        return res.status(500).json({message: err.message});
    }
}


module.exports.endRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId} = req.body;

    try{
        const ride = await rideService.endRide({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.json(ride);
        
    } catch(err){
        return res.status(500).json({message: err.message});
    }
}