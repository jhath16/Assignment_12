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
setInterval(grabTitles,3000);


$(document).on('click','.button', function() {
  var id = $(this).attr('data-id');
  $.getJSON(url).done(function(data) {
    console.log(id);
  });
});
