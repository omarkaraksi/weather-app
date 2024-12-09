var locationInput = document.querySelector('#location-input')

var locationDiv = document.querySelector('#location-name')
var search = document.querySelector('#search')
var currentTemp = document.querySelector('#current-temp')
var currentIcon = document.querySelector('#current-icon')
var currentDay = document.querySelector('#current-day')
var currentDate = document.querySelector('#current-date')
var currentCondition = document.querySelector('#current-condition')

var nextDay = document.querySelector('#next-day')
var afterTomorrow = document.querySelector('#after-tomorrow')

var nextDayIcon = document.querySelector('#next-day-icon')
var afterTomorrowIcon = document.querySelector('#after-tomorrow-icon')

var nextDayTemp = document.querySelector('#next-day-temp')
var nextDayCondition = document.querySelector('#next-day-condition')

var afterTomorrowTemp = document.querySelector('#after-tomorrow-temp')
var afterTomorrowCondition = document.querySelector('#after-tomorrow-condition')
var afterTomorrowIcon = document.querySelector('#after-tomorrow-icon')
console.log(locationDiv)
async function getWeather(location='cairo'){ 
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`)
    let data = await response.json()
    return data
}
function getDay(inputDate) {
    const date = new Date(inputDate); // Specify a date
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayIndex = date.getDay();

    // Get the day name
    const dayName = dayNames[dayIndex];

    return dayName;
}
async function displayWeather(location='cairo'){




    let data = await getWeather(location)

    locationDiv.textContent = data.location.name
    currentTemp.textContent = data.current.temp_c+`°C`
    currentIcon.innerHTML = `<img src="${data.current.condition.icon}" alt="">`
    currentDay.textContent = getDay(data.forecast.forecastday[0].date) 
    currentDate.textContent = data.forecast.forecastday[0].date
    currentCondition.textContent = data.current.condition.text
    nextDay.textContent = getDay(data.forecast.forecastday[1].date)
    afterTomorrow.textContent = getDay(data.forecast.forecastday[2].date)
    nextDayIcon.innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="">`
    afterTomorrowIcon.innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">`
    nextDayTemp.innerHTML = '<h3>'+data.forecast.forecastday[1].day.maxtemp_c+' °C</h3>    '+ data.forecast.forecastday[1].day.condition.text
    // nextDayCondition.innerHTML = ' '+ data.forecast.forecastday[1].day.condition.text
    
    afterTomorrowTemp.innerHTML = '<h3>'+data.forecast.forecastday[2].day.maxtemp_c+' °C</h3>    '+ data.forecast.forecastday[2].day.condition.text
    // afterTomorrowCondition.innerHTML = data.forecast.forecastday[2].day.condition.text
    afterTomorrowIcon.innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">`

}


document.querySelector('#location-input').addEventListener('input',function(){

    displayWeather(locationInput.value)
})

document.querySelector('#search').addEventListener('click',function(){

    displayWeather(locationInput.value)
})
displayWeather()