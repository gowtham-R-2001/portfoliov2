<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");

    if(isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['msg']))
    {
        $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
        $sql = "SHOW TABLES;" ;
        $result = mysqli_query($connection, $sql);
        $x = false;

        while($row = mysqli_fetch_row($result)) {
            if($row[0] == "contact")
            {
                $x = true;
                $insertSql = "INSERT INTO contact VALUES('{$_REQUEST['name']}','{$_REQUEST['email']}','{$_REQUEST['msg']}')";
                $insertResult = mysqli_query($connection, $insertSql);
                if($insertResult) echo "success";
                else    echo "failed";                
            }
        }

        if($x == false)
        {
            $createSql = "CREATE TABLE contact (name VARCHAR(100), email VARCHAR(100), msg LONGTEXT);";
            $createResult = mysqli_query($connection, $createSql);
            if($createResult)
            {
                $insertSql = "INSERT INTO contact VALUES('{$_REQUEST['name']}','{$_REQUEST['email']}','{$_REQUEST['msg']}')";
                $insertResult = mysqli_query($connection, $insertSql);
                if($insertResult) echo "success";
                else    echo "failed";
            }
            else
                echo "failed";
        }
    }
    else
        echo "Insufficient Data";
?>