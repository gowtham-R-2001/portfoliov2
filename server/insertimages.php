<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
    if(!$connection)
        die("Unable to connect");

    $projectname = str_replace(" ","_",$_REQUEST['projectname']);
    $sql = "INSERT INTO {$projectname} VALUES ('{$_REQUEST['imagelink']}');";    
    $result = mysqli_query($connection, $sql);
    if($result)
        echo "Success";
    else
        echo "Failed";
?>