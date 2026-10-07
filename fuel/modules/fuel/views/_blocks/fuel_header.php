<?php
/**
 * Variables
 * @var string $page_title
 * @var array $css
 */
?>
<!DOCTYPE html>
<html lang="en-US">
<head>
	<meta charset="utf-8">
 	<title><?=$page_title?></title>

 	<meta name="viewport" content="width=device-width">

	<?=css('fuel.min', 'fuel')?>

	<?php foreach($css as $m => $c) : echo css(array($m => $c))."\n\t"; endforeach; ?>
	<?=js('jquery/jquery', 'fuel')?>

	<script type="text/javascript">
		<?=$this->load->module_view(FUEL_FOLDER, '_blocks/fuel_header_jqx', array(), TRUE)?>
	</script>

   <?php
      $rootFaviconPath = __DIR__ . '/favicon.ico';
      $rootFaviconUrl = site_url('favicon.ico');
      $fallbackFaviconUrl = img_path('favicon.ico');

      $faviconUrl = file_exists($rootFaviconPath) ? $rootFaviconUrl : $fallbackFaviconUrl;
      $extension = pathinfo($faviconUrl, PATHINFO_EXTENSION);
      switch($extension) {
         case 'png'  : $type = 'image/png'; break;
         case 'svg'  : $type = 'image/svg+xml'; break;
         default     : $type = 'image/x-icon'; break;
      }
      $type = 'image/x-icon';
   ?>
   <link rel="icon" type="<?= htmlspecialchars($type) ?>" href="<?= htmlspecialchars($faviconUrl) ?>">

</head>
