<?php
$file = @ fopen('http://ix2.ixleeds.net/ixleeds-wo5u4tjklw.png', 'rb');
if ($file) {
	header('Content-type: image/png');
	fpassthru($file);
	exit;
}
?>
