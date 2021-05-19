<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
    $sql = "SELECT * FROM {$_REQUEST['domain']} WHERE 1;";
    $result = mysqli_query($connection, $sql);
    $arr = [];

    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_row($result)) {
            array_push($arr, $row[0]);
            array_push($arr, $row[1]);
        }
        echo json_encode($arr[1]);
    }
    else
        echo "failed";
?>