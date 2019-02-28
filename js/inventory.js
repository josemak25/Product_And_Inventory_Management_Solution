$(document).ready(function() {
  //declare all form values
  const $tr = $("#tablepopulate");
  const formName = $("#name");
  const formDescription = $("#describe");
  const formQuantity = $("#prodQaun");
  const formImageLink = $("#imgLnk");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  //function to help print data on page
  function populate(product) {
    $tr.append(`
      <tr> <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>${product.qauntity}</td>
      <td>
      <input type"text" id="getme" value="${product.id}" style="display:none;">
        <a id="editButton" data-id=${
          product.id
        } data-toggle="modal" data-target="#editModal"
          >edit</a
        >
      </td>
      <td>
        <a id="deleteButton" data-id=${product.id}>remove</a>
      </td>
      </tr>`);
  }

  //ajax call db data to page
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/products",
    success: function(response) {
      $.each(response, (i, product) => {
        populate(product);
      });
    }
  });

  //on edit click update a product
  $("#updProduct").on("click", function(e) {
    e.preventDefault();
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      qauntity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val()
    };
    $("#updProduct").trigger("reset");

    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/products/" + $("#getme").val(),
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

  // delete press delete a product
  $("tbody").delegate("#deleteButton", "click", function(e) {
    e.preventDefault();
    let tableRow = $(this).closest("tr");
    $.ajax({
      type: "DELETE",
      url: "http://localhost:3000/products/" + $(this).attr("data-id"),
      success: () => {
        $(this).remove();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Deleted successfully"
        });
      }
    });
  });
});
