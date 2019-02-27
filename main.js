$(document).ready(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    const formData = {
      name: $("#name").val(),
      description: $("#describe").val(),
      imageLink: $("#imgLnk").val(),
      category: $("#catId").val()
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/products",
      data: formData,
      success: () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Added product successfully"
        });
      }
    });
  });
});
