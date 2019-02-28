$(document).ready(function() {
  const formName = $("#name");
  const formDescription = $("#describe");
  const formImageLink = $("#imgLnk");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  const formQuantity = $("#prodQaun");

  $("#newProduct").on("click", function(e) {
    e.preventDefault();
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      quantity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val()
    };
    $("#newProduct").trigger("reset");

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/products",
      data: FormData,
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
