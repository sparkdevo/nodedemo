'use strict';

const appInsights = require("applicationinsights");
appInsights.setup("xxx-InstrumentationKey-xxx");
appInsights.start();

var http = require('http');

var server = http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Hello World haha!\n');
}).listen(3000, '0.0.0.0');

console.log('server started');
