function renderTemplate(templateId, container, model) {
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).append(renderedTemplate);
}

var url = "https://api.github.com/issues";


//Clears the title div and loads all current issues' titles
var grabTitles = function() {
  console.log('clearing');
  $('.title').empty();
  $.getJSON(url).done(function(data) {
    $.each(data, function(i) {
      renderTemplate('title', '.title', data[i]);
      console.log('appended new title');
    });
  });
};

//Load on page load
grabTitles();

//Set interval for real time pulling
setInterval(grabTitles, 5000);



//Finds and prints comments on click event
$(document).on('click', '.button', function() {
  $('.comment').empty(); //empty the contents of the comment box
  console.log("cleared comment section");
  var id = $(this).attr('data-id'); //set the var id to id of button clicked
  $.getJSON(url).done(function(data) { //fetch data of all issues
    $.each(data, function(i) { //go through each of the issue objects
      if (id == data[i].id) {//match the clicked id to the corresponding object
        $.getJSON(data[i].comments_url).done(function(commentObject) { //fetch the comments object of the matched object
          $.each(commentObject, function(c) { //go through each of the comments
            renderTemplate('comment', '.comment', commentObject[c]);
            console.log('Appended current comment');
            //render each of the comments to the template
          });
        });
      }
    });
  });
});
