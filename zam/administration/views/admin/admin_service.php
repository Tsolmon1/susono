
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
					<a class="brand" href="index.html">japantire.mn Admin</a>
					<div class="nav-collapse collapse">
						<ul class="nav">
							<li class="active"><a href="">Нүүр</a></li>
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
			<div class="row">
				<div class="span3">
					<ul class="nav nav-tabs nav-stacked" data-spy="affix">
						<li><a href="index.html"><img src="<?php echo base_url()?>admintire/assets/logo.png" alt="logo" /></a></li>
						<li class="active"><a href="index.html"><i class="icon icon-home"></i> Хяналтын хэсэг</a></li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#profile-submenu" data-parent=".nav-stacked"><i class="icon icon-user"></i> Profile <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="profile-submenu">
								<li><a href="profile.html">Миний тухай</a></li>
								<li><a href="edit-profile.html">Тохиргоо</a></li>
                                <li><a href="edit-profile.html">Админ нэмэх</a></li>
							</ul>
						</li>
                        <li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#tires-submenu" data-parent=".nav-stacked"><i class="icon icon-user"></i> Бараа  <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="tires-submenu">
								<li><a href="profile.html">Төрөл нэмэх</a></li>
								<li><a href="edit-profile.html">Брэнд нэмэх</a></li>
								<li><a href="edit-profile.html">Хэмжээ нэмэх</a></li>
								<li><a href="edit-profile.html">Загвар нэмэх</a></li>
								<li><a href="edit-profile.html">Улирал нэмэх</a></li>
                                <li><a href="edit-profile.html">Дугуй нэмэх</a></li>
							</ul>
						</li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#messages-submenu" data-parent=".nav-stacked"><span class="badge badge-important pull-right">3</span><i class="icon icon-envelope"></i> Messages <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="messages-submenu">
								<li><a href="messages-feed.html">Feed <span class="badge badge-important pull-right">3 New Messages</span></a></li>
								<li><a href="message.html">Read</a></li>
								<li><a href="compose-message.html">Compose</a></li>
							</ul>
						</li>
						<li><a href="gallery.html"><i class="icon icon-picture"></i> Баннер</a></li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#billing-submenu" data-parent=".nav-stacked"><i class="icon icon-credit-card"></i> Захиалга <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="billing-submenu">
								<li><a href="invoices.html">Захиалгууд</a></li>
								<li><a href="purchases.html">Purchases</a></li>
								<li><a href="billing.html">Billing Info</a></li>
							</ul>
						</li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#support-submenu" data-parent=".nav-stacked"><i class="icon icon-beaker"></i> Support<i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="support-submenu">
								<li><a href="wiki.html">Knowledge Base (Wiki)</a></li>
								<li><a href="article.html">Featured Article</a></li>
								<li><a href="submit-ticket.html">Submit Support Ticket</a></li>
								<li><a href="view-tickets.html">View Your Tickets</a></li>
							</ul>
						</li>
						<li><a href="<?php echo site_url('auth/logout_admin')?>"><i class="icon icon-signout"></i> Гарах</a></li>
					</ul><!--/nav nav-tabs-->
				</div><!--/span3-->

				<div class="span9 content">

					<div class="banner">
						<h2>Welcome back, Ninja!</h2>
						<p>There are some good news for you today to find out.</p>
					</div>

					<h3>Statistics:</h3>

					<div class="well display stats">
						<div class="row-fluid">
							<div class="span3">
								<h2>1</h2>
								<p><small>Админы тоо</small></p>
							</div>
							<div class="span3">
								<h2>3</h2>
								<p><small>Нийт барааны тоо</small></p>
							</div>
							<div class="span3">
								<h2>2</h2>
								<p><small>Хямдарсан барааны тоо</small></p>
							</div>
							<div class="span3">
								<h2>15</h2>
								<p><small>Шинэ захиалга</small></p>
							</div>
						</div>
					</div>

					
					<h3>Important Note:</h3>
					
					<div class="alert alert-info">
						<button type="button" class="close" data-dismiss="alert">×</button>
						<h4>Platform Update!</h4>
						We have completed migrating all data available in the old version of Insights to the new Insights dashboard. With this and other recent improvements, you can now view and export metrics for any specified time frame. We will discontinue the old Insights tool on January 31 to focus resources on the new Insights dashboard.
					</div>

					<h3>Дугуйны жагсаалт:</h3>

					<table class="table table-bordered table-striped">
						<thead>
							<tr>
								<th width="2%" class="optional">Сонгох</th>
                                <th>Төрөл</th>
								<th>Барааны ID</th>
								<th class="optional">Нэмсэн огноо</th>
								<th class="optional">Брэнд</th>
								<th>Үнэ</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="optional"><input type="checkbox" /></td>
                                <td class="optional">Өвөл</td>
								<td>3458201 </td>
								<td class="optional">03/14/2012 <span class="label label-inverse">7 days left</span></td>
								<td class="optional">Maxx GT</td>
								<td>35.000₮ </td>
								<td>
                                  <a class="btn btn-small" href="#">Засах</a>
                                  <a class="btn btn-small" href="#">Устгах</a>
                                </td>
							</tr>
							<tr>
								<td class="optional"><input type="checkbox" /></td>
                                <td class="optional">Өвөл</td>
								<td>1158200 </td>
								<td class="optional">03/14/2012 <span class="label label-inverse">6 days left</span></td>
								<td class="optional">Maxx GT</td>
								<td>35.000₮</td>
								<td>
                                  <a class="btn btn-small" href="#">Засах</a>
                                  <a class="btn btn-small" href="#">Устгах</a>
                                </td>
							</tr>
							<tr>
								<td class="optional"><input type="checkbox" /></td>
                                <td class="optional">Өвөл</td>
								<td>9858204</td>
								<td class="optional">03/14/2012 <span class="label label-inverse">6 days left</span></td>
								<td class="optional">Maxx GT</td>
								<td>35.000₮</td>
								<td>
                                  <a class="btn btn-small" href="#">Засах</a>
                                  <a class="btn btn-small" href="#">Устгах</a>
                                </td>
							</tr>
							<tr>
								<td class="optional"><input type="checkbox" /></td>
                                <td class="optional">Өвөл</td>
								<td>6558203 </td>
								<td class="optional">03/14/2012 <span class="label label-warning">Processing</span></td>
								<td class="optional">Maxx GT</td>
								<td>35.000₮</td>
								<td>
                                  <a class="btn btn-small" href="#">Засах</a>
                                  <a class="btn btn-small" href="#">Устгах</a>
                                </td>
							</tr>
							<tr class="warning">
								<td class="optional"><input type="checkbox" /></td>
                                <td class="optional">Өвөл</td>
								<td>2158200 </td>
								<td class="optional">03/14/2012 <span class="label label-important">Due</span></td>
								<td class="optional">Maxx GT</td>
								<td>35.000₮</td>
								<td>
                                  <a class="btn btn-small" href="#">Засах</a>
                                  <a class="btn btn-small" href="#">Устгах</a>
                                </td>
							</tr>
							
                            
						</tbody>
                        
					</table>
                    <div class="pagination">
                              <ul>
                                <li><a href="#">Prev</a></li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">Next</a></li>
                              </ul>
                    </div>
					
					

				</div><!--/span9-->
			</div><!--/row-->

			<hr />

			<footer>
				<p>&copy; Company 2013</p>
			</footer>

		</div> <!-- /container wrapper -->

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="<?php echo base_url()?>admintire/js/jquery-1.8.0.min.js"><\/script>')</script>
		<script src="<?php echo base_url()?>admintire/js/bootstrap.min.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.pie.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.resize.js"></script>
		<script src="<?php echo base_url()?>admintire/js/jquery.flot.demo.js"></script>
	</body>
</html>
