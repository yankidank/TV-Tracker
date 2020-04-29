var searchQuery
var showImg
var showImgMed
var showTitle
var showURL
var showStatus
var showScheduleDays
var showScheduleTime
var storeFetchIDarray = []
var combineSchedule = []
var scheduleIDarray = []
var scheduleMatchID = []
var scheduleIDfiltered
var combineScheduleParsed
var combineScheduleMatch = []
var dayTrack = 0
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
var showYear
var shortTSummary
var shortYtitle
var storeDatesArr
var tvAPISearch 
var IMDBID
var omdbAPI = '473a48b9'
var index = 0
var storePackage
var hash
var id
var fanartAPI = 'b6854576836477401d01b1807776a52c'
var fanartAPISearch
var bgImage
var arrayNew
var keycode
var txt
var found = {}
var trimArray
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
  arrayNew = array.filter(function(obj) {
    return obj.id != transferID
  })
  //Object.keys(array).forEach((key) => (array[key] == null) && delete array[key]) // Find and remove empty objects
  return arrayNew
}
function decodeHtml(str){
  txt = document.createElement("textarea")
  txt.innerHTML = str
  return txt.value
}
function clickSave(thisPass, id, name){
  $(".side_show_list_empty").remove()
  $("#tracking_side").append('<div class="side_show_list" id="side_track_'+id+'" data-side-id="side_'+id+'"><i class="icon icon-remove sidebar_show_remove" data-side-bookmark="side_bookmark_'+id+'"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+id+'">'+name+'</a></span></div>')
  $('[data-side-id="side_'+id+'"]').removeClass('remove_track')
  $('[data-side-id="side_'+id+'"]').fadeIn( "medium", function() {
    $('[data-side-id="side_'+id+'"]').addClass('new_track')
  })
  setTimeout(function(){
    $('[data-side-id="side_'+id+'"]').removeClass('new_track')
  }, 1000)
  // Check if the sidebar item already exists
  // Needs work. Prevents the save star icon toggle from results
  /* $('[data-side-id]').each(function(){
    var $thisPass = $(thisPass)
    //console.log($thisPass)
    if(found[$thisPass.data('side-id')]){
     $thisPass.remove()
    }
    else{
      found[$thisPass.data('side-id')] = true;   
    }
  }) */
  trimArray = storeFetch.filter(function(obj) {
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
  var trimArray = storeFetch.filter(function(obj) {
    return obj.id !== id
  })
  storeFetch = removeShow(trimArray, id)
  localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
  setTimeout(function(){
  $('[data-side-id="side_'+id+'"]').fadeOut( "slow", function() {
    $('[data-side-id="side_'+id+'"]').remove()
    if (storeFetch.length === 0){
      $("#tracking_side").append('<div class="side_show_list side_show_list_empty">You are not tracking any shows</div>')
    }
  })
  }, 1000)
}
function renderSchedule(){
  for (var i, i = 0; i < storeFetch.length; i++) {
    $("#tracking_side").append('<div class="side_show_list" id="side_track_'+storeFetch[i].id+'" data-side-id="side_'+storeFetch[i].id+'"><i class="icon icon-remove sidebar_show_remove" data-side-bookmark="side_bookmark_'+storeFetch[i].id+'"></i><span class="sidebar_show_span"><a class="sidebar_show_link" href="#'+storeFetch[i].id+'">'+storeFetch[i].title+'</a></span></div>')
  }
  if (storeFetch.length === 0){
    $("#tracking_side").append('<div class="side_show_list side_show_list_empty">You are not tracking any shows</div>')
  }
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
function setDates(){ // Retrieves the schedule for the upcoming week
  // YYYY-MM-DD formatted dates using moment.js
  var scheduleDate1 = new Date()
  scheduleDate1 = moment(scheduleDate1).format().substr(0, 10)
  var scheduleDate2 = moment(scheduleDate1).add(1, 'day').format().substr(0, 10)
  var scheduleDate3 = moment(scheduleDate1).add(2, 'day').format().substr(0, 10)
  var scheduleDate4 = moment(scheduleDate1).add(3, 'day').format().substr(0, 10)
  var scheduleDate5 = moment(scheduleDate1).add(4, 'day').format().substr(0, 10)
  var scheduleDate6 = moment(scheduleDate1).add(5, 'day').format().substr(0, 10)
  var scheduleDate7 = moment(scheduleDate1).add(6, 'day').format().substr(0, 10)
  var scheduleDatesArr = [
    scheduleDate1,
    scheduleDate2,
    scheduleDate3,
    scheduleDate4,
    scheduleDate5,
    scheduleDate6,
    scheduleDate7
  ]

  // Retrieve current localStorage keys
  const items = Object.keys(localStorage)
  var storedKeys = []
  for(let i = 0; i < items.length; i++){
    storedKeys.push(items[i].substr(7))
  }
  // Find keys that are out of date
  let storedRemove = scheduleDatesArr
    .filter(x => !storedKeys.includes(x))
    .concat(storedKeys.filter(x => !scheduleDatesArr.includes(x)));
  storedRemove = storedRemove.map(i => 'TV_Day_' + i);
  // Remove old data
  for(let i = 0; i < storedRemove.length; i++){
    localStorage.removeItem(storedRemove[i]);
  }
  
  for(let i = 0; i < scheduleDatesArr.length; i++){
    storeDatesArr = localStorage.getItem('TV_Day_'+scheduleDatesArr[i])
    storeDatesArr = JSON.parse(storeDatesArr)
    if (!storeDatesArr){
      // Get the schedule for each day
      $.ajax({
        type: 'GET',
        url: 'https://api.tvmaze.com/schedule?country=US&date='+scheduleDatesArr[i],
        dataType: "json",
        success: function(schedule) {
          // Add schedule to localStorage
          localStorage.setItem('TV_Day_'+scheduleDatesArr[i], JSON.stringify(schedule))
        },error: function(e) {
          console.log(e)
        }
      })
    }
    var tempCombine = localStorage.getItem('TV_Day_'+scheduleDatesArr[i])
    combineSchedule = combineSchedule.concat(tempCombine)
  }
}
Array.prototype.diff = function(arr2) {
  var ret = []
  for(var i in this) {   
    if(arr2.indexOf(this[i]) > -1){
      ret.push(this[i])
    }
  }
  return ret
}
function renderHome(){
  $("#tvColumn").empty()
  setDates() // Get the dates for the next week
  // Retrieve combined schedule info
  $.each(combineSchedule, function( index, value ) {
    dayTrack++
    // Convert value from string to object
    combineScheduleParsed = JSON.parse(value)
    // Check localStorage schedule for tracked show IDs
    for(let i = 0; i < combineScheduleParsed.length; i++){
      // Combine all schedule IDs in an array
      scheduleIDarray.push(combineScheduleParsed[i].show.id)
    }
    combineScheduleMatch.push(combineScheduleParsed)
  })
  // Filter out schedule duplicates from localStorage
  scheduleIDfiltered = scheduleIDarray.filter(function(item, pos){
    return scheduleIDarray.indexOf(item)== pos; 
  })
  // Get tracked IDs from storeFetch
  for(let i = 0; i < storeFetch.length; i++){
    storeFetchIDarray.push(storeFetch[i].id)
  }
  // Return the tracked shows airing this week
  combineScheduleMatch.forEach((day)=>{
    const endResult = day.filter((singleShow,dow)=>{
      return storeFetchIDarray.includes(singleShow.show.id)
    })
    endResult.forEach(function(scheduledItem, i){
      var scheduleEpName = scheduledItem.name
      var scheduleURL = scheduledItem.url
      var scheduleSeason = scheduledItem.season
      var scheduleEpNumber = scheduledItem.number
      var scheduleAirdate = scheduledItem.airdate
      var scheduleAirtime = scheduledItem.airtime
      var scheduleSummary = scheduledItem.summary
      if (scheduleSummary === null){
        scheduleSummary = 'Episode description not provided'
      }
      var scheduleShowID = scheduledItem.show.id
      var scheduleShowName = scheduledItem.show.name
      var scheduleShowURL = scheduledItem.show.url
      var scheduleShowNetwork = scheduledItem.show.network.name
      var scheduleShowImgMed = scheduledItem.show.image.medium
      var scheduleShowImgOrig = scheduledItem.show.image.original
      var showTvdb = scheduledItem.show.externals.thetvdb
      var dow = moment(scheduleAirdate).format('dddd')
      if($("#dow-" + dow).length == 0) {
        $('#tvColumn').append('<h2 id="dow-'+dow+'">'+dow+'</h2>')
      }
      $('#tvColumn').append('<div class="notification tv-result schedule-'+scheduleShowID+'" id="result-'+scheduleShowID+'"><div class="poster"><img src="'+scheduleShowImgMed+'" /></div><div class="details" id="column-'+scheduleShowID+'"><p class="is-size-4 show_title"><a target="_blank" href="'+ scheduleShowURL +'">'+ scheduleShowName +'</a></p><div class="summary" id="column-right-'+scheduleShowID+'"><p class="ep_title"><a href="'+scheduleURL+'" target="_blank">'+scheduleEpName+'</a></p><p style="font-style:italic;">Season '+scheduleSeason+', Episode '+scheduleEpNumber+'</p><p>'+scheduleSummary+'</p><div class="air_status">Airs '+moment(scheduleAirdate.slice(5)).format("MMM Do")+' at '+timeConvert(scheduleAirtime)+' on '+scheduleShowNetwork+'</div></div></div><div class="show-star show-remove" data-id="'+scheduleShowID+'" data-title="'+scheduleShowName+'"><span class="icon icon-remove"></span></div></div>')
      $('#result-'+scheduleShowID+' div span.icon-remove').click(function(){
        clickRemove(this, scheduleShowID)
        $('#result-'+scheduleShowID+' div.show-star span.icon').addClass("icon-save")
        $('#result-'+scheduleShowID+' div.show-star span.icon').removeClass("icon-remove")
      })
      $('#result-'+scheduleShowID+' div span.icon-save').click(function(){
        clickSave(this, scheduleShowID, scheduleShowName)
        $('#result-'+scheduleShowID+' div.show-star span.icon').removeClass("icon-save")
        $('#result-'+scheduleShowID+' div.show-star span.icon').addClass("icon-remove")
      })
      fanartAPISearch = 'https://webservice.fanart.tv/v3/tv/'+showTvdb+'?api_key='+fanartAPI
      $.ajax({
        type: 'GET',
        url: fanartAPISearch,
        success: function(fanart) {
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
          $(".schedule-"+scheduleShowID+" .tv-background").empty()
          $(".schedule-"+scheduleShowID).append('<img class="tv-background" id="background_image_'+scheduleShowID+'" src="'+bgImage+'" />')
        },
        error: function(e) {
          bgImage = scheduleShowImgOrig
          //console.log(e.responseJSON.status)
          //console.log(e.responseJSON['error message'])
          $(".schedule-"+scheduleShowID+" .tv-background").empty()
          $(".schedule-"+scheduleShowID).append('<img class="tv-background background-push" id="background_image_'+val.id+'" src="'+bgImage+'" />')
        }
      })
    })
  })
  if (storeFetch.length === 0){
    $('#tvColumn').append('<h2>This week\'s schedule</h2>')
    $('#tvColumn').append('<div class="notification tv-result">No tracked shows are airing this week</div>')
  }
}
function setTvmazeVariables(val){
  if (val.image){
    if (val.image.original){
      showImg = val.image.original
    } else {
      showImg = './assets/img/poster.png'
    }
    if (val.image.medium) {
      showImgMed = val.image.medium
    } else {
      showImgMed = './assets/img/poster.png'
    }
  } else {
    //console.log('null images')
    showImg = './assets/img/poster.png'
    showImgMed = './assets/img/poster.png'
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
    showYear = showPremiere.slice(0, -6);
  }
}
function showSearchTemplate(val){
  $("#tvColumn").append('<div class="notification tv-result" id="result-'+val.id+'">')
  $("#result-"+val.id).hide()
  $("#result-"+val.id).fadeIn(600, 'swing')
  $('#result-'+val.id).append('<div class="poster"><img src="'+showImgMed+'" /></div>')
  $('#result-'+val.id).append('<div class="details" id="column-'+val.id+'"><p class="is-size-4 show_title"><a target="_blank" href="'+ showURL +'">'+ showTitle +' ('+showYear+')</a></p>')
  if (storeFetch.find(obj => obj.id == val.id)){
    $('#result-'+val.id).append('<div class="show-star show-remove" data-id="'+val.id+'" data-title="'+ showTitle +'"><span class="icon icon-remove"></span></div>')
  } else {
    $('#result-'+val.id).append('<div class="show-star show-add" data-id="'+val.id+'" data-title="'+ showTitle +'"><span class="icon icon-save"></span></div>')
  }
  $('#result-'+val.id+' div span.icon-remove').click(function(){
    clickRemove(this, val.id)
    $('#result-'+val.id+' div.show-star span.icon').addClass("icon-save")
    $('#result-'+val.id+' div.show-star span.icon').removeClass("icon-remove")
  })
  $('#result-'+val.id+' div span.icon-save').click(function(){
    clickSave(this, val.id, val.name)
    $('#result-'+val.id+' div.show-star span.icon').removeClass("icon-save")
    $('#result-'+val.id+' div.show-star span.icon').addClass("icon-remove")
  })
  $('#column-'+val.id).append('<div class="summary" id="column-right-'+val.id+'">')
  shortTSummary = decodeHtml(jQuery.trim(showSummary).substring(0, 250))
  if (showSummary.length > 250) {
    shortTSummary +=  "..."
  }
  if (showSummary){
    $("#column-right-"+val.id).append('<p>'+shortTSummary+'</p>')      
  }
  if (showStatus){
    if (showStatus === 'Ended'){
      $("#column-right-"+val.id).append('<div class="air_status color_red">Series Ended</div> ')
    }
  }
  if (showScheduleTime && showScheduleDays && showNetwork && showStatus === 'Running'){
    $("#column-right-"+val.id).append('<div class="air_status"><span class="color_green">Series Airing</span> '+showScheduleDays+'s at '+timeConvert(showScheduleTime)+' on <strong>'+showNetwork+'</strong>')
  }
  $("#tvColumn").append('</div></div></div>')
  //omdb search for IMDB rating
  IMDBID = val.externals.imdb
  omdbURL = 'https://www.omdbapi.com/?i='+IMDBID+'&apikey='+omdbAPI
  $.getJSON(omdbURL, function(omdbreturn) {
    if (omdbreturn.imdbRating < 4.0){
      $("#column-right-"+val.id).append('<div class="imdb_score"><a href="https://www.imdb.com/title/'+IMDBID+'/" target="_blank">IMDB</a>: <span class="low_score">'+omdbreturn.imdbRating+'</span></div>')
    } else if (4.0 <= omdbreturn.imdbRating && omdbreturn.imdbRating < 7.0){
      $("#column-right-"+val.id).append('<div class="imdb_score"><a href="https://www.imdb.com/title/'+IMDBID+'/" target="_blank">IMDB</a>: <span class="medium_score">'+omdbreturn.imdbRating+'</span></div>')
    } else if (omdbreturn.imdbRating >= 7){
      $("#column-right-"+val.id).append('<div class="imdb_score"><a href="https://www.imdb.com/title/'+IMDBID+'/" target="_blank">IMDB</a>: <span class="high_score">'+omdbreturn.imdbRating+'<span></div>')        
    } else {
      //console.log('No imdb rating')
    }
  })
}
function showFanart(val){
  fanartAPISearch = 'https://webservice.fanart.tv/v3/tv/'+showTvdb+'?api_key='+fanartAPI
  $.ajax({
    type: 'GET',
    url: fanartAPISearch,
    success: function(fanart) {
      bgImage = ''
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
      $("#background_image_"+val.id).empty()
      $("#result-"+val.id).append('<img class="tv-background" id="background_image_'+val.id+'" src="'+bgImage+'" />')
    },
    error: function(e) {
      bgImage = showImg
      //console.log(e.responseJSON.status)
      //console.log(e.responseJSON['error message'])
      $("#background_image_"+val.id).empty()
      $("#result-"+val.id).append('<img class="tv-background background-push" id="background_image_'+val.id+'" src="'+bgImage+'" />')
    }
  })
}
function renderTV(searchQuery){
  function getVideo() {
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        // switch key if reached max
        //key: 'AIzaSyBouMGeEVyYqBK-kOdxqvpFtRqAmefjXXo',
        key:'AIzaSyBR9R0HWwxFiBHqI4lXjjDhajBe4Idl6wE',
        q: searchQuery +' tv trailer',
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
    shortYtitle = decodeHtml(jQuery.trim(data.items[0].snippet.title)+ "...").substring(0, 31).split(" ").slice(0, -1).join(" ")
    $('h2.youtube_title').text(shortYtitle)
    $('#youtube_description').text(data.items[0].snippet.description)
  }
  getVideo()
  tvAPISearch = 'https://api.tvmaze.com/search/shows?q='+searchQuery
  $.ajax({
    type: 'GET',
    url: tvAPISearch,
    dataType: "json",
    success: function(tv) {
      // Remove previous search results
      $("#tvColumn").empty()
      tv.forEach(function(val) {
        setTvmazeVariables(val.show)
        showSearchTemplate(val.show)
        showFanart(val.show)
      })
    },error: function(e) {
      console.log(e)
    }
  })
}
function renderShow(showId){
  tvAPISearch = 'https://api.tvmaze.com/shows/'+showId
  $.ajax({
    type: 'GET',
    url: tvAPISearch,
    dataType: "json",
    success: function(val) {
      // Remove previous search results
      $("#tvColumn").empty()
      setTvmazeVariables(val)
      showSearchTemplate(val)
      showFanart(val)
    },error: function(e) {
      console.log(e)
    }
  })
}
function removeHash () { 
  history.pushState("", document.title, window.location.pathname + window.location.search);
}
function timeConvert(APItime){
  var minute = APItime.slice(3, 5)
  var string = APItime.slice(0, -3)
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
  if (minute != '00'){
    return itemTwelve + ':' + minute + AMPM
  } else {
    return itemTwelve + AMPM
  }
}
$(document).ready(function(){
  removeHash()
  renderSchedule() // Display tracked show data
  // Detect enter key press
  $('#searchInput').keypress(function(event){
    keycode = (event.keyCode ? event.keyCode : event.which)
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
  // Detect hover and click on tracked sidebar
  $('.side_show_list .icon').click(function() {
    id = $(this).attr('data-side-bookmark').slice(14)
    $('#result-'+id+' div.show-star span.icon').toggleClass("icon-save")
    $('#result-'+id+' div.show-star span.icon').toggleClass("icon-remove")
    $('.icon[data-side-bookmark=' + $(this).attr('data-side-bookmark') + ']').toggleClass("icon-remove")
    $('.icon[data-side-bookmark=' + $(this).attr('data-side-bookmark') + ']').toggleClass("icon-save")
    $('[data-side-id="side_'+id+'"]').removeClass('new_track')
    $('[data-side-id="side_'+id+'"]').addClass('remove_track')
    trimArray = storeFetch.filter(function(obj) {
      return obj.id !== id
    })
    storeFetch = removeShow(trimArray, id)
    localStorage.setItem('TVtracker', JSON.stringify(storeFetch))
    setTimeout(function(){
      $('[data-side-id="side_'+id+'"]').fadeOut( "slow", function() {
        $('[data-side-id="side_'+id+'"]').remove()
        if (storeFetch.length === 0){
          $("#tracking_side").append('<div class="side_show_list side_show_list_empty">You are not tracking any shows</div>')
        }
      })
    }, 1000)
  })
  var oldhash = ''
  var newhash = ''
  $( "body" ).click(function() {
    setTimeout(function(){
      if(window.location.hash) {
        newhash = window.location.hash.substring(1)
        if (oldhash !== newhash){
          renderShow(newhash)
          $("html, body").animate({ scrollTop: 200 }, "slow")
        }
        oldhash = newhash
      }
    }, 25)
  })
  renderHome()
})