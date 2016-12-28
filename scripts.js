console.log('connected');

function fetchData() {
  //fetch('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
  fetch('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson')
      .then(
        function(response) {
          if(response.status !== 200) {
            console.log('Problem with request ' + response.status);
            return;
          }
        response.json().then(function(data) {
          console.log(data);
          handleData(data);
        });
        }
      )
      .catch(function(err) {
        console.log('Fetch error', err);
      })
}

function handleData(data) {
  data.features.forEach((earthquake) => {
    let coordinates = earthquake.geometry.coordinates;
    let properties = earthquake.properties;
    let earthquakeCircle = new google.maps.Circle({
      strokeColor: properties.alert,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: properties.alert,
      fillOpacity: 0.35,
      map: map,
      center: {lat: coordinates[1], lng: coordinates[0]},
      radius: Math.pow(2, properties.mag) * 2000
    });

    let convertedDate = new Date( properties.time);
    let infoWindow = new google.maps.InfoWindow({
      content: `<div><b>Title:</b> ${properties.title}</div>`+
                `<div><b>Time:</b> ${convertedDate}</div>`+
                `<div><b>Magnitude:</b> ${properties.mag}</div>`+
                `<div><b>Tsunami:</b> ${properties.tsunami}</div>`,
      position: {lat: coordinates[1], lng: coordinates[0]},
    });

    earthquakeCircle.addListener('click', function() {
      infoWindow.open(map);
    })

  });
  console.log(map)
}

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    zoom: 3,
    center: {lat: 10, lng: 230},
    mapTypeId: 'terrain'
  });

  fetchData();
  let legend = document.getElementById('legend');
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}


