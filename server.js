'use strict';

const appInsights = require("applicationinsights");
appInsights.setup("xxx-InstrumentationKey-xxx");
appInsights.start();

var http = require('http');
var url = require("url");

function startServer(route, handle) {
    function onRequest(request, response) {
		if (request.originalUrl === '/favicon.ico') {
			request.status(204).json({nope: true});
		}

        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
           
        route(handle, pathname);
           
        response.writeHead(200,{"Content-Type":"text/plain"});
        var content = route(handle, pathname);
        response.write(content);
        response.end();
	}

	var server = http.createServer(onRequest).listen(3000, '0.0.0.0');
	console.log('server started...');
}

exports.startServer = startServer;
