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
var storePackage
var hash
var fanartAPI = 'b6854576836477401d01b1807776a52c'
var fanartAPISearch
var bgImage
var storeFetch = []
storeFetch = localStorage.getItem('TVtracker')
storeFetch = JSON.parse(storeFetch)
if (!storeFetch || jQuery.isEmptyObject(storeFetch[0]) ){
  storeFetch = []
}
function addShow(array, transferID, transferTitle) {
  const { length } = array
  const found = array.some(el => el.id === transferID)
  if (!found) array.push({ id: transferID, title: transferTitle })
  return array
}
function removeShow(array, transferID) {
  return array
}
function decodeHtml(str){
  var txt = document.createElement("textarea")
  txt.innerHTML = str
  return txt.value
}



function clickSave(thisPass, id, name){
  $('#result-'+id+' div.show-star span.icon').toggleClass("icon-save")
  $('#result-'+id+' div.show-star span.icon').toggleClass("icon-remove")
  $("#tracking_side").append('<div class="side_show_list" data-side-id="side_'+id+'"><i class="icon icon-remove sidebar_show_remove"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+id+'">'+name+'</a></span></div>')
  $('[data-side-id="side_'+id+'"]').removeClass('remove_track')
  $('[data-side-id="side_'+id+'"]').fadeIn( "medium", function() {
    $('[data-side-id="side_'+id+'"]').addClass('new_track')
  })
  setTimeout(function(){
    $('[data-side-id="side_'+id+'"]').removeClass('new_track')
  }, 1000)
  // Check if the sidebar item already exists
  var found = {}
  $('[data-side-id]').each(function(){
    var $thisPass = $(thisPass)
    if(found[$thisPass.data('side-id')]){
      $thisPass.remove()
    }
    else{
      found[$thisPass.data('side-id')] = true;   
    }
  })
  var trimArray = storeFetch.filter(function(obj) {
    return obj.id !== id
  })
  storeFetch = addShow(trimArray, id, name) // Function to prevent duplicate entries
  localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
}
function clickRemove(thisPass, id){
  $('#result-'+id+' div.show-star span.icon').toggleClass("icon-save")
  $('#result-'+id+' div.show-star span.icon').toggleClass("icon-remove")
  $('[data-side-id="side_'+id+'"]').removeClass('new_track')
  $('[data-side-id="side_'+id+'"]').addClass('remove_track')
  setTimeout(function(){
  $('[data-side-id="side_'+id+'"]').fadeOut( "slow", function() {
    $('[data-side-id="side_'+id+'"]').remove()
  });
  }, 1000)
  var trimArray = storeFetch.filter(function(obj) {
  return obj.id !== id
  })
  storeFetch = removeShow(trimArray, id)
  localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
}
function renderSchedule(){
  var i
  for (i = 0; i < storeFetch.length; i++) {
    $("#tracking_side").append('<div class="side_show_list" id="side_track_'+storeFetch[i].id+'" data-side-id="side_'+storeFetch[i].id+'"><i class="icon icon-remove sidebar_show_remove" data-side-bookmark="side_bookmark_'+storeFetch[i].id+'"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+storeFetch[i].id+'">'+storeFetch[i].title+'</a></span></div>')
  }
  //console.log(storeFetch)
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
  $.ajax({
    type: 'GET',
    url: tvAPISearch,
    dataType: "json",
    success: function(tv) {
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
          $('#result-'+val.show.id).append('<div class="show-star show-remove" data-id="'+val.show.id+'" data-title="'+ showTitle +'"><span class="icon icon-remove"></span></div>')
        } else {
          $('#result-'+val.show.id).append('<div class="show-star show-add" data-id="'+val.show.id+'" data-title="'+ showTitle +'"><span class="icon icon-save"></span></div>')
        }
        $('#result-'+val.show.id+' div span.icon-remove').click(function(){
          clickRemove(this, val.show.id)
        })
        $('#result-'+val.show.id+' div span.icon-save').click(function(){
          clickSave(this, val.show.id, val.show.name)
        })
        $('#column-'+val.show.id).append('<div class="column" id="column-right-'+val.show.id+'">')
        
        var shortTSummary = decodeHtml(jQuery.trim(showSummary).substring(0, 200))
          if (showSummary.length > 200) {
            shortTSummary +=  "..."
          }
        if (showSummary){
          $("#column-right-"+val.show.id).append('<p>'+shortTSummary+'</p>')      
        }  
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
              // switch key if reached max
              key: 'AIzaSyBR9R0HWwxFiBHqI4lXjjDhajBe4Idl6wE',
              // key:'AIzaSyAUaopdafDf-02qXhvk-rnxyj8USkaZ5KY',
              q: searchQuery +' ('+showYear+')',
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
          $('#youtube_wrapper').show()
          $('#youtube_embed .card-image iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
          var shortYtitle = decodeHtml(jQuery.trim(data.items[0].snippet.title)+ "...").substring(0, 31).split(" ").slice(0, -1).join(" ")
          $('h2.youtube_title').text(shortYtitle)
          $('#youtube_description').text(data.items[0].snippet.description)
        }
        getVideo()
      })
    },error: function(e) {
      console.log(e)
    }
  })
}
function renderShow(showId){
  var tvAPISearch = 'https://api.tvmaze.com/shows/'+showId
  $.ajax({
    type: 'GET',
    url: tvAPISearch,
    dataType: "json",
    success: function(val) {
      // Remove previous search results
      $("#tvColumn").empty()
      //console.log(val)
      if (val.image){
        if (val.image.original){
          var showImg = val.image.original
        } else {
          var showImg = './assets/img/poster.png'
        }
        if (val.image.medium) {
          var showImgMed = val.image.medium
        } else {
          var showImgMed = './assets/img/poster.png'
        }
      } else {
        //console.log('null images')
        var showImg = './assets/img/poster.png'
        var showImgMed = './assets/img/poster.png'
      }
      if (val.name) {
        showTitle = val.name
      } else {
        //console.log('null name')
        showTitle = ''
      }
      if (val.url) {
        showURL = val.url
      } else {
        //console.log('null url')
        showURL = '#'
      }
      if (val.status) {
        showStatus = val.status
      } else {
        //console.log('null status')
      }
      if (val.runtime) {
        showScheduleDays = val.schedule.days
      } else {
        //console.log('null schedule days')
      }
      if (val.runtime) {
        showScheduleTime = val.schedule.time
      } else {
        //console.log('null schedule time')
      }
      if (val.runtime) {
        showRuntime = val.runtime
      } else {
        //console.log('null runtime')
      }
      if (val.premiered) {
        showPremiere = val.premiered
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
      if (val.network) {
        if (val.network.name) {
          showNetwork = val.network.name
        }
      } else {
        //console.log('null network name')
      }
      if (val.type) {
        showType = val.type
      } else {
        //console.log('null type')
      }
      if (val.showGenres) {
        showType = val.showGenres
      } else {
        //console.log('null genres')
      }
      if (val.externals) {
        if (val.externals.tvrage) {
          showTvrage = val.externals.tvrage
        }
      } else {
        //console.log('null tvRage')
      }
      if (val.externals) {
        if (val.externals.thetvdb) {
          showTvdb = val.externals.thetvdb
        }
      } else {
        //console.log('null tvdb')
      }
      if (val.externals) {
        if (val.externals.imdb) {
          showImdb = val.externals.imdb
        }
      } else {
        //console.log('null imdb')
      }
      if (val.updated) {
        showUpdated = val.updated
      } else {
        //console.log('null updated')
      }
      if (val.summary) {
        showSummary = val.summary
      } else {
        //console.log('null summary')
      }
      if (showPremiere){
        var showYear = showPremiere.slice(0, -6);
      }
      $("#tvColumn").append('<div class="notification tv-result" id="result-'+val.id+'">')
      $("#result-"+val.id).hide()
      $("#result-"+val.id).fadeIn(600, 'swing')
      $('#result-'+val.id).append('<div class="column poster"><img src="'+showImgMed+'" /></div>')
      $('#result-'+val.id).append('<div class="column details" id="column-'+val.id+'"><p class="is-size-4 show_title"><a target="_blank" href="'+ showURL +'">'+ showTitle +' ('+showYear+')</a></p>')
      if (storeFetch.find(obj => obj.id == val.id)){
        $('#result-'+val.id).append('<div class="show-star show-remove" data-id="'+val.id+'" data-title="'+ showTitle +'"><span class="icon icon-remove"></span></div>')
      } else {
        $('#result-'+val.id).append('<div class="show-star show-add" data-id="'+val.id+'" data-title="'+ showTitle +'"><span class="icon icon-save"></span></div>')
      }
      $('#result-'+val.id+' div span.icon-remove').click(function(){
        clickRemove(this, val.id)
      })
      $('#result-'+val.id+' div span.icon-save').click(function(){
        clickSave(this, val.id, val.name)
      })
      $('#column-'+val.id).append('<div class="column" id="column-right-'+val.id+'">')
      if (showStatus){
        $("#column-right-"+val.id).append('<li>'+showStatus+'</li>')
      }
      if (showRatingAvg){
        $("#column-right-"+val.id).append('<li>'+showRatingAvg+'</li>')
      }
      if (showScheduleTime){
        $("#column-right-"+val.id).append('<li>'+timeConvert(showScheduleTime)+'</li>')
      }
      if (showNetwork){
        $("#column-right-"+val.id).append('<li>'+showNetwork+'</li>')
      }
      $("#tvColumn").append('</div></div></div>')
      //omdb search for IMDB rating
      var IMDBID = val.externals.imdb
      omdbURL = 'https://www.omdbapi.com/?i='+IMDBID+'&apikey='+omdbAPI
      $.getJSON(omdbURL, function(omdbreturn) {
        if (omdbreturn.imdbRating){
          $("#column-right-"+val.id).append('<li>IMDB: '+omdbreturn.imdbRating+'</li>')
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
          //console.log(val.id)
          $("#result-"+val.id+" .tv-background").empty()
          $("#result-"+val.id).append('<img class="tv-background" id="background_image_'+val.id+'" src="'+bgImage+'" />')
        },
        error: function(e) {
          bgImage = showImg
          //console.log(e.responseJSON.status)
          //console.log(e.responseJSON['error message'])
          $("#result-"+val.id+" .tv-background").empty()
          $("#result-"+val.id).append('<img class="tv-background background-push" id="background_image_'+val.id+'" src="'+bgImage+'" />')
        }
      })
    },error: function(e) {
      console.log(e)
    }
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
          renderShow(newhash)
          $("html, body").animate({ scrollTop: 165 }, "slow")
        }
        oldhash = newhash
      }
    }, 25)
  })
})
