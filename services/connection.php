<?php
// $servername = "191.101.79.154";
$servername = "localhost";
$username = "u460794712_vaallday_DB";
$dbname = "u460794712_vaallday_DB";
$password = "Vaallday@123";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>





