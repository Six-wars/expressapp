var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//socket setup
var socket = require('socket.io');

var server = app.listen(4000, function() {
		
});

var io = socket(server);
io.on('connection', function(socket) {
	console.log('made socket connection', socket.id);

	socket.on('users', function(data) {
		var response_data = {'username': data.username, 'id': socket.id};
		io.sockets.emit('users', response_data);
	});

	socket.on('disconnect', function (data) { 
		console.log('disconnected user ', socket.id);
		
		io.sockets.emit('closed', {'id': socket.id});
	});

	socket.on('hello', function(data) {
		var response_data = {'username': data.username, 'id': socket.id};
		socket.broadcast.emit('hello', response_data);
	})
});

module.exports = app;
