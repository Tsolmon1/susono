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

function format_cdr_type($desc, $dial){
	switch($desc){
		case "IDD call"			: $desc = msg("idd"); break;
		case "SMS(Unitel)"		: $desc = msg("unitel"); break;
		case "Local(UNITEL)"	: $desc = msg("unitel"); break;
		case "DDD(UNITEL)"		: $desc = msg("unitel"); break;
		case "Local VCall(UNITEL O)": $desc = msg("unitel_vcall"); break;
		case "Local VCall(UNITEL I)": $desc = msg("unitel_vcall"); break;
		case "DDD VCall(UNITEL O)": $desc = msg("unitel_vcall"); break;
		case "DDD VCall(UNITEL I)": $desc = msg("unitel_vcall"); break;
		case "Internet packet"	: $desc = msg("internet_packet"); break;
		case "PS2PPS Unit transfer"	: $desc = msg("ps2pps"); break;
		case "THS"	: $desc = msg("roaming_sms"); break;
		case "Local(PSTN)"		: $desc = msg("mtelecom"); break;
		case "DDD(PSTN)"		: $desc = msg("mtelecom"); break;
		case "Local(WLL)"		: $desc = msg("local_wll"); break;
		case "Local(Mobile)"	: 
			if(substr($dial,0,2) == "99" || substr($dial,0,2) == "95"){
				$desc = msg("mobicom");
			} elseif(substr($dial,0,2)== "96" || substr($dial,0,2) == "91"){
				$desc = msg("skytel");
			} elseif(substr($dial,0,2)== "98"){
				$desc = msg("g-mobile");
			} elseif(substr($dial,0,2)== "92"){
				$desc = msg("governement");
			} elseif(substr($dial,0,2)== "70"){
				$desc = msg("mtelecom");
			} break;
		case "DDD(Mobile)"		: $desc = msg("ddd_mobile"); break;
		case "SMS(Mobicom)"		: $desc = msg("mobicom"); break;
		case "SMS(Skytel)"		: $desc = msg("skytel"); break;
		case "SMS(G-Mobile)"	: $desc = msg("g-mobile"); break;
		case "SMS(MTC)"			: $desc = msg("mtelecom"); break;
		case "Premium SMS"		: $desc = msg("premium_sms"); break;
		case "Premium"			: $desc = msg("premium_sms"); break;
		default					: break;
	}
	return $desc;
}

function str_year($max, $cur){
	$str = "";
	for($i = 2008; $i <= $max; $i ++){
		if($i == $cur){
			$str .= "<option value=\"$i\" selected>$i</option>\n";
		} else {
			$str .= "<option value=\"$i\">$i</option>\n";
		}
	}
	return($str);
}
function str_month_day($max, $cur){
	$str = "";
	for($i = 1; $i < $max; $i ++)
	{
		if($i == $cur) {
			$str .= "<option value=\"$i\" selected>$i</option>\n";
		} else {
			$str .= "<option value=\"$i\">$i</option>\n";
		}
	}
	return($str);
}
function str_page($cur){
	$str = "";
	$arr = array(20, 40, 100, 150, 200);
	foreach($arr as $i)
	{
		if($i == $cur) {
			$str .= "<option value=\"$i\" selected>$i</option>\n";
		} else {
			$str .= "<option value=\"$i\">$i</option>\n";
		}
	}
	return($str);
}

function ven_get_bank_name($id){
	$arr_banks = array("banks1"=>"Голомт банк, Төрийн банк, Капитрон банк, Хас банк", "banks2"=>"ХХБ, УБ Банк, Американ экспресс, JCB");
	return $arr_banks[$id];
}

function ven_get_bank_url($id){
	$arr_banks_url = array("banks1"=>"https://www.egolomt.mn/billing/cardinfo.aspx", "banks2"=>"https://www.cardcentre.mn:6330/shopindex.jsp");
	return $arr_banks_url[$id];
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

function ven_merchant_desc($id){
	$bank_desc = array("parameter=>trans_number=>empty",
				"parameter=>success=>1",
				"database=>row=>null",
				"soap=>hiigdej_bgaagui",
				"soap=>guilgee_amjiltgui",
				"soap=>login_buruu",
				"soap=>golomt_server",
				11=>"order=>declined",
				"order=>unknown",
				"order=>error",
				22=>"amount=>notequal",
				44=>"successful=>bank",
				"unsuccesful=>bank",
				"successful=>TEST",
				88=>"successful=>payment",
				"unsuccesful=>payment",
				"billing=>error");
	if(isset($bank_desc[$id])){
		return $bank_desc[$id];
	} else {
		"unknown error";
	}
}

function ven_distribute_desc($id){
	$bank_desc = array(50 => "",
				"Гүйлгээ олдсон",
				"Гүйлгээ олдсон",
				"Гүйлгээг эхлүүлэх",
				54 => "Гар утас",
				55 => "Төлбөр төлөгдсөн",
				56 => "Картаар цэнэглэсэн");
	if(isset($bank_desc[$id])){
		return $bank_desc[$id];
	} else {
		return "unknown error";
	}
}

function ven_status($id){
	$status_desc = array(0 => "<b>ИДЭВХИГҮЙ</b>",
				"<b>ИДЭВХИТЭЙ</b>");
	$status_desc2 = array(0 => "Үйлчилгээ идэвхигүй",
				"Үйлчилгээ Идэвхитэй");
	if(isset($status_desc[$id])){
		return $status_desc[$id];
	} else {
		return "";
	}
}



function sendSMS($to, $sms) {
	$from = "1472";
	$ip = "http://10.21.5.10:6609";
	$request = xmlrpc_encode_request("sms.sendSms", array($from, $to, $sms));
	$context = stream_context_create(array('http' => array(
		'method' => "POST",
		'header' => "Content-Type: text/xml",
		'content' => $request
	)));
	$file = file_get_contents(($ip."/xmlrpc"), false, $context);
	$response = xmlrpc_decode($file);
}

function sendSMS2($to, $sms, $type = "text") {
	$from = "1472";
	$ip="http://10.21.5.10:6609";
	if($type=="flash"){
		$request = xmlrpc_encode_request("sms.flashSms", array($from, $to, $sms));
	} elseif($type=="wappush"){
		$request = xmlrpc_encode_request("sms.wapPushSms", array($from, $to, $sms, $url));
		$ip="http://10.21.5.10:6609";
	} else {
		$request = xmlrpc_encode_request("sms.sendSms", array($from, $to, $sms));
	}
	$context = stream_context_create(array('http' => array(
		'method' => "POST",
		'header' => "Content-Type: text/xml",
		'content' => $request
	)));
	$file = file_get_contents(($ip."/xmlrpc"), false, $context);
	$response = xmlrpc_decode($file);
	if ($response && xmlrpc_is_fault($response)) {
		trigger_error("xmlrpc: $response[faultString] ($response[faultCode])");
		return "trigger_error";
	} else {
		print_r($response);
		//return $to;
	}
}
?>
