

parsed_json.forecast.simpleforecast


var forecastArry = parsed_json.forecast.simpleforecast.forecastday; 

for (i = 0; i < forecastArry.length; i++) { 
    console.log('conditions: ', forecastArry[i].conditions);
}


var display = {
	'clear': ''
}

// console.log('conditions: ', forecastArry[i].conditions);