const appInsightsInstrumentationKey = process.env.AZUREAPPINSIGHTSKEY || 'use your key';
const appInsights = require("applicationinsights");
appInsights.setup(appInsightsInstrumentationKey);
appInsights.start();

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/mongo"] = requestHandlers.mongo;
handle["/mysql"] = requestHandlers.mysql;
handle["/redis"] = requestHandlers.redis;
handle["/"] = requestHandlers.home;

server.startServer(router.route, handle);