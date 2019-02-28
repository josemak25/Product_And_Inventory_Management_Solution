$(document).ready(function() {
  const $storeCards = $("#store-items");
  const formName = $("#name");
  const formDescription = $("#describe");
  const formImageLink = $("#imgLnk");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  const formQuantity = $("#prodQaun");

  //function to help print data on page
  function populate(product) {
    $storeCards.append(`
    <div
    class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item"
    data-item="dougnuts"
  >
    <div class="card ">
      <div class="img-container">
        <img
          src="${product.imageLink}"
          class="card-img-top store-img"
          alt=""
        />
      </div>
      <div class="card-body">
        <div
          class="card-text d-flex justify-content-between text-capitalize"
        >
          <h5 id="store-item-name">${product.name}</h5>
          <h5 class="store-item-value">
            $
            <strong id="store-item-price" class="font-weight-bold"
              >${product.price}</strong
            >
          </h5>
        </div>
        <h6 id="description">
          ${product.description}
        </h6>
      </div>
    </div>`);
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

  // search for a product
  $("#search-icon").on("click", function(e) {
    e.preventDefault();
    let search = $("#search-item").val();
    $storeCards.empty();

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products?q=" + search,
      success: response => {
        $.each(response, (i, product) => {
          console.log(product);
          populate(product);
        });
      }
    });
  });
  // filter by category
  $("#electronics").on("click", function(e) {
    e.preventDefault();
    $storeCards.empty();

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products?category=electronics",
      success: response => {
        $.each(response, (i, product) => {
          populate(product);
        });
      }
    });
  });
  $("#grocery").on("click", function(e) {
    e.preventDefault();
    $storeCards.empty();

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products?category=grocery",
      success: response => {
        $.each(response, (i, product) => {
          populate(product);
        });
      }
    });
  });
  $("#computing").on("click", function(e) {
    e.preventDefault();
    $storeCards.empty();

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products?category=computing",
      success: response => {
        $.each(response, (i, product) => {
          populate(product);
        });
      }
    });
  });
  $("#fashion").on("click", function(e) {
    e.preventDefault();
    $storeCards.empty();

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products?category=fashion",
      success: response => {
        $.each(response, (i, product) => {
          populate(product);
        });
      }
    });
  });
});
