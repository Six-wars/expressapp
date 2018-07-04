$( document ).ready(function() {
    //make socket connection
    var socket = io.connect('http://localhost:4000');

    //Listen for events
    socket.on('users', function(data) {
    	let current_username = $('.sp-username').text();
    	
    	//if new user add user to the list
    	if (data.username != current_username) {
    		$('.user-list').append(`<li user_id="${data.username}"><i class="fas fa-circle"></i>${data.username}</li>`);
    	}
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

    	$('.user-list').append(`<li user_id="${username}"><i class="fas fa-circle"></i>${username}</li>`);

    	socket.emit('users', {
    		username: username
    	});
    });
});