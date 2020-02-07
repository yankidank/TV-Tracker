var searchQuery

$(document).ready(function(){
  $("#searchSubmit").click(function(){
    searchQuery = $("#searchInput").val()
    console.log(searchQuery)

    var tvAPISearch = 'https://api.tvmaze.com/search/shows?q='+searchQuery
  
    $.getJSON(tvAPISearch, {
      
    }).done(function(tvAPIReturn) {
      console.log(tvAPIReturn)
    })
    
  })
})
