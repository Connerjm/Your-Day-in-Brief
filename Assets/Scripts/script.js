$(document).ready(function ()//Encouraged when using jQuery.
{
/* DOM Elements */

var timeElement = $(".time");
var dateElement = $(".date");

/* Variables */

const API_KEY = "cd39f68da5d87fa40deb5baf33377368";//Replace API key here if it expires.

var dateTime = luxon.DateTime.local();//Gets the luxon DateTime object.
var date = dateTime.toFormat("yyyy'-'LL'-'dd");//Custom formatting to put in the request url.

/* Primary Functions */

//Called when the application is opened.
function Initialize()
{
    //Sets the date and time elements in the header/hero.
    timeElement.text(dateTime.toLocaleString(luxon.DateTime.TIME_SIMPLE));
    dateElement.text(dateTime.toLocaleString(luxon.DateTime.DATE_HUGE));
}

/* Helper Functions */

//API calls for the given category.
//general, business, entertainment, health, science, sports, and technology.
function APICalls(category)
{
    var requesturl = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=en&sources=${category}&date=${date}`;//For now, using the category makes the api return an empty data array. idk why.
    $.ajax({
        url: requesturl,
        type: "GET",
        success: function(response)
        {
            //Do something with the response data.
            console.log(requesturl);
            console.log(response);
        },
        error: function(errorinfo)
        {
            alert("Whoopsies. Something went wrong.");
            console.log(errorinfo);
        }
    });
}

// fetch('http://api.mediastack.com/v1/news?language=en&access_key=de49fa1cabbba1c8b04d87008d800e06&countries=us&date=2021-02-04&&sources=sports')
// .then(response => response.json())
// .then(data =>
// {
//     console.log(data)

//     $("#sportNews").click(function ()
//     {
//         console.log("clicked");
//         $(".headline").html(data.data[0].description)
//         $(".publish-date").html((data.data[0].published_at).slice(0, 10));
//         $(".author").html(data.data[0].author)
//         $(".link").attr("href", "https://sports.yahoo.com/british-boxers-restart-olympic-preparations-124711072.html?src=rss")
//         $(".news-image").attr("src", "https://lh3.googleusercontent.com/proxy/UsLknsEkc-nha6DEV2jS39evfDxHU3FDFjgz6GO9teVykedivtplIkf5WCxTSvNWMYnjxARj26Y3gyEAk233-oAYlNkjvwWEuJeZIr3deWw5pv1-CuSo");
//     }
// });

/* Attaching Listeners */

$('#tabs li').on('click', function ()
{
    var tabs = $(this).data('tabs');
    $('#tabs li').removeClass('is-active');
    $(this).addClass('is-active');
});

/* Function Calls */

Initialize();

/* Testing */

APICalls("entertainment");

});