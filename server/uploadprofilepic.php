<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
    if(!$connection)
        die("Unable to connect");

    $sql = "SHOW TABLES;" ;
    $result = mysqli_query($connection, $sql);
    $x = false;

    while($row = mysqli_fetch_row($result)) {
        if($row[0] == "profile_pic")
        {
            $x = true;
            $insertSql = "UPDATE profile_pic SET imagelink=('{$_REQUEST['imagelink']}');";
            $insertResult = mysqli_query($connection, $insertSql);
            if($insertResult) echo "success";
            else    echo "failed";
        }
    }

    if($x == false)
    {
        $createSql = "CREATE TABLE profile_pic (imagelink LONGBLOB);";
        $createResult = mysqli_query($connection, $createSql);
        if($createResult)
        {
            $insertSql = "INSERT INTO profile_pic VALUES ('{$_REQUEST['imagelink']}');";
            $insertResult = mysqli_query($connection, $insertSql);
            if($insertResult) echo "success";
            else    echo "failed";
        }
        else
            echo "failed";
    }
?>