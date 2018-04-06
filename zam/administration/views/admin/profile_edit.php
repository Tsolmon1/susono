<div class="span9 content">

					<div class="banner">
						<h2>User Profile</h2>
						<p>Админы хувийн мэдээлэл.</p>
					</div>

					<h3>Мэдээллээ засах:</h3>
					<p>Засах мэдээлэл:</p>

					<form class="form-horizontal" method="post" action="<?php echo site_url('admin/settings/edit')?>">
					
						<div class="control-group">
							<label class="control-label" for="user-avatar">Нүүр зураг</label>
							<div class="controls">
							<img class="avatar" src="<?php echo base_url()?>admintire/assets/users/user-avatar-1.png" alt="user" /><br />
					
							</div>
							<div class="controls">
								<input type="file" name="user-avatar" />
							</div>
						</div>
						<hr />
						<p>Нууц үгээ солих:</p>
						<div class="control-group">
							<label class="control-label" for="inputPassword">Нууц үг</label>
							<div class="controls">
								<input type="password" id="inputPassword" name="inputPassword" placeholder="Password" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="inputPassword">Нууц үг (давтах)</label>
							<div class="controls">
								<input type="password" id="verifyPassword" name="verifyPassword" placeholder="Password" />
							</div>
						</div>
						<div class="form-actions">
							<button type="submit" class="btn btn-success">Хадгалах</button>
						</div>
					</form>
						<?php if(isset($error)) {?>
					<div class="alert alert-info">
						<button type="button" class="close" data-dismiss="alert">×</button>						
						<?=$error?>
					</div>
					<?php }?>					
				</div><!--/span9-->