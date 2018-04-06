import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';

let me: EquipmentComponent;

@Component({
  selector: 'equipment-component',
  template: `
    <h1>Төхөөрөмж нэмэх</h1>
    <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;">	  
	</div>
    <form method="post" enctype="multipart/form-data">
	    <label class="c-label o-form-element">
	      Төхөөрөмжийн нэр
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Нэр" [value]="selectedEquipment?.name" id="name" #name>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Компаны нэр
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <select class="c-field" id="company" #company>
				<option 
			  *ngFor="let com of companys" value="{{com.id}}">{{com.name}}</option>
				</select>
	        </div>
	      </div>
	    </label>	    
	    <label class="c-label o-form-element">
	      Зураг
	      <div class="c-input-group">
	        <div class="o-field">
	        	<input id="filePath" name="filePath" type="file" accept="image/*" #image/>
	        	<img src="uploads/{{selectedEquipment.image}}" width="150px" height="80px" *ngIf="selectedEquipment"/>
	        	<!--<input class="c-field" type="text" placeholder="Зураг" [value]="selectedEquipment?.image" id="image" #image>-->
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Үзүүлэлт
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Үзүүлэлт" [value]="selectedEquipment?.power" id="power" #power>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Тайлбар
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Тайлбар" [value]="selectedEquipment?.e_desc" id="desc" #desc>
	        </div>
	      </div>
	    </label>	    
	  </form>
	  <span class="c-input-group" *ngIf="selectedEquipment">
	      <button class="c-button c-button--success" (click)="editEquipment()">Засварлах</button>
	    </span>
	    <span class="c-input-group" *ngIf="!selectedEquipment">
	      <button class="c-button c-button--error" (click)="addEquipment()">Нэмэх</button>
	      <button class="c-button" (click)="reset()">Цэвэрлэх</button>
	    </span>
  `,
  providers: [JobService]
})
export class EquipmentComponent  {

  selectedEquipment: Array<any> = [];
  companys: Array<any> = [];
  public file: File;
  @ViewChild('name') nameEl: ElementRef;
  @ViewChild('image') imageEl: ElementRef;
  @ViewChild('power') powerEl: ElementRef;
  @ViewChild('desc') descEl: ElementRef;
  @ViewChild('company') companyEl: ElementRef;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
  	me = this;
  	me.initCompanys();
  	if(window.location.hash.substring(0,16) == '#/equipment/edit') {
    	me.initData();
    } else {
    	me.selectedEquipment = null;
    }
  }

  initData() {  
	  me.jobService.getEquipmentId(window.location.hash.substring(17)).subscribe(res => { 
		if(res.error) {
		  window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
		}            
		me.selectedEquipment = res;
	  });
  }

  initCompanys() {
    me.jobService.getCompanys().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.companys = res;
    });
  }

  editEquipment() {
  	  if(me.imageEl.nativeElement.value != '') {
	  	  let formData = new FormData();  	  
	  	  formData.append("image", me.imageEl.nativeElement.files[0]);
	  	  me.jobService.addImage(formData).subscribe(res => { 		          
			
		  });
		  me.jobService.editEquipment(window.location.hash.substring(17),me.nameEl.nativeElement.value
		  ,me.imageEl.nativeElement.files[0].name,me.powerEl.nativeElement.value,me.descEl.nativeElement.value,me.companyEl.nativeElement.value).subscribe(res => { 
			me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
		  });
	  } else {
	  	me.jobService.editEquipment(window.location.hash.substring(17),me.nameEl.nativeElement.value
		  ,me.imageEl.nativeElement.value,me.powerEl.nativeElement.value,me.descEl.nativeElement.value,me.companyEl.nativeElement.value).subscribe(res => { 
			me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
		  });
	  }	  
  }

  addEquipment() {
  	  let formData = new FormData();
  	  let now = new Date().getTime();
  	  formData.append('name', now + me.imageEl.nativeElement.files[0].name);  	    
  	  formData.append("image", me.imageEl.nativeElement.files[0]);  	  
  	  me.jobService.addImage(formData).subscribe(res => { 		          
		
	  });
	  me.jobService.addEquipment(me.nameEl.nativeElement.value
	  ,now + me.imageEl.nativeElement.files[0].name,me.powerEl.nativeElement.value,me.descEl.nativeElement.value,me.companyEl.nativeElement.value).subscribe(res => { 		          
		me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
	  });
  }

  reset() {
  	me.nameEl.nativeElement.value = '';
  	me.imageEl.nativeElement.value = '';
  	me.powerEl.nativeElement.value = '';
  	me.descEl.nativeElement.value = '';
  	me.resultEl.nativeElement.innerHTML = '';
  }
}
