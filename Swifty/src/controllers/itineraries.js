const dateTime = require('../utils/date-time');
const polyline = require('@mapbox/polyline');

function format(data) {
    const formattedData = {
        connections: data.plan.itineraries.map((connection) => {
            const connectionDetails = {
                travelTime: '',
                departureTime: '',
                segments: [],
            };

            connectionDetails.travelTime = dateTime.getDurationString(connection.duration);
            connectionDetails.departureTime = dateTime.convertTimestampToIsoString(connection.startTime);

            connection.legs.forEach((segment) => {
                const segmentDetails = formatSegment(segment);

                if (segment.intermediateStops) {
                    segment.intermediateStops.forEach((stop) => {
                        const stopDetails = formatStop(stop);
                        segmentDetails.stops.push(stopDetails);
                    });
                }

                connectionDetails.segments.push(segmentDetails);
            });

            return connectionDetails;
        }),
        nextPage: data.nextPageCursor
    };

    return formattedData;
}


function formatSegment(segment) {
    const segmentDetails = {
        mode: '',
        distance: '',
        lineID: '',
        departure: '',
        arrival: '',
        origin: '',
        originCoords: [],
        destination: '',
        destinationCoords: [],
        stops: [],
        path: [],
    };
    segmentDetails.mode = segment.mode;
    segmentDetails.distance = segment.distance;
    segmentDetails.lineID = segment.routeShortName;
    segmentDetails.departure = dateTime.convertTimestampToIsoString(segment.startTime);
    segmentDetails.arrival = dateTime.convertTimestampToIsoString(segment.endTime);
    segmentDetails.origin = segment.from.name;
    segmentDetails.originCoords = [segment.from.lon,segment.from.lat];
    segmentDetails.destination = segment.to.name;
    segmentDetails.destinationCoords = [segment.to.lon,segment.to.lat];
    segmentDetails.path = polyline.decode(segment.legGeometry.points).map(coords => [coords[1], coords[0]]);

    return segmentDetails;
}

function formatStop(stop) {
    const stopDetails = {
        name: '',
        arrival: '',
    };

    stopDetails.name = stop.name;
    stopDetails.arrival = dateTime.convertTimestampToIsoString(stop.arrival);
}

module.exports = { format };
