$(document).ready(function ()//Encouraged when using jQuery.
{
/* DOM Elements */

/* Variables */

/* Primary Functions */

/* Helper Functions */

/* Attaching Listeners */

/* Function Calls */


const API_KEY = "3776e9b2d753f50d011ad9eff0319013";
var date;


function general() {
    //calls for general *Default*
    var requesturl = 'http://api.mediastack.com/v1/news?languages=en&sources=general&access_key=cd39f68da5d87fa40deb5baf33377368&date=' + date;
    $.ajax({
        url: requesturl,
        type: "GET",
        success: function(response)
        {
            console.log('general data: ' + response);
        }
    });
}
general();

function business() {
    //calls for businesss
    var requesturl = `http://api.mediastack.com/v1/news?languages=en&sources=business&access_key=cd39f68da5d87fa40deb5baf33377368&date=` + date;
    $.ajax({
        url: requesturl,
        type: "GET",
        success: function(response)
        {
            console.log('business data: ' + response);
        }
    });
}
business();

function entertainment() {
    //calls for entertainment
    var requesturl = `http://api.mediastack.com/v1/news?languages=en&sources=entertainment&access_key=cd39f68da5d87fa40deb5baf33377368&date=` + date;
    $.ajax({
        url: requesturl,
        type: "GET",
        success: function(response)
        {
            console.log('entertainment data: ' + response);
        }
    });
}
entertainment();

function technology() {
    //calls for technology
    var requesturl = 'http://api.mediastack.com/v1/news?languages=en&sources=technology&access_key=cd39f68da5d87fa40deb5baf33377368&date=' + date;
    $.ajax({
        url: requesturl,
        type: "GET",
        success: function(response)
        {
            console.log('technology: ' + response);
        }
    });    
}
technology();

function science() {
    //calls for science
    var requesturl = 'http://api.mediastack.com/v1/news?languages=en&sources=science&access_key=cd39f68da5d87fa40deb5baf33377368&date=' + date;
    $.ajax({
        url: requesturl,
        type: "GET",
        success: function(response)
        {
            console.log('science: ' + response);
        }
    });    
}
science();


/* Testing */

});