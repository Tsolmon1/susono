<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Splash extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
	}
	
	function index() {
		$data['main'] = "";
		$this->load->view('content_splash', $data);
	}
		
}