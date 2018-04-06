<div class="span9 content">

					<div class="banner">
						<h2>User Profile</h2>
						<p>Админы хувийн мэдээлэл.</p>
					</div>

					<h3>Админы мэдээлэл:</h3>
					
					<form class="form-horizontal" method="post" action="<?php echo site_url('admin/adminadd/add')?>">
					
						<p>Мэдээлэл:</p>
						<div class="control-group">
							<label class="control-label" for="inputPassword">Нэвтрэх нэр</label>
							<div class="controls">
								<input type="text" id="inputUser" name="inputUser" placeholder="Нэвтрэх нэр" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="inputPassword">Нууц үг</label>
							<div class="controls">
								<input type="password" id="verifyPassword" name="verifyPassword" placeholder="Нууц үг" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="verifyPassword">Үүрэг</label>
							<div class="controls">
							<select id="permission" name="permission">
								<option value="admin">Супер Админ</option>
							  	<option value="user">Админ</option>
							</select>
								<!-- <input type="" id="verifyPassword" placeholder="Permission" /> -->
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