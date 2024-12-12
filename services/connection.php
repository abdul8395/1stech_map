<?php
$servername = "localhost";
$username = "u460794712_1stech_DB";
$dbname = "u460794712_1stech_DB";
$password = "1stechdb_123@";

// Create connection
$conn = new pg_connect($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>





