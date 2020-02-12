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
var omdbAPI = '473a48b9'
var index = 0
var storeID
var storeTitle
var storePackage

function renderSchedule(){
  storeFetch = localStorage.getItem('TVtracker')
  storeFetch = JSON.parse(storeFetch)
  if (!storeFetch){
    storeFetch = []
  }
  var i;
  for (i = 0; i < storeFetch.length; i++) {
    $("#tracking_side").append('<div class="side_show_list" data-id="side_'+storeFetch[i].id+'"><i class="icon icon-remove sidebar_show_remove"></i><span class="sidebar_show_span">'+storeFetch[i].title+'</span></div>')
  }
}

function renderTV(searchQuery){
  storeFetch = localStorage.getItem('TVtracker')
  storeFetch = JSON.parse(storeFetch)
  if (!storeFetch){
    storeFetch = []
  }
  var tvAPISearch = 'https://api.tvmaze.com/search/shows?q='+searchQuery
  $.getJSON(tvAPISearch, function(tv) {
    // Remove previous search results
    $("#tvColumn").empty()
    tv.forEach(function(val) {
      //console.log(index)
      //console.log(val)
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
        //console.log('null images')
        var showImg = './assets/img/poster.png'
      }
      if (val.show.name){
        showTitle = val.show.name
      } else {
        //console.log('null name')
        showTitle = ''
      }
      if (val.show.url){
        showURL = val.show.url
      } else {
        //console.log('null url')
        showURL = '#'
      }
      if (val.show.status){
        showStatus = val.show.status
      } else {
        //console.log('null status')
      }
      if (val.show.runtime){
        showScheduleDays = val.show.schedule.days
      } else {
        //console.log('null schedule days')
      }
      if (val.show.runtime){
        showScheduleTime = val.show.schedule.time
      } else {
        //console.log('null schedule time')
      }
      if (val.show.runtime){
        showRuntime = val.show.runtime
      } else {
        //console.log('null runtime')
      }
      if (val.show.premiered){
        showPremiere = val.show.premiered
      } else {
        //console.log('null premiere')
      }
      if (val.rating){
        if (val.rating.average){
          showRatingAvg = val.rating.average
        }
      } else {
        //console.log('null rating')
      }
      if (val.show.network){
        if (val.show.network.name){
          showNetwork = val.show.network.name
        }
      } else {
        //console.log('null network name')
      }
      if (val.show.type){
        showType = val.show.type
      } else {
        //console.log('null type')
      }
      if (val.show.showGenres){
        showType = val.show.showGenres
      } else {
        //console.log('null genres')
      }
      if (val.show.externals){
        if (val.show.externals.tvrage){
          showTvrage = val.show.externals.tvrage
        }
      } else {
        //console.log('null tvRage')
      }
      if (val.show.externals){
        if (val.show.externals.thetvdb){
          showTvdb = val.show.externals.thetvdb
        }
      } else {
        //console.log('null tvdb')
      }
      if (val.show.externals){
        if (val.show.externals.imdb){
          showImdb = val.show.externals.imdb
        }
      } else {
        //console.log('null imdb')
      }
      if (val.show.updated){
        showUpdated = val.show.updated
      } else {
        //console.log('null updated')
      }
      if (val.show.summary){
        showSummary = val.show.summary
      } else {
        //console.log('null summary')
      }
      $("#tvColumn").append('<div class="notification tv-result" id="result-'+val.show.id+'">')
      $('#result-'+val.show.id).append('<div class="column poster"><img src="'+showImg+'" /></div>')
      $('#result-'+val.show.id).append('<div class="column details" id="column-'+val.show.id+'"><p class="is-size-4"><a href="'+ showURL +'">'+ showTitle +'</a></p>')
      // ToDO: Check save status. If already tracking change the icon and function
      $('#result-'+val.show.id).append('<div class="show-add" data-id="'+val.show.id+'" data-title="'+ showTitle +'"><span class="icon icon-save"></span></div>')
      $('#result-'+val.show.id+' .show-add').click(function(){
        storeID = $('#result-'+val.show.id+' .show-add').data("id")
        storeTitle = $('#result-'+val.show.id+' .show-add').data("title")       
        $("#tracking_side").append('<div class="side_show_list" data-id="side_'+storeID+'"><i class="icon icon-remove sidebar_show_remove"></i><span class="sidebar_show_span">'+storeTitle+'</span></div>')
        storePackage = { id: storeID, title: storeTitle}
        storeFetch.push(storePackage)
        localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
        console.log(storeFetch) // localStorage Array w/ Objects
        //console.log(storePackage) // New item as Object
      })
      $('#column-'+val.show.id).append('<div class="column" id="column-right-'+val.show.id+'">')
      if (showStatus){
        $("#column-right-"+val.show.id).append('<li>'+showStatus+'</li>')
      }
      if (showPremiere){
        $("#column-right-"+val.show.id).append('<li>'+showPremiere+'</li>')
      }
      if (showRatingAvg){
        $("#column-right-"+val.show.id).append('<li>'+showRatingAvg+'</li>')
      }
      if (showScheduleTime){
        $("#column-right-"+val.show.id).append('<li>'+showScheduleTime+'</li>')
      }
      if (showNetwork){
        $("#column-right-"+val.show.id).append('<li>'+showNetwork+'</li>')
      }
      if (showType){
        $("#column-right-"+val.show.id).append('<li>'+showType+'</li>')
      }
      $("#tvColumn").append('</div></div></div>')
      omdb_imdb = $("<div>").addClass("omdbapi_imdb")
      omdbURL = 'https://www.omdbapi.com/?t='+showTitle+'&apikey='+omdbAPI
      $.getJSON(omdbURL, function(omdbreturn) {
        if (omdbreturn.imdbRating){
          omdb_imdb.html('<li>IMDB: '+omdbreturn.imdbRating+'</li>')
          //console.log(omdbreturn.imdbRating)
        } else {
          //console.log('No imdb rating')
        }
        //console.log(omdb_imdb)
        $("#column-right-"+val.show.id).after(omdb_imdb)
      })
    })
  })
}
$(document).ready(function(){
  renderSchedule() // Display tracked show data
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
