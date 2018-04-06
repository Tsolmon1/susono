<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class ProductModel extends CI_Model {
	function __construct()
	{
		parent::__construct();
		$this->load->helper('encryption');
		$this->dbmysql = $this->load->database('default', true);
	}
	
	function get_users() {
		$sql = "SELECT * FROM ebranch";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
			
	function get_tires() {
		$sql = "SELECT * FROM user_reg ORDER BY u_date desc";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_tires_bytype($cid) {
		$sql = "SELECT * FROM dugui WHERE vis='yes' and category="._to_int($cid)." ORDER BY t_datetime desc";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_tires_search($brand, $date, $size, $design, $season) {
		$sql = "SELECT * FROM dugui WHERE vis='yes'";
		if($date != "") $sql .= " and building_date='"._to_string($date)."'";
		if($season != "") $sql .= " and season="._to_int($season);
		$sql .= " and brand="._to_int($brand);
		$sql .= " and sizes="._to_int($size);
		$sql .= " and design="._to_int($design);
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_brands() {
		$sql = "SELECT * FROM brand";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}		
	
	function get_brands_byid($id) {
		$sql = "SELECT * FROM brand WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_designs() {
		$sql = "SELECT * FROM design";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_designs_byid($id) {
		$sql = "SELECT * FROM design WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_sizes() {
		$sql = "SELECT * FROM sizes";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_sizes_byid($id) {
		$sql = "SELECT * FROM sizes WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_seasons() {
		$sql = "SELECT * FROM season";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_seasons_byid($id) {
		$sql = "SELECT * FROM season WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_category() {
		$sql = "SELECT * FROM category";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_category_byid($id) {
		$sql = "SELECT * FROM category WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_banners() {
		$sql = "SELECT * FROM banner";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_tire_detail($id) {
		$sql = "SELECT * FROM dugui WHERE vis='yes' and id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_movie_payment($id, $cid) {
		$nextWeek = strtotime(date('Y-m-d')) - 86400*2;
		$sql = "SELECT * FROM payment WHERE movie_id="._to_int($id)." and session_id="._to_int($cid).
		" and p_datetime > '".date("Y-m-d", $nextWeek)."'";
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		if(!empty($result)) {
			if($result['amount'] == 10000) {
				return $result;
			} else if($result['amount'] == 5000) {
				$nextWeek = strtotime(date('Y-m-d')) - 86400;
				if($result['p_datetime'] > date("Y-m-d", $nextWeek))
				return $result;
				else return null;
			} else if($result['amount'] == 1000) {
				$nextWeek = strtotime(date('Y-m-d')) - 10800;
				if($result['p_datetime'] > date("Y-m-d", $nextWeek))
				return $result;
				else return null;
			} else if($result['amount'] == 10) {			
				return $result;
			} else if($result['amount'] == 5) {
				$nextWeek = strtotime(date('Y-m-d')) - 86400;
				if($result['p_datetime'] > date("Y-m-d", $nextWeek))
				return $result;
				else return null;
			} else if($result['amount'] == 1) {
				$nextWeek = strtotime(date('Y-m-d')) - 10800;
				if($result['p_datetime'] > date("Y-m-d", $nextWeek))
				return $result;
				else return null;
			} else
			return null;
		} else {
			return null;
		}
	}
	
	function get_tires_search_all($name) {
		$sql = "SELECT * FROM dugui WHERE vis='yes' and name like '%"._to_string($name)."%'";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_movies_searchs($name) {
		if(strlen($name) == 4) {
			$sql = "SELECT * FROM movie WHERE vis='yes' and m_datetime like '%"._to_string($name)."%'";
		} else {
			$sql = "SELECT * FROM movie WHERE vis='yes' and genre like '%"._to_string($name)."%'";
		}		
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_email($user) {
		$sql = "SELECT * FROM customers WHERE email='"._to_string($user)."'";
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function get_special() {
		$sql = "SELECT * FROM movie WHERE vis='yes' and type='special'";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_page_max() {
		$per_page = 15;
		$qry = "select count(*) as `count` from dugui WHERE vis='yes'";
	
		$query = $this->dbmysql->query($qry);
		$result = $query->result_array();
		$query->free_result();
		$count = $result[0]['count'];
		$max = intval($result[0]['count'] / $per_page);
		if($result[0]['count'] % $per_page){
			$max ++;
		}
	
		return $max;
	}
	
	function set_tire($name,$price,$surname,$address,$phone,$subphone) {
		$sql = "INSERT INTO sales(name,price,surname,address,phone,subphone,s_datetime,order) values('"._to_string($name)."',"._to_string($price).",'"._to_string($surname)."','"._to_string($address)."','"._to_string($phone)."','"._to_string($subphone)."','".date('Y-m-d H:i:s')."','no')";
		$query = $this->dbmysql->query($sql);
	}
	
	
	function set_contact($name,$email,$phone,$comm) {
		$sql = "INSERT INTO contact_list(email,name,phone,comment,c_datetime) values('"._to_string($email)."','"._to_string($name)."','"._to_string($phone)."','"._to_string($comm)."','".date('Y-m-d H:i:s')."')";
		$query = $this->dbmysql->query($sql);
	}
	
	function get_contact() {
		$sql = "SELECT * FROM contact_list order by c_datetime desc";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_orders() {
		$sql = "SELECT * FROM orders WHERE order_date like '".date('Y-m-d')."%' order by order_date desc";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_contact_byid($id) {
		$sql = "SELECT * FROM contact_list WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function set_contact_byid($id) {
		$sql = "UPDATE contact_list set readyn='yes' WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
	}
	
	function delete_contact_byid($id) {
		$sql = "delete FROM contact_list WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
	}
	
	function set_admin($name,$pass,$role) {
		$sql = "INSERT INTO ebranch(adminname,adminpassword,type,activated) values('".$name."','".base64_encode($pass)."','".$role."',1)";
		$query = $this->dbmysql->query($sql);
	}
	
	function set_profile($pass) {
		$sql = "UPDATE ebranch set adminpassword='".base64_encode($pass)."' where adminname='".$this->tank_auth->get_username()."'";
		$query = $this->dbmysql->query($sql);
	}
	
	function get_sales() {
		$sql = "SELECT * FROM sales order by s_datetime desc";
		$query = $this->dbmysql->query($sql);
		$result = $query->result_array();
		$query->free_result();
		return $result;
	}
	
	function get_sales_byid($id) {
		$sql = "SELECT * FROM sales WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
		$result = $query->row_array();
		$query->free_result();
		return $result;
	}
	
	function delete_sales_byid($id) {
		$sql = "delete FROM sales WHERE id="._to_int($id);
		$query = $this->dbmysql->query($sql);
	}
	
	function set_sales($id) {
		$sql = "UPDATE sales set orders='yes' where id="._to_int($id);
		$query = $this->dbmysql->query($sql);
	}
}