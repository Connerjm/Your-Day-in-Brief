$(document).ready(function ()//Encouraged when using jQuery.
{
/* DOM Elements */

var timeElement = $(".time");
var dateElement = $(".date");

/* Variables */

var dateTime = luxon.DateTime.local();//Gets the luxon DateTime object.
var date = dateTime.toFormat("yyyy'-'LL'-'dd");//Custom formatting to put in the request url.

/* Primary Functions */

function initialize()
{
    timeElement.text(dateTime.toLocaleString(luxon.DateTime.TIME_SIMPLE));
    dateElement.text(dateTime.toLocaleString(luxon.DateTime.DATE_HUGE));
}

/* Helper Functions */

/* Attaching Listeners */

/* Function Calls */

initialize();

/* Testing */

});