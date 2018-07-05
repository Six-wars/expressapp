$( document ).ready(function() {
    //make socket connection
    var socket = io.connect('http://localhost:4000');

    socket.on('closed', function(data) {
    	$(`.user-list li[unique_id="${data.id}"] i`).removeClass('online').addClass('offline');
    });

    socket.on('hello', function(data) {
    	addUser(data);
    });

    socket.on('bye', function(data) {
        $(`.user-list li[user_id="${data.username}"]`).html('');
    });

    //Listen for events
    socket.on('users', function(data) {
        var current_user_id = $.cookie('user-id')

        if (data.id == current_user_id) {
            addUser(data);
        } else {
            $.cookie('user-id', data.id);
            $.cookie(data.id, data.username);
        }

    	let current_username = $('.sp-username').text();
    	socket.emit('hello', {
    		username: current_username
    	});
    });

    //function for adding users to ul
	function addUser(data) {
		let current_username = $('.sp-username').text();
    	
    	//check if username exists in list
    	let exists = $(`.user-list li[user_id="${data.username}"]`).length;

    	//if new user add user to the list
    	if (data.username.length && data.username != current_username && exists == 0) {
    		$('.user-list').append(`<li user_id="${data.username}" unique_id="${data.id}"><i class="fas fa-circle online"></i>${data.username}</li>`);
    	} else if (exists == 1) { //if you already exist update some info and show you're active
    		$(`.user-list li[user_id="${data.username}"]`).attr('unique_id', data.id);
    		$(`.user-list li[user_id="${data.username}"] i`).removeClass('offline').addClass('online')
    	}

        if (current_username) {
            $.cookie(data.id, current_username);
            $.cookie('user-id', data.id.toString());
        }
    	
	}

    //re login user if page refreshed, used socket.id so that it also works on the same browser
    var user_id = $.cookie('user-id');
    var username = $.cookie(user_id);

    $('.log-out').click(function() {
        $.removeCookie('user-id');
        $.removeCookie(user_id);

        $('.login-error').addClass('hidden');

        $('.sp-username').text('');
        $('.top-nav-username').addClass('hidden');
        $('.log-out').addClass('hidden');

        $('.login-box').removeClass('hidden');
        $('.chat-box').addClass('hidden');

        socket.emit('bye', {
            username: username
        });
    });

    $('.login-btn').click(function() {
    	let username = $('.username').val();

    	if (username == '') {
    		$('.login-error').removeClass('hidden');
    		return null;
    	}
    	//if passed hide error
    	$('.login-error').addClass('hidden');

    	$('.sp-username').text(username);
    	$('.top-nav-username').removeClass('hidden');
    	$('.log-out').removeClass('hidden');

    	$('.login-box').addClass('hidden');
    	$('.chat-box').removeClass('hidden');

    	$('.user-list').append(`<li user_id="${username}" unique_id="${socket.id}"><i class="fas fa-circle online"></i>${username}</li>`);

    	socket.emit('users', {
    		username: username
    	});
    });
});