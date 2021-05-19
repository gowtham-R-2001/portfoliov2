<?php
    header('Access-Control-Allow-Origin: *');
    require("db_config.php");
    $data = $_REQUEST;
    $projectname = str_replace(" ","_",$data["projectname"]);

    $connection = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_dbname);
    if(!$connection)
        die("Unable to connect");

    if(addProjectToDomainTable($connection, $data, $projectname))
    {
        if(createProjectTable($connection, $projectname))
            echo "Success";
        else
            echo "Can't create project table.";
    }
    else
        echo "Can't added project to domain table.";


    function addProjectToDomainTable($connection, $data, $projectname)
    {
        $sql = "INSERT INTO {$data["domain"]}(prjname, prjdesc, weblink) VALUES('{$projectname}', '{$data['projectdesc']}', '{$data["weblink"]}')";
        $result = mysqli_query($connection, $sql);
        return $result;
    }

    function createProjectTable($connection, $projectname)
    {
        $sql = "CREATE TABLE {$projectname} (imagelink LONGBLOB);";
        $result = mysqli_query($connection, $sql);
        return $result;
    }
?>