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
      if (val.show.name){
        showTitle = val.show.name
      } else {
        console.log('null name')
        showTitle = ''
      }
      if (val.show.url){
        showURL = val.show.url
      } else {
        console.log('null url')
        showURL = '#'
      }
      if (val.show.status){
        showStatus = val.show.status
      } else {
        console.log('null status')
      }
      if (val.show.runtime){
        showScheduleDays = val.show.schedule.days
      } else {
        console.log('null schedule days')
      }
      if (val.show.runtime){
        showScheduleTime = val.show.schedule.time
      } else {
        console.log('null schedule time')
      }
      if (val.show.runtime){
        showRuntime = val.show.runtime
      } else {
        console.log('null runtime')
      }
      if (val.show.premiered){
        showPremiere = val.show.premiered
      } else {
        console.log('null premiere')
      }
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
      if (val.show.type){
        showType = val.show.type
      } else {
        console.log('null type')
      }
      if (val.show.showGenres){
        showType = val.show.showGenres
      } else {
        console.log('null genres')
      }
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
        console.log('null tvdb')
      }
      if (val.show.externals){
        if (val.show.externals.imdb){
          showImdb = val.show.externals.imdb
        }
      } else {
        console.log('null imdb')
      }
      if (val.show.updated){
        showUpdated = val.show.updated
      } else {
        console.log('null updated')
      }
      if (val.show.summary){
        showSummary = val.show.summary
      } else {
        console.log('null summary')
      }

      // vreate   notification div   and append to this element and then append this div to the
      $("#tvColumn").append('<article class="media"><figure class="media-left"><p class="image" style="height:258px;width:175px;"><img src="'+showImg+'" /></p></figure>')
      $("#tvColumn").append('<div class="media-content"><div class="content">')
      $("#tvColumn").append('<p><strong><a href="'+ showURL +'">'+ showTitle +'</a></strong></p>')
      $(".media").append('<div id="notification-result">')
      if (showStatus){
        $("#notification-result").append('<p>'+showStatus+'</p>')
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

