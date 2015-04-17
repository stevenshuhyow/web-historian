
// $(document).ready(function(){
//   $("form").on("submit", function(event){

//     var userInput = $("input#url").text();
//     var contains = archive.readListOfUrls(function(urls){
//       return urls.indexOf(userInput);
//     })

//     if(!contains){
//       window.location = "loading.html";
//       event.preventDefault();
//     }
//     else{
//       console.log("does not contain -------------------")
//     }
//   });
// });


// fs.readFile(index, "utf8", function(error, data){
//     if(data === undefined){
//       res.writeHead(404, httpHelpers.headers);
//       res.end();
//     }
//     res.end(data);
//   });

// YOUR CODE HERE:

var app;
$(function() {
  app = {
    server: 'http://127.0.0.1:8080',

    init: function() {
      $('form').on('submit', app.handleSubmit);
    },
    send: function(data) {
      console.log("IN SEND: ", data);
      // POST the message to the server
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'plain/text',
        success: function (data) {

          console.log('url sent');
        },
        error: function (data) {
          console.error('url failed to send');
        }
      });
    },
    fetch: function() {
      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'plain/text',
        success: function(data) {
          console.log(data);
          data = JSON.parse(data);
          // Don't bother if we have nothing to work with
          if (!data.results || !data.results.length) { return; }
        },
        error: function(data) {
          console.error('url failed to send');
        }
      });
    },

    handleSubmit: function(evt) {
      evt.preventDefault();
      var url = {
        url: $("input#url").val()
      };
      app.send(url);
    },

  };
}());
