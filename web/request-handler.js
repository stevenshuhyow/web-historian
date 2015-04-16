var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!
var content;
exports.handleRequest = function(req, res) {
console.log(req.method);
  var statusCode;
  var index;

  console.log(req.method)

  if(req.method === "OPTIONS"){
    statusCode = 200;
    res.writeHead(statusCode, httpHelpers.headers);
    res.end();
  }

  if(req.method === "GET"){
    statusCode = 200;
    if(req.url.length > 1){
      index = archive.paths.archivedSites + req.url;
    } else {
      index = archive.paths.index;
    }
    res.writeHead(statusCode, httpHelpers.headers);
    archive.readFileData(req, res, index);
  }

  if(req.method === "POST"){
    console.log("-----------------------");
    statusCode = 302;
    res.writeHead(statusCode, httpHelpers.headers);
    var index = archive.paths.list;
    archive.addUrlToList(req, res, index);

  }


};
