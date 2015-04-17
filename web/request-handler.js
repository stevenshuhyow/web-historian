var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!
var content;
exports.handleRequest = function(req, res) {
  var statusCode;
  var index;

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
    console.log("POST, REQ-HANDLER.JS");
    statusCode = 302;

    httpHelpers.gatherData(req, function(data){
      var reqUrl = data.split("=")[1];
      archive.isUrlInList(reqUrl, function(index){
        if(index !== -1){
          console.log(archive.isUrlInList(reqUrl), "RESULT======")
          res.writeHead(statusCode, httpHelpers.headers);
          var index = archive.paths.list;
          archive.addUrlToList(req, res, index, reqUrl);
        }
      })

    });




  }


};
