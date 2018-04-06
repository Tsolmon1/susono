<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mobile extends CI_Controller {	

	function __construct()
	{
		parent::__construct();
		$this->load->library('tank_auth');
		$this->lang->load('tank_auth');
 		$this->load->model('productmodel');
 		$this->load->helper('ven');
 		$this->load->helper('email');
 		$this->load->helper(array('form', 'url'));

		$this->load->helper('cookie');
		$this->load->library('form_validation');
		$this->load->library('session');
	}
	
	function index() {
		$this->load->view('main', $data);
	}

	function login()
	{		
		// if ($this->tank_auth->is_logged_in()) {									// logged in
		// 	$this->get_main();	
		// } else {	
			//redirect('pub');	
			$reg = $_POST['login'];
			$pass = $_POST['password'];
			if($this->tank_auth->login($reg, $pass)) {
				$this->get_main();
			} else {
				echo "error";
			}			
		//}
	}

	function logout() {	
		$this->tank_auth->logout();
		echo "error";
	}

	function get_main() {
		header('Content-Type: application/json');		
		if($this->tank_auth->is_logged_in()) {
			$jobs = $this->productmodel->get_jobs();
			$equip = $this->productmodel->get_equipments();
			$notifs = $this->productmodel->get_notif();
			$merge1 = array();
			$pathtypes1 = array();
			$path1 = array();
			foreach($jobs as $pr) {
				$sum = 0;
				$merge = array();
				$subjobs = $this->productmodel->get_sub_jobs($pr['id']);
				foreach($subjobs as $sub) {
					$sub['jid'] = (int)$pr['id'];
					$sub['id'] = (int)$sub['id'];
					$pathtypes = $this->productmodel->get_path_types($pr['id']);
					$plans = array();
					foreach($pathtypes as $ptype) {
						$plan1 = $this->productmodel->get_job_plans($ptype['id'], $sub['id']);
						$j = 0;
						foreach($plan1 as $pl) {
							$plan1[$j]['id'] = (int)$plan1[$j]['id'];
							$plan1[$j]['percent'] = (int)$plan1[$j]['percent'];
							$plan1[$j]['name'] = $ptype['name'];
							$j++;
						}					
						//array_push($plans, $plan1);	
						$plans = array_merge($plans, $plan1);					
					}
					//if(!empty($plans)) {
						$merge['conditions'] = $plans;
						array_push($merge1,array_merge($sub, $merge));
					//}
					$paths1 = array();
					$paths = $this->productmodel->get_paths($pr['id'], $sub['id']);
					$path['id'] = (int)$pr['id'];
					foreach($paths as $pa) {
						$dots = array();
						array_push($dots, (float)$pa['lat']);
						array_push($dots, (float)$pa['lon']);
						array_push($paths1, $dots);
					}
					$path['path'] = $paths1;				
					array_push($path1, $path);
				}
			}
			foreach($jobs as $pr1) {
				$sub3['jid'] = (int)$pr1['id'];
				$pathtypes = $this->productmodel->get_path_types($pr1['id']);
				$plans2 = array();
				$plans3 = array();
				$plan11 = array();
				$j = 0;
				foreach($pathtypes as $ptype) {
					$plan11[$j]['id'] = (int)$ptype['id'];
					$plan11[$j]['name'] = $ptype['name'];	
					$j++;				
				}
				$plans2 = array_merge($plans2, $plan11);
				$plans3['path_types'] = $plans2;
				array_push($pathtypes1, array_merge($sub3, $plans3));
			}
			echo json_encode(array("jobs" => $jobs, "subs" => $merge1, "types" => $pathtypes1, "equipments" => $equip, "notifs" => $notifs, "paths" => $path1), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
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
				foreach($subjobs as $sub) {
					$sub['id'] = (int)$sub['id'];
					$sub['start'] = strtotime($sub['start']);
					$sub['deadline'] = strtotime($sub['deadline']);
					$pathtypes = $this->productmodel->get_path_types();
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
				$pr['percent'] = intval($sum/6);
				$pr['delay'] = 100 - intval($sum/6);
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
					$pathtypes = $this->productmodel->get_path_types();
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
				$image['id'] = (int)$pr['id'];
				$image['job_id'] = (int)$pr['job_id'];
				$image['type'] = (int)$pr['path_type_id'];
				$image['date'] = strtotime($pr['image_date']);
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
				$merge = array();
				$merge1 = array();
				$plans = array();
				$merge1['id'] = (int)$sub['id'];
				$pathtypes = $this->productmodel->get_path_types();				
				foreach($pathtypes as $ptype) {
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
				$merge = array();
				$merge1 = array();
				$plans = array();
				$sum = 0;
				$merge1['id'] = (int)$sub['id'];
				$pathtypes = $this->productmodel->get_path_types();	
				$i=0;			
				foreach($pathtypes as $ptype) {
					$plan1 = $this->productmodel->get_job_plans_loc($ptype['id'], $sub['id'], $_REQUEST['jobId']);
					$i++;
					foreach($plan1 as $pl) {
						$sum = $sum + $pl['percent'];
						$merge['id'] = (int)$i;
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

	function add_image() {
		//if($this->tank_auth->is_logged_in()) {
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
		    	$this->test_image($_REQUEST['name']);
		        echo json_encode(array('upload_data' => $this->upload->data()));
		    }
		// } else {
		// 	echo json_encode(array("error" => "login"));
		// }
	}

	function test_image($file) {
		$filename = "../uploads/".$file; 
		$handle = fopen($filename, "rb"); 		
		$fsize = filesize($filename); 
		$contents = fread($handle, $fsize);
		$contents = substr($contents, 17, strlen($contents)-17);
		$hDest = fopen("../uploads/".$file, 'w');
		fwrite($hDest, $contents);
		fclose($handle);
		fclose($hDest);
	}

	function add_image_new() {
		$target_dir = "../uploads/";
		$target_file = $target_dir . $_REQUEST['name'];
		$uploadOk = 1;
		$err = "";
		$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
		if(isset($_POST["submit"])) {
		    $check = getimagesize($_FILES["image"]["tmp_name"]);
		    if($check !== false) {
		        $uploadOk = 1;
		    } else {
		        $uploadOk = 0;
		        $err = "size";
		    }
		}
		// Check if file already exists
		if (file_exists($target_file)) {
		    $uploadOk = 0;
		    $err = "not file";
		}
		// Check file size
		if ($_FILES["image"]["size"] > 50000000) {
		    $uploadOk = 0;
		    $err = "size limit";
		}
		// Allow certain file formats
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
		    $uploadOk = 0;
			$err = "file extension";
		}
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
			$error = array('error' => $err, 'name' => $_FILES['image']);
		    echo json_encode($error);
		} else {
		    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
		    	$this->test_image($_REQUEST['name']);
		        echo "The file ". basename( $_FILES["image"]["name"]). " has been uploaded.";
		    } else {
		        echo json_encode(array('upload_data' => $uploadOk));
		    }
		}
	}

	function add_phone_image() {
		header('Content-Type: application/json');
		//if($this->tank_auth->is_logged_in()) {
			$result = 0;
			$point1 = $_REQUEST['point'];
			$point = explode(",", $point1);
			$distance = array();
			$paths = $this->productmodel->get_paths_id($_REQUEST['jobId']);

			for($i=0;$i<count($paths);$i++) {
				$poly = array();
				array_push($poly, array($paths[$i]['lon'], $paths[$i]['lat']));
				//array_push($poly, array($paths[$i+1]['lon'], $paths[$i+1]['lat']));
				$dist = $this->productmodel->GetDrivingDistance($point[1],$poly[0][0],$point[0],$poly[0][1]);
				array_push($distance, $dist['distance']);
			}
			$key = array_search(min($distance), $distance);
			
			if((int) $_REQUEST['tid'] >= 500) {
				$res = $this->productmodel->add_equipment($_REQUEST['jobId'], $_REQUEST['image'], "", $_REQUEST['desc'], 1);
			} else {
				$res = $this->productmodel->set_job_image($_REQUEST['jobId'], $paths[$key]['sub_job_id'], $paths[$key]['id'], $_REQUEST['tid'], $_REQUEST['image'], $_REQUEST['desc']);
			}
			$j = 0;
			for($i=0;$i<count($paths)-1;$i++) {
				$poly = array();
				array_push($poly, array($paths[$i]['lat'], $paths[$i]['lon']));
				array_push($poly, array($paths[$i+1]['lat'], $paths[$i+1]['lon']));
				// print_r($poly)."\n";
				// print_r($point)."\n";
				$check = $this->productmodel->checkPoint($point, $poly);				
				if($check) {
					$result = 1;
					$j = $i;
					//$this->productmodel->set_job_image($_REQUEST['jobId'], $paths[$i]['sub_job_id'], $paths[$i]['id'], $_REQUEST['tid'], $_REQUEST['image'], $_REQUEST['desc']);
					break;
				}
				$j = $i;
			}
			echo $res;	
			/*if($res == "no") {
				echo json_encode(array("res" => "no", "result" => "success"), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			} else {
				echo json_encode(array("res" => "yes", "result" => "success"), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			}
			/*if($result == 1) {	
				echo json_encode(array("result" => "success"), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			} else {
				//$this->productmodel->set_job_image($_REQUEST['jobId'], $paths[$j]['sub_job_id'], $paths[$j]['id'], $_REQUEST['tid'], $_REQUEST['image'], $_REQUEST['desc']);
				echo json_encode(array("result" => "error"), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
			}*/
		// } else {
		// 	echo json_encode(array("error" => "login"));
		// }
	}
	
}