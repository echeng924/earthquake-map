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

        });
        }
      )
      .catch(function(err) {
        console.log('Fetch error', err);
      })
}
