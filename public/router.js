
const suggestedLocation = document.getElementById('suggestedLocation');
const Selected = Alpine.reactive(Alpine.store('state'));



function saveSearch() {
    const searchQuery = {
        origin: locationData.originName,
        originLoc: locationData.originCoords,
        destination: locationData.destinationName,
        destinationLoc: locationData.destinationCoords,
    };

    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    if (searches.length >= 4) {
        searches.pop();
    }

    searches.unshift(searchQuery);

    localStorage.setItem('searches', JSON.stringify(searches));
}

function getTimeLeft(timeString) {
    const now = new Date();
    const targetTime = new Date(timeString);
    const timeLeft = targetTime.getTime() - now.getTime();

    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${targetTime}`;
}

function getConnections(pageCursor) {

    Results.res = true;
    Results.loading = true;
    Results.connections = '';
    let endpoint = '/api/connections'
    if(Selected.TransitMode === 'bike'){
        endpoint = '/api/bikesharing'
    }

    
    post(endpoint, {
        origin: locationData.originCoords,
        destination: locationData.destinationCoords,
        pageCursor: pageCursor
    })
        .then((response) => {
            Results.connections = response;
            console.log(response);
            Results.loading = false;
            Results.res = true;
        })
        .catch((error) => {
            console.log(error);
        });
}
