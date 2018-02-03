
$("#customForm").submit(function(e) {
  e.preventDefault();

  const searchTerm = this.wikiSearch.value;

  if(searchTerm !== ''){
    $(".result-item").remove();

    $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: { action: 'query', list: 'search', srsearch: searchTerm, format: 'json' },
      dataType: 'jsonp',
      success: displayResults
    });
  }
});

function displayResults(data) {
  const searchResults = data.query.search;

  for(let i = 0; i < searchResults.length; i++) {
    const itemTitle = searchResults[i].title;
    const itemLink = `https://en.wikipedia.org/?curid=${searchResults[i].pageid}`;
    const itemSnippet = searchResults[i].snippet;

    $(`<a href="${itemLink}" target="_blank"><div id="${i}" class="result-item"></div></a>`).appendTo("#results");
    $(`<h1>${itemTitle}</h1>`).appendTo(`#${i}`);
    $(`<p>"... ${itemSnippet} ..."</p>`).appendTo(`#${i}`);
  }

  $("#customForm").addClass("small");
  $(".flex-container").css("height", "auto");
}

$("#searchIcon").on("click", () => $("#wikiSearch").toggleClass("active"));
