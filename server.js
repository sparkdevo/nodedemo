'use strict';

var http = require('http');
var url = require("url");

function startServer(route, handle) {
    async function onRequest(request, response) {
		if (request.originalUrl === '/favicon.ico') {
			request.status(204).json({nope: true});
		}

        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

		let status = 200;
		let result = await route(handle, pathname);
		if (typeof result === 'string' || result instanceof String) {
			if (result == "404 Not Found") {
				status = 404;
			}
		}
		
		response.writeHead(status,{"Content-Type":"text/plain"});
		response.write(JSON.stringify(result));
		response.end();
	}

	let server = http.createServer(onRequest).listen(3000, '0.0.0.0');
	console.log('server started...');
}

exports.startServer = startServer;
