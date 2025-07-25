const axios = require('axios')


module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'GoCabbyApp/1.0 (mayankrajgupta3112@gmail.com)' 
            }
        })
        if (response.data && response.data.length > 0) {
            const location = response.data[0]
            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            }
        } else {
            throw new Error('No results found for the given address.')
        }
    } catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message)
    }
}

module.exports.getDistanceTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Origin and destination are required')
    }

    // Get coordinates for pickup and destination
    const pickupCoords = await module.exports.getAddressCoordinates(pickup)
    const destinationCoords = await module.exports.getAddressCoordinates(destination)

    // OSRM expects lon,lat;lon,lat
    const coordinates = `${pickupCoords.lng},${pickupCoords.lat};${destinationCoords.lng},${destinationCoords.lat}`

    try {
        const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${coordinates}`, {
            params: {
                overview: 'false'
            }
        })
        if (
            response.data &&
            response.data.code === 'Ok' &&
            response.data.routes &&
            response.data.routes.length > 0
        ) {
            const route = response.data.routes[0]
            console.log("Raw Nominatim response for pickup:", pickup);
            console.log("Raw Nominatim response for destination:", destination);
            return {
                distance: { value: route.distance }, // meters
                duration: { value: route.duration }  // seconds
            }
        } else {
            throw new Error('No route found')
        }
    } catch (error) {
        throw new Error('Failed to fetch distance and time: ' + error.message)
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: input,
                format: 'json',
                addressdetails: 1,
                limit: 5
            },
            headers: {
                'User-Agent': 'GoCabbyApp/1.0 (mayankrajgupta3112@gmail.com)'
            }
        })
        return response.data.map(item => item.display_name)
    } catch (err) {
        throw new Error('Unable to fetch suggestions: ' + err.message)
    }
}