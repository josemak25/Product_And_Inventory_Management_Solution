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
  // function populate(product) {
  //   $tr.append(`
  //     <tr> <td>${product.name}</td>
  //     <td>${product.price}</td>
  //     <td>${product.category}</td>
  //     <td>${product.qauntity}</td>
  //     <td>
  //     <input type"text" id="getme" value="${product.id}" style="display:none;">
  //       <a id="editButton" data-toggle="modal" data-target="${product.id}"
  //         >edit</a
  //       >
  //     </td>
  //     <td>
  //       <a id="deleteButton" data-id=${product.id}>remove</a>
  //     </td>
  //     </tr>`);
  // }

  //ajax call db data to page
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/products",
    success: function(response) {
      let detail = [];
      $.each(response, (i, product) => {
        detail.push(product);
        product += $tr.append(`
        <tr> <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.qauntity}</td>
        <td>
        <input type"text" id="getme" value="${
          product.id
        }" style="display:none;">
          <a id="editButton" data-toggle="modal" data-target="${product.id}"
            >edit</a
          >
        </td>
        <td>
          <a id="deleteButton" data-id=${product.id}>remove</a>
        </td>
        </tr>`);
      });
      $.each(detail, (i, value) => {
        let formEdit = `
        <div
        class="modal fade"
        id="${value.id}"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Product details</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="post">
                <div class="form-group">
                  <label for="formGroupExampleInput">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Name of product"
                  />
                  <label for="formGroupExampleInput">Price</label>
                  <input
                    type="text"
                    class="form-control"
                    id="price"
                    placeholder="Price of product $34"
                  />
                  <label for="formGroupExampleInput">Quantity</label>
                  <input
                    type="text"
                    class="form-control"
                    id="prodQaun"
                    placeholder="Quantity of the product 34"
                  />
                  <label for="formGroupExampleInput">Product description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="describe"
                    placeholder="A little discription of the product"
                  />
                  <label for="formGroupExampleInput">Image for product</label>
                  <input
                    type="text"
                    class="form-control"
                    id="imgLnk"
                    placeholder="Please input an online resource of product image here"
                  />
                  <div class="form-group">
                    <label for="exampleFormControlSelect1"
                      >Product category</label
                    >
                    <select class="form-control" id="catId">
                      <option>computing</option>
                      <option>grocery</option>
                      <option>fashion</option>
                      <option>electronics</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                id="newProduct"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Update product
              </button>
            </div>
          </div>
        </div>
      </div>`;
      });
    }
  });

  //on edit click update a product
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
