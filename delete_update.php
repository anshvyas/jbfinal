<?php

mysql_connect('localhost','root','Iiahtth');
mysql_select_db('jobbureau');


$query="select update_text from updates where is_visible=1";
$query_run=mysql_query($query);

if ($query_run)
{
 $text=array();
 $i=0;
while($row=mysql_fetch_assoc($query_run)){

     $text[$i]=$row['update_text'];
      $i=$i+1;   
}



}
else{
echo mysql_error();

}


if(isset($_POST['delete'])){

 $delete=$_POST['delete'];

$query1="Update updates set is_visible=0 where update_text='$delete'";
$query1_run=mysql_query($query1);

if ($query1_run){

	$message = "Update has been successfully deleted";
    echo "<script type='text/javascript'>alert('$message');</script>";
}
else{
	$message = "Some error";
     echo "<script type='text/javascript'>alert('$message');</script>";
}

}

else{

echo 'field is not set';


}









?>
<h2 style="text-align:center;">Delete Updates</h2>

<form method="post" action="delete_update.php">
 Delete Updates:
   <select id="delete" name="delete"> 
      <option value="<?php echo $text[0];?>"><?php echo $text[0];?></option>
      <option value="<?php echo $text[1];?>"><?php echo $text[1]?></option> 
      <option value="<?php echo $text[2];?>"><?php echo $text[2]?></option> 
      <option value="<?php echo $text[3];?>"><?php echo $text[3]?></option> 
   </select> 
<br><br>
<input type="submit" name="submit" value="Delete">
</form>

