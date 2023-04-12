
let searches = JSON.parse(localStorage.getItem('searches')) || [];
let Results = Alpine.reactive({ res: false, loading: false, connections: '' });

if (searches.length > 0) {
    // Display the search history on the webpage
    //localStorage.clear();
}
let stopTypes = {
    checkboxes: [true, true, true, false],
    getChoice: function () {
        var type = 0;
        if (stopTypes.checkboxes[1]) type = type | 1;
        if (stopTypes.checkboxes[2]) type = type | 2;
        if (stopTypes.checkboxes[0]) type = type | 4;
        return type;
    },
};

let time = Alpine.reactive({
    sliderValue: 0,
    custom: false,

    formatTime: function (time) {
        console.log('formatTime called');
        const date = new Date(time + new Date().getTimezoneOffset() * 60 * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    convertToTime: function (value) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const time = `${padZero(hours)}:${padZero(minutes)}`;
        return time;
    },
    getISOString: function (value) {
        if (time.custom === true) {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            const seconds = 0;
            const time = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            const date = new Date();
            date.setHours(hours, minutes, seconds);
            return date.toISOString();
        } else {
            return null;
        }
    },
});

function padZero(value) {
    return value.toString().padStart(2, '0');
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
