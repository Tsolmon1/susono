<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

	function __construct()
	{
		parent::__construct();		
		$this->load->helper('url');
	}
	
	function index() {
		redirect("admin");	
	}
	
}