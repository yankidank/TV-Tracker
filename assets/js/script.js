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
var hash
var fanartAPI = 'b6854576836477401d01b1807776a52c'
var fanartAPISearch
var bgImage
var storeFetch = localStorage.getItem('TVtracker')
storeFetch = JSON.parse(storeFetch)
if (!storeFetch || jQuery.isEmptyObject(storeFetch[0]) ){
  storeFetch = []
}
function add(array, transferID, transferTitle) {
  const { length } = array
  const found = array.some(el => el.id === transferTitle)
  if (!found) array.push({ id: transferID, title: transferTitle })
  return array
}
function decodeHtml(str){
  var txt = document.createElement("textarea")
  txt.innerHTML = str
  return txt.value
}
function renderSchedule(){
  var i
  for (i = 0; i < storeFetch.length; i++) {
    $("#tracking_side").append('<div class="side_show_list" id="side_track_'+storeFetch[i].id+'" data-side-id="side_'+storeFetch[i].id+'"><i class="icon icon-remove sidebar_show_remove" data-side-bookmark="side_bookmark_'+storeFetch[i].id+'"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+storeFetch[i].title+'">'+storeFetch[i].title+'</a></span></div>')
  }
  var found = {}
  $('[data-side-id]').each(function(){
    var $this = $(this)
    if(found[$this.data('side-id')]){
      $this.remove()
    }
    else{
      found[$this.data('side-id')] = true
    }
  })
}
function renderTV(searchQuery){
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
        if (val.show.image.medium) {
          var showImgMed = val.show.image.medium
        } else {
          var showImgMed = './assets/img/poster.png'
        }
      } else {
        //console.log('null images')
        var showImg = './assets/img/poster.png'
        var showImgMed = './assets/img/poster.png'
      }
      if (val.show.name) {
        showTitle = val.show.name
      } else {
        //console.log('null name')
        showTitle = ''
      }
      if (val.show.url) {
        showURL = val.show.url
      } else {
        //console.log('null url')
        showURL = '#'
      }
      if (val.show.status) {
        showStatus = val.show.status
      } else {
        //console.log('null status')
      }
      if (val.show.runtime) {
        showScheduleDays = val.show.schedule.days
      } else {
        //console.log('null schedule days')
      }
      if (val.show.runtime) {
        showScheduleTime = val.show.schedule.time
      } else {
        //console.log('null schedule time')
      }
      if (val.show.runtime) {
        showRuntime = val.show.runtime
      } else {
        //console.log('null runtime')
      }
      if (val.show.premiered) {
        showPremiere = val.show.premiered
      } else {
        //console.log('null premiere')
      }
      if (val.rating) {
        if (val.rating.average) {
          showRatingAvg = val.rating.average
        }
      } else {
        //console.log('null rating')
      }
      if (val.show.network) {
        if (val.show.network.name) {
          showNetwork = val.show.network.name
        }
      } else {
        //console.log('null network name')
      }
      if (val.show.type) {
        showType = val.show.type
      } else {
        //console.log('null type')
      }
      if (val.show.showGenres) {
        showType = val.show.showGenres
      } else {
        //console.log('null genres')
      }
      if (val.show.externals) {
        if (val.show.externals.tvrage) {
          showTvrage = val.show.externals.tvrage
        }
      } else {
        //console.log('null tvRage')
      }
      if (val.show.externals) {
        if (val.show.externals.thetvdb) {
          showTvdb = val.show.externals.thetvdb
        }
      } else {
        //console.log('null tvdb')
      }
      if (val.show.externals) {
        if (val.show.externals.imdb) {
          showImdb = val.show.externals.imdb
        }
      } else {
        //console.log('null imdb')
      }
      if (val.show.updated) {
        showUpdated = val.show.updated
      } else {
        //console.log('null updated')
      }
      if (val.show.summary) {
        showSummary = val.show.summary
      } else {
        //console.log('null summary')
      }
      if (showPremiere){
        var showYear = showPremiere.slice(0, -6);
      }
      $("#tvColumn").append('<div class="notification tv-result" id="result-'+val.show.id+'">')
      $("#result-"+val.show.id).hide()
      $("#result-"+val.show.id).fadeIn(600, 'swing')
      $('#result-'+val.show.id).append('<div class="column poster"><img src="'+showImgMed+'" /></div>')
      $('#result-'+val.show.id).append('<div class="column details" id="column-'+val.show.id+'"><p class="is-size-4 show_title"><a target="_blank" href="'+ showURL +'">'+ showTitle +' ('+showYear+')</a></p>')
      if (storeFetch.find(obj => obj.id == val.show.id)){
        $('#result-'+val.show.id).append('<div class="show-remove" data-id="'+val.show.id+'" data-title="'+ showTitle +'"><span class="icon icon-remove"></span></div>')
      } else {
        $('#result-'+val.show.id).append('<div class="show-add" data-id="'+val.show.id+'" data-title="'+ showTitle +'"><span class="icon icon-save"></span></div>')
      }
      $('#result-'+val.show.id+' div span.icon-remove').click(function(){
        storeID = $('#result-'+val.show.id+' .show-add').data("id")
        storeTitle = $('#result-'+val.show.id+' .show-add').data("title")
        $(this).toggleClass("icon-save")
        $(this).toggleClass("icon-remove")
        //$("#tracking_side").append('<div class="side_show_list" data-side-id="side_'+storeID+'"><i class="icon icon-remove sidebar_show_remove"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+storeTitle+'">'+storeTitle+'</a></span></div>')
        //$('[data-side-id="side_'+val.show.id+'"]').toggleClass('remove_track', 300).toggleClass('new_track', 300)
        $('[data-side-id="side_'+val.show.id+'"]').removeClass('new_track')
        $('[data-side-id="side_'+val.show.id+'"]').addClass('remove_track')
        setTimeout(function(){
          $('[data-side-id="side_'+val.show.id+'"]').fadeOut( "slow", function() {
            $('[data-side-id="side_'+val.show.id+'"]').remove()
          });
        }, 1000)
        //$('[data-side-id="side_'+val.show.id+'"]').toggle("highlight")
        var trimArray = storeFetch.filter(function(obj) {
          return obj.id !== val.show.id
        })
        storeFetch = add(trimArray, storeID, storeTitle) // Function to prevent duplicate entries
        localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
      })
      $('#result-'+val.show.id+' div span.icon-save').click(function(){
        storeID = $('#result-'+val.show.id+' .show-add').data("id")
        storeTitle = $('#result-'+val.show.id+' .show-add').data("title")
        $(this).toggleClass("icon-save")
        $(this).toggleClass("icon-remove")
        $("#tracking_side").append('<div class="side_show_list" data-side-id="side_'+storeID+'"><i class="icon icon-remove sidebar_show_remove"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+storeTitle+'">'+storeTitle+'</a></span></div>')
        //$('[data-side-id="side_'+val.show.id+'"]').toggleClass('new_track', 300).toggleClass('remove_track', 300)
        //$('[data-side-id="side_'+val.show.id+'"]').toggleClass('remove_track', 500).toggleClass('new_track', 500)
        $('[data-side-id="side_'+val.show.id+'"]').removeClass('remove_track')
        $('[data-side-id="side_'+val.show.id+'"]').fadeIn( "medium", function() {
          $('[data-side-id="side_'+val.show.id+'"]').addClass('new_track')
        })
        setTimeout(function(){
          $('[data-side-id="side_'+val.show.id+'"]').removeClass('new_track')
        }, 1000)
        //$('[data-side-id="side_'+val.show.id+'"]').toggle("highlight")
        // Check if the sidebar item already exists
        var found = {}
        $('[data-side-id]').each(function(){
          var $this = $(this)
          if(found[$this.data('side-id')]){
            $this.remove()
          }
          else{
            found[$this.data('side-id')] = true;   
          }
        })
        var trimArray = storeFetch.filter(function(obj) {
          return obj.id !== val.show.id
        })
        storeFetch = add(trimArray, storeID, storeTitle) // Function to prevent duplicate entries
        localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
      })
      $('#column-'+val.show.id).append('<div class="column" id="column-right-'+val.show.id+'">')
      if (showStatus){
        $("#column-right-"+val.show.id).append('<li>'+showStatus+'</li>')
      }
      if (showRatingAvg){
        $("#column-right-"+val.show.id).append('<li>'+showRatingAvg+'</li>')
      }
      if (showScheduleTime){
        $("#column-right-"+val.show.id).append('<li>'+timeConvert(showScheduleTime)+'</li>')
      }
      if (showNetwork){
        $("#column-right-"+val.show.id).append('<li>'+showNetwork+'</li>')
      }
      $("#tvColumn").append('</div></div></div>')
      //omdb search for IMDB rating
      var IMDBID = val.show.externals.imdb
      omdbURL = 'https://www.omdbapi.com/?i='+IMDBID+'&apikey='+omdbAPI
      $.getJSON(omdbURL, function(omdbreturn) {
        if (omdbreturn.imdbRating){
          $("#column-right-"+val.show.id).append('<li>IMDB: '+omdbreturn.imdbRating+'</li>')
        } else {
          //console.log('No imdb rating')
        }
      })
      fanartAPISearch = 'https://webservice.fanart.tv/v3/tv/'+showTvdb+'?api_key='+fanartAPI
      $.ajax({
        type: 'GET',
        url: fanartAPISearch,
        success: function(fanart) {
          //console.log(fanart)
          if (fanart.hdclearart && fanart.hdclearart[0].url){
            bgImage = fanart.hdclearart[0].url
          } else if (fanart.showbackground && fanart.showbackground[0].url){
            bgImage = fanart.showbackground[0].url
          } else if (fanart.tvposter && fanart.tvposter[0].url){
            bgImage = fanart.tvposter[0].url
          } else if (fanart.hdtvlogo && fanart.hdtvlogo[0].url){
            bgImage = fanart.hdtvlogo[0].url
          } else {
            bgImage = showImg
          }
          //console.log(bgImage)
          //console.log(val.show.id)
          $("#result-"+val.show.id+" .tv-background").empty()
          $("#result-"+val.show.id).append('<img class="tv-background" id="background_image_'+val.show.id+'" src="'+bgImage+'" />')
        },
        error: function(e) {
          bgImage = showImg
          //console.log(e.responseJSON.status)
          //console.log(e.responseJSON['error message'])
          $("#result-"+val.show.id+" .tv-background").empty()
          $("#result-"+val.show.id).append('<img class="tv-background background-push" id="background_image_'+val.show.id+'" src="'+bgImage+'" />')
        }
      })
      function getVideo() {
        $.ajax({
          type: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/search',
          data: {
            key:'AIzaSyBR9R0HWwxFiBHqI4lXjjDhajBe4Idl6wE',
            q: searchQuery+' ('+showYear+')',
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
          },
          success: function(data){
            embedVideo(data)
          },
        })
       }
      function embedVideo(data) {
        console.log(data.items)
        $('#youtube_wrapper').show()
        $('#youtube_embed .card-image iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
        var shortYtitle = decodeHtml(jQuery.trim(data.items[0].snippet.title)+ "...").substring(0, 31).split(" ").slice(0, -1).join(" ")
        $('h2.youtube_title').text(shortYtitle)
        $('#youtube_description').text(data.items[0].snippet.description)
      }
      getVideo()
    })
  })
}
function removeHash () { 
  history.pushState("", document.title, window.location.pathname + window.location.search);
}
function timeConvert(APItime){
  var string = APItime.slice(0, -3);
  if (string < 12){
    AMPM = ' AM'
  } else {
    AMPM = ' PM'
  }
  if (string > 12){
    itemTwelve = string - 12
  } else {
    itemTwelve = string
  }
  if (itemTwelve == 0){
    itemTwelve = 12
  }
  return itemTwelve + AMPM
}

$(document).ready(function(){
  removeHash()
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
  var oldhash = ''
  var newhash = ''
  $( "body" ).click(function() {
    setTimeout(function(){
      if(window.location.hash) {
        newhash = window.location.hash.substring(1)
        if (oldhash !== newhash){
          renderTV(newhash)
          $("html, body").animate({ scrollTop: 165 }, "slow")
        }
        oldhash = newhash
      }
    }, 25)
  })
})
