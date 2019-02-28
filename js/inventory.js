$(document).ready(function() {
  const $tr = $("#tablepopulate");
  const formName = $("#name");
  const formQuantity = $("#name");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  function populate(product) {
    console.log(product.name);
    $tr.append(`
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>${product.quantity}</td>
      <td>
        <a id="editButton" data-toggle="modal" data-target="#exampleModal"
          >edit</a
        >
      </td>
      <td>
        <a id="deleteButton">remove</a>
      </td>`);
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
});
