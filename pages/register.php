<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vaallday Register</title>

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

    #register-form {
      background-color: rgba(255, 255, 255, 0.6);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 100%; /* Change width to 100% for responsiveness */
      max-width: 400px; /* Set a maximum width */
    }

    #errorMessagediv {
      color: #f40404!important;
      font-size: 17px;
      background-color: wheat;
      margin: 8px 2px;
      border-radius: 8px;
      padding: 6px 1px;
    }
  </style>
</head>

<body>
  <div class="container" id="register-form">
    <img src="../assets/img/sunrun_logo.png" class="img-fluid mx-auto d-block" alt="Sunrun Logo" style="max-width: 160px;">
    <h3 class="mb-4">Register As a Member</h3>
    <form id="registerForm" novalidate>
      <div class="form-group">
        <input type="text" class="form-control" id="fullname" placeholder="Full Name" required>
        <div class="invalid-feedback" id="fullnameError">Please enter your full name.</div>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id="assignterritory" placeholder="Any Assign Territory Name/No Optional">
      </div>
      <div class="form-group">
        <input type="tel" class="form-control" id="mobileno" placeholder="Mobile No Optional" title="Enter a 10-digit mobile number">
        <div class="invalid-feedback" id="mobilenoError">Please enter a valid mobile number.</div>
      </div>
      <div class="form-group">
        <input type="email" class="form-control" id="uemail" placeholder="Email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}">
        <div class="invalid-feedback" id="uemailError">Please enter a valid email address.</div>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="upassword" placeholder="Password" required>
        <div class="invalid-feedback" id="upasswordError">Please enter a password.</div>
      </div>
      <div class="form-group">
        <a href="../index.php"><button type="button" class="btn btn-danger mr-2">Back</button></a>
        <button type="button" class="btn btn-success" onclick="validateAndRegister()">Register</button>
      </div>
      <div id="errorMessagediv" class="text-danger"></div>
    </form>
  </div>

  <script>
   function validateAndRegister() {
        var form = document.getElementById("registerForm");

        // Reset all error messages to hide them
        resetErrorMessages();

        // Check each input for validity
        var inputs = form.querySelectorAll('input');
        inputs.forEach(function(input) {
            if (!input.checkValidity()) {
                // If the input is invalid, display the corresponding error message
                displayErrorMessage(input);
            }
        });

        // Check if the form is valid
        if (form.checkValidity()) {
            // If the form is valid, proceed with registration
            registerUser();
        }
    }

    function resetErrorMessages() {
        // Reset all error messages to hide them
        var errorMessages = document.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(function (element) {
            element.style.display = 'none';
        });
    }

    function displayErrorMessage(input) {
        // Display the error message for the given input
        var errorMessageId = input.id + 'Error';
        var errorMessageElement = document.getElementById(errorMessageId);

        if (errorMessageElement) {
            // Check if the error message element exists before attempting to modify its style
            errorMessageElement.style.display = 'block';
        }
    }

    function registerUser() {
        var fullname = $("#fullname").val();
        var assignterritory = $("#assignterritory").val();
        var mobileno = $("#mobileno").val();
        var uemail = $("#uemail").val();
        var upassword = $("#upassword").val();

        $.ajax({
            type: "POST",
            url: "../services/register_user.php",
            data: {
                fullname: fullname,
                assignterritory: assignterritory,
                mobileno: mobileno,
                uemail: uemail,
                upassword: upassword
            },
            success: function (response) {
                $("#errorMessagediv").html(response);
            }
        });
    }

    $(document).ready(function () {
      // Your document ready logic here
    });
  </script>

</body>

</html>
