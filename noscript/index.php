<?php

// get all languages that the brownser has been configured
function get_Languages() {
	
	$splitA = explode(",", $_SERVER['HTTP_ACCEPT_LANGUAGE']);
	$newA = '';
	$i = 0;
	
	foreach ($splitA as $key)
	{
		$splitB = explode(";", $key);
		
		$newA[$i] = $splitB[0];
		$i++;
			
	}
  
  return $newA; 
   
}

$nav_lang = get_Languages();

clearstatcache();

$found = false;
 
/* 
  loop to verify if what is the first langage detected by brownser
*/
foreach ($nav_lang as $item) { 
     
     $json_file = 'lang/'. $item . "json";
     
      if(file_exists($item)) {
        $found = true;
        break; 
      }
} 

if (!$found) {
  $nav_lang = 'lang/en.json';
}

$string = file_get_contents($nav_lang);
$json   = json_decode($string, true);

$title   = $json['title'];
$desc    = $json['desc'];
$alert1  = $json['alert1'];

$ie7_1  = $json['ie7_1'];
$ie7_2  = $json['ie7_2'];
$ie7_3  = $json['ie7_3'];
$ie7_4  = $json['ie7_4'];
$ie7_5  = $json['ie7_5'];
$ie7_6  = $json['ie7_6'];
$ie7_7  = $json['ie7_7'];
$ie7_8  = $json['ie7_8'];

$ie6_1  = $json['ie7_1'];
$ie6_2  = $json['ie7_2'];
$ie6_3  = $json['ie7_3'];
$ie6_4  = $json['ie7_4'];
$ie6_5  = $json['ie7_5'];
$ie6_6  = $json['ie7_6'];
$ie6_7  = $json['ie7_7'];

$ff_1  = $json['ff_1'];
$ff_2  = $json['ff_2'];
$ff_3  = $json['ff_3'];
$ff_4  = $json['ff_4'];
$ff_5  = $json['ff_5'];

$as_1  = $json['as_1'];
$as_2  = $json['as_2'];
$as_3  = $json['as_3'];
$as_4  = $json['as_4'];

$ob_1  = $json['ob_1'];
$ob_2  = $json['ob_2'];
$ob_3  = $json['ob_3'];
$ob_4  = $json['ob_4'];
$ob_5  = $json['ob_5'];
$ob_6  = $json['ob_6'];


?>          







<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!-- saved from url=(0059)http://www.appslibrary.com/requirements/js_instruction.html -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	
	<title>How to enable JavaScript</title>
<style type="text/css"></style></head>

<body bgcolor="#FFFFFF" text="#000000" link="#0000FF" alink="#0000FF" vlink="#0000FF">

<div align="center" width="80%">
	<p align="justify" style="width: 80%;">
		<b><?php echo $title; ?></b><br><br>
		<?php echo $desc; ?>
		<br><br>
		*<i><?php echo $alert1; ?></i> 
	</p>
</div>


<table width="80%" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
	<tbody><tr>
		<td valign="top">
			<a href="#IE7"><img src="img/IE7-logo.jpg" alt="MSIE 7" height="91" border="0"></a>
		</td>
		<td valign="top">
			<a href="http://www.appslibrary.com/requirements/js_instruction.html#IE6"><img src="img/IE6-logo.jpg" alt="MSIE 6" height="91" border="0"></a>
		</td>
		<td valign="top">
			<a href="http://www.appslibrary.com/requirements/js_instruction.html#FF"><img src="img/FF-logo.jpg" alt="Mozilla Fire Fox" height="91" border="0"></a>
		</td>
		<td valign="top">
			<a href="http://www.appslibrary.com/requirements/js_instruction.html#SA"><img src="img/SA-logo.jpg" alt="Apple Safari" height="91" border="0"></a>
		</td>
		<td valign="top">
			<a href="http://www.appslibrary.com/requirements/js_instruction.html#O"><img src="img/O-logo.jpg" alt="Opera Browser" height="91" border="0"></a>
		</td>
	</tr>
</tbody></table>

<br><br>
<hr size="1" color="#000000" width="80%">
<br>

<table width="80%" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
	<tbody><tr>
		<td valign="center" colspan="2">
			<a name="IE7"></a><h1><img src="img/IE7-logo.jpg">Microsoft Internet Explorer 7</h1>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/IE7-1.gif">
		</td>
		
		<td valign="center">
			<img src="img/IE7-2.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote>
			1. <?php echo $ie7_1; ?><br>
			2. <?php echo $ie7_2; ?>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			3. <?php echo $ie7_3; ?><br>
			4. <?php echo $ie7_4; ?>
			</blockquote>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/IE7-3.gif">
		</td>
		
		<td valign="center">
			<img src="img/IE7-4.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote><br>
			5. <?php echo $ie7_5; ?><br>
			6. <?php echo $ie7_6; ?><br>
			7. <?php echo $ie7_7; ?>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			8. <?php echo $ie7_8; ?>
			</blockquote>
		</td>
	</tr>
</tbody></table>

<hr size="1" color="#000000" width="80%">
<br>

<table width="80%" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
	<tbody><tr>
		<td valign="center" colspan="2">
			<a name="IE6"></a><h1><img src="img/IE6-logo.jpg">Microsoft Internet Explorer 6</h1>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/IE6-1.gif">
		</td>
		
		<td valign="center">
			<img src="img/IE6-2.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote>
			1. <?php echo $ie6_1; ?><br>
			2. <?php echo $ie6_2; ?>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			3. <?php echo $ie6_3; ?><br>
			4. <?php echo $ie6_4; ?>
			</blockquote>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/IE6-3.gif">
		</td>
		
		<td valign="center">
			<img src="img/IE6-4.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote><br>
			5. <?php echo $ie6_5; ?><br>
			6. <?php echo $ie6_6; ?>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			7. <?php echo $ie6_7; ?>
			</blockquote>
		</td>
	</tr>
</tbody></table>


<hr size="1" color="#000000" width="80%">
<br>

<table width="80%" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
	<tbody><tr>
		<td valign="center" colspan="2">
			<a name="FF"></a><h1><img src="img/FF-logo.jpg">Mozilla FireFox 1.5</h1>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/FF-1.gif">
		</td>
		
		<td valign="center">
			<img src="img/FF-2.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote>
			1. <?php echo $ff_1; ?><br>
			2. <?php echo $ff_2; ?>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			3. <?php echo $ff_3; ?><br>
			4. <?php echo $ff_4; ?><br>
			5. <?php echo $ff_5; ?>
			
			</blockquote>
		</td>
	</tr>
	
</tbody></table>



<hr size="1" color="#000000" width="80%">
<br>

<table width="80%" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
	<tbody><tr>
		<td valign="center" colspan="2">
			<a name="SA"></a><h1><img src="img/SA-logo.jpg">Apple Safari</h1>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/SA-1.gif">
		</td>
		
		<td valign="center">
			<img src="img/SA-2.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote>
			1. <?php echo $as_1; ?><br>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			2. <?php echo $as_2; ?><br>
			3. <?php echo $as_3; ?><br>
				
			</blockquote>
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<img src="img/SA-3.gif">
		</td>
		
		
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote>
			4. <?php echo $as_4; ?><br>
			</blockquote>
		</td>
		
	</tr>
</tbody></table>

<hr size="1" color="#000000" width="80%">
<br>

<table width="80%" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
	<tbody><tr>
		<td valign="center" colspan="2">
			<a name="O"></a><h1><img src="img/O-logo.jpg">Opera Web Browser</h1>
		</td>
	</tr>
	
	<tr>
		<td valign="center">
			<img src="img/O-1.gif">
		</td>
		
		<td valign="center">
			<img src="img/O-2.gif">
		</td>
	</tr>
	
	
	<tr>
		<td valign="center">
			<blockquote>
			1. <?php echo $ob_1; ?><br>
			2. <?php echo $ob_2; ?>
			</blockquote>
		</td>
		
		<td valign="center">
			<blockquote>
			<br>
			3. <?php echo $ob_3; ?><br>
			4. <?php echo $ob_4; ?><br>
			5. <?php echo $ob_5; ?><br>
			6. <?php echo $ob_6; ?>
			
			</blockquote>
		</td>
	</tr>
	
</tbody></table>



</body></html>