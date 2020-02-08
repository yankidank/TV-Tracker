var searchQuery
var showImg
var showImgMed
var showTitle
var showURL
var showStatus
var showScheduleDays
var showScheduleTime
var showRuntime
var showPremiere
var showRatingAvg
var showNetwork
var showType
var showGenres
var showTvrage
var showTvdb
var showImdb 
var showUpdated
var showSummary

function renderTV(searchQuery){
  var tvAPISearch = 'https://api.tvmaze.com/search/shows?q='+searchQuery
  $.getJSON(tvAPISearch, function(tv) {
    // Remove previous search results
    $("#tvColumn").empty()
    tv.forEach(function(val) {
      console.log(val)
      if (val.show.image){
        if (val.show.image.original){
          var showImg = val.show.image.original
        } else {
          var showImg = './assets/img/poster.png'
        }
        if (val.show.image.medium){
          var showImgMed = val.show.image.medium
        } else {
          var showImg = './assets/img/poster.png'
        }
      } else {
        console.log('null images')
        var showImg = './assets/img/poster.png'
      }
      showTitle = val.show.name
      showURL = val.show.url
      showStatus = val.show.status
      showScheduleDays = val.show.schedule.days
      showScheduleTime = val.show.schedule.time
      showRuntime = val.show.runtime
      showPremiere = val.show.premiered
      if (val.rating){
        if (val.rating.average){
          showRatingAvg = val.rating.average
        }
      } else {
        console.log('null rating')
      }
      if (val.show.network){
        if (val.show.network.name){
          showNetwork = val.show.network.name
        }
      } else {
        console.log('null network name')
      }
      showType = val.show.type
      showGenres = val.show.showGenres
      if (val.show.externals){
        if (val.show.externals.tvrage){
          showTvrage = val.show.externals.tvrage
        }
      } else {
        console.log('null tvRage')
      }
      if (val.show.externals){
        if (val.show.externals.thetvdb){
          showTvdb = val.show.externals.thetvdb
        }
      } else {
        console.log('null tvRage')
      }
      if (val.show.externals){
        if (val.show.externals.imdb){
          showImdb = val.show.externals.imdb
        }
      } else {
        console.log('null tvRage')
      }
      showUpdated = val.show.updated
      showSummary = val.show.summary

      $("#tvColumn").append('<article class="media"><figure class="media-left"><p class="image" style="height:258px;width:175px;"><img src="'+showImg+'" /></p></figure>')
      $("#tvColumn").append('<div class="media-content"><div class="content">')
      $("#tvColumn").append('<p><strong><a href="'+ showURL +'">'+ showTitle +'</a></strong></p>')
      if (showStatus){
        $("#tvColumn").append('<p>'+showStatus+'</p>')
      }
      if (showPremiere){
        $("#tvColumn").append('<p>'+showPremiere+'</p>')
      }
      if (showRatingAvg){
        $("#tvColumn").append('<p>'+showRatingAvg+'</p>')
      }
      if (showScheduleTime){
        $("#tvColumn").append('<p>'+showScheduleTime+'</p>')
      }
      if (showNetwork){
        $("#tvColumn").append('<p>'+showNetwork+'</p>')
      }
      if (showType){
        $("#tvColumn").append('<p>'+showType+'</p>')
      }
      $("#tvColumn").append('</div></div></article>')

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
  })
  // Detect click on submit button
  $("#searchSubmit").click(function(){
    searchQuery = $("#searchInput").val()
    renderTV(searchQuery)
  })
})

