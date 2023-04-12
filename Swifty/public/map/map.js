const locationData = Alpine.reactive(Alpine.store('locationData'));


//launguages
maplibregl.setRTLTextPlugin('https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js');

window.onload = function loadmap() {
    let mapstyle;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Device is in dark mode
       mapstyle =  './map/styles/dark.json'
      } else {
        // Device is not in dark mode
        mapstyle =  './map/styles/default.json'
      }

      
    map = new maplibregl.Map({
        container: 'map',
       style: mapstyle,
        zoom: 6,
        center: [17.11904355960693, 48.16150637919123],
        maxBounds: [[16.802559,48.025295],[17.417793,48.245711]]
    });
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            let coords = SMap.Coords.fromWGS84(lon, lat);
            var updateLocation = function (geocoder) {
                var results = geocoder.getResults();
                locationData.setLocationDetails(results.label, [lon, lat]);
                drawMap(locationData.originCoords);
            };
            new SMap.Geocoder.Reverse(coords, updateLocation);
        });
    }
};

class MyProvider extends SMap.SuggestProvider {
    _processData() {
        if (!this._responseData) return;
        let rawData = JSON.parse(this._responseData.data);
        locationData.suggestedAddress = rawData.result;
    }
}

/**
  Vytvoreni suggestu s vlastnim itemem a providerem
  */
function suggestion(id) {
    let suggest = new SMap.Suggest(document.getElementById(id), {
        factory: null,
        provider: new MyProvider(),
    });

    // update dat pro našeptávač
    suggest.getProvider().updateParams((params) => {
        params.locality = 'Bratislava';
        params.lang = 'sk';
    });
}

function drawMap(coords, zoom) {
    map.easeTo({
        duration: 2500,
        center: coords,
        zoom: 15,
       // pitch: 60, // pitch in degrees
        // bearing: -60,
    });
    new maplibregl.Marker({ color: '#FF5733' }).setLngLat(coords).addTo(map);
}

function fitMap(bbox) {
    map.fitBounds(bbox, {});
}

let NameS = 0;
var setRoute = function (route,walking) {
    let myString = `Name${NameS}`;
    const path = route;
    let paint
    if(walking === 'WALK'){ paint =
        {
            'line-color': '#eded11',
            'line-width': 7,
            'line-dasharray': [2, 2]
        }
    }else{
        paint = {
            'line-color': getRandomColor(),
            'line-width': 7,
           
        
        } 
    }
    drawRoute(path,myString,paint);
    NameS++
   

    fitMap([locationData.originCoords, locationData.destinationCoords]);
};

function drawRoute(Coords,Name,paint){
    console.log('coords',Coords)
    map.addSource(Name, {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: Coords
            },
        },
    });
    
    map.addLayer({
        id: Name,
        type: 'line',
        source: Name,
        paint: paint,
    });
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function route(routes) {
    
    routes.segments.forEach((route) => {
        if (route.walkingDistance !== 0) {
            locationData.coords.push(SMap.Coords.fromWGS84(route.originCoords[1], route.originCoords[0]));
            locationData.coords.push(SMap.Coords.fromWGS84(route.destinationCoords[1], route.destinationCoords[0]));
            new SMap.Route(locationData.coords, setRoute, {
                criterion: 'turist2',
                
            }
            );
            locationData.coords = [];
        }else {
            locationData.coords.push(SMap.Coords.fromWGS84(route.originCoords[1], route.originCoords[0]));
            locationData.coords.push(SMap.Coords.fromWGS84(route.destinationCoords[1], route.destinationCoords[0]));
            new SMap.Route(locationData.coords, setRoute, {
                criterion: 'turist1',
            });
            locationData.coords = [];
        }
        
    });
}


function displayRoute(coords){
    

    coords.segments.forEach((coord) => {
        setRoute(coord.path,coord.mode)
    })

}