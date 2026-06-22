<!DOCTYPE html>
<html lang="en-US">
<head>
	<meta charset="utf-8">
 	<title><?=$page_title?></title>

 	<meta name="viewport" content="width=device-width">
   <?php
      echo header('X-Frame-Options: SAMEORIGIN');
      //echo header("Content-Security-Policy: img-src https://*; child-src 'self'; frame-ancestors 'self';");
      echo header("Content-Security-Policy: img-src * data:; child-src 'self'; frame-ancestors 'self';");
   ?>

	<?=css('fuel.min', 'fuel')?>

	<?php foreach($css as $m => $c) : echo css(array($m => $c))."\n\t"; endforeach; ?>
	<?=js('jquery/jquery', 'fuel')?>

	<script type="text/javascript">
		<?=$this->load->module_view(FUEL_FOLDER, '_blocks/fuel_header_jqx', array(), TRUE)?>
	</script>

</head>
