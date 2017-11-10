var zomato = require ('zomato');
var client = zomato.createClient({
  userKey:'a86a2828ab83989f3ed612fe6d185c1d'
});

client.getCategories(null, function(err, result){
  if(!err){
    console.log(result);
  }else {
    console.log(err);
  }
});
curl -X GET --header "Accept: application/json" --header "user-key: a86a2828ab83989f3ed612fe6d185c1d" "https://developers.zomato.com/api/v2.1/cities?q=austin"
