<?
function get_include_contents($filename) {
    if (is_file($filename)) {
        ob_start();
        include $filename;
        return ob_get_clean();
    }
    return false;
}

function head ($title) {

	$head_top = <<< EOF
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
		<meta http-equiv="Content-Language" content="en-gb">
		<meta name="keywords" content="IXLeeds, IX, Leeds, Internet, Exchange, Peering, Mutual, Non Profit">
		<meta name="description" content="Leeds Internet Exchange Point IX">
		<!--[if lt IE 9]>
			<script src="../../../js/html5shiv.js"></script>
		<![endif]-->
		<link rel="stylesheet" type="text/css" href="../../../fonts/fonts.css" />
		<link rel="stylesheet" type="text/css" href="../../../js/jquery.bxslider.css" />
		<link rel="stylesheet" type="text/css" href="../../../css/style.css" />
		<script src="../../../js/jquery-1.11.1.min.js"></script>
		<script src="../../../js/jquery.flot.min.js"></script>
		<script src="../../../js/jquery.bxslider.min.js"></script>
		<script src="../../../js/common.js"></script>
	
EOF;


	$head_bottom = <<< EOF
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-24902438-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

</head>

EOF;

	print $head_top . "	<title>".$title."</title>\n" . $css . $head_bottom;
}
