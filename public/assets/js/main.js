'use strict';

(function() {

    var username = 'user' + Math.round(Math.random()*100);
    var qlickViewlogins = [];
    var selectedLogin;
    var socket = io();

    function renderLogins(allLogins) {
        var render = function(logins, teamDiv) {
            $(teamDiv).html('');
            _.each(logins, function(login) {
                var $loginBox = $('<div class="login-box"></div>').text(login.name);
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
                        occupyLogin(login);
                    });
                }
                $(teamDiv).append($loginBox);
            });
        };
        render(_.filter(allLogins, function(l) {
            return l.team == 'programmatic';
        }), '#programmatic-logins');
        render(_.filter(allLogins, function(l) {
            return l.team == 'display';
        }), '#display-logins');
    }

    function occupyLogin(login) {
        login.occupied = true;
        login.occupiedBy = username;
        // TODO: form validation
        $.post('/grabs', login, function(response) {
            socket.emit('grabbed', login.occupiedBy + ' grabbed login ' + login.name);
        });
    }

    function vacateLogin(login) {
        var previousOccupier = login.occupiedBy;
        login.occupied = false;
        login.occupiedBy = '';
        $.post('/grabs', login, function(response) {
            socket.emit('grabbed', previousOccupier + ' vacated login ' + login.name);
        });
    }

    $('#welcome form').submit(function(e) {
        e.preventDefault();
        username = $(this).find('input').val();
        $('#username').html(username + ' ');
        $('#welcome').addClass('hide');
        $('#all-logins, #logged-in-user').removeClass('hide');
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