<div class="span9 content">
				
					<div class="banner">
						<h2>Захиалга</h2>
						<p>Захиалгын дэлгэрэнгүй хэсэг.</p>
					</div>

					<h3>Дэлгэрэнгүй:</h3>

					<div class="message">
						<img class="avatar pull-left" src="<?php echo base_url()?>images/tire/<?=$detail['image']?>" />
						<div class="message-actions">
							<a class="btn" href="<?php echo site_url('admin/order/update')?>/<?=$sale_detail['id']?>">Захиалга хаах</a>
						</div>
						<p>
							<strong>Овог нэр: <a href=""><?=$sale_detail['surname']?></a></strong><br />
							<strong>Загвар:</strong> <?=$sale_detail['name']?> <br />                            
                            <strong>Үнэ:</strong> <?=$sale_detail['price']?> ₮
                            <strong>Тоо:</strong> <?=$sale_detail['count']?> Ш
                            <strong>Нийт үнэ:</strong> <?=$sale_detail['count']*$sale_detail['price']?> ₮
						</p>
                        <p><strong>Утас:</strong> <?=$sale_detail['phone']?></p>
                        <p><strong>Нэмэлт утас:</strong> <?=$sale_detail['subphone']?></p>
                        <p><strong>Гэрийн хаяг:</strong><?=$sale_detail['address']?> </p>
                        <p><strong>Имэйл хаяг:</strong><?=$sale_detail['email']?> </p>
						
						<hr />
					</div>
					<?php if($sale_detail['orders'] == 'yes') {?>
					<div class="alert alert-info">
						<button type="button" class="close" data-dismiss="alert">×</button>						
						Та захиалгыг хаасан байна.
					</div>
					<?php }?>	
					<div class="well">
						<strong>Хариу:</strong>
						<br />
						<br />
						<form class="form" method="post" action="<?php echo site_url('admin/send_email')?>/<?=$sale_detail['id']?>">
							
							<label for="message">Хариу мэссэж:</label>
							<textarea class="span4" rows="4" id="message" name="message" placeholder=""></textarea>
							<input type="hidden" value="<?=$sale_detail['email']?>" id="email" name="email"/>
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
