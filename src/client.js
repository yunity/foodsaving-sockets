var url = 'http://localhost:8091';
var socket = require('socket.io-client')(url, {
    path: '/socket'
    //transports: ['websocket']
});

var winston = require('winston');
var logger = new winston.Logger({
    transports: [
      new (winston.transports.Console)({ 
        timestamp: function() {
          return new Date().toISOString();
        }
      })
    ]
});

var sessionId = process.argv[2] || 'mysessionid';

socket.on('connect', function(){
  logger.info('socket connected to', url);
  socket.emit('authenticate', { sessionId: sessionId });
});

socket.on('message', function(data){
  logger.info('received', data);
});
