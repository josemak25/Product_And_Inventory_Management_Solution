$(document).ready(function() {
  const $tr = $("tr");
  const formName = $("#name");
  const formQuantity = $("#name");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  function populate(product) {
    $tr.append(`
      <td>${formName}</td>
      <td>${formPrice}</td>
      <td>${formCategory}</td>
      <td>${formQuantity}</td>
      <td>
        <a id="editButton" data-toggle="modal" data-target="#exampleModal"
          >edit</a
        >
      </td>
      <td>
        <a id="deleteButton">remove</a>
      </td>`);
  }
});
