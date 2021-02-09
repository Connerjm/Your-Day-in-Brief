$(document).ready(function ()//Encouraged when using jQuery.
{
    /* DOM Elements */

    var timeElement = $(".time");
    var dateElement = $(".date");

    /* Variables */

    //Replace API keys here if one expires.
    const NEWS_API_KEY = "4b505f48bed1120432d9b47c6c779234";
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
            userInfoObj = JSON.parse(localStorage.getItem("userInfo"));
        else
            $("#modal").addClass("is-active");
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
                $(".headline").html(response.articles[0].content);
                $(".publish-date").html((response.articles[0].publishedAt).slice(0, 10));
                $(".link").attr("href", response.articles[0].url).html(response.articles[0].source.name);
                $(".news-image").attr("src", response.articles[0].image, "alt", "News Image");

            },
            error: function (errorinfo) {
                alert("Whoopsies. Something went wrong.");
                console.log(errorinfo);
            }
        });
    }

    function APIWeatherCalls() {
        //Shayla's addition starts 73//
        //variable zipcode is temp until modal functioning
        //when ready to use modal, be sure to change the var in the url
        var zipcode = "98312";
        //added property to get farenheit return
        var requesturl = `https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&units=imperial&appid=${WEATHER_API_KEY}`;
        $.ajax({
            url: requesturl,
            type: "GET",
            success: function (response) {
                //Do something with the response data.
                console.log(requesturl);
                console.log(response);

                // $(".day")  This may be redundant
                // $(".date") since displayed in heading

                $(".name").html(response.name);
                $(".temp").html(`Temperature: ${response.main.temp}\xB0F`);
                $(".humidity").html(`Humidity: ${response.main.humidity}%`);
                $(".description").html(response.weather[0].description);

                //Weather icon
                var icon = response.weather[0].icon;
                iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                $(".weather-icon").attr('src', iconUrl);

                //Dealing with lighphases to display cool effect
                //The background behind the icon will adjust according to time of day ie dawn, day, twilight, night
                var lightPhase = $("#lightphase");

                var timestamp = response.dt;
                var sunrise = response.sys.sunrise;
                var sunset = response.sys.sunset;
                console.log(timestamp);

                //30 minutes before sunrise
                var sunriseMinusThirty = response.sys.sunrise - 1800;
                //15 minutes before sunrise
                var sunriseMinusFifteen = response.sys.sunrise - 900;
                //15 minutes after sunset
                var sunsetPlusFifteen = response.sys.sunset + 900;
                //30 minutes after sunset
                var sunsetPlusThirty = response.sys.sunset + 1800;

                //conditionals to determine lightphase of the day
                //    this can be condensed,but I thought it would be
                //    easier for the team to see what's going on as is
                if (timestamp < sunriseMinusThirty) {
                    lightPhase.addClass("night");
                } else if (timestamp < sunriseMinusFifteen) {
                    lightPhase.addClass("nauticalTwilight");
                } else if (timestamp < sunrise) {
                    lightPhase.addClass("civilTwilight");
                } else if (timestamp < sunset) {
                    lightPhase.addClass("day");
                } else if (timestamp < sunsetPlusFifteen) {
                    lightPhase.addClass("civilTwilight");
                } else if (timestamp < sunsetPlusThirty) {
                    lightPhase.addClass("nauticalTwilight");
                } else {
                    lightPhase.addClass("night");
                }
            },
            error: function (errorinfo) {
                alert("Bad Weather Ahead");
                console.log(errorinfo);
            }
        })
    }
    ///shayla's addition ends 143

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
            userZipCode: z$("#zip-code").val()
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

    APIWeatherCalls();

});