<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
    if(!$connection)
        die("Unable to connect");

    $sql = "SELECT * FROM profile_pic WHERE 1;";
    $result = mysqli_query($connection, $sql);

    $row = mysqli_fetch_row($result);
    echo json_encode($row[0]);
?>