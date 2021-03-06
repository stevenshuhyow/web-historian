var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'index' :  path.join(__dirname, '../web/public/index.html'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readFileData = function(req, res, index){
  fs.readFile(index, "utf8", function(error, data){
    if(data === undefined){
      res.writeHead(404, httpHelpers.headers);
      res.end();
    }
    res.end(data);
  });
}


exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, "utf8", function(error, data){
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(reqUrl, callback){
  fs.readFile(exports.paths.list, "utf8", function(error, data){
    var index = data.toString().split('\n').indexOf(reqUrl);
    callback(index)
  });

};

exports.addUrlToList = function(req, res, index, requrl){
  fs.appendFile(index, requrl+"\n");
  res.end();
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
