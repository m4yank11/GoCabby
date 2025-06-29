const rideModel = require('../models/ride.model')
const mapsService = require('../services/maps.service')

async function getFare(pickup, destination){
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination)

    const baseFare = {
        car: 50,
        bike: 20,
        auto: 30
    };

    const perKmRate = {
        car: 15,
        bike: 8,
        auto: 10,
    };

    const perMinuteRate = {
        car: 3,
        bike: 1.5,
        auto: 2,
    };



    const fare = {
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + ((distanceTime.duration.value / 60) * perMinuteRate.bike)),
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
    };

    return fare;
}

module.exports.getFare = getFare

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}
