'use strict';

const appInsights = require("applicationinsights");
appInsights.setup("xxx-InstrumentationKey-xxx");
appInsights.start();

var http = require('http');
var url = require("url");

function startServer(route, handle) {
    async function onRequest(request, response) {
		if (request.originalUrl === '/favicon.ico') {
			request.status(204).json({nope: true});
		}

        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

		let content = await route(handle, pathname);
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(JSON.stringify(content));
		response.end();
	}

	let server = http.createServer(onRequest).listen(3000, '0.0.0.0');
	console.log('server started...');
}

exports.startServer = startServer;
