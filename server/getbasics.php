<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    if(isset($_REQUEST['domain']))
    {
        $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
        $sql = "SELECT * FROM {$_REQUEST['domain']} WHERE 1;" ;
        $result = mysqli_query($connection, $sql);
        $arr = [];

        while($row = mysqli_fetch_row($result)) {
            $x = [];
            $fetchImageSql = "SELECT * FROM {$row[0]} WHERE 1;";
            $imageResult = mysqli_query($connection, $fetchImageSql);
            $firstRow = mysqli_fetch_row($imageResult);
            array_push($x, $row[0]);
            array_push($x, $firstRow[0]);
            array_push($arr, $x);
        }
        echo json_encode($arr);
    }
    else
        echo "Insufficient Data";
?>