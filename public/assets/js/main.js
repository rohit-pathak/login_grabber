'use strict';

(function() {
    
    var qlickViewlogins = [];

    function renderLogins(logins) {
        $('#all-logins').html('');
        $.each(logins, function(i, login) {
            var $loginBox = $('<div class="panel panel-default"></div>').text(login.name);
            if (login.occupied) {
                $loginBox
                  .addClass('occupied')
                  .append($('<p></p>').text('Occupied by: ' + login.occupiedBy));
            } else {
                $loginBox.append('<p>Vacant</p>')
            }
            $('#all-logins').append($loginBox);
        });
    }

    function getLogins() {
        $.get('/grabs', function(data) {
            console.log(data);
            qlickViewlogins = data;
            renderLogins(qlickViewlogins);
        });
    }

    function occupyLogin(login) {

    }

    function vacateLogin(login) {
        
    }

    // initialize
    getLogins();

})();