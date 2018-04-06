
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
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
	<body>
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
						<i class="icon icon-reorder"></i> Меню
					</a>
					<a class="brand" href="">Админ</a>
					<div class="nav-collapse collapse">
						<ul class="nav">
							<li class="active"><a href="">Нүүр</a></li>
						</ul>
					</div><!--/.nav-collapse -->
				</div>
			</div>
			<div class="sub-navbar">
				<div class="container">
					<p><i class="icon icon-user"></i> Тавтай морил, Зочин.</p>
				</div>
			</div>
		</div>

		<div class="container wrapper">
			<div class="row">
				<br /><br />
				<div class="span4 offset4 well">
					<img class="text-center" src="<?php echo base_url()?>images/logo-light.png" />
					<hr />
					<h3>Админы удирдлага:</h3>
					<form class="form login-form" action="<?php echo site_url('auth/admin')?>" method="post">
						<label for="login_admin">Нэвтрэх нэр:</label>
						<input class="span4" type="text" id="login_admin" name="login_admin" placeholder="Нэвтрэх нэр" />

						<label for="password_admin">Нууц үг:</label>
						<input class="span4" type="password" id="h-password_admin" name="h-password_admin" placeholder="Нууц үг" />

						<label class="checkbox">
							<!-- <input type="checkbox" /> Keep me logged in -->
						</label>
						<button type="submit" class="btn btn-success">Нэвтрэх</button>
						<hr />
					</form>
				</div><!--/span-->
			</div>

			<hr />

			<footer>
				<p>&copy; Restaurant <?php echo date('Y');?></p>
			</footer>

		</div> <!-- /container -->

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="<?php echo base_url()?>admintire/js/jquery-1.8.0.min.js"><\/script>')</script>
		<script src="<?php echo base_url()?>admintire/js/bootstrap.min.js"></script>
	</body>
</html>
