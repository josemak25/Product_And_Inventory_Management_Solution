$(document).ready(function() {
  const $tr = $("#tablepopulate");
  const formName = $("#name");
  const formQuantity = $("#prodQaun");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  function populate(product) {
    console.log(product.name);
    $tr.append(`
      <tr> <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>${product.qauntity}</td>
      <td>
        <a id="editButton" data-toggle="modal" data-target="#exampleModal"
          >edit</a
        >
      </td>
      <td>
        <a id="deleteButton">remove</a>
      </td>
      </tr>`);
  }

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/products",
    success: function(response) {
      $.each(response, (i, product) => {
        populate(product);
      });
    }
  });
  $("#newProduct").on("click", function(e) {
    e.preventDefault();
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      qauntity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val()
    };
    $("#newProduct").trigger("reset");

    $.ajax({
      type: "PUT",
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
          title: "Updated product successfully"
        });
      }
    });
  });
});
