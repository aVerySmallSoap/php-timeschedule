<?php
    if(isset($_POST["dateIn"], $_POST["dateOut"]) && ($_POST["dateIn"] <> "" && $_POST["dateOut"] <> "")){
        respond($_POST["dateIn"], $_POST["dateOut"]);
    }else{
        error();
    }

    function respond($str, $str2){
        $strForm = date_create($str);
        $format1 = date_format($strForm, "g:i A");
        $str2Form = date_create($str2);
        $format2 = date_format($str2Form, "g:i A");
        $diff = date_diff($strForm, $str2Form);
        $json = ["first" => $format1, "second" => $format2, "hour" => $diff->h, "minute" => $diff->i];
        header("Content-type: application/json");
        echo json_encode($json);
    }

    function error(){
        echo "Please fill out the required fields!";
    }