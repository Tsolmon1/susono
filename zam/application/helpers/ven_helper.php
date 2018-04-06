<?php
function _recaptcha_qsencode ($data) {
        $req = "";
        foreach ( $data as $key => $value )
                $req .= $key . '=' . urlencode( stripslashes($value) ) . '&';

        // Cut the last '&'
        $req=substr($req,0,strlen($req)-1);
        return $req;
}




function msg($key){
	require("msg_mn.inc.php");
	
	$msg = "";
	if(isset($MSG[$key])){
		$msg = $MSG[$key];
	} else {
		$msg = $key;
	}
	return($msg);
}


function split_date($str){
	return format_date($str);
}

function format_date($str){
	if(strlen($str) == 8){
		return substr($str, 0, 4)."-".substr($str, 4, 2)."-".substr($str, 6, 2);
	}
	return $str;
}


function format_time($str){
	if(strlen($str) == 6){
		return substr($str, 0, 2).":".substr($str, 2, 2).":".substr($str, 4, 2);
	}
	return $str;
}

function format_duration($dur, $pbx){
	$ret_str = "";
	if(isset($pbx) && $pbx == 'SMSC' || $pbx == 'CRBT'){
		$ret_str = "1";
	} elseif(isset($pbx) && $pbx == 'GPRS') {
		$ret_str = number_format($dur/1024, 2, '.', '');
	} elseif(isset($pbx) && $pbx == 'MSC') {
		if($dur < 60){
			if($dur < 10){
				$ret_str .= "00:00:0$dur";
			} else {
				$ret_str .= "00:00:$dur";
			}
		} elseif($dur >= 60 && $dur < 3600){
			$sec = $dur%60;
			$minut = ($dur-$sec)/60;
			if($minut < 10){ $ret_str .= "00:0$minut:";} else { $ret_str .= "00:$minut:";}
			if($sec < 10){ $ret_str .= "0$sec";} else { $ret_str .= "$sec";}
	} elseif($dur >= 3600){
			$dur1 = $dur%3600;
			$sec = $dur1%60;
			$minut = ($dur1-$sec)/60;
			$hour = ($dur-$minut*60-$sec)/3600;
			if($hour < 10){ $ret_str .= "0$hour:";} else { $ret_str .= "$hour:";}
			if($minut < 10){ $ret_str .= "0$minut:";} else { $ret_str .= "$minut:";}
			if($sec < 10){ $ret_str .= "0$sec";} else { $ret_str .= "$sec";}
		}
	} else {
		$ret_str = $dur;
	}
	return $ret_str;
}

function ven_randomkeys($length, $max){
    $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
    $key  = $pattern{rand(0,$max)};
    for($i=1;$i<$length;$i++){
        $key .= $pattern{rand(0,$max)};
    }
    return $key;
}

function ven_getRealIpAddr(){
	if (!empty($_SERVER['HTTP_CLIENT_IP']))  {
		$ip=$_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
		$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip=$_SERVER['REMOTE_ADDR'];
	}
	return $ip;
}

?>
