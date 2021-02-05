$(document).ready(function ()//Encouraged when using jQuery.
{
    /* DOM Elements */

    /* Variables */

    /* Primary Functions */

    /* Helper Functions */

    /* Attaching Listeners */
    $(document).ready(function () {
        $('#tabs li').on('click', function () {
            var tab = $(this).data('tabs');

            $('#tabs li').removeClass('is-active');
            $(this).addClass('is-active');

            $('#tab-content p').removeClass('is-active');
            $('p[data-content="' + tab + '"]').addClass('is-active');
        });
    });
    /* Function Calls */

    /* Testing */

});