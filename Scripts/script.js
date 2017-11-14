// let resButton = $("button")
//
//   resButton.click(function(){
//     $('.loading-overlay').show();
//     setTimeout(function() {$('.loading-overlay').hide()}, 5000);
//   });


const restaurants = [];


let searchButton = $("button");

searchButton.click(function() {
  event.preventDefault();
  let searchText = $('#city').val();
  console.log(searchText);
  getMovies(searchText);

});

function getRestaurants(searchText) {
  if (searchText.length === 0) {
    alert('Search for a City')
  } else {
    clearListings();
  }

var $xhr = $.getJSON(`https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+${searchText}&key=AIzaSyAb3b9RbnL7iVzNS_FncN7jLyRvxbop7yA`)

  $xhr.done(function(data) {
    let food = data["Search"]
    for (let i = 0; i < films.length; i++) {
      restaurants.push(food[i]);

    }
    console.log($xhr);

  });
}




// $.ajax({
//   dataType: "json",
//   url: 'https://cors-anywhere.herokuapp.com/developers.zomato.com/api/v2.1/cities?q=Austin'
// ,
//   data: 'Austin',
//   success: function(){
//     console.log('success')
//   },
//   headers:
//   {user_key:'a86a2828ab83989f3ed612fe6d185c1d'}
// });
