<?php 
date_default_timezone_set('Asia/Ulaanbaatar');
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class ProductModel extends CI_Model {
	function __construct()
	{
		parent::__construct();
		$this->load->helper('encryption');
		$this->dbmysql = $this->load->database('default', true);
	}
	
	function get_jobs() {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		//$per = 1;
		if($per == 1) {
			$sql = "SELECT j.id,j.name,j.start_date as start,j.end_date as deadline,j.end_date_last as deadline1,j.location,c.name as contractorName, j.company_id FROM jobs j INNER JOIN companys c ON c.id=j.company_id";
		} else {
			$sql = "SELECT j.id,j.name,j.start_date as start,j.end_date as deadline,j.end_date_last as deadline1,j.location,c.name as contractorName, j.company_id FROM jobs j INNER JOIN companys c ON c.id=j.company_id WHERE j.id IN (SELECT job_id FROM users_jobs WHERE user_id=".$uid.")";
		}
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_jobs_by_id($id) {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		//$per = 1;
		if($per == 1) {
			$sql = "SELECT j.id,j.name,j.start_date as start,j.end_date as deadline,j.end_date_last as deadline1,j.location,c.name as contractorName,j.groups FROM jobs j INNER JOIN companys c ON c.id=j.company_id WHERE j.id=".$id;
		} else {
			$sql = "SELECT j.id,j.name,j.start_date as start,j.end_date as deadline,j.end_date_last as deadline1,j.location,c.name as contractorName,j.groups FROM jobs j INNER JOIN companys c ON c.id=j.company_id WHERE j.id IN (SELECT job_id FROM users_jobs WHERE user_id=".$uid.") and j.id=".$id;
		}
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_job_by_id($id) {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		//$per = 1;
		if($per == 1) {
			$sql = "SELECT j.id,j.name,j.start_date as start,j.end_date as deadline,j.end_date_last deadline1,j.location,c.name as contractorName,j.groups,j.path_types,c.id as cid FROM jobs j INNER JOIN companys c ON c.id=j.company_id WHERE j.id=".$id;
		} else {
			$sql = "SELECT j.id,j.name,j.start_date as start,j.end_date as deadline,j.end_date_last deadline1,j.location,c.name as contractorName,j.groups,j.path_types,c.id as cid FROM jobs j INNER JOIN companys c ON c.id=j.company_id WHERE j.id IN (SELECT job_id FROM users_jobs WHERE user_id=".$uid.") and j.id=".$id;
		}
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_sub_jobs($id) {
		$sql = "SELECT id,name,start_date as start,end_date as deadline FROM sub_jobs WHERE job_id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_path_types($id = 0) {
		if($id == 0) {
			$sql = "SELECT * FROM path_types";
			$query = $this->dbmysql->query($sql);
			$result = $query->result_array();
			$query->free_result();
			return $result;
		} else {
			$sql = "SELECT path_types FROM jobs WHERE id = ".$id;
			$query = $this->dbmysql->query($sql);
			$result = $query->row_array();
			$query->free_result();
			$sql = "SELECT * FROM path_types WHERE id IN(".$result['path_types'].")";
			$query = $this->dbmysql->query($sql);
			$result = $query->result_array();
			$query->free_result();
			return $result;
		}
	}

	function get_permissions() {
		$sql = "SELECT * FROM permissions";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_path_types_id($id) {
		$sql = "SELECT * FROM path_types WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_paths($id,$sid) {
		$sql = "SELECT * FROM paths WHERE job_id=".$id." and sub_job_id=".$sid;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_paths_id($id) {
		$sql = "SELECT * FROM paths WHERE job_id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_job_plans($id,$sid) {
		$sql = "SELECT id,start_date as start,end_date as deadline,percent FROM sub_job_plans WHERE path_type_id=".$id." and sub_job_id=".$sid;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_job_plans_loc($id,$sid,$jid) {
		$sql = "SELECT s.id,s.start_date as start,s.end_date as deadline,s.percent,s.path_type_id,p.lat,p.lon,p.id as pid FROM sub_job_plans s INNER JOIN paths p ON s.sub_job_id=p.sub_job_id WHERE p.id=s.path_id and s.path_type_id=".$id." and s.sub_job_id=".$sid." and p.job_id=".$jid;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_job_ratings($id) {
		$sql = "SELECT id FROM sub_job_plans WHERE id IN (SELECT id FROM sub_jobs WHERE job_id=".$id.")";
		$sql = "SELECT SUM(s.rate) as rate FROM sub_job_ratings s INNER JOIN sub_job_plans p ON s.sub_job_plan_id=p.id WHERE s.sub_job_plan_id IN (".$sql.")";
		$sql = "SELECT rate FROM sub_job_ratings WHERE sub_job_plan_id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		if($result['rate'] == null) {
			return 0;
		} else {
			return $result['rate'];
		}
	}
	
	function get_job_images($id,$pid,$type) {
		$sql = "SELECT j.*,p.lat,p.lon FROM jobs_images j,paths p WHERE j.job_id=p.sub_job_id and j.job_id=".$id." and path_id=".$pid." and path_type_id=".$type;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_job_images_all($id) {
		$sql = "SELECT j.*,p.lat,p.lon,p.id as pid FROM jobs_images j,paths p WHERE j.job_id=p.job_id and j.path_id=p.id and j.job_id=".$id." group by j.path_type_id";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_equipments() {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		$sql = "SELECT e.*,s.name as company_name FROM equipments e INNER JOIN company_equipments c ON e.id=c.equipment_id INNER JOIN companys s ON c.company_id=s.id WHERE s.id IN (SELECT company_id FROM users_jobs WHERE user_id=$uid)";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_equipments_by_id($id) {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		$sql = "SELECT e.*,s.name as company_name FROM equipments e INNER JOIN company_equipments c ON e.id=c.equipment_id INNER JOIN companys s ON c.company_id=s.id WHERE e.id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}

	function edit_equipment($id,$name,$image,$power,$desc,$cid) {
		if($image != '') {
			$sql = "UPDATE equipments SET name='".$name."',image='".$image."',power='".$power."',e_desc='".$desc."' WHERE id=".$id;
			$query = $this->dbmysql->query($sql);
		} else {
			$sql = "UPDATE equipments SET name='".$name."',power='".$power."',e_desc='".$desc."' WHERE id=".$id;
			$query = $this->dbmysql->query($sql);
		}		

		$sql = "UPDATE company_equipments SET company_id=".$cid." WHERE equipment_id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function add_equipment($name,$image,$power,$desc,$cid) {
		$sql = "INSERT INTO equipments(name,image,power,e_desc) values('".$name."','".$image."','".$power."','".$desc."')";
		$query = $this->dbmysql->query($sql);

		$sql = "SELECT max(id) as id FROM equipments";
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();

		$sql = "INSERT INTO company_equipments(company_id,equipment_id) values(".$cid.",".$result['id'].")";
		$query = $this->dbmysql->query($sql);
	}

	function delete_equipment($id) {
		$sql = "DELETE FROM equipments WHERE id=".$id;
		$query = $this->dbmysql->query($sql);

		$sql = "DELETE FROM company_equipments WHERE equipment_id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function get_users() {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		if($per == 1) {
			$sql = "SELECT u.*,p.name,c.name as cname FROM users u INNER JOIN permissions p ON u.permission_id=p.id INNER JOIN companys c ON c.id=u.company_id";
		} else {
			$sql = "SELECT u.*,p.name,c.name as cname FROM users u INNER JOIN permissions p ON u.permission_id=p.id INNER JOIN companys c ON c.id=u.company_id
			WHERE u.id=".$uid;
		}
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_user_by_id($id) {
		$sql = "SELECT u.*,p.name,c.name as cname FROM users u INNER JOIN permissions p ON u.permission_id=p.id INNER JOIN companys c ON c.id=u.company_id WHERE u.id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}

	function edit_user($id,$name,$pass,$phone,$email,$permission,$cid) {
		$sql = "UPDATE users SET username='".$name."',password='".$pass."',company_id=".$cid.",phone='".$phone."',email='".$email."',permission_id=".$permission." WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function add_user($name,$pass,$phone,$email,$permission,$id) {
		$sql = "INSERT INTO users(username,password,company_id,email,phone,permission_id) values('".$name."','".base64_encode($pass)."',".$id.",'".$email."','".$phone."',".$permission.")";
		$query = $this->dbmysql->query($sql);
	}

	function delete_user($id) {
		$sql = "DELETE FROM users WHERE id=".$id;
		$query = $this->dbmysql->query($sql);

		$sql = "DELETE FROM users_jobs WHERE user_id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function get_companys() {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		$sql = "SELECT * FROM companys WHERE id IN (SELECT company_id FROM users_jobs WHERE user_id=$uid)";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_companys_by_id($id) {
		$sql = "SELECT * FROM companys WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}

	function edit_company($id,$name,$reg,$phone,$email,$address,$rank,$ready) {
		$sql = "UPDATE companys SET name='".$name."',register='".$reg."',phone='".$phone."',email='".$email."',address='".$address."',rank='".$rank."'
		,ready_type='".$ready."' WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function add_company($name,$reg,$phone,$email,$address,$rank,$ready) {
		$sql = "INSERT INTO companys(name,register,phone,email,address,rank,ready_type) values('".$name."','".$reg."','".$phone."','".$email."','".$address."','".$rank."'
		,'".$ready."')";
		$query = $this->dbmysql->query($sql);
	}

	function delete_company($id) {
		$sql = "DELETE FROM companys WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function get_equipments_company($id) {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		$sql = "SELECT e.*,s.name,s.id FROM equipments e INNER JOIN company_equipments c ON e.id=c.equipment_id INNER JOIN companys s ON c.company_id=s.id WHERE c.company_id=".$id;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_user_job() {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');	
		if($per != 1) {	
			$sql = "SELECT u.id,u.user_id,s.username,c.name as company_name,j.name as job_name FROM users_jobs u INNER JOIN users s ON u.user_id=s.id INNER JOIN companys c ON u.company_id=c.id INNER JOIN jobs j ON u.job_id=j.id
			WHERE u.user_id=".$uid;
		} else {
			$sql = "SELECT u.id,u.user_id,s.username,c.name as company_name,j.name as job_name FROM users_jobs u INNER JOIN users s ON u.user_id=s.id INNER JOIN companys c ON u.company_id=c.id INNER JOIN jobs j ON u.job_id=j.id
			";
		}
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}

	function get_user_job_id($id) {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('id');
		$sql = "SELECT u.id,u.user_id,s.username,c.id as company_id,c.name as company_name,j.id as job_id, j.name as job_name FROM users_jobs u INNER JOIN users s ON u.user_id=s.id INNER JOIN companys c ON u.company_id=c.id INNER JOIN jobs j ON u.job_id=j.id
		WHERE u.id=".$id;
		
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}

	function set_user_job($id,$jid,$cid) {
		$sql = "INSERT INTO users_jobs(user_id,job_id,company_id) values(".$id.",".$jid.",".$cid.")";
		$query = $this->dbmysql->query($sql);
	}

	function edit_user_job($id,$jid) {
		$sql = "UPDATE users_jobs SET job_id=".$jid." WHERE user_id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function delete_user_job($id) {
		$sql = "DELETE FROM users_jobs WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}
	
	function set_job($name,$cid,$sdate, $edate, $loc, $group, $types) {
		$sql = "INSERT INTO jobs(name,company_id,start_date,end_date,location,groups,path_types) values('"._to_string($name)."',"._to_int($cid).",'"._to_string($sdate)."','"._to_string($edate)."','"._to_string($loc)."',".$group.",'".$types."')";
		$query = $this->dbmysql->query($sql);
	}

	function edit_job($id,$name,$cid,$sdate, $edate, $loc, $group, $types) {
		$sql = "UPDATE jobs SET name='"._to_string($name)."',company_id="._to_int($cid).",start_date='"._to_string($sdate)."',end_date='"._to_string($edate)."',location='"._to_string($loc)."',groups=".$group.",path_types='".$types."' WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function delete_job($id) {
		$sql = "DELETE FROM jobs WHERE id=".$id;
		$query = $this->dbmysql->query($sql);

		$sql = "DELETE FROM sub_jobs WHERE job_id=".$id;
		$query = $this->dbmysql->query($sql);

		$sql = "DELETE FROM paths WHERE job_id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function set_sub_job($name,$id,$sdate, $edate) {
		//$sdate1 = explode(",", $sdate);
		//$edate1 = explode(",", $edate);
		for($i=1;$i<=$name;$i++) {
			$sql = "INSERT INTO sub_jobs(job_id,name,start_date,end_date) values("._to_string($id).",'"._to_string($i)."-р хэсэг','"._to_string($sdate)."','"._to_string($edate)."')";
			$query = $this->dbmysql->query($sql);
		}
	}

	function edit_sub_job($name,$id,$sdate, $edate) {
		//$sdate1 = explode(",", $sdate);
		//$edate1 = explode(",", $edate);
		for($i=1;$i<=$name;$i++) {
			$sql = "INSERT INTO sub_jobs(job_id,name,start_date,end_date) values("._to_string($id).",'"._to_string($i)."-р хэсэг','"._to_string($sdate)."','"._to_string($edate)."')";
			$query = $this->dbmysql->query($sql);
		}
	}

	function get_job_id() {
		$sql = "SELECT max(id) as id FROM jobs";
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result['id'];
	}

	function get_sub_job_id() {
		$sql = "SELECT max(id) as id FROM sub_jobs";
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result['id'];
	}

	function set_path($id,$sid,$lat, $lng) {
		$sql = "SELECT * FROM paths WHERE job_id=".$id." and sub_job_id=".$sid;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		
		if(empty($result)) {
			$sql = "INSERT INTO paths(job_id,sub_job_id,lat,lon) values("._to_int($id).","._to_int($sid).",'"._to_string($lat)."','"._to_string($lng)."')";
			$query = $this->dbmysql->query($sql);
		} else {
			// $sql = "DELETE FROM paths WHERE job_id=".$id." and sub_job_id=".$sid;
			// $query = $this->dbmysql->query($sql);

			$sql = "INSERT INTO paths(job_id,sub_job_id,lat,lon) values("._to_int($id).","._to_int($sid).",'"._to_string($lat)."','"._to_string($lng)."')";
			$query = $this->dbmysql->query($sql);
		}
	}

	function delete_paths($id,$sid) {
		$sql = "DELETE FROM paths WHERE job_id=".$id." and sub_job_id=".$sid;
		$query = $this->dbmysql->query($sql);
	}

	function edit_path($id,$type,$desc) {
		$sql = "UPDATE jobs_images SET path_type_id='".$type."',image_desc='".$desc."' WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function delete_path($id) {
		$sql = "DELETE FROM jobs_images WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
	}

	function set_job_image($id,$sid,$pid,$tid,$image,$desc) {
		$sql = "SELECT * FROM jobs_images WHERE job_id=".$id." and sub_job_id=".$sid." and path_id=".$pid." and path_type_id=".$tid;
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		$res = "yes";
		
		if(empty($result)) {
			$sql = "INSERT INTO jobs_images(job_id,sub_job_id,path_id,path_type_id,image_date,image,image_desc) values("._to_int($id).","._to_int($sid).","._to_int($pid).","._to_int($tid).",'".date('Y-m-d H:i:s')."','"._to_string($image)."','"._to_string($desc)."')";
			$query = $this->dbmysql->query($sql);			
		} else {
			$sql = "UPDATE jobs_images SET image_date='".date('Y-m-d H:i:s')."',image='"._to_string($image)."',image_desc='"._to_string($desc)."' WHERE job_id=".$id." and sub_job_id=".$sid." and path_id=".$pid." and path_type_id=".$tid;
			$query = $this->dbmysql->query($sql);
			//$sql = "INSERT INTO jobs_images(job_id,sub_job_id,path_id,path_type_id,image_date,image,image_desc) values("._to_int($id).","._to_int($sid).","._to_int($pid).","._to_int($tid).",'".date('Y-m-d H:i:s')."','"._to_string($image)."','"._to_string($desc)."')";
			//$query = $this->dbmysql->query($sql);
			$res = "no";
		}

		$this->set_job_plan($id,$sid,$tid,$pid,$res);
		return $res;
	}

	function checkPoint($point, $polygon){
	    $nodepolarity = false;
	    $sides = count($polygon);
	    $j = $sides -1;
	    for($i=0;$i<$sides;$i++){
	        if(($polygon[$i][1]<$point[1] && $polygon[$j][1]>=$point[1]) || ($polygon[$j][1]<$point[1] && $polygon[$i][1]>=$point[1])){
	            if ($polygon[$i][0]+($point[1]-$polygon[$i][1])/($polygon[$j][1]-$polygon[$i][1])*($polygon[$j][0]-$polygon[$i][0])<$point[0]) {
	                $nodepolarity = true; 
	            }
	        }
	    	$j=$i;
	    }
	    return $nodepolarity; //FALSE=OUTSIDE, TRUE=INSIDE
	}

	function GetDrivingDistance($lat1, $lat2, $long1, $long2)
	{
	    $url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=".$lat1.",".$long1."&destinations=".$lat2.",".$long2."&mode=driving";	    
	    $ch = curl_init();
	    curl_setopt($ch, CURLOPT_URL, $url);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	    $response = curl_exec($ch);
	    curl_close($ch);
	    $response_a = json_decode($response, true);
	    $dist = $response_a['rows'][0]['elements'][0]['distance']['text'];
	    $time = $response_a['rows'][0]['elements'][0]['duration']['text'];

	    return array('distance' => $dist, 'time' => $time);
	}

	function set_job_plan($jid,$id,$pid,$tid,$res) {
		$sql = "SELECT * FROM sub_job_plans WHERE sub_job_id=".$id." and path_type_id=".$pid." and path_id=".$tid;
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();

		$count = $this->get_path_types($jid);

		$sql = "SELECT * FROM sub_jobs WHERE id=".$id;
		$query = $this->dbmysql->query($sql);
		$result1 = $query->row_array();
		$query->free_result();
		
		if($res == "yes") {
			if(empty($result)) {
				$sql = "INSERT INTO sub_job_plans(sub_job_id,path_id,path_type_id,percent,start_date,end_date) values("._to_int($id).","._to_int($tid).","._to_int($pid).",".(int)100/count($count).",'"._to_string($result1['start_date'])."','"._to_string($result1['end_date'])."')";
				$query = $this->dbmysql->query($sql);
			} else {
				$sql = "UPDATE sub_job_plans SET percent=".($result['percent']+(int)100/count($count))." WHERE sub_job_id=".$id." and path_type_id=".$pid." and path_id=".$tid;
				$query = $this->dbmysql->query($sql);
			}
		}
	}

	function set_job_rating($id,$pid) {
		$result = $this->get_job_ratings($id);		
		if($result == 0) {
			$sql = "INSERT INTO sub_job_ratings(sub_job_plan_id,rate) values("._to_int($id).","._to_int($pid).")";
			$query = $this->dbmysql->query($sql);
		} else {
			$sql = "UPDATE sub_job_ratings SET rate="._to_int($pid)." WHERE sub_job_plan_id=".$id;
			$query = $this->dbmysql->query($sql);
		}
	}

	function set_notif($cid,$id,$notif) {
		$sql = "INSERT INTO notifs(company_id,job_id,msg,ndate) values("._to_int($cid).","._to_int($id).",'".$notif."','".date('Y-m-d H:i:s')."')";
		$query = $this->dbmysql->query($sql);
	}

	function get_notif($id) {
		$per = $this->session->userdata('permission');
		$uid = $this->session->userdata('company_id');
		if($per == 1) {
			$sql = "SELECT n.*,j.name FROM notifs n INNER JOIN jobs j ON n.job_id=j.id WHERE n.job_id=".$id;
			$query = $this->dbmysql->query($sql);
			$result = $query->result_array();
			$query->free_result();
			return $result;
		} else {
			$sql = "SELECT n.*,j.name FROM notifs n INNER JOIN jobs j ON n.job_id=j.id WHERE n.company_id=".$uid." and n.job_id=".$id;
			$query = $this->dbmysql->query($sql);
			$result = $query->result_array();
			$query->free_result();
			return $result;
		}
	}

}