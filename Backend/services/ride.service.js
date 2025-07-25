const rideModel = require('../models/ride.model');
const mapsService = require('../services/maps.service');
const crypto = require('crypto')

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    if (
        !distanceTime ||
        !distanceTime.distance ||
        !distanceTime.duration ||
        typeof distanceTime.distance.value !== 'number' ||
        typeof distanceTime.duration.value !== 'number'
    ) {
        console.error("Invalid response from mapsService.getDistanceTime:", distanceTime);
        throw new Error('Could not calculate distance and time. Please check if the addresses are valid.');
    }

    const baseFare = { car: 50, bike: 20, auto: 30 };
    const perKmRate = { car: 15, bike: 8, auto: 10 };
    const perMinuteRate = { car: 3, bike: 1.5, auto: 2 };

    console.log("Data from Maps Service:", distanceTime);

    const fare = {
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + ((distanceTime.duration.value / 60) * perMinuteRate.bike)),
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
    };
    
    console.log("Calculated Fare Object:", fare);

    // --- THE FIX (Part 1) ---
    // Instead of just returning the fare, we return an object containing
    // BOTH the fare and the distanceTime object.
    return { fare, distanceTime };
}


function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num )).toString()
    return otp
}

module.exports.getFare = getFare;

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const { fare, distanceTime } = await getFare(pickup, destination);

    // Now, distanceTime is defined and can be used here.
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare: fare[vehicleType],
        distance: distanceTime.distance.value, // in meters
        duration: distanceTime.duration.value, // in seconds
    });

    return ride;
};
