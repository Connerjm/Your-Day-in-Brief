$(document).ready(function ()//Encouraged when using jQuery.
{
    /* DOM Elements */

    /* Variables */

    var myNewsKey = " CzIM-gTtsxsW3J-21VNj8tbfTayZHee6Pzz2XmuSM_oqHx1L";

    var myNewsApiKey = "e18cb147025a40b0998d74f3b954fd4d";




    fetch('http://api.mediastack.com/v1/news?language=en&access_key=de49fa1cabbba1c8b04d87008d800e06&countries=us&date=2021-02-04&&sources=sports')
        .then(response => response.json())
        .then(data => {

            console.log(data)

            $("#sportNews").click(function () {
                console.log("clicked");
                $(".headline").html(data.data[0].description)
                $(".publish-date").html((data.data[0].published_at).slice(0, 10));
                $(".author").html(data.data[0].author)
                $(".link").attr("href", "https://sports.yahoo.com/british-boxers-restart-olympic-preparations-124711072.html?src=rss")
                $(".news-image").attr("src", "https://lh3.googleusercontent.com/proxy/UsLknsEkc-nha6DEV2jS39evfDxHU3FDFjgz6GO9teVykedivtplIkf5WCxTSvNWMYnjxARj26Y3gyEAk233-oAYlNkjvwWEuJeZIr3deWw5pv1-CuSo")


            })





        });




    //   & sources = cnn,bbc
    //   & categories = business,sports
    //   & countries = us,au
    //   & languages = en,-de
    //   & keywords = virus,-corona
    //   & date = 2020-02-19
    //   & sort = published_desc
    //   & offset = 0
    //   & limit = 100
    // de49fa1cabbba1c8b04d87008d800e06&countries=us



    /* Primary Functions */

    /* Helper Functions */

    /* Attaching Listeners */
    $(document).ready(function () {
        $('#tabs li').on('click', function () {
            var tabs = $(this).data('tabs');

            $('#tabs li').removeClass('is-active');
            $(this).addClass('is-active');
        });
    });
    /* Function Calls */

    /* Testing */

});               