function clearListings() {
    while (movies.length !== 0) {
      movies.pop();
    }

  }

  let searchButton = $("button");

  searchButton.click(function() {
    event.preventDefault();
    let searchText = $('#search').val();
    console.log(searchText);
    getMovies(searchText);

  })

  function getMovies(searchText) {
    if (searchText.length === 0) {
      alert('Search for a movie fool!')
    } else {
      clearListings();
    }



    var $xhr = $.getJSON(`https://omdb-api.now.sh/?s=${searchText}`)

    $xhr.done(function(data) {
      let films = data["Search"]
      for (let i = 0; i < films.length; i++) {
        movies.push(films[i]);

      }
      renderMovies()

    })
  }



})();
