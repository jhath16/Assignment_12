function renderTemplate(templateId, container, model) {
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).append(renderedTemplate);
}

/*  $.getJSON("https://api.github.com/issues").done(function(data) {
  console.log(data);
  //renderTemplate('title','.title-holder',data);
  $.each(data, function(i) {
    $.getJSON(data[i].comments_url).done(function(comments) {
      if (comments.length != 0) {
        console.log(comments);
        renderTemplate('comment', '.comment-holder', comments[0]);
      };
    })
  });
});  */


$.getJSON("https://api.github.com/issues").done(function(data) {
  console.log(data);
  $.each(data, function(i) {
    console.log(data[i]);
    renderTemplate('title','.title',data[i]);
  })
});
