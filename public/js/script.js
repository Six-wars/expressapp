$( document ).ready(function() {
    //make socket connection
    var socket = io.connect('http://localhost:4000');

    //Listen for events
    socket.on('users', function(data) {
    	let current_username = $('.sp-username').text();
    	console.log('ribbit');
    	
    	//if new user add user to the list
    	if (data.username != current_username) {
    		$('.user-list').append(`<li user_id="${data.username}">${data.username}</li>`);
    	}
    });

    $('.login-btn').click(function() {
    	let username = $('.username').val();
    	console.log(username);

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

    	$('.user-list').append(`<li user_id="${username}">${username}</li>`);

    	socket.emit('users', {
    		username: username
    	});
    });
});