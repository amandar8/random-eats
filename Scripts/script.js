(function() {

  function configureMap(currentLocation) {
    map = new google.maps.Map(document.getElementById('foodMap'), {
      center: currentLocation,
      zoom: 15,
      styles: [{
        stylers: [{
          visibility: 'simplified',
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
  }
  ///////////////////////////////////////

  function initMap() {
    let currentLocation = {
      lat: 30.272,
      lng: -97.760
    }
    configureMap(currentLocation);
    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      marker.setVisible(true);

      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-id'].textContent = place.place_id;
      infowindowContent.children['place-address'].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
  }
  ////////////////////////////////////////

  let locationButton = document.getElementById('current-location');
  locationButton.addEventListener('click', function() {
    getUserLocation();
  });

  var myMarkers = [];

  function performSearch(searchTerm) {
    console.log(searchTerm);
    var request = {
      bounds: map.getBounds(),
      keyword: searchTerm
    };
    service.radarSearch(request, setMarkers);
  }


  function setMarkers(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      console.error(status);
      return;
    }
    for (var i = 0, result; result = results[i]; i++) {

      //results.length.Random....
      addMarker(result);

      console.log(result);
      console.log(results);
    }
  }


  function addMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon: {
        url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(10, 15)
      }

    });
      myMarkers.push(marker);


      function removeMarkers(){
          for(i=0; i<myMarkers.length; i++){
              myMmarkers[i].setMap(null);
          }
      }


    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        infoWindow.setContent(result.name + '<div><strong>' +
          result.formatted_address + '</div>' + result.website + '</div>' + result.phone_number);
        infoWindow.open(map, marker);
      });
    });

  }

  function configureSubmitEventListener() {
    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null);
      }
    }
    let foodForm = $("#foodForm");
    foodForm.submit(function(event) {
      event.preventDefault();
      removeMarkers();
      let foodSelectElement = $('#foodType option:selected');
      performSearch(foodSelectElement.text());
    });
  }

  function getUserLocation() {
    let userLocation;
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      configureMap(currentLocation);
    });
  }



  initMap();
  configureSubmitEventListener();
  getUserLocation();
})();
