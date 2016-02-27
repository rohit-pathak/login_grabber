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
        login.occupied = true;
        login.occupiedBy = $('#occupy-modal #occupier').val();
        // TODO: form validation
        $.post('/grabs', login, function(response) {
            getLogins();
            $('#occupy-modal #occupier').val('');
            $('#occupy-modal').modal('hide');
        });
    }

    function vacateLogin(login) {
        login.occupied = false;
        login.occupiedBy = '';
        $.post('/grabs', login, function(response) {
            getLogins();
        });
    }

    // occupy selected login when the occupy button on the modal is clicked
    $('#occupy-modal #occupy-button').click(function(e) {
        occupyLogin(selectedLogin);
    });

    // initialize
    getLogins();

})();