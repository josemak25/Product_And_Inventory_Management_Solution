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
  let products = [];


  //function to help print data on page
  function populate(product) {
    $tr.append(`
      <tr id="${product.id}" class='table-row'>
          <td class="column1">${product.expireDate}</td>
          <td class="column2">${product.category}</td>
          <td class="column3">${product.name}</td>
          <td class="column4">${product.price}</td>
          <td class="column5">${product.qauntity}</td>
          <td class="column6">
          <div>
              <button id="editButton" onclick="editProduct(${product.id})" id="editButton" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" onclick="deleteProduct(${product.id})">
                  <i class="fas fa-trash"></i>
              </button>
          </div>
      </td>
  </tr>`);
  }

  //script for form date picker
  $(function () {
    $('#expireDate').datepicker({
      'format': 'yyyy-mm-dd',
      'autoclose': true
    });
  });


  //ajax call db data to page

  function getAllDbDataOnPage() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products",
      success: function (response) {
        products = response;
        $.each(response, (i, product) => {
          populate(product);
        });
        //form table padginatio action call
        $('#example').DataTable({
          language: {
            search: '<button id="searchBtn" type="submit" class="btn btn-search fa fa-search"></button>',
            searchPlaceholder: "Search via product name, quantity or expiring date"
          },
        });
      }
    })
  };
  getAllDbDataOnPage()

  //editfunction
  editProduct = (id) => {
    const product = products.find(e => e.id === id)
    formName.val(`${product.name}`)
    formPrice.val(`${product.price}`)
    formQuantity.val(`${product.qauntity}`)
    formDescription.val(`${product.description}`)
    formImageLink.val(`${product.imageLink}`)
    formCategory.val(`${product.category}`)
    formDate.val(`${product.expireDate}`)


    //on edit click update a product
    $("#editProduct").on("click", function (e) {
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


      $.ajax({
        type: "PATCH",
        url: `http://localhost:3000/products/${id}`,
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
          $.get(`http://localhost:3000/products/${id}`, function (data) {

            let product = data;
            $tr.append(`
          <tr id="${product.id}" class='table-row'>
          <td class="column1">${product.expireDate}</td>
          <td class="column2">${product.category}</td>
          <td class="column3">${product.name}</td>
          <td class="column4">${product.price}</td>
          <td class="column5">${product.qauntity}</td>
          <td class="column6">
          <div>
              <button id="editButton" onclick="editProduct(${product.id})" id="editButton" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" onclick="deleteProduct(${product.id})">
                  <i class="fas fa-trash"></i>
              </button>
          </div>
      </td>
  </tr>`);
          });
        },
        error: () => {
          console.log('failed to PUT')
        }
      });
    });

  }

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
      type: "POST",
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

  deleteProduct = (id) => {
    const product = products.find(e => e.id === id)
    $.ajax({
      type: "DELETE",
      url: `http://localhost:3000/products/${id}`,
      success: () => {
        $(`#${product.id}`).remove();
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
  }
}
)