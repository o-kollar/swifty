const fetch = require('node-fetch');
const geoUtils = require('../utils/geo-util')

async function bikeSharing(data) {
    let closestStartStation = null;
    let closestFinishStation = null;
    let closestStartDistance = Infinity;
    let closestFinishDistance = Infinity;

    return new Promise((resolve, reject) => {
        fetch('http://api.citybik.es/v2/networks/whitebikes')
            .then((response) => response.json())
            .then((result) => {
                result.network.stations.forEach((station) => {
                    const distanceToStart = geoUtils.getDistance(data.origin[1], data.origin[0], station.latitude, station.longitude);
                    const distanceToFinish = geoUtils.getDistance(data.destination[1], data.destination[0], station.latitude, station.longitude);

                    if (station.free_bikes !== 0 && distanceToStart < closestStartDistance && distanceToStart < 2) {
                        closestStartDistance = distanceToStart;
                        closestStartStation = station;
                    }

                    if (distanceToFinish < closestFinishDistance && distanceToFinish < 10) {
                        closestFinishDistance = distanceToFinish;
                        closestFinishStation = station;
                    }
                });

                if (closestStartStation && closestFinishStation) {
                    const connection = {
                        start: data.origin,
                        closestStartStation: [closestStartStation.longitude, closestStartStation.latitude],
                        closestFinishStation: [closestFinishStation.longitude, closestFinishStation.latitude],
                        finish: data.destination,
                    };
                    resolve(connection);
                } else {
                    reject(new Error('Could not find suitable bike stations for the provided locations'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {bikeSharing}