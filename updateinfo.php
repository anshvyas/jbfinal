<?php
session_start();
        if(strcmp($_SESSION['usertype'],"admin")==0)
{
include_once('database.php');
$db=new Database();
$db->connect();
/*$db->select('packages','name');
$resname=$db->getResult();
$db->select('packages','id');
$resid=$db->getResult();
//$res1=$res[0];
$db->select('count');
$result=$db->getResult();
$k= $result['companies'];*/

$query="select * from profile";
$data=mysql_query($query);
$data1=mysql_query($query);
$data2=mysql_query($query);

//$query="select * from pro ep,emp_profile ef,emp_contact ec where ep.emp_id=ef.emp_id and ep.emp_id=ec.emp_id";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>


    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Job Bureau</title>
<link rel="stylesheet" type="text/css" href="style.css" />
<!--SlideShow Files -->
<link rel="stylesheet" type="text/css" href="slideshow.css" />
<script type="text/javascript" src="js/jq_1.4.4.js"></script>
<script type="text/javascript" src="js/jq_slideshow.js"></script>
<script type="text/javascript">
function getlog()
{
	//var date=document.getElementById("date").value;
	var uid=document.getElementById("uid").value;

if (uid=="")
  {

  document.getElementById("txtHint").innerHTML="";
  return;
  }
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","viewuserinfo.php?uid="+uid+"&type="+1,true);
xmlhttp.send();
}
</script>


</head>

<body>
<div class="con1">
<?php include 'headerindex.php' ?>

    <div class="con2">
    <div class="con3">
 .<?php //include 'menu.php' ?>

            <div class="menu_bar_border_bottom"></div>
            <div class="main_con">
            	<div class="left_col">
            	  <p>&nbsp;</p>
            	  <div class="main_news_con">
                    	<div class="main_news_post">
                    	  <div class="clr">
                    	<form name="newad" method="post" enctype="multipart/form-data" action="insertoffer.php">
                            <?php
                        /*$error=$_GET['error'];
                        if($error==0)
                        {
                            echo "success";
                        }
                        elseif($error==4)
                        {
                            echo '';
                        }
                                else
                                    echo "error";*/
                          ?>
						                          <h2 align="center">View ActionLog</h2><br></br>


						<table cellpadding="10" cellspacing="10">

					



						<tr><td><h3>User Name</h3></td>
                        <td>
		                <select id="uid" name="uid" onchange="getlog()">
                        <option value='all' >All Users</option>
                       <?php

                        //$data=get_companyname();
                        while($res1=mysql_fetch_array($data))
                        {
                         echo "<option value='$res1[0]'>".$res1[0]."      -->  ".$res1[1]."</option>";
                        }
                        ?>
                        </select></td>
                        </tr>




						<tr><td><input name="Submit" type="button" value="Refresh" onclick="getlog()"></td></tr>
						</table>
						</form><br>
                               <div id="txtHint"><b>Person info will be listed here.</b></div>

                               <table> <tr><td><h3></h3></td>
                        <td>
                      
                            <form method="post" action="viewuserinfo.php?type=2">
                                <select id="uid" name="uid">
                        <option value='all' >All Users</option>
                       <?php

                        //$data=get_companyname();
                        while($res2=mysql_fetch_array($data1))
                        {
                         echo " <option value='$res2[0]'>".$res2[0]."      -->  ".$res2[1]."</option>";
                       
                        
                        }
                        ?>
                        </select><br />
                        <br />
                             Battery:   <input type="text" name="battery" /><br />
                               Experience <input type="text" name="experience"  /><br />
                                money:<input type="text" name="money" /><br />
                                <input type="submit" value="submit" />
                            </form></td>
                        </tr>
                               </table>
                               <br /><br /><br />

                                 <table> <tr><td><h3>Add Info</h3></td>
                        <td>

                            <form method="post" action="viewuserinfo.php?type=3">
                                <select id="uid" name="uid">
                        <option value='all' >All Users</option>
                       <?php

                        //$data=get_companyname();
                        while($res3=mysql_fetch_array($data2))
                        {
                         echo " <option value='$res3[0]'>".$res3[0]."      -->  ".$res3[1]."</option>";


                        }
                        ?>
                        </select><br />
                        <br />
                             Battery:   <input type="text" name="battery" /><br />
                               Experience <input type="text" name="experience"  /><br />
                                money:<input type="text" name="money" /><br />
                                <input type="submit" value="submit" />
                            </form></td>
                        </tr>
                               </table>




                    	  </div>
                    </div>

               	    <div class="main_news_post">
                          <div class="clr"></div>
                        </div>
                    </div>
                </div>
                <div class="right_col">
                	<div class="right_col_latest_matches">
                    	<div class="right_col_header">
                  <center>  <a href="admin.php" ><font color="white" size="3"> Main Page</font></a></center>
                        </div>

                        <div class="right_col_header">
                       <center>  <a href="logout.php" ><font color="white" size="3"> Logout</font></a></center>
                        </div>


                    </div>

                    <div class="right_col_latest_threads">
                    <?php include('side.php'); ?>


                        <?php include('sponsor.php');?>
                    </div>


                </div>










                <div class="clr"></div>
            </div>

            <?php include('footer.php')?>
        </div>
    </div>
</div>
</body>
</html>
<?php
}
else
{
    header("Location:index.php?error=You are not allowed to Login");
}
?>
