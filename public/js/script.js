$( document ).ready(function() {
    //make socket connection
    var socket = io.connect('http://localhost:4000');

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
    });
});