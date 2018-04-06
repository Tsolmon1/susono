

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
			<link type="text/css" rel="stylesheet" href="<?php echo base_url()?>assets/grocery_crud/themes/flexigrid/css/flexigrid.css" />
	<script src="<?php echo base_url()?>assets/grocery_crud/js/jquery-1.7.1.min.js"></script>
	<script src="<?php echo base_url()?>assets/grocery_crud/themes/flexigrid/js/cookies.js"></script>
	<script src="<?php echo base_url()?>assets/grocery_crud/themes/flexigrid/js/flexigrid.js"></script>
	<script src="<?php echo base_url()?>assets/grocery_crud/themes/flexigrid/js/jquery.form.js"></script>
	<script src="<?php echo base_url()?>assets/grocery_crud/themes/flexigrid/js/jquery.numeric.js"></script>
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
					<a class="brand" href="<?php echo site_url('admin/main')?>">Admin</a>
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
			<div class="row">
				<div class="span3">
					<ul class="nav nav-tabs nav-stacked">
						<li><a href="<?php echo site_url('admin/main')?>"><img src="<?php echo base_url()?>admintire/assets/logo.png" alt="logo" /></a></li>
						<li class="active"><a href="<?php echo site_url('admin/main')?>"><i class="icon icon-home"></i> Хяналтын хэсэг</a></li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#profile-submenu" data-parent=".nav-stacked"><i class="icon icon-user"></i> Profile <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="profile-submenu">
								<li><a href="<?php echo site_url('admin/about')?>">Миний тухай</a></li>
								<li><a href="<?php echo site_url('admin/settings')?>">Тохиргоо</a></li>
								                                <li><a href="<?php echo site_url('admin/adminadd')?>">Админ нэмэх</a></li>
                                							</ul>
						</li>
                        <li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#tires-submenu" data-parent=".nav-stacked"><i class="icon icon-user"></i> Нэмэх  <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="tires-submenu">
								
								<li><a href="<?php echo site_url('admin/session')?>">Сургалт нэмэх</a></li>
								<li><a href="<?php echo site_url('admin/gallery')?>">Сургалт Gallery нэмэх</a></li>									
								<li><a href="<?php echo site_url('admin/art_category')?>">Багш category нэмэх</a></li>
								<li><a href="<?php echo site_url('admin/art_galery')?>">Багш галерей нэмэх</a></li>
								<li><a href="<?php echo site_url('admin/art')?>">Багш нэмэх</a></li>
								<li><a href="<?php echo site_url('admin/tugsugch_category')?>">Төгсөгч category нэмэх</a></li>
								<li><a href="<?php echo site_url('admin/tugsugch_galery')?>">Төгсөгч галерей нэмэх</a></li>
								<li><a href="<?php echo site_url('admin/tugsugch')?>">Төгсөгч нэмэх</a></li>
							</ul>
						</li>
						<!-- <li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#messages-submenu" data-parent=".nav-stacked"><span class="badge badge-important pull-right">3</span><i class="icon icon-envelope"></i> Messages <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="messages-submenu">
								<li><a href="messages-feed.html">Шинэ имэйл <span class="badge badge-important pull-right">3 New Messages</span></a></li>
								<li><a href="message.html">Read</a></li>
								<li><a href="compose-message.html">Compose</a></li>
							</ul>
						</li> -->
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#messages-submenu" data-parent=".nav-stacked"><span class="badge badge-important pull-right"><?php $i=0;foreach($contact as $cont) {if($cont == "no") $i++;} echo $i;?></span><i class="icon icon-envelope"></i> Contacts <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="messages-submenu">
								<li><a href="<?php echo site_url('admin/contact')?>">Шинэ имэйл <span class="badge badge-important pull-right"><?php $i=0;foreach($contact as $cont) {if($cont == "no") $i++;} echo $i;?> Шинэ имэйл</span></a></li>
								
							</ul>
						</li>
						<li class="accordion-group">
							<a href="##" data-toggle="collapse" data-target="#reg-submenu" data-parent=".nav-stacked"><span class="badge badge-important pull-right"><?php $i=0;foreach($register as $reg) {if($reg == "no") $i++;} echo $i;?></span><i class="icon icon-envelope"></i> Бүртгэл <i class="icon icon-caret-down"></i></a>
							<ul class="collapse" id="reg-submenu">
								<li><a href="<?php echo site_url('admin/register')?>">Шинэ бүртгэл <span class="badge badge-important pull-right"><?php $i=0;foreach($register as $reg) {if($reg == "no") $i++;} echo $i;?> Шинэ бүртгэл</span></a></li>
								
							</ul>
						</li>
						<li><a href="<?php echo site_url('admin/banner')?>"><i class="icon icon-picture"></i> Баннер</a></li>
						<li><a href="<?php echo site_url('admin/huvaar')?>"><i class="icon icon-picture"></i> Хичээлийн хуваарь</a></li>
						<li><a href="<?php echo site_url('admin/cards')?>"><i class="icon icon-picture"></i> Дансны дугаар</a></li>
						<li><a href="<?php echo site_url('admin/news')?>"><i class="icon icon-picture"></i> Мэдээ</a></li>
						<li><a href="<?php echo site_url('admin/social')?>"><i class="icon icon-picture"></i> Social</a></li>
						<li><a href="<?php echo site_url('admin/other')?>"><i class="icon icon-picture"></i> Бусад үгс</a></li>
						<li><a href="<?php echo site_url('admin/about_us')?>"><i class="icon icon-picture"></i> Тухай</a></li>
						<li><a href="<?php echo site_url('admin/zasvar')?>"><i class="icon icon-picture"></i> Засвар</a></li>
						<li><a href="<?php echo site_url('admin/location')?>"><i class="icon icon-picture"></i> Байршил</a></li>
						<li><a href="<?php echo site_url('admin/images')?>"><i class="icon icon-picture"></i> Зураг UPLOAD</a></li>					
						<li><a href="<?php echo site_url('auth/logout_admin')?>"><i class="icon icon-signout"></i> Гарах</a></li>
					</ul><!--/nav nav-tabs-->
				</div><!--/span3-->
<div class="span9 content">

					<div class="banner">
						<h2>Категори</h2>
						<p>Барааны мэдээлэл.</p>
					</div>
					
		<script type='text/javascript'>
	var base_url = 'http://localhost/tire/';

	var subject = 'Захиалга';
	var ajax_list_info_url = '<?php echo site_url('admin/order')?>/ajax_list_info';
	var unique_hash = '0abf8658530bd7eed6d4a86de5e2f268';

	var message_alert_delete = "Та үнэхээр устгахыг хүсч байна уу?";

</script>
<div id='report-error' class='report-div error'></div>
<div id='report-success' class='report-div success report-list' >
</div>	
<div class="flexigrid" style='width: 100%;'>
	<div class="mDiv">
		<div class="ftitle">
			&nbsp;
		</div>
		<div title="Minimize/Maximize Table" class="ptogtitle">
			<span></span>
		</div>
	</div>
	<div id='main-table-box'>
		<div id='ajax_list'>
		<div class="bDiv" >
		<table cellspacing="0" cellpadding="0" border="0" id="flex1">
		<thead>
			<tr class='hDiv'>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='id'>
						Id					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='name'>
						Нэр					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='price'>
						Үнэ					</div>
				</th>
							<th width='10%'>
					<div class="text-left field-sorting " 
						rel='count'>
						Тоо					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='surname'>
						Овог нэр					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='address'>
						Хаяг					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='phone'>
						Дугаар					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='subphone'>
						Нэмэлт дугаар					</div>
				</th>
								<th width='10%'>
					<div class="text-left field-sorting " 
						rel='s_datetime'>
						Огноо					</div>
				</th>
												<th align="left" abbr="tools" axis="col1" class="" width='20%'>
					<div class="text-right">
						Үйлдлүүд					</div>
				</th>
							</tr>
		</thead>		
		<tbody>
        <?php foreach($sales as $sale) {?>
		<tr  >
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['id']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['name']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['price']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['count']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['surname']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['address']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['phone']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['subphone']?></div>
			</td>
						<td width='10%' class=''>
				<div style="width: 100%;" class='text-left'><?=$sale['s_datetime']?></div>
			</td>
									<td align="left" width='20%'>
				<div class='tools'>				
					                    						<a href='<?php echo site_url('admin/order/edit')?>/<?=$sale['id']?>' title='Засах Захиалга'><span class='edit-icon'></span></a>
															<a href='<?php echo site_url('admin/order/delete')?>/<?=$sale['id']?>' title='Устгах Захиалга'><span class='delete-icon'></span></a>
                    <div class='clear'></div>
				</div>
				
			</td>
					</tr>
        <?php }?>
		</tbody>
		</table>
	</div>
		</div>
	<form action="<?php echo site_url('admin/order')?>/ajax_list" method="post" id="filtering_form" autocomplete = "off" accept-charset="utf-8">	
	<div class="sDiv" id='quickSearchBox'>
		<div class="sDiv2">
			Хайлт: <input type="text" class="qsbsearch_fieldox" name="search_text" size="30" id='search_text'>
			<select name="search_field" id="search_field">
				<option value="">Бүгдийг хайх</option>
								<option value="id">Id&nbsp;&nbsp;</option>
								<option value="name">Нэр&nbsp;&nbsp;</option>
								<option value="price">Үнэ&nbsp;&nbsp;</option>
								<option value="surname">Овог нэр&nbsp;&nbsp;</option>
								<option value="address">Хаяг&nbsp;&nbsp;</option>
								<option value="phone">Дугаар&nbsp;&nbsp;</option>
								<option value="subphone">Нэмэлт дугаар&nbsp;&nbsp;</option>
								<option value="s_datetime">Огноо&nbsp;&nbsp;</option>
							</select>
            <input type="button" value="Хайлт" id='crud_search'> 
		</div>
        <div class='search-div-clear-button'>
        	<input type="button" value="Шүүлтүүрийг арилгах" id='search_clear'>
        </div>
	</div>
	<div class="pDiv">
		<div class="pDiv2">
			<div class="pGroup">
				<div class="pSearch pButton" id='quickSearchButton' title="Хайлт">
					<span></span>
				</div>
			</div>
			<div class="btnseparator">
			</div>
			<div class="pGroup">
				<select name="per_page" id='per_page'>
											<option value="10" >10&nbsp;&nbsp;</option>
											<option value="25" selected="selected">25&nbsp;&nbsp;</option>
											<option value="50" >50&nbsp;&nbsp;</option>
											<option value="100" >100&nbsp;&nbsp;</option>
									</select>
				<input type='hidden' name='order_by[0]' id='hidden-sorting' value='' />
				<input type='hidden' name='order_by[1]' id='hidden-ordering'  value=''/>
			</div>
			<div class="btnseparator">
			</div>
			<div class="pGroup">
				<div class="pFirst pButton first-button">
					<span></span>
				</div>
				<div class="pPrev pButton prev-button">
					<span></span>
				</div>
			</div>
			<div class="btnseparator">
			</div>
			<div class="pGroup">
				<span class="pcontrol">Хуудас <input name='page' type="text" value="1" size="4" id='crud_page'> 
				-н 
				<span id='last-page-number'>1</span></span>
			</div>
			<div class="btnseparator">
			</div>
			<div class="pGroup">
				<div class="pNext pButton next-button" >
					<span></span>
				</div>
				<div class="pLast pButton last-button">
					<span></span>
				</div>
			</div>
			<div class="btnseparator">
			</div>
			<div class="pGroup">
				<div class="pReload pButton" id='ajax_refresh_and_loading'>
					<span></span>
				</div>
			</div>
			<div class="btnseparator">
			</div>
			<div class="pGroup">
				<span class="pPageStat">
																				Дэлгэц дээр <span id='page-starts-from'>1</span> с <span id='page-ends-to'>1</span> рүү <span id='total_items'>1</span> утгуудын   					
				</span>
			</div>
		</div>
		<div style="clear: both;">
		</div>
	</div>
	</form>	</div>
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