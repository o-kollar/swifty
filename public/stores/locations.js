Alpine.store('locationData', {
    on: false,
 
    coords: [],
    originName: '',
    destinationName: '',
    originCoords: [],
    destinationCoords: [],
    suggestedAddress: [],
    setLocationDetails: function (address, coords, destination) {
      destination
        ? ((locationData.destinationName = address), (locationData.destinationCoords = coords))
        : ((locationData.originName = address), (locationData.originCoords = coords));
    },
    swap: function () {
      [locationData.originCoords, locationData.destinationCoords] = [locationData.destinationCoords, locationData.originCoords];
      let originName = locationData.originName;
      let destinationName = locationData.destinationName;
      locationData.originName = destinationName;
      locationData.destinationName = originName;
      getConnections();
  }

})
