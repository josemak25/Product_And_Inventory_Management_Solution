$(document).ready(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    const formData = {
      name: $("#name").val(),
      description: $("#describe").val(),
      imageLink: $("#imgLnk").val(),
      category: $("#catId").val()
    };
  });
});
