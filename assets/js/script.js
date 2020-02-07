var searchQuery

function renderTV(searchQuery){
  var tvAPISearch = 'https://api.tvmaze.com/search/shows?q='+searchQuery
  $.getJSON(tvAPISearch, function(tv) {
    // Remove previous search results
    $("#tvColumn").empty()
    console.log(tv)
    tv.forEach(function(val) {
      /*
      val.show.id
      val.show.type
      val.show.genres [array]
      val.show.status
      val.show.runtime
      val.show.premiered
      val.show.schedule.days [array]
      val.show.schedule.time
      val.show.network.name
      val.show.rating.average
      val.show.externals.tvrage
      val.show.externals.thetvdb
      val.show.externals.imdb
      val.show.image.medium
      val.show.image.original
      val.show.summary (includes html markup)
      val.show.updated (unix timestamp?)
      */
      $("#tvColumn").append('<article class="media"><figure class="media-left"><p class="image is-64x64">');
      $("#tvColumn").append('<img src="'+val.show.image.medium+'">')
      $("#tvColumn").append('</p></figure><div class="media-content"><div class="content"><p><strong>')
      $("#tvColumn").append('<a href="'+val.show.url+'">'+val.show.name+'</a>')
      $("#tvColumn").append('</strong></p></div></div></article>')
    })
  })
}
$(document).ready(function(){
  // Detect enter key press
  $('#searchInput').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      searchQuery = $("#searchInput").val()
      renderTV(searchQuery)	
    }
  });
  // Detect click on submit button
  $("#searchSubmit").click(function(){
    searchQuery = $("#searchInput").val()
    console.log(searchQuery)
    renderTV(searchQuery)
  })
})

