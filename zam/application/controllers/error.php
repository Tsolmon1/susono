<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Error extends CI_Controller
{
	function __construct()
	{		
		parent::__construct();
		$this->load->model('productmodel');
	}

	function index()
	{
		$data['location'] = $this->productmodel->get_location();
		$data['title'] = "Засвартай";
		$this->load->view('content_error', $data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */