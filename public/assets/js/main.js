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
                    vacateLogin(login);
                });
            } else {
                $loginBox
                .append('<p>Vacant</p>')
                .click(function(e) {
                    selectedLogin = login;
                    $('#occupy-modal .login-name').text(login.name);
                    $('#occupy-modal').modal('show');
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
        console.log('occupying login');
        console.log(login);
    }

    function vacateLogin(login) {
        console.log('vacating login');
        console.log(login);
    }

    $('#occupy-modal #occupy-button').click(function(e) {
        occupyLogin(selectedLogin);
    });

    // initialize
    getLogins();

})();