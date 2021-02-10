$(document).ready(function ()//Encouraged when using jQuery.
{
    /* DOM Elements */

    var timeElement = $(".time");
    var dateElement = $(".date");

    /* Variables */

    //Replace API keys here if one expires.
    const NEWS_API_KEY = "b8e833a770cf7d2a96c213916cac289d";
    const WEATHER_API_KEY = "e3171896dd984662b81687f80e4b2acd";

    var dateTime = luxon.DateTime.local();//Gets the luxon DateTime object.

    var userInfoObj;//Object holding the users name and zip code.

    /* Primary Functions */

    //Called when the application is opened.
    function Initialize() {
        //Sets the date and time elements in the header/hero.
        timeElement.text(dateTime.toLocaleString(luxon.DateTime.TIME_SIMPLE));
        dateElement.text(dateTime.toLocaleString(luxon.DateTime.DATE_HUGE));

        //Sets elements to the default news API call.
        APINewsCalls("breaking-news");

        //Prompts user for info if first time, otherwise grab from storage.
        if (localStorage.getItem("userInfo"))
        {
            userInfoObj = JSON.parse(localStorage.getItem("userInfo"));
        }
        else
        {
            $("#modal").addClass("is-active");
        }
    }

    /* Helper Functions */

    //API calls for the given category.
    //general, business, entertainment, health, science, sports, and technology.
    function APINewsCalls(category) {
        var requesturl = `https://gnews.io/api/v4/top-headlines?token=${NEWS_API_KEY}&lang=en&topic=${category}`;

        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Do something with the response data.
                console.log(requesturl);
                console.log(response);

                //Responses called when category tabs are clicked
                $(".headline").text("\"" + response.articles[0].title + ".\"");
                $(".publish-date").text("Published " + (response.articles[0].publishedAt).slice(0, 10));
                $(".link").attr("href", response.articles[0].url).html(response.articles[0].source.name);
                $(".news-image").attr("src", response.articles[0].image, "alt", "News Image");

            },
            error: function (errorinfo) {
                alert("Whoopsies. Something went wrong.");
                console.log(errorinfo);
            }
        });
    }

    function APITodayWeatherCalls(userInfoObj) {
        var zipcode = 98312;
        
        var requesturl = `https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&units=imperial&appid=${WEATHER_API_KEY}`;
        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Do something with the response data.
                console.log(requesturl);
                console.log(response);

                $("#today-name").html(response.name);
                $("#today-high").html(`High: ${response.main.temp_max}\xB0F`)
                $("#today-low").html(`Low: ${response.main.temp_min}\xB0F`);
                $("#today-humidity").html(`Humidity: ${response.main.humidity}%`);
                $("#today-description").html(response.weather[0].description);

                //Weather icon
                var icon = response.weather[0].icon;
                iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                $("#today-weather-icon").attr('src', iconUrl);

                //Start light phase feature
                var lightPhase = $("#light-phase");
                var tempTimestamp = response.dt;
                var tempSunrise = response.sys.sunrise;
                var tempSunset = response.sys.sunset;

                //Convert global unix timestamps to local time: 8 hrs * 60 min * 60 sec * 1000 ms
                var timestamp = $($(tempTimestamp - 8 * 60 * 60 * 1000));
                timestamp = timestamp[0];
                
                var sunrise = $($(tempSunrise - 8 * 60 * 60 * 1000));
                sunrise = sunrise[0];
            
                var sunset = $($(tempSunset - 8 * 60 * 60 * 1000));
                sunset = sunset[0];
                
                //30 minutes before sunrise
                var sunriseMinusThirty = $($(sunrise - 30 * 60 * 1000));
                sunriseMinusThirty = sunriseMinusThirty[0];
                //15 minutes before sunrise
                var sunriseMinusFifteen = $($(sunrise - 15 * 60 * 1000));
                sunriseMinusFifteen = sunriseMinusFifteen[0];
                //15 minutes after sunset
                var sunsetPlusFifteen = $($(sunset + 15 * 60 * 1000));
                sunsetPlusFifteen = sunsetPlusFifteen[0];
                //30 minutes after sunset
                var sunsetPlusThirty = $($(sunset + 30 * 60 * 1000));
                sunsetPlusThirty = sunsetPlusThirty[0];

                //Conditionals to determine light phase of the day
                if (timestamp < sunriseMinusThirty) {
                    lightPhase.addClass("night");
                } else if (timestamp < sunriseMinusFifteen) {
                    lightPhase.addClass("nautical-twilight");
                } else if (timestamp < sunrise) {
                    lightPhase.addClass("civil-twilight");
                } else if (timestamp < sunset) {
                    lightPhase.addClass("day");
                } else if (timestamp < sunsetPlusFifteen) {
                    lightPhase.addClass("civil-twilight");
                } else if (timestamp < sunsetPlusThirty) {
                    lightPhase.addClass("nautical-twilight");
                } else {
                    lightPhase.addClass("night");
                }
            },
            //End light phase feature

            error: function (errorinfo) {
                alert("Bad Weather Ahead");
                console.log(errorinfo);
            }
        })
    }

    function APITomorrowWeatherCalls() {
        var zipcode = 98312;
        var requesturl = `https://api.openweathermap.org/data/2.5/forecast?q=${zipcode}&units=imperial&appid=${WEATHER_API_KEY}`;
        
        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Do something with the response data.
                console.log(requesturl);
                console.log(response);

                $("#tomorrow-high").html(`High: ${response.list[2].main.temp_max}\xB0F`);
                $("#tomorrow-low").html(`Low: ${response.list[2].main.temp_min}\xB0F`);
                $("#tomorrow-humidity").html(`Humidity: ${response.list[2].main.humidity}%`);
                $("#tomorrow-description").html(response.list[2].weather[0].description);

                //Weather icon
                var icon = response.list[2].weather[0].icon;
                iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                $("#tomorrow-weather-icon").attr('src', iconUrl);
            },
            error: function (errorinfo) {
                alert("Bad Weather Ahead");
                console.log(errorinfo);
            }
        })
    }

    /* Attaching Listeners */

    //Cancel button in modal.
    $("#cancel, .modal-background").on("click", function () {
        $("#modal").removeClass("is-active");
    });

    //Submit button in modal.
    $("#submit").on("click", function () {
        $("#modal").removeClass("is-active");
        userInfoObj = {
            userName: $("#name").val(),
            userZipCode: $("#zip-code").val()
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfoObj));
    });

    //Tabs with the news categories.
    $('#tabs li').on('click', function () {
        APINewsCalls($(this).data('tab'));

        $('#tabs li').removeClass('is-active');
        $(this).addClass('is-active');
    });

    /* Function Calls */

    //Get the ball rolling.
    Initialize();

    /* Testing */

    APITodayWeatherCalls();
    APITomorrowWeatherCalls()

});