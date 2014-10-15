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
      if(hourArry[i].time === time) {
        console.log(hourArry[i].apparentTemperature)
      }
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
        }
      });
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
  var apiKey = '6e17054274f48bf8a4b5c9c384c9f717';
  var url = 'https://api.forecast.io/forecast/';
  var lati;
  var longi;
  var data;
  var city;
  var values;
  var weekArry;
  var hourArry;
  var today;
  var time;
  var currently;
  var startTime;



  $( '.tempbutton' ).click(function() {
  var b = $(this).val();
  today = weekArry[b];
  $('#tempReading').html( "day " + b);
  console.log(today);
    // $('#slide-down section').hide();
});