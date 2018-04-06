<div class="span9 content">
				
					<div class="banner">
						<h2>Имэйл</h2>
						<p>Шинээр ирсэн болон бүх имэйлүүд.</p>
					</div>

					<h3>Шинэ имэйл:</h3>
					<div class="message">
						<img class="avatar pull-left" src="<?php echo base_url()?>admintire/assets/user-avatar-1.png" />
						<div class="message-actions">							
							<a class="btn" href="<?php echo site_url('admin/contact/delete')?>/<?=$contact_detail['id']?>">Устгах</a>
						</div>
						<p>
							<strong>Хэнээс: <a href=""><?=$contact_detail['email']?></a></strong><br />
							<strong>Огноо:</strong> <?=$contact_detail['c_datetime']?>
						</p>
						<p><strong>Коммент:</strong> <?=$contact_detail['comment']?></p>
						<hr />
					</div>			

					<div class="well">
						<strong>Хариу:</strong>
						<br />
						<br />
						<form class="form" method="post" action="<?php echo site_url('admin/send_email')?>/<?=$contact_detail['id']?>">
							
							<label for="message">Хариу мэссэж:</label>
							<textarea class="span4" rows="4" id="message" name="message" placeholder=""></textarea>
							<input type="hidden" value="<?=$contact_detail['email']?>" id="email" name="email"/>
							<br />
							<button type="submit" class="btn btn-success">Илгээх</button>
						</form>
					</div>
					<?php if(isset($error)) {?>
					<div class="alert alert-info">
						<button type="button" class="close" data-dismiss="alert">×</button>						
						<?=$error?>
					</div>
					<?php }?>	
				</div><!--/span9-->