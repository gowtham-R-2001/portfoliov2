<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");
    
    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
    $sql = "SELECT * FROM {$_REQUEST['project']} WHERE 1;" ;

    $result = mysqli_query($connection, $sql);
    $arr = [];

    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_row($result)) {
            array_push($arr, $row[0]);
        }
        echo json_encode($arr);
    }
    else
        echo "failed";
?>