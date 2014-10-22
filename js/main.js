jQuery(document).ready(function($) {



// Get users IP address

    $.get("http://ipinfo.io", function(response) {
      city = response.city;
      lati = response.loc.split(",")[0];
      longi = response.loc.split(",")[1];
      setStartTime();
      getWeather();
      }, "jsonp");

// Pull in the weather API
  function getWeather() {
    $.getJSON(url + apiKey + "/" + lati + "," + longi + "," + startTime + "?callback=?", function(data) {
      weekArry = data.daily.data;
      hourArry = data.hourly.data;
        console.log('success!');
        today = weekArry[0];

      setTime();
      setStartTime();
      setSlider();
      setDaylight();

// Break out the hourly times

    for (i = 0; i < hourArry.length; i++) { 
        console.log(hourArry[i].time)
    }

      });
    }


// Slider functionality + setting values based on time of day
function setSlider() {
  $( "#slider" ).slider({
    range: "min",
    value: time,
    min: today.time,
    max: today.time + 86400,
    slide: function( event, ui ) {
      $( "#amount" ).val( ui.value );
      time = $( "#slider" ).slider( "value" );
      setDaylight();
      returnWeatherFor();
        }
      });
      //change time value displayed
      $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
}

});


// Change background color based on the time of day
function setDaylight() {

  if(time > (today.sunriseTime + 11000) && time < (today.sunsetTime - 11000)) {
      $( "html" ).removeClass().addClass( "skyDay" );
  } else if(time < today.sunsetTime && time >= (today.sunsetTime - 11000) ) {
      $( "html" ).removeClass().addClass( "skyDawn" );
  } else if(time >= today.sunriseTime && time <= (today.sunriseTime + 11000) ){
      $( "html" ).removeClass().addClass( "skyMorning" );
  } else {
      $( "html" ).removeClass().addClass( "skyNight" );
  }
  }


// set time of day for current conditions
function setTime() {
  var d = new Date();
  time = d.getTime() / 1000;
}


// apply a time setting to the weather API in order to get hourly data. 
// Math takes the current time and subtracts time to equal midnight of the current day.
function setStartTime() {
  var d = new Date();
  var t = d.getTime() / 1000;
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  startTime = Math.round(t - ((h * 3600) + (m * 60) + (s)));
}




//defining variables
  var apiKey = '6e17054274f48bf8a4b5c9c384c9f717',
      url = 'https://api.forecast.io/forecast/',
      lati,
      longi,
      data,
      city,
      values,
      weekArry,
      hourArry,
      today,
      time,
      startTime,
      currentHour;



  $( '.tempbutton' ).click(function() {
  var b = $(this).val();
  today = weekArry[b];
  $('#tempReading').html( "day " + b);
    // $('#slide-down section').hide();
});


function returnWeatherFor() {
  $.each(hourArry, function(key, value){
    if(value.time > $( "#amount" ).val()){ 
        console.log(value.time);
        currentHour = key - 1;
        console.log('time:', currentHour);
        return false;
      }
  });
}

