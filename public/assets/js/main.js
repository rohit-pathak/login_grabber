'use strict';

(function() {

    var qlickViewlogins = [];
    var selectedLogin;

    function renderLogins(logins) {
        $('#all-logins').html('');
        $.each(logins, function(i, login) {
            var $loginBox = $('<div class="panel panel-default"></div>').text(login.name);
            if (login.occupied) {
                $loginBox
                .addClass('occupied')
                .append($('<p></p>').text('Occupied by: ' + login.occupiedBy))
                .click(function(e) {
                    selectedLogin = login;
                    console.log(selectedLogin);
                });
            } else {
                $loginBox
                .append('<p>Vacant</p>')
                .click(function(e) {
                    selectedLogin = login;
                    console.log(selectedLogin);
                });
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