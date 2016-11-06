<?php

mysql_connect('localhost','root','Iiahtth');
mysql_select_db('jobbureau');

$query="select battery_gain from battery";
$query_run=mysql_query($query);
$ans=mysql_fetch_assoc($query_run);

echo $ans['battery_gain'];

if(isset($_POST['battery'])){
$battery=$_POST['battery'];

$query1="update battery set battery_gain='$battery'";
$query1_run=mysql_query($query1);
if($query1_run){
  echo 'Success';

}
else{
echo mysql_error();
}



}
else{

echo 'field is not set';

}




?>
<h2 style="text-align:center;">Battery Update</h2>

<form method="post" action="increase_battery.php">


Battery_gain:
<input type='text' name='battery' value="<?php echo $ans['battery_gain'];?>"><br><br>
<input type='submit' name='submit' value='submit'>





</form>
