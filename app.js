'use strict';

const appInsights = require("applicationinsights");
appInsights.setup("34bc574f-f78e-4ea4-8c6c-8811c6a6afe9");
appInsights.start();

var http = require('http');

var server = http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Hello World haha!\n');
}).listen(3000, '0.0.0.0');

console.log('server started');
