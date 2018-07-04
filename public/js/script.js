$( document ).ready(function() {
    //make socket connection
    var socket = io.connect('http://localhost:4000');

    $('.login-btn').click(function() {
    	let username = $('.username').val();

    	if (username == '') {
    		$('.login-error').removeClass('hidden');
    		return null;
    	}
    	//if passed hide error
    	$('.login-error').addClass('hidden');

    });
});