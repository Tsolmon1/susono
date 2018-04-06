<div class="span9 content">

					<div class="banner">
						<h2>User Profile</h2>
						<p>Админы хувийн мэдээлэл.</p>
					</div>

					<h3><?=$this->tank_auth->get_username()?> Profile:</h3>

					<div class="row-fluid">
						<div class="span2">
							<img class="avatar" src="<?php echo base_url()?>admintire/assets/users/user-avatar-1.png" alt="user" /><br />
						</div>
						<div class="span4">
							<div class="well">
								<strong>Нэр:</strong> <?=$this->tank_auth->get_username()?><br />
								<strong>Үүрэг:</strong> <?=$this->tank_auth->get_permission()?><br />
							</div>
						</div>
						<div class="span6">
							<p>Та мэдээллээ өөрчлөх үү?</p>
							<p><a class="btn btn-success" href="<?php echo site_url('admin/settings')?>">Засах</a></p>
							
						</div>
					</div>

					<hr />

					
				</div><!--/span9-->