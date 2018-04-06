<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Zam extends CI_Controller {	

	function __construct()
	{
		parent::__construct();
		$this->load->library('tank_auth');
		$this->lang->load('tank_auth');
 		$this->load->model('productmodel');
 		$this->load->helper('ven');
 		$this->load->helper('email');
 		$this->load->helper(array('form', 'url'));
	}
	
	function index() {
		$this->load->view('main', $data);
	}

	function logout() {		
		header('Location: http://localhost/zam/admin_login.html');
	}
	
	function _create_captcha()
	{
		$this->load->helper('captcha');
	
		$cap = create_captcha(array(
				'img_path'		=> './'.$this->config->item('captcha_path', 'tank_auth'),
				'img_url'		=> base_url().$this->config->item('captcha_path', 'tank_auth'),
				'font_path'		=> './'.$this->config->item('captcha_fonts_path', 'tank_auth'),
				'font_size'		=> $this->config->item('captcha_font_size', 'tank_auth'),
				'img_width'		=> $this->config->item('captcha_width', 'tank_auth'),
				'img_height'	=> $this->config->item('captcha_height', 'tank_auth'),
				'show_grid'		=> $this->config->item('captcha_grid', 'tank_auth'),
				'expiration'	=> $this->config->item('captcha_expire', 'tank_auth'),
		));
	
		// Save captcha params in session
		$this->session->set_flashdata('captcha_word', $cap['word']);
		$this->session->set_flashdata('captcha_time', $cap['time']);
		$cookie = array(
				'name'   => 'captchaword',
				'value'  => $cap['word'],
				'expire' => '180',
				'secure' => FALSE
		);
		$cookie1 = array(
				'name'   => 'captchatime',
				'value'  => $cap['time'],
				'expire' => '180',
				'secure' => FALSE
		);
		$this->input->set_cookie($cookie1);
		$this->input->set_cookie($cookie);
	
		// 		$this->session->set_flashdata(array(
		// 				'captcha_word' => $cap['word'],
		// 				'captcha_time' => $cap['time'],
		// 		));
	
		return $cap['image'];
	}
	
	function _check_captcha($code)
	{
		$time = $this->session->flashdata('captcha_time');
		$word = $this->session->flashdata('captcha_word');
		$word = $_COOKIE['captchaword'];
		$time = $_COOKIE['captchatime'];
		list($usec, $sec) = explode(" ", microtime());
		$now = ((float)$usec + (float)$sec);
	
		if ($now - $time > $this->config->item('captcha_expire', 'tank_auth')) {
			$this->form_validation->set_message('_check_captcha', $this->lang->line('auth_captcha_expired'));
			return FALSE;
	
		} elseif (($this->config->item('captcha_case_sensitive', 'tank_auth') AND
				$code != $word) OR
				strtolower($code) != strtolower($word)) {
			//$this->form_validation->set_message('_check_captcha', $this->lang->line('auth_incorrect_captcha'));
			return FALSE;
		}
		return TRUE;
	}

	function get_main() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$jobs = $this->productmodel->get_jobs();
			echo json_encode($jobs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_types() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$types = $this->productmodel->get_path_types($_REQUEST['jobId']);
			echo json_encode($types, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_permission() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$per = $this->session->userdata('permission');
			echo json_encode(array("permission" => $per), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_permissions() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$per = $this->productmodel->get_permissions();
			echo json_encode($per, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}
	
	function get_jobs() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$jobs = $this->productmodel->get_jobs_by_id($_REQUEST['jobId']);
			$str = array();					
			foreach($jobs as $pr) {
				$sum = 0;
				$merge = array();	
				$merge1 = array();
				$subjobs = $this->productmodel->get_sub_jobs($pr['id']);
				$str['jobs'] = $subjobs;
				$pr['start'] = strtotime($pr['start']);
				$pr['deadline'] = strtotime($pr['deadline']);
				if($pr['deadline1'] == '0000-00-00 00:00:00') {
					$pr['deadline1'] = false;
				} else {
					$pr['deadline1'] = strtotime($pr['deadline1']);
				}
				foreach($subjobs as $sub) {
					$sub['id'] = (int)$sub['id'];
					$sub['start'] = strtotime($sub['start']);
					$sub['deadline'] = strtotime($sub['deadline']);
					$pathtypes = $this->productmodel->get_path_types($pr['id']);
					$plans = array();
					foreach($pathtypes as $ptype) {
						$plan1 = $this->productmodel->get_job_plans($ptype['id'], $sub['id']);
						$j = 0;
						foreach($plan1 as $pl) {
							$sum = $sum + $pl['percent'];
							$plan1[$j]['id'] = (int)$ptype['id'];
							$plan1[$j]['start'] = strtotime($pl['start']);
							$plan1[$j]['deadline'] = strtotime($pl['deadline']);
							$plan1[$j]['name'] = $ptype['name'];
							$plan1[$j]['color'] = $ptype['color'];
							$plan1[$j]['color_code'] = $ptype['color_code'];
							$j++;
						}					
						//array_push($plans, $plan1);	
						$plans = array_merge($plans, $plan1);					
					}
					$merge['planned_conditions'] = $plans;
					array_push($merge1,array_merge($sub, $merge));
				}
				$str['jobs'] = $merge1;
				$pr['percent'] = intval($sum/count($pathtypes));
				$pr['delay'] = 100 - intval($sum/count($pathtypes));
				$pr['rating'] = $this->productmodel->get_job_ratings($_REQUEST['jobId']);
				$pr['lastUpdate'] = "Ажил явагдаж байна.";
				$pr['id'] = (int)$pr['id'];
				echo json_encode(array_merge($pr, $str), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			}
			//echo json_encode($merge);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_sub_jobs() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$jobs = $this->productmodel->get_jobs_by_id($_REQUEST['jobId']);				
			foreach($jobs as $pr) {
				$sum = 0;
				$merge = array();	
				$merge1 = array();
				$subjobs = $this->productmodel->get_sub_jobs($pr['id']);
				foreach($subjobs as $sub) {
					$sub['id'] = (int)$sub['id'];
					$sub['start'] = strtotime($sub['start']);
					$sub['deadline'] = strtotime($sub['deadline']);
					$pathtypes = $this->productmodel->get_path_types($pr['id']);
					$plans = array();
					foreach($pathtypes as $ptype) {
						$plan1 = $this->productmodel->get_job_plans($ptype['id'], $sub['id']);
						$j = 0;
						foreach($plan1 as $pl) {
							$plan1[$j]['id'] = (int)$plan1[$j]['id'];
							$plan1[$j]['percent'] = (int)$plan1[$j]['percent'];
							$plan1[$j]['start'] = strtotime($pl['start']);
							$plan1[$j]['deadline'] = strtotime($pl['deadline']);
							$plan1[$j]['latest_update_date'] = strtotime($pl['deadline']);
							$plan1[$j]['name'] = $ptype['name'];
							$j++;
						}					
						//array_push($plans, $plan1);	
						$plans = array_merge($plans, $plan1);					
					}
					if(!empty($plans)) {
						$merge['conditions'] = $plans;
						array_push($merge1,array_merge($sub, $merge));
					}
				}
				echo json_encode($merge1, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
				//echo json_encode(array_merge($pr, $str), JSON_UNESCAPED_UNICODE);
			}
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_images() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$images = $this->productmodel->get_job_images_all($_REQUEST['jobId']);		
			$image = array();
			$image1 = array();
			foreach($images as $pr) {
				$image['id'] = (int)$pr['pid'];
				$image['job_id'] = (int)$pr['job_id'];
				$image['type'] = (int)$pr['path_type_id'];
				$image['date'] = $pr['image_date'];
				$dots = array();
				array_push($dots, (float)$pr['lat']);
				array_push($dots, (float)$pr['lon']);
				$image['position'] = $dots;
				//$image['position'] = "[".$pr['lat'].",".$pr['lon']."]";
				$image['image'] = $pr['image'];			
				$image['desc'] = $pr['image_desc'];				
				array_push($image1, $image);
				//echo json_encode(array_merge($pr, $str), JSON_UNESCAPED_UNICODE);
			}
			if(empty($images)) {
				array_push($image1, array("result" => "no"));
			}
			echo json_encode($image1, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_paths() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {				
			$path = array();			
			$path1 = array();
			$subjobs = $this->productmodel->get_sub_jobs($_REQUEST['jobId']);			
			foreach($subjobs as $sub) {
				$plans = array();				
				$paths = $this->productmodel->get_paths($_REQUEST['jobId'], $sub['id']);	
				$path['id'] = (int)$sub['id'];
				foreach($paths as $pa) {
					$dots = array();
					array_push($dots, (float)$pa['lat']);
					array_push($dots, (float)$pa['lon']);
					array_push($plans, $dots);
				}
				$path['path'] = $plans;				
				array_push($path1, $path);
			}	
			echo json_encode($path1, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_all_progress() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {				
			$path = array();			
			$path1 = array();	
			$subjobs = $this->productmodel->get_sub_jobs($_REQUEST['jobId']);
			$path['id'] = (int)$_REQUEST['jobId'];
			foreach($subjobs as $sub) {				
				$merge1 = array();
				$plans = array();
				$merge1['id'] = (int)$sub['id'];
				$pathtypes = $this->productmodel->get_path_types($_REQUEST['jobId']);				
				foreach($pathtypes as $ptype) {
					$merge = array();
					$plan1 = $this->productmodel->get_job_plans($ptype['id'], $sub['id']);
					foreach($plan1 as $pl) {
						$merge['percent'] = (int)$pl['percent'];
						$merge['date'] = strtotime($pl['start']);
					}	
					array_push($plans, $merge);					
				}
				$merge1['updates'] = $plans;
				array_push($path1, $merge1);		
				//$path['jobs'] = $merge1;
				//array_push($path,array_merge($sub, $merge1));				
			}
			$path['jobs'] = $path1;
			echo json_encode($path, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);	
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_progress() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {				
			$path = array();			
			$path1 = array();
			$subjobs = $this->productmodel->get_sub_jobs($_REQUEST['jobId']);
			$path['id'] = (int)$_REQUEST['jobId'];
			foreach($subjobs as $sub) {				
				$merge1 = array();
				$plans = array();
				$sum = 0;
				$merge1['id'] = (int)$sub['id'];
				$pathtypes = $this->productmodel->get_path_types($_REQUEST['jobId']);	
				$i=0;			
				foreach($pathtypes as $ptype) {
					$merge = array();
					$plan1 = $this->productmodel->get_job_plans_loc($ptype['id'], $sub['id'], $_REQUEST['jobId']);
					$i++;
					foreach($plan1 as $pl) {						
						$sum = $sum + $pl['percent'];
						$merge['id'] = (int)$pl['pid'];
						$merge['type'] = (int)$pl['path_type_id'];
						$merge['percent'] = (int)$pl['percent'];
						$dots = array();
						array_push($dots, (float)$pl['lat']);
						array_push($dots, (float)$pl['lon']);
						$merge['position'] = $dots;
						//$merge['position'] = "[".$pl['lat'].",".$pl['lon']."]";
						$merge['date'] = strtotime($pl['start']);
						$merge1['date'] = strtotime($pl['start']);						
					}	
					$merge1['percent'] = $sum;
					array_push($plans, $merge);					
				}
				$merge1['updates'] = $plans;				
				array_push($path1, $merge1);				
			}
			$path['jobs'] = $path1;
			echo json_encode($path, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);	
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_job_by_id() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$job1 = $this->productmodel->get_job_by_id($_REQUEST['jobId']);
			$job = array();			
			foreach($job1 as $pl) {
				$pl['start'] = substr($pl['start'],0,10);
				$pl['deadline'] = substr($pl['deadline'],0,10);
				array_push($job, $pl);						
			}
			$job[0]['jobs'] = $this->productmodel->get_sub_jobs($_REQUEST['jobId']);
			echo json_encode($job[0], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function add_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$paths = $_REQUEST['path'];
			$types = str_replace("[", '', $_REQUEST['types']);
			$types = str_replace("]", '', $types);
			$types = str_replace('"', '', $types);
			$job = $this->productmodel->set_job($_REQUEST['name'],$_REQUEST["cid"],$_REQUEST['sdate'],$_REQUEST['edate'],$_REQUEST['loc'],$_REQUEST['group'],$types);
			$jobid = $this->productmodel->get_job_id();
			$subjob = $this->productmodel->set_sub_job($_REQUEST['sid'],$jobid,$_REQUEST['sdate'],$_REQUEST['edate']);

			if($paths != "") {
				$paths1 = explode(",", $paths);
				for($i=0;$i<count($paths1)/2;$i++) {				
					$sid = $this->productmodel->get_sub_job_id();
					$path = $this->productmodel->set_path($jobid,$sid,$paths1[$i*2],$paths1[$i*2+1]);
				}	
			}		
			echo json_encode($job, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function edit_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$paths = $_REQUEST['path'];
			$types = str_replace("[", '', $_REQUEST['types']);
			$types = str_replace("]", '', $types);
			$types = str_replace('"', '', $types);
			$job = $this->productmodel->edit_job($_REQUEST['jobId'],$_REQUEST['name'],$_REQUEST["cid"],$_REQUEST['sdate'],$_REQUEST['edate'],$_REQUEST['loc'],$_REQUEST['group'],$types);
			//$subjob = $this->productmodel->edit_sub_job($_REQUEST['sid'],$_REQUEST['jobId'],$_REQUEST['sdate'],$_REQUEST['edate']);			
			$paths1 = explode(",", $paths);
			$sid = $_REQUEST['sid1'];
			$path = $this->productmodel->delete_paths($_REQUEST['jobId'],$sid);
			for($i=0;$i<count($paths1)/2;$i++) {
				$path = $this->productmodel->set_path($_REQUEST['jobId'],$sid,$paths1[$i*2],$paths1[$i*2+1]);
			}		
			echo json_encode($job, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function delete_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$job = $this->productmodel->delete_job($_REQUEST['jobId']);
			echo json_encode($job, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_equipments() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$equipments = $this->productmodel->get_equipments();
			echo json_encode($equipments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_equipments_by_id() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$equipments = $this->productmodel->get_equipments_by_id($_REQUEST['equipmentId']);
			echo json_encode($equipments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function edit_equipment() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$equipments = $this->productmodel->edit_equipment($_REQUEST['equipmentId'],$_REQUEST['name'],$_REQUEST['image'],$_REQUEST['power'],$_REQUEST['desc'],$_REQUEST['companyId']);
			echo json_encode($equipments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function add_equipment() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {			
			$equipments = $this->productmodel->add_equipment($_REQUEST['name'],$_REQUEST["image"],$_REQUEST['power'],$_REQUEST['desc'],$_REQUEST['companyId']);
			echo json_encode($equipments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}
	function send_report() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {			
			$job = $this->productmodel->delete_job($_REQUEST['jobId']);
			echo json_encode($job, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}
	function delete_equipment() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$equipments = $this->productmodel->delete_equipment($_REQUEST['equipmentId']);
			echo json_encode($equipments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function add_image() {
		if($this->tank_auth->is_logged_in()) {
			$config['upload_path'] = '../uploads/';
		    $config['allowed_types'] = 'gif|jpg|png|jpeg|JPEG|JPG';
		    $config['max_size'] = '10240';
		    $config['overwrite'] = TRUE;
		    $config['encrypt_name'] = FALSE;
		    $config['remove_spaces'] = TRUE;
		    //$new_name = time().$_FILES["image"]['name'];
			$config['file_name'] = $_REQUEST['name'];
		    if ( ! is_dir($config['upload_path']) ) die("THE UPLOAD DIRECTORY DOES NOT EXIST");
		    $this->load->library('upload', $config);
		    if ( ! $this->upload->do_upload('image')) {
		    	$error = array('error' => $this->upload->display_errors(), 'name' => $_FILES['image']);
		        echo json_encode($error);
		    } else {
		        echo json_encode(array('upload_data' => $this->upload->data()));
		    }
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_user_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->get_user_job();
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_user_job_id() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->get_user_job_id($_REQUEST['id']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function set_user_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->set_user_job($_REQUEST['userId'],$_REQUEST['jobId'],$_REQUEST['companyId']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function edit_user_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->edit_user_job($_REQUEST['userId'],$_REQUEST['jobId']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function delete_user_job() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->delete_user_job($_REQUEST['id']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_users() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->get_users();
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_user_by_id() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->get_user_by_id($_REQUEST['userId']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function add_user() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->add_user($_REQUEST['name'],$_REQUEST['password'],$_REQUEST['phone'],$_REQUEST['email'],$_REQUEST['permission'],$_REQUEST['cid']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function edit_user() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->edit_user($_REQUEST['userId'],$_REQUEST['name'],$_REQUEST['password'],$_REQUEST['phone'],$_REQUEST['email'],$_REQUEST['permission'],$_REQUEST['cid']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function delete_user() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$users = $this->productmodel->delete_user($_REQUEST['userId']);
			echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_companys() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$companys = $this->productmodel->get_companys();
			echo json_encode($companys, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_companys_by_id() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$companys = $this->productmodel->get_companys_by_id($_REQUEST['companyId']);
			echo json_encode($companys, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function edit_company() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$companys = $this->productmodel->edit_company($_REQUEST['companyId'],$_REQUEST['name'],$_REQUEST['register'],$_REQUEST['phone'],$_REQUEST['email'],$_REQUEST['address'],$_REQUEST['rank'],$_REQUEST['ready']);
			echo json_encode($companys, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function add_company() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$companys = $this->productmodel->add_company($_REQUEST['name'],$_REQUEST['register'],$_REQUEST['phone'],$_REQUEST['email'],$_REQUEST['address'],$_REQUEST['rank'],$_REQUEST['ready']);
			echo json_encode($companys, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function delete_company() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$companys = $this->productmodel->delete_company($_REQUEST['companyId']);
			echo json_encode($companys, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_equipments_company() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$companys = $this->productmodel->get_equipments_company($_REQUEST['companyId']);
			echo json_encode($companys, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function edit_path() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$path = $this->productmodel->edit_path($_REQUEST['pathId'],$_REQUEST["type"],$_REQUEST['desc']);
			echo json_encode($path, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function delete_path() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$path = $this->productmodel->delete_path($_REQUEST['pathId']);
			echo json_encode($path, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function add_phone_image() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$result = 0;
			$point1 = $_REQUEST['point'];
			$point = explode(",", $point1);
			$paths = $this->productmodel->get_paths_id($_REQUEST['jobId']);
			for($i=0;$i<count($paths)-1;$i++) {
				$poly = array();
				array_push($poly, array($paths[$i]['lat'], $paths[$i]['lon']));
				array_push($poly, array($paths[$i+1]['lat'], $paths[$i+1]['lon']));
				// print_r($poly)."\n";
				// print_r($point)."\n";
				$check = $this->productmodel->checkPoint($point, $poly);
				if($check) {
					$result = 1;
					$this->productmodel->set_job_image($_REQUEST['jobId'], $paths[$i]['sub_job_id'], $paths[$i]['id'], $_REQUEST['tid'], $_REQUEST['image'], $_REQUEST['desc']);
					break;
				}
			}	
			if($result == 1) {	
				echo json_encode(array("result" => "success"), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			} else {
				echo json_encode(array("result" => "error"), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			}
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function set_rating() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$rate = $this->productmodel->set_job_rating($_REQUEST['jobId'],$_REQUEST["rate"]);
			echo json_encode($rate, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function set_notif() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$notif = $this->productmodel->set_notif($_REQUEST['cid'],$_REQUEST['jobId'],$_REQUEST["notif"]);
			echo json_encode($notif, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}
/* 	function send_report() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$notif = $this->productmodel->get_notif($_REQUEST['notif']);
			echo json_encode($notif, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	} */
	function get_notifs() {
		header('Content-Type: application/json');
		if($this->tank_auth->is_logged_in()) {
			$notif = $this->productmodel->get_notif($_REQUEST['jobId']);
			echo json_encode($notif, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}

	function get_report() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$jobs = $this->productmodel->get_jobs();
			$str = array();					
			foreach($jobs as $pr) {
				$sum = 0;
				$merge = array();	
				$merge1 = array();
				$subjobs = $this->productmodel->get_sub_jobs($pr['id']);
				//$str['jobs'] = $subjobs;
				$pr['start'] = strtotime($pr['start']);
				$pr['deadline'] = strtotime($pr['deadline']);
				$pr['cid'] = (int)$pr['company_id'];
				foreach($subjobs as $sub) {
					$sub['id'] = (int)$sub['id'];
					$sub['start'] = strtotime($sub['start']);
					$sub['deadline'] = strtotime($sub['deadline']);
					$pathtypes = $this->productmodel->get_path_types($pr['id']);
					$plans = array();
					foreach($pathtypes as $ptype) {
						$plan1 = $this->productmodel->get_job_plans($ptype['id'], $sub['id']);
						$j = 0;
						foreach($plan1 as $pl) {
							$sum = $sum + $pl['percent'];
							$plan1[$j]['id'] = (int)$plan1[$j]['id'];
							$plan1[$j]['start'] = strtotime($pl['start']);
							$plan1[$j]['deadline'] = strtotime($pl['deadline']);
							$plan1[$j]['name'] = $ptype['name'];
							$plan1[$j]['color'] = $ptype['color'];
							$plan1[$j]['color_code'] = $ptype['color_code'];
							$j++;
						}					
						//array_push($plans, $plan1);	
						$plans = array_merge($plans, $plan1);					
					}
					$merge['planned_conditions'] = $plans;
					array_push($merge1,array_merge($sub, $merge));
				}
				//$str['jobs'] = $merge1;
				$pr['percent'] = intval($sum/count($pathtypes));
				$pr['delay'] = 100 - intval($sum/count($pathtypes));
				$pr['id'] = (int)$pr['id'];
				array_push($str, $pr);
			}
			echo json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			//echo json_encode($merge);
		} else {
			echo json_encode(array("error" => "login"));
		}
	}
}