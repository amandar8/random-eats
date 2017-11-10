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
