<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    if(isset($_REQUEST['username']) && isset($_REQUEST['password']))
    {
        $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
        $sql = "SELECT * FROM auth WHERE username='" . $_REQUEST['username'] . "' AND password='" . $_REQUEST['password'] . "';" ;
        $result = mysqli_query($connection, $sql);

        if(mysqli_num_rows($result) > 0)
            echo "success";
        else
            echo "failed";
    }
    else
        echo "Insufficient Data";

    // 'or'a'='a
?>