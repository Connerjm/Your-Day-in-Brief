$(document).ready(function ()//Encouraged when using jQuery.
{
    /* DOM Elements */

    var timeElement = $(".time");
    var dateElement = $(".date");

    /* Variables */

    //Replace API keys here if one expires.
    const NEWS_API_KEY = "21e73771a7cf8bf8e377a0872d5c69a4";
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
        if (localStorage.getItem("userInfo")) {
            userInfoObj = JSON.parse(localStorage.getItem("userInfo"));
            $("#greeting").text(userInfoObj.userName);
        }
        else {
            $("#modal").addClass("is-active");
        }

        //Calls for the weather.
        APITodayWeatherCalls();
        APITomorrowWeatherCalls();
    }

    /* Helper Functions */

    //API calls for the given category.
    //Breaking News (default), US News, World News, Business, Sports, Science, Entertainment, and Health.
    function APINewsCalls(category) {
        var requesturl = `https://gnews.io/api/v4/top-headlines?token=${NEWS_API_KEY}&lang=en&topic=${category}`;

        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Responses called when category tabs are clicked
                $(".headline").text("\"" + response.articles[0].title + ".\"");
                $(".publish-date").text("Published " + (response.articles[0].publishedAt).slice(0, 10));
                $(".link").attr("href", response.articles[0].url).html(response.articles[0].source.name);
                $(".news-image").attr("src", response.articles[0].image, "alt", "News Image");


                $(".headline1").text("\"" + response.articles[1].title + ".\"");
                $(".publish-date1").text("Published " + (response.articles[1].publishedAt).slice(0, 10));
                $(".link1").attr("href", response.articles[1].url).html(response.articles[1].source.name);
                $(".news-image1").attr("src", response.articles[1].image, "alt", "News Image");


                $(".headline2").text("\"" + response.articles[2].title + ".\"");
                $(".publish-date2").text("Published " + (response.articles[2].publishedAt).slice(0, 10));
                $(".link2").attr("href", response.articles[2].url).html(response.articles[2].source.name);
                $(".news-image2").attr("src", response.articles[2].image, "alt", "News Image");

            },
            error: function (errorinfo) {
                alert("Whoopsies. Something went wrong.");
                console.log(errorinfo);
            }
        });
    }

    function APITodayWeatherCalls() {
        var zipcode = userInfoObj.userZipCode;
        var requesturl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${WEATHER_API_KEY}`;
        
        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Do something with the response data.
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
        var zipcode = userInfoObj.userZipCode;
        var requesturl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&units=imperial&appid=${WEATHER_API_KEY}`;

        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Do something with the response data.
                $("#tomorrow-high").html(`High: ${response.list[2].main.temp_max}\xB0F`);
                $("#tomorrow-low").html(`Low: ${response.list[2].main.temp_min}\xB0F`);
                $("#tomorrow-humidity").html(`Humidity: ${response.list[2].main.humidity}%`);
                $("#tomorrow-description").html(response.list[2].weather[0].description);


                $("#day1-high").html(`High: ${response.list[11].main.temp_max}\xB0F`);
                $("#day1-low").html(`Low: ${response.list[11].main.temp_min}\xB0F`);
                $("#day1-humidity").html(`Humidity: ${response.list[11].main.humidity}%`);
                $("#day1-description").html(response.list[11].weather[0].description);
                $("#day1-date").html((response.list[11].dt_txt).slice(0, 10));
                var icon = response.list[11].weather[0].icon;
                iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                $("#day1-weather-icon").attr('src', iconUrl);


                $("#day2-high").html(`High: ${response.list[18].main.temp_max}\xB0F`);
                $("#day2-low").html(`Low: ${response.list[18].main.temp_min}\xB0F`);
                $("#day2-humidity").html(`Humidity: ${response.list[18].main.humidity}%`);
                $("#day2-description").html(response.list[18].weather[0].description);
                $("#day2-date").html((response.list[18].dt_txt).slice(0, 10));
                var icon = response.list[18].weather[0].icon;
                iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                $("#day2-weather-icon").attr('src', iconUrl);


                $("#day3-high").html(`High: ${response.list[26].main.temp_max}\xB0F`);
                $("#day3-low").html(`Low: ${response.list[26].main.temp_min}\xB0F`);
                $("#day3-humidity").html(`Humidity: ${response.list[26].main.humidity}%`);
                $("#day3-description").html(response.list[26].weather[0].description);
                $("#day3-date").html((response.list[26].dt_txt).slice(0, 10));
                var icon = response.list[26].weather[0].icon;
                iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                $("#day3-weather-icon").attr('src', iconUrl);

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
        $("#greeting").text("Person");
        userInfoObj = {
            userName: "Person",
            userZipCode: "98103"
        }
        APITodayWeatherCalls();
        APITomorrowWeatherCalls();
    });

    //Submit button in modal.
    $("#submit").on("click", function () {
        $("#modal").removeClass("is-active");
        userInfoObj = {
            userName: $("#name").val(),
            userZipCode: $("#zip-code").val()
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfoObj));
        $("#greeting").text(userInfoObj.userName);
        APITodayWeatherCalls();
        APITomorrowWeatherCalls();
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

});