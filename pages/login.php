<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vaallday Login</title>

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

  <style>
    body {
      background: url('../assets/img/loginbanner.jpg') no-repeat center center fixed;
      background-size: cover;
      height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #login-form {
      background-color: rgba(255, 255, 255, 0.6);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 100%;
      max-width: 400px;
    }

    #errorMessage {
      color: #f40404 !important;
      font-size: 17px;
      background-color: wheat;
      margin: 8px 2px;
      border-radius: 8px;
      padding: 6px 1px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-8 col-lg-6">
        <div id="login-form">
          <img src="http://1stech.co/wp-content/themes/gis1stech/assets/images/1stech%20logo.svg" class="img-fluid mx-auto d-block" alt="Sunrun Logo" style="max-width: 160px;">
          <h2 class="mb-4">LOGIN</h2>
          <form id="loginForm">
            <div class="form-group">
              <input type="email" class="form-control" id="user_email" placeholder="Enter Your Email" required>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password" placeholder="Password" required>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-danger mr-2" onclick="window.location.href='../index.html'">Back</button>
              <button type="button" class="btn btn-success" onclick="validateAndLogin()">LOGIN</button>
            </div>
            <!-- Error message area -->
            <!-- <div id="errorMessage" class="text-danger" style="color"></div> -->
          </form>
        </div>
      </div>
    </div>
  </div>

  <script>
     function validateAndLogin() {
      // Get user_email and password
      var user_email = $("#user_email").val();
      var password = $("#password").val();

      // Validate input
      if (user_email.trim() === "" || password.trim() === "") {
        $("#errorMessage").text("Please enter both email and password.");
        return;
      }

      // Validate email format
      if (!isValidEmail(user_email)) {
        $("#errorMessage").text("Please enter a valid email address.");
        return;
      }

      // Use AJAX to send form data for user verification
      // $.ajax({
      //   type: "POST",
      //   url: "../services/login_user.php",
      //   data: {
      //     user_email: user_email,
      //     password: password
      //   },
      //   success: function (response) {
      //     handleLoginResponse(response);
      //   },
      //   error: function (xhr, status, error) {
      //     console.log("AJAX error: " + status + ", " + error);
      //   }
      // });
    }

    function isValidEmail(email) {
      // Regular expression for validating an Email
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }


    function handleLoginResponse(response) {
        console.log(response);
      try {
        var parsedResponse = JSON.parse(response);
        if (parsedResponse.status === "success") {
            console.log(parsedResponse.role);
          // User is verified
          if (parsedResponse.role == 1) {
            console.log('admin');
            // Redirect or perform actions for admin
            window.location.href = "../admin_dashboard.php";
          } else {
            console.log('user');
            // Redirect or perform actions for other roles
            window.location.href = "../user_dashboard.php";
          }
        } else {
          // Display an error message or handle it as needed
          
          $("#errorMessage").text(parsedResponse.message);
        }
      } catch (error) {
        console.log("Error parsing JSON response: " + error);
      }
    }
  </script>

</body>

</html>

