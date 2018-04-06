<?php
	function _to_int($id) {
        $req = substr($id, 0, 8);
        $req = intval($req);
        return $req;
	}

	function _to_string($data) {
		$req = $data;
		if(get_magic_quotes_gpc()) {
			$req = stripslashes($req);
		}
		/*if (phpversion() >= '4.3.0'){
			$req = mysql_escape_string($req);
		} else {
			$req = mysql_escape_string($req);
		}*/
		return $req;
	}

?>
