function renderTemplate(templateId, container, model) {
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).append(renderedTemplate);
}

function htmlTemplate(templateId, container, model) {
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).html(renderedTemplate);
}

var url = "https://api.github.com/issues";


//Clears the title div and loads all current issues' titles
var grabTitles = function() {
  console.log('clearing');
  $('.title').empty();
$.getJSON(url).done(function(data) {
  $.each(data, function(i) {
    renderTemplate('title','.title',data[i]);
    console.log('appended new title');
  });
});
};

//Load on page load
grabTitles();

//Set interval for real time pulling
//setInterval(grabTitles,5000);


//Finds and prints comments on click event
$(document).on('click','.button', function() {
  $('.comment').empty();
  var id = $(this).attr('data-id');
  $.getJSON(url).done(function(data) {
    $.each(data, function(i) {
      //console.log(data[i].id);
      if(id == data[i].id) {
        $.getJSON(data[i].comments_url).done(function(commentObject) {
          console.log(commentObject);
            $.each(commentObject, function(c) {
              console.log(commentObject[c]);
              renderTemplate('comment','.comment',commentObject[c]);
            });
        });
      }
    });
  });
});
