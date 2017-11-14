(function() {


  function initMap() {
    let currentLocation;
    navigator.geolocation.getCurrentPosition(function(position) {
      if (position) {
        currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      } else {
        // Default to somewhere in Austin.
        currentLocation = {
          lat: -33.867,
          lng: 151.206
        }
      }
      configureMap(currentLocation);
    });

    function configureMap(currentLocation) {
      map = new google.maps.Map(document.getElementById('foodMap'), {
        center: currentLocation,
        zoom: 15,
        styles: [{
          stylers: [{
            visibility: 'simplified'
          }]
        }, {
          elementType: 'labels',
          stylers: [{
            visibility: 'off'
          }]
        }]
      });

      infoWindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);

      // The idle event is a debounced event, so we can query & listen without
      // throwing too many requests at the server.
      // map.addListener('idle', performSearch);
    }

  }

  function performSearch(searchTerm) {
    console.log(searchTerm);
    var request = {
      bounds: map.getBounds(),
      keyword: searchTerm
    };
    service.radarSearch(request, callback);
  }

  function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }
    for (var i = 0, result; result = results[i]; i++) {
      //results.length.Random....
      addMarker(result);
    }
  }

  function addMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: {
        url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(10, 17)
      }
    });

    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        infoWindow.setContent(result.name);
        infoWindow.open(map, marker);
      });
    });
  }

  function configureSubmitEventListener() {
    let foodForm = $("#foodForm");
    foodForm.submit(function(event) {
      event.preventDefault();
      let foodSelectElement = $('#foodType option:selected');
      let option_user_selection = foodSelectElement.text()
      performSearch(option_user_selection);
    });

  }

  initMap();
  configureSubmitEventListener();
})();
