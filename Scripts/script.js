(function() {

  function initMap() {
    let currentLocation = {
      lat: 30.272,
      lng: -97.760
    }
    configureMap(currentLocation);


  }
  /////////////////////////////////////////


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
        [{
            "elementType": "geometry",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#8ec3b9"
            }]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1a3646"
            }]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#4b6878"
            }]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#64779e"
            }]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#4b6878"
            }]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#334e87"
            }]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
              "color": "#023e58"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
              "color": "#283d6a"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#6f9ba5"
            }]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#023e58"
            }]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#3C7680"
            }]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
              "color": "#304a7d"
            }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#98a5be"
            }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
              "color": "#2c6675"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#255763"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#b0d5ce"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#023e58"
            }]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#98a5be"
            }]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "color": "#1d2c4d"
            }]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#283d6a"
            }]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
              "color": "#3a4762"
            }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
              "color": "#0e1626"
            }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#4e6d70"
            }]
          }
        ]
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
      map: map,

    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }


      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);


      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
  }
  ///////////////////////////////////////


  let myMarkers = [];

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
      window.alert("Please choose another item or new location!");
      console.error(status);
      return;
    }
    for (let i = 0, result; result = results[i]; i++) {
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
      window.alert("Please choose another item or new location!");
      console.error(status);
      return;
    }
    let randomItem = results[Math.floor(Math.random() * results.length)];
    addMarker(randomItem);


  }
  /////////////////////////////////////////////////////

  function addMarker(place) {
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon: {
        url: 'https://image.flaticon.com/icons/svg/37/37481.svg',
        anchor: new google.maps.Point(30, 30),
        scaledSize: new google.maps.Size(25, 30)
      }

    });
    myMarkers.push(marker);


    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        infoWindow.setContent(result.name + '<div><strong>' +
          result.formatted_address + '</div>' + result.website + '</div>' + " " + result.formatted_phone_number + '</div>');
        infoWindow.open(map, marker);
      });
    });
  }

  function configureRestaurantOpenNow() {
    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null)
      }
    }
    let openNowButton = document.getElementById('open-button');
    openNowButton.addEventListener('click', function() {
      removeMarkers();
      performSearch("Restaurants open in");
    });
  }

  function configureRestaurantButton() {
    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null)
      }
    }
    let foodButton = document.getElementById('food-button');
    foodButton.addEventListener('click', function() {
      removeMarkers();
      let foodSelectElement = $('#foodType option:selected');
      performSearch(foodSelectElement.text()+ " " + "in");
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
      randomSearch(foodSelectElement.text()+ " " + "in");
    });
  }

  function configureMealTime() {
    function removeMarkers() {
      for (i = 0; i < myMarkers.length; i++) {
        myMarkers[i].setMap(null);
      }
    }
    let mealButton = document.getElementById('rating-button');
    mealButton.addEventListener('click', function() {
      removeMarkers();
      let ratingSelectElement = $('#starType option:selected');
      performSearch(ratingSelectElement.text() + " " + "in");
    });
  }


  // $('#img').show(); //<----here
  //   $.ajax({
  //     ....
  //    success:function(result){
  //        $('#img').hide();







  initMap();
  configureRestaurantButton();
  configureRandomRestaurant();
  configureMealTime();
  configureRestaurantOpenNow();
})();
