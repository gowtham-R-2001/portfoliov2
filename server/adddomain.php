<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);

    if(!$connection)
        die("Connection error");

    $sql = "INSERT INTO domains VALUES('{$_REQUEST['domainname']}');";
    $result = mysqli_query($connection, $sql);

    if($result && createTable($connection, $_REQUEST['domainname'])) {
        echo "Success";
    }
    else
        echo "Failed";

    function createTable($connection, $domainName) {
        $sql = "CREATE TABLE {$domainName} (prjname VARCHAR(100), prjdesc LONGTEXT, weblink VARCHAR(100));";
        $result = mysqli_query($connection, $sql);
        return $result;
    }
?>