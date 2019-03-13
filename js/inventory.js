$(document).ready(function () {

  //declare all form values
  const $tr = $("#tablepopulate");
  const formName = $("#name");
  const formDescription = $("#describe");
  const formQuantity = $("#prodQaun");
  const formImageLink = $("#imgLnk");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  const formDate = $("#expireDate")

  //function to help print data on page
  function populate(product) {
    $tr.append(`
      <tr>
      <td class="column1">${product.expireDate}</td>
      <td class="column2">${product.category}</td>
      <td class="column3">${product.name}</td>
      <td class="column4">${product.price}</td>
      <td class="column5">${product.qauntity}</td>
      <input type"text" id="getme" value="${product.id}" style="display:none;">
      <td class="column6">
          <div>
              <button id="editButton" id="editButton" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" data-id=${product.id}>
                  <i class="fas fa-trash"></i>
              </button>
          </div>
      </td>
  </tr>`);
  }

  //ajax call db data to page
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/products",
    success: function (response) {
      let detail = [];
      $.each(response, (i, product) => {
        detail.push(product);
        populate(product);
      });
       //form table padginatio action call
  $('#example').DataTable({
    language: {
      search: '<button type="submit" class="btn btn-search fa fa-search"></button>',
      searchPlaceholder: "Search via product name, quantity or expiring date"
    },
  });
    }
  });

  //on edit click update a product
  $("#newProduct").on("click", function (e) {
    e.preventDefault();
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      qauntity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val(),
      expireDate: formDate.val()
    };
    $("#newProduct").trigger("reset");
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

  // add new product

  $("#addProduct").on("click", function (e) {
    e.preventDefault();
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      qauntity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val()
    };
    $("#addProduct").trigger("reset");
    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/products/",
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

  // delete press delete a product
  $("tbody").delegate("#deleteButton", "click", function (e) {
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
