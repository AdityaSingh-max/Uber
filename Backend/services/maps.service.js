const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => { 
    const apiKey = process.env.GOOGLE_MAP_API; // Ensure you have your API key in environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
    } catch (error) {
        console.error('Error fetching address coordinates:', error);
        throw new Error('Failed to fetch address coordinates');
    }
}


module.exports.getDistanceAndTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route found between the specified locations');
            }
            return response.data.rows[0].elements[0];
        }  else {
                throw new Error('Failed to fetch distance and time');
       }

    }catch(error){
        console.error('Error fetching distance and time:', error);
        throw new Error('Failed to fetch distance and time');
    }
}    


module.exports.getSuggestions = async (input) => {
    if(!input) {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        return response.data.predictions;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw new Error('Failed to fetch suggestions');
    }
}    