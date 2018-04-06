<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

	function __construct()
	{
		parent::__construct();		
		$this->load->library('grocery_CRUD');
		$this->load->library('session');
		$this->load->model('productmodel');
		$this->load->library('tank_auth');
		$this->lang->load('tank_auth');	
		
		$this->load->helper('ven');
		$this->load->helper('cookie');
		$this->load->helper('url');
	}
	
	function index() {		
		redirect('/auth/admin/');
	}
	
	function _example_output($output = null)
	{
		$data['users'] = $this->productmodel->get_users();
		$data['orders'] = $this->productmodel->get_orders();
		$data['body'] = "body";
		$this->load->view('admin/main',$data);
	}
	
	function about($output = null)
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			$data['body'] = "profile";
			$this->load->view('admin/main',$data);
		}
	}
	
	function settings($output = null)
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			if($output == "edit") {
				if($_POST['inputPassword'] == "" || $_POST['verifyPassword'] == "") {
					$data['error'] = "Та нууц үгээ оруулна уу.";
				} else if($_POST['verifyPassword'] != $_POST['inputPassword']) {
					$data['error'] = "Та нууц үгээ адилхан оруулна уу.";
				} else {					
					$data['contact'] = $this->productmodel->set_profile($_POST['inputPassword']);
					$data['error'] = "Та амжилттай нууц үгээ солилоо.";
				}
			}
			$data['body'] = "profile_edit";
			$this->load->view('admin/main',$data);
		}
	}
	
	function contact($output = null, $id = 0)
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			$data['register'] = $this->productmodel->get_register();
			if($output == null) {
				$data['contact'] = $this->productmodel->get_contact();		
				$data['body'] = "contact";
			} else if($output == "read") {
				$data['contact_detail'] = $this->productmodel->set_contact_byid($id);
				$data['contact_detail'] = $this->productmodel->get_contact_byid($id);
				$data['contact'] = $this->productmodel->get_contact();
				$data['body'] = "contact_read";
			} else {
				$data['contact'] = $this->productmodel->delete_contact_byid($id);
				$data['contact'] = $this->productmodel->get_contact();
				$data['body'] = "contact";
			}
			$this->load->view('admin/main',$data);
		}
	}

	function adminadd($output = null)
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			if($output == null) {
				$data['body'] = "admin_add";
			} else {
				if($_POST['inputUser'] == "") {
					$data['error'] = "Та хэрэглэгчийн нэвтрэх нэр оруулна уу.";
				} else if($_POST['verifyPassword'] == "") {
					$data['error'] = "Та хэрэглэгчийн нууц үгийг оруулна уу.";
				} else {					
					$data['contact'] = $this->productmodel->set_admin($_POST['inputUser'],$_POST['verifyPassword'],$_POST['permission']);
					$data['error'] = "Та амжилттай эрх нэмлээ.";
				}
				
				$data['body'] = "admin_add";
			}
			$this->load->view('admin/main',$data);
		}
	}
	
	function hall($output = null)
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
		
				$crud->set_theme('flexigrid');
				$crud->set_table('hall');
				$crud->set_subject('Заал');
				$crud->required_fields('id');
				$crud->columns('id','name','image','descr','vis');
				$crud->display_as('name', 'Нэр');
				$crud->set_field_upload('image','images/hall');
					
				$output = $crud->render();
		
				$this->_gishuun_output($output);
		
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
		/*$data['categorys'] = $this->productmodel->get_category();
		$data['body'] = "category";
		$this->load->view('admin/main',$data);*/
	}
	
	function karaoke()
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('karaoke');
				$crud->set_subject('karaoke');
				$crud->required_fields('id');
				$crud->columns('id','name','image','descr','vis');
				$crud->display_as('name', 'Нэр');
				$crud->set_field_upload('image','images/karaoke');
								
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
		/*$data['categorys'] = $this->productmodel->get_category();
			$data['body'] = "category";
		$this->load->view('admin/main',$data);*/
	}
	
	function tables()
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('tables');
				$crud->set_subject('table');
				$crud->required_fields('id');
				$crud->columns('id','hall_id', 'name','image','descr','vis');
				$crud->display_as('name', 'Овог Нэр');
				$crud->display_as('hall_id', 'Category');
				$crud->display_as('image', 'Зураг');
				$crud->display_as('descr', 'Танилцуулга');
				$crud->set_relation('hall_id','hall','name');
				$crud->set_field_upload('image','images/hall');
	
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
	}
	
	function products()
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('products');
				$crud->set_subject('product');
				$crud->required_fields('id');
				$crud->columns('id','cat_id','name','image','price','vis');
				$crud->set_relation('cat_id','category','name');
				$crud->display_as('name', 'Нэр');
				$crud->set_field_upload('image','images/products');
	
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
		/*$data['categorys'] = $this->productmodel->get_category();
		 $data['body'] = "category";
		$this->load->view('admin/main',$data);*/
	}
	
	function orders()
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('orders');
				$crud->set_subject('Захиалга');
				$crud->required_fields('id');
				$crud->columns('id','type','main_id','table_id','product_id','count','order_date','checker');
				
				$crud->set_relation('table_id','tables','name');
				$crud->set_relation('product_id','products','name');
				//$crud->set_relation('main_id','karaoke','name');
	
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
	}
	
	function images($output = null)
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('images');
				$crud->set_subject('Зураг');
				$crud->required_fields('id');
				$crud->columns('id','image');
				$crud->display_as('image', 'Зураг');
				$crud->set_field_upload('image','images');
					
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
	}

	function orderdate()
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('orders');
				$crud->set_subject('Захиалга');
				$crud->required_fields('id');
				$crud->columns('id','type','main_id','table_id','product_id','count','order_date','checker');
				
				$crud->set_relation('table_id','tables','name');
				$crud->set_relation('product_id','products','name');
				//$crud->set_relation('main_id','karaoke','name');
				if(isset($_POST['start_date'])) {
					$crud->where('order_date >= ', $_POST['start_date']." 00:00:00");
					$crud->where('order_date <= ', $_POST['end_date']." 23:59:59");
				}
	
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
	}
	
	function about_us()
	{
		if(!$this->tank_auth->is_logged_in()) {
			redirect('/auth/admin/');
		}else{
			try{
				/* This is only for the autocompletion */
				$crud = new grocery_CRUD();
	
				$crud->set_theme('flexigrid');
				$crud->set_table('about');
				$crud->set_subject('Тухай');
				$crud->required_fields('id');
				$crud->columns('id','name','ddtd','phone','email');
				$crud->display_as('name', 'Нэр');
				$crud->display_as('ddtd', 'ДДТД');
				$crud->unset_add();
				$crud->unset_delete();
					
				$output = $crud->render();
	
				$this->_gishuun_output($output);
	
			}catch(Exception $e){
				show_error($e->getMessage().' --- '.$e->getTraceAsString());
			}
		}
	}
		
	function _gishuun_output($output = null)
	{	
		$this->load->view('admin/category', (array)$output);
	}
	
	function logout()
	{
		redirect('auth/logout_admin');
	}
	
	function service()
	{
		$output = $this->grocery_crud->render();
	
		$this->_example_output($output);
	}
	
	function main() {
		if(!$this->tank_auth->is_logged_in()) {			
			redirect('/auth/admin/');
		}else{
			//header('Location : http://localhost/tire/admintire/index.html');
			$data['title'] = "Удирдлага";
			$this->_example_output((object)array('output' => '' , 'js_files' => array() , 'css_files' => array()));
		}			
	}
	
	function send_email($id)
	{			
		$config = Array(
				'protocol' => 'smtp',
				'smtp_host' => 'ssl://smtp.googlemail.com',
				'smtp_port' => 465,
				'smtp_user' => 'japantire.mn@gmail.com',
				'smtp_pass' => 'japantiremon',
				'mailtype'  => 'html',
				'charset'   => 'utf-8'
		);
	
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");
		$this->email->from("info@khtour.mn", "Хотгойд Тур");
		$this->email->reply_to("info@khtour.mn", 'Хотгойд Тур');
		$this->email->to($_POST['email']);
		$this->email->subject("Санал хүсэлтийн хариу");
		$this->email->message($_POST['message']);
		//$this->email->set_alt_message($this->load->view('email/'.$type.'-txt', $data, TRUE));
		if($this->email->send()) {
			$data['error'] = "Амжилттай илгээлээ.";
		} else {
			$data['error'] = "Амжилтгүй.";
		}	
		/*$smtpconf['username'] = 'japantire.mn@gmail.com';
		$smtpconf['password'] = 'japantiremon';
		$smtpconf['host'] = 'ssl://smtp.gmail.com';
		$smtpconf['port'] = '465';
		$smtpconf['auth'] = true;

		// set the recipient, subject and body
		$to = $_POST['email'];
		$from = 'info@khtour.mn';
		$subject = 'This is a Google Apps SMTP test email..';
		$body = '..and it works! :)';

		$headers['From'] = $from;
		$headers['To'] = $to;
		$headers['Subject'] = $subject;

		include_once("Mail.php");

		$smtp = & Mail::factory('smtp', $smtpconf);

		$mail = $smtp->send($to, $headers, $body);*/

		$data['contact_detail'] = $this->productmodel->get_contact_byid($id);
		$data['contact'] = $this->productmodel->get_contact_byid($id);
		$data['body'] = "contact_read";
		$this->load->view('admin/main',$data);
	}
	
}