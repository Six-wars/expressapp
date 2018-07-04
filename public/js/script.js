$( document ).ready(function() {
	//function for adding users to ul
	function addUser(data) {
		let current_username = $('.sp-username').text();
    	
    	//check if username exists in list
    	let exists = $(`.user-list li[user_id="${data.username}"]`).length;

    	//if new user add user to the list
    	if (data.username != current_username && exists == 0) {
    		$('.user-list').append(`<li user_id="${data.username}" unique_id="${data.id}"><i class="fas fa-circle online"></i>${data.username}</li>`);
    	} else if (exists == 1) { //if you already exist update some info and show you're active
    		$(`.user-list li[user_id="${data.username}"]`).attr('unique_id', data.id);
    		$(`.user-list li[user_id="${data.username}"] i`).removeClass('offline').addClass('online')
    	}
	}

    //make socket connection
    var socket = io.connect('http://localhost:4000');

    socket.on('closed', function(data) {
    	$(`.user-list li[unique_id="${data.id}"] i`).removeClass('online').addClass('offline');
    });

    socket.on('hello', function(data) {
    	addUser(data);
    });

    //Listen for events
    socket.on('users', function(data) {
    	addUser(data);

    	socket.emit('hello', {
    		username: current_username
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