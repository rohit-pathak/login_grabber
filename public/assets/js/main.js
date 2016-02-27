'use strict';

(function() {

    var qlickViewlogins = [];
    var selectedLogin;
    var socket = io();

    function renderLogins(logins) {
        $('#all-logins').html('');
        $.each(logins, function(i, login) {
            var $loginBox = $('<div class="panel panel-default"></div>').text(login.name);
            if (login.occupied) {
                $loginBox
                .addClass('occupied')
                .append($('<p></p>').text('Occupied: ' + login.occupiedBy))
                .click(function(e) {
                    selectedLogin = login;
                    vacateLogin(login); // ask before vacating?
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

    function occupyLogin(login) {
        login.occupied = true;
        login.occupiedBy = $('#occupy-modal #occupier').val();
        // TODO: form validation
        $.post('/grabs', login, function(response) {
            $('#occupy-modal #occupier').val('');
            $('#occupy-modal').modal('hide');
            socket.emit('grabbed', login.occupiedBy + ' grabbed login ' + login.id);
        });
    }

    function vacateLogin(login) {
        var previousOccupier = login.occupiedBy;
        login.occupied = false;
        login.occupiedBy = '';
        $.post('/grabs', login, function(response) {
            socket.emit('grabbed', previousOccupier + ' vacated login ' + login.id);
        });
    }

    // occupy selected login when the occupy button on the modal is clicked
    $('#occupy-modal form').submit(function(e) {
        e.preventDefault();
        occupyLogin(selectedLogin);
    });

    // when logins are updated on the backend re-render
    socket.on('grabbed', function(logins) {
        qlickViewlogins = logins;
        renderLogins(qlickViewlogins);
    });

    // initialize
    $.get('/grabs', function(data) {
        qlickViewlogins = data;
        renderLogins(qlickViewlogins);
    });

})();