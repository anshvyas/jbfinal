<?php
include_once('database.php');
$db=new Database();
$db->connect();

$package_id=$_POST['package'];
$discount=$_POST['discount'];
$sql="select * from package where package_id=".$package_id."";
$query=mysql_query($sql);
$res=mysql_fetch_array($query);

 $type=$res[1];
 $name=$res[2];
 $desc=$res[3];
echo $money=$res[4];
$logo=$res[5];


$is_visible=0;
$is_visible_hour=0;

$sql1="select * from offer where package_id=".$package_id."";
$query=mysql_query($sql1);
if(mysql_num_rows($query)==0)
{
//$query=$db->insert('offer',array($package_id,$type,$name,$desc,$money,$discount,$logo,$is_visible,$is_visible_hour));
$conn=mysql_connect("localhost","root","");


if($conn){
 //echo 'abns';
}

/*
$query="INSERT INTO `offer`".
"(`package_id`,`type`,`name`,`description`,`money`,`dis_money`,`logo`,`is_visible`,`is_visible_hour`,`time`) ".
"VALUES".
"($package_id,$type,$name,$desc,$money,$discount,$logo,$is_visible,$is_visible_hour,now())";
*/
$query = "INSERT INTO offer ". "(package_id, type, name, description,money, dis_money, logo, is_visible, is_visible_hour)".
"VALUES "."('$package_id','$type','$name','$desc','$money','$discount','$logo','$is_visible','$is_visible_hour')";
mysql_select_db('jobbureau');
$result=mysql_query($query,$conn);

//$result = mysql_query($query,$conn);

if(!$result)
echo die('Could not enter data: ' . mysql_error());

mysql_close($conn);
}

else
{
$query1="update offer set dis_money=".$discount." where package_id=".$package_id." ";
 mysql_query($query1);
}
//echo $package_id;
//echo $discount;
header("location:addoffer.php?error=0");


?>
