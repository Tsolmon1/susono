<div class="span9 content">
				
					<div class="banner">
						<h2>Имэйл</h2>
						<p>Шинээр ирсэн болон бүх имэйлүүд.</p>
					</div>

					<h3>Шинэ имэйл:</h3>
				<?php if(count($contact) > 0) {foreach($contact as $con) {?>
					<div class="message">
						<img class="avatar pull-left" src="<?php echo base_url()?>admintire/assets/user-avatar-1.png" />
						<div class="message-actions">
							<a class="btn btn-success" href="<?php echo site_url('admin/contact/read')?>/<?=$con['id']?>">Унших</a>
							<a class="btn" href="<?php echo site_url('admin/contact/delete')?>/<?=$con['id']?>">Устгах</a>
						</div>
						<p>
							<strong>Хэнээс: <a href="<?php echo site_url('admin/contact/read')?>/<?=$con['id']?>"><?=$con['email']?></a></strong><?php if($con['readyn'] == "no") {?> <span class="badge badge-important">Unread</span><?php }?><br />
							<strong>Огноо:</strong> <?=$con['c_datetime']?>
						</p>
						<p><strong>Коммент:</strong> <?=$con['comment']?></p>
						<hr />
					</div>
					<?php } } else echo "<p>Одоогоор имэйл ирээгүй байна.</p>";?>
					
				</div><!--/span9-->