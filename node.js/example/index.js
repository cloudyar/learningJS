var server = require('./Server');
var route = require('./router');

server.start(route.route);
