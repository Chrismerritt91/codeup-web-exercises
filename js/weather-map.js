$(function () {

    $.get("http://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: 30.097162,
        lon: -95.616055,
        units: "imperial"
    }).done(cardCreate)


// function for cards
    function cardCreate(data) {
        // console.log('The entire response:', data);
        $("#card-list").html("");
        data.daily.forEach(function (element, index) {
            if (index < 5) {

                //displays date in spot on card
                const date = new Date(element.dt * 1000).toDateString()


                //displays the temperature
                const tempMin = element.temp.min;
                const tempMax = element.temp.max;
                const dailyTemp = parseInt(tempMin) + '' + '°f / ' + '' + parseInt(tempMax) + '°f';


                //display description
                const weatherCondition = element.weather[0].description;
                // $(".card-descript").html("Description: " + weatherCondition);

                //display humidity
                const humidity = element.humidity;
                // $(".card-humidity").html("Humidity: " + humidity);

                //display wind speed
                const wind = element.wind_speed;
                // $(".card-wind").html("Wind speed: " + wind);

                //display pressure
                const pressure = element.pressure;
                // $(".card-pressure").html("Pressure: " + pressure);


                const dailyIcon = element.weather[0].icon;
                const iconLink = "http://openweathermap.org/img/wn/" + dailyIcon + "@2x.png";

                $("#card-list").append(
                    `<div class="card col-8 col-sm-4 col-lg-2 justify-content-around">
                    <div class="card-individual d-flex flex-column p-0 h-100">
                    <p class="card-date text-center  my-0"> ${date} </p>
                    <p class="card-temp text-center my-1 p-0"> ${dailyTemp} </p>
                    <img class="weather-icon align-self-center" src=" ${iconLink} " alt="weather-icon">
                    <p class="card-descript mb-1 ms-1"> Description: ${weatherCondition} </p>
                    <p class="card-humidity my-1 ms-1"> Humidity: ${humidity} </p>
                    <hr class="m-0">
                    <p class="card-wind my-1 ms-1"> Wind: ${wind} </p>
                    <hr class="m-0">
                    <p class="card-pressure my-1 ms-1"> Pressure: ${pressure} </p> 
                    </div></div>`);

            }
        });

    }

    //street view map
    mapboxgl.accessToken = MAPBOX_API_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-95.616055, 30.097162], // starting position [lng, lat]
        zoom: 11 // starting zoom
    });

    // starting marker for Tomball, tx
    const Marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([-95.616055, 30.097162])
        .addTo(map);

    // Makes marker draggable and updates info
    //cited https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/
    function onDragEnd() {
        const lngLat = Marker.getLngLat();
        const long = `${lngLat.lng}`;
        const lat = `${lngLat.lat}`;

        reverseGeocode({lng: long, lat: lat}, MAPBOX_API_TOKEN).then(function(city){
            $("#current-city").text(city)
        });

        $.get("http://api.openweathermap.org/data/2.5/onecall", {
            APPID: OPEN_WEATHER_APPID,
            lat: lat,
            lon: long,
            units: "imperial"

        }).done(cardCreate);
    }

    Marker.on('dragend', onDragEnd);

    // click to get location
    function add_marker(event) {
        const coordinates = event.lngLat;
        console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
        Marker.setLngLat(coordinates).addTo(map);

        reverseGeocode({lng: coordinates.lng, lat: coordinates.lat}, MAPBOX_API_TOKEN).then(function (city) {
            $("#current-city").text(city)
        });


        $.get("http://api.openweathermap.org/data/2.5/onecall", {
            APPID: OPEN_WEATHER_APPID,
            lat: coordinates.lat,
            lon: coordinates.lng,
            units: "imperial"
        }).done(cardCreate);
    }

    map.on('click', add_marker);


// use search bar to find location
    $(".search-button").click(function (e) {
        e.preventDefault()
        Marker.remove()
        const searchInput = $("#location-input").val()
        if (searchInput !== '') {
            geocode(searchInput, MAPBOX_API_TOKEN).then(function (result) {
                map.setCenter(result);
                map.setZoom(12);

                const Marker = new mapboxgl.Marker({
                    draggable: true
                })
                    .setLngLat(result)
                    .addTo(map);

                reverseGeocode({lng: result[0], lat: result[1]}, MAPBOX_API_TOKEN).then(function (city) {
                    $("#current-city").text(city)
                });


                $.get("http://api.openweathermap.org/data/2.5/onecall", {
                    APPID: OPEN_WEATHER_APPID,
                    lat: result[1],
                    lon: result[0],
                    units: "imperial"
                }).done(cardCreate);


            });

        }
    });

//add wind direction to cards and see if you can find a compass to interpret data and display an arrow
    // function windCardinalDirection(degrees){
    //     let cardinalDirection = '';
    //     if ((degrees > 348.75 && degrees <= 360) || (degrees >=0 && degrees <= 11.25)){
    //         cardinalDirection = "N";
    //     } else if (degrees > 11.25 && degrees  <= 33.75) {
    //         cardinalDirection = "NNE";
    //     } else if (degrees > 33.75 && degrees <= 56.25) {
    //         cardinalDirection = "NE";
    //     } else if (degrees > 56.25 && degrees <= 78.75) {
    //         cardinalDirection = "ENE";
    //     } else if (degrees > 78.75 && degrees <= 101.25) {
    //         cardinalDirection = "E";
    //     } else if (degrees > 101.25 && degrees <= 123.75) {
    //         cardinalDirection = "ESE";
    //     } else if (degrees > 123.75 && degrees <= 146.25) {
    //         cardinalDirection = "SE";
    //     } else if (degrees > 146.25 && degrees <= 168.75) {
    //         cardinalDirection = "SSE";
    //     } else if (degrees > 168.75 && degrees <= 191.25) {
    //         cardinalDirection = "S";
    //     } else  if (degrees > 191.25 && degrees <= 213.75) {
    //         cardinalDirection = "SSW";
    //     } else if (degrees > 213.75 && degrees <= 236.25)  {
    //         cardinalDirection = "SW";
    //     } else if (degrees > 236.25 && degrees <= 258.75) {
    //         cardinalDirection = "WSW";
    //     } else if (degrees > 258.75 && degrees <= 281.25) {
    //         cardinalDirection = "W";
    //     } else if (degrees > 281.25 && degrees <= 303.75) {
    //         cardinalDirection = "WNW";
    //     } else if (degrees > 303.75 && degrees <= 326.25) {
    //         cardinalDirection = "NW";
    //     } else if (degrees > 326.75 && degrees <= 348.75) {
    //         cardinalDirection = "NNW";
    //     }
    //     return cardinalDirection;
    // }
});
