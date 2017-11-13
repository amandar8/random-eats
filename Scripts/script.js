$(document).ready(function(){

  $('#button').click(function(){
    $('.loading-overlay').show();
    setTimeout(function() {$('.loading-overlay').hide()}, 5000);
  });

});

// var zomato = require ('zomato');
// var client = zomato.createClient({
//   userKey:'a86a2828ab83989f3ed612fe6d185c1d'
// });
//
// var $xhr = $.getJSON(`https://developers.zomato.com/api/v2.1/cities?q=austin?key=userKey`)
//
//
//
//
// function spinWheel(){
//
// }
//
// function getRestaurants(){
//
// }
