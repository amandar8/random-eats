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

    let input = document.getElementById('pac-input');
    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    let infowindow = new google.maps.InfoWindow();
    let infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    let marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      let place = autocomplete.getPlace();
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
  ///////////////////////////////////////

  function initMap() {
    let currentLocation = {
      lat: 30.272,
      lng: -97.760
    }
    configureMap(currentLocation);


  }
  ////////////////////////////////////////

  // let locationButton = document.getElementById('current-location');
  // locationButton.addEventListener('click', function() {
  //   getUserLocation();
  // });



  let myMarkers = [];
  //////////////////////////////////////////////
  function performSearch(searchTerm) {
    console.log(searchTerm);
    let request = {
      bounds: map.getBounds(),
      keyword: searchTerm
    };
    service.radarSearch(request, setMarkers);
  }

  function setMarkers(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {

      console.error(status);
      return;
    }
    for (let i = 0, result; result = results[i]; i++) {

      //results.length.Random....
      addMarker(result);


    }
  }
  ///////////////////////////////////////
  function randomSearch(searchTerm) {
    console.log(searchTerm);
    let request = {
      bounds: map.getBounds(),
      keyword: searchTerm
    };
    service.radarSearch(request, randomSetMarkers);
  }

  function randomSetMarkers(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {

      console.error(status);
      return;
    }
      let randomItem = results[Math.floor(Math.random()*results.length)];
      addMarker(randomItem);


  }
  /////////////////////////////////////////////////////

  function addMarker(place) {
    let marker = new google.maps.Marker({
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


    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null);
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

  function configureRestaurantButton() {
    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null);
      }
    }
    let foodButton = document.getElementById('food-button');
    foodButton.addEventListener('click', function() {
      removeMarkers();
      let foodSelectElement = $('#foodType option:selected');
      performSearch(foodSelectElement.text());
    });
  }


  function configureRandomRestaurant() {
    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null);
      }
    }
    let randomButton = document.getElementById('random-button');
    randomButton.addEventListener('click', function() {
      removeMarkers();
      let foodSelectElement = $('#foodType option:selected');
      randomSearch(foodSelectElement.text());
    });
  }


  // function configureSubmitEventListener() {
  //     function removeMarkers() {
  //       for (i = 0; i < myMarkers.length; i++) {
  //         myMarkers[i].setMap(null);
  //       }
  //     }
  //     let foodForm = $("#foodForm");
  //     let randomForm = $("#random-button");
  //     foodForm.submit(function(event) {
  //       console.log("this is working!!!!!")
  //       event.preventDefault();
  //       removeMarkers();
  //       let foodSelectElement = $('#foodType option:selected');
  //       performSearch(foodSelectElement.text());
  //     });
  //     randomForm.submit(function(event) {
  //       console.log("this is my call")
  //       event.preventDefault();
  //       removeMarkers();
  //       let foodSelectElement = $('#foodType option:selected');
  //       performSearch(foodSelectElement.text());
  //     });
  //   }
  //



  // function getUserLocation() {
  //   let userLocation;
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     userLocation = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     configureMap(userLocation);
  //   });
  //
  // }



  initMap();
  // configureSubmitEventListener();
  configureRestaurantButton();
  configureRandomRestaurant();
  // getUserLocation();
})();

// google.maps.event.addDomListener(window, 'load', initialize);
