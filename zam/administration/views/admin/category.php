
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title></title>
		<meta name="description" content="" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="<?php echo base_url()?>admintire/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<?php echo base_url()?>admintire/css/style.css" />
		<link rel="stylesheet" href="<?php echo base_url()?>admintire/css/font-awesome.css" />
		<?php 
		
		if(isset($css_files)) {
foreach($css_files as $file): ?>
	<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>
<?php foreach($js_files as $file): ?>
	<script src="<?php echo $file; ?>"></script>
<?php endforeach; }?>
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
			<script language="javascript" type="text/javascript" src="js/excanvas.min.js"></script>
		<![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
	<body>
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
						<i class="icon icon-reorder"></i> Menu
					</a>
					<a class="brand" href="<?php echo site_url('admin/main')?>">Админ</a>
					<div class="nav-collapse collapse">
						<ul class="nav">
							<li class="active"><a href="<?php echo site_url('admin/main')?>">Нүүр</a></li>
						</ul>
					</div><!--/.nav-collapse -->
				</div>
			</div>
			<div class="sub-navbar">
				<div class="container">
					<p><i class="icon icon-user"></i> Сайн уу, <?php $this->tank_auth->get_username();?>. Та амжилттай нэвтэрлээ.</p>
				</div>
			</div>
		</div>

		<div class="container wrapper">
			<div class="row" style="height: 100%;">
				<div class="span3">
					<ul class="nav nav-tabs nav-stacked">
						<li><a href="<?php echo site_url('admin/main')?>"><img src="<?php echo base_url()?>images/logo-light.png" alt="logo" /></a></li>
						<li class="active"><a href="<?php echo site_url('admin/main')?>"><i class="icon icon-home"></i> Хяналтын хэсэг</a></li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#profile-submenu" data-parent=".nav-stacked"><i class="icon icon-user"></i> Profile <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="profile-submenu">
								<li><a href="<?php echo site_url('admin/about')?>">Миний тухай</a></li>
								<li><a href="<?php echo site_url('admin/settings')?>">Тохиргоо</a></li>
								<?php if($this->tank_auth->get_permission() == "admin") {?>
                                <li><a href="<?php echo site_url('admin/adminadd')?>">Админ нэмэх</a></li>
                                <?php }?>
							</ul>
						</li>
						<li><a href="<?php echo site_url('admin/karaoke')?>"><i class="icon icon-picture"></i> Kaраоке</a></li>
						<li><a href="<?php echo site_url('admin/hall')?>"><i class="icon icon-picture"></i> Заал</a></li>
						<li><a href="<?php echo site_url('admin/tables')?>"><i class="icon icon-picture"></i>Ширээ</a></li>
						<li><a href="<?php echo site_url('admin/products')?>"><i class="icon icon-picture"></i> Бараа</a></li>
						<li><a href="<?php echo site_url('admin/orders')?>"><i class="icon icon-picture"></i> Захиалгууд</a></li>
						<li><a href="<?php echo site_url('admin/orderdate')?>"><i class="icon icon-picture"></i> Захиалгууд (Огноогоор)</a></li>
						<li><a href="<?php echo site_url('admin/about_us')?>"><i class="icon icon-picture"></i> Бидний тухай</a></li>					
						<li><a href="<?php echo site_url('auth/logout_admin')?>"><i class="icon icon-signout"></i> Гарах</a></li>
					</ul><!--/nav nav-tabs-->
				</div><!--/span3-->
<div class="span9 content">

					<div class="banner">
						<h2>Категори</h2>
						<p>Мэдээлэл.</p>
					</div>
					<?php if($this->uri->uri_string() == "admin/orderdate") {?>
					<form method="post" action="<?php echo site_url('admin/orderdate');?>">
					Эхлэх огноо:<input type="date" id="start_date" name="start_date" value="<?php if(isset($_POST['start_date'])) echo $_POST['start_date'];?>" />
					Дуусах огноо:<input type="date" id="end_date" name="end_date" value="<?php if(isset($_POST['end_date'])) echo $_POST['end_date'];?>" />
					<input type="submit" value="Харах"/>
					</form>
					<?php }?>
		<?php echo $output; ?>
    										
				</div><!--/span9-->
</div><!--/row-->

			<hr />

			<footer>
				<p>&copy; Restaurant <?php echo date('Y')?></p>
			</footer>

		</div> <!-- /container wrapper -->

		<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script> -->
		<!-- <script>window.jQuery || document.write('<script src="<?php echo base_url()?>admintire/js/jquery-1.8.0.min.js"><\/script>')</script> -->
		<script src="<?php echo base_url()?>admintire/js/bootstrap.min.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.pie.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.resize.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.demo.js"></script>
	</body>
</html>