var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.home;
handle["/mongo"] = requestHandlers.mongo;
handle["/mysql"] = requestHandlers.mysql;
handle["/redis"] = requestHandlers.redis;

server.startServer(router.route, handle);