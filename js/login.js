$(document).ready(function() {
  $("#checklogin").click(function(e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    const password = localStorage.getItem("password");
    const username = localStorage.getItem("username");

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/admin",
      success: function(admin) {
        const adminUsername = admin.username;
        const adminPass = admin.password;

        if (adminUsername == username && adminPass == password) {
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
          window.location.href("home.html");
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Login Failed"
          });
        }
      }
    });
  });
});
