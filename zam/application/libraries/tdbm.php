<?php
class tdbm {
	function __construct(){
		require_once('tdbm/merchant_tdbm.xmlrpc.inc.php');
	}
	
	function sendxmlrpc($ApprovalCode, $TranDateTime, $PurchaseAmount) {
		$vArrData[]=new xmlrpcval(array(new xmlrpcval("OMUNITEL"), // 1.  Тухайн байгууллагын merid
				new xmlrpcval(md5("UNitel01")),           // 2.  ХХБ-тай тохиролцсон нууц үг
				new xmlrpcval($ApprovalCode), 		// 3.  Гүйлгээний зөвшөөрлийн код
				new xmlrpcval($TranDateTime),   // 4.  Гүйлгээний огноо
				new xmlrpcval($PurchaseAmount)			// 5.  Гүйлгээний үнийн дүн
		),"struct");
		$f = new xmlrpcmsg("chkTxn", array(new xmlrpcval($vArrData, "array")));
		$c = new xmlrpc_client("/server.php", "www.cardcentre.mn", 80);
		$c->setDebug(0);
		$r = $c->send($f);
		$v = $r->value();
		return "YES";
	}
}