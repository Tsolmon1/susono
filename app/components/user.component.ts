import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';

let me: UserComponent;

@Component({
  selector: 'user-component',
  template: `
    <h1>Хэрэглэгч нэмэх</h1>
    <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;">	  
	</div>
    <form method="post">
	    <label class="c-label o-form-element">
	      Нэр
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Нэр" [value]="selectedUser?.username" id="username" name="username" #username>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Нууц үг
	      <div class="c-input-group">
	        <div class="o-field">
	        	<input class="c-field" type="password" placeholder="Нууц үг" [value]="selectedUser?.password" id="password" name="password" #password>	          
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
          Компаний нэр
          <div class="c-input-group">
            <div class="o-field">
              <select class="c-field" type="text" placeholder="Компаний нэр" [value]="selectedUser?.company_id" id="cname" name="cname" #cname>
                <option 
                *ngFor="let com of companys" value="{{com.id}}">{{com.name}}</option>
              </select>
            </div>
          </div>
        </label> 
	    <label class="c-label o-form-element">
	      Имэйл
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Имэйл" [value]="selectedUser?.email" id="email" name="email" #email>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Утас
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Утас" [value]="selectedUser?.phone" id="phone" name="phone" #phone>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
          Хандах эрх
          <div class="c-input-group">
            <div class="o-field">
              <select class="c-field" type="text" placeholder="Хандах эрх" [value]="selectedUser?.permission_id" id="permission" name="permission" #permission>
                <option 
                *ngFor="let per of permissions" value="{{per.id}}">{{per.name}}</option>
              </select>
            </div>
          </div>
        </label>    
	  </form>
	  <span class="c-input-group" *ngIf="selectedUser">
	      <button class="c-button c-button--success" (click)="editUser()">Засварлах</button>
	    </span>
	    <span class="c-input-group" *ngIf="!selectedUser">
	      <button class="c-button c-button--error" (click)="addUser()">Нэмэх</button>
	      <button class="c-button" (click)="reset()">Цэвэрлэх</button>
	    </span>
  `,
  providers: [JobService]
})
export class UserComponent  {

  selectedUser: Array<any> = [];
  permissions: Array<any> = [];
  companys: Array<any> = [];
  @ViewChild('username') nameEl: ElementRef;
  @ViewChild('password') passwordEl: ElementRef;
  @ViewChild('phone') phoneEl: ElementRef;
  @ViewChild('cname') cnameEl: ElementRef;
  @ViewChild('email') emailEl: ElementRef;
  @ViewChild('permission') permissionEl: ElementRef;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
  	me = this;
  	if(window.location.hash.substring(0,11) == '#/user/edit') {
    	me.initData();
    } else {
    	me.selectedUser = null;
    }
    me.getPermission();
    me.initCompanys();
  }

  initData() {
	  me.jobService.getUserId(window.location.hash.substring(12)).subscribe(res => { 
		if(res.error) {
		  window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
		}            
		me.selectedUser = res;
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

  getPermission() {
    me.jobService.getPermissions().subscribe(res => {                
      me.permissions = res;
    });
  }

  editUser() {
	  me.jobService.editUser(window.location.hash.substring(12),me.nameEl.nativeElement.value
	  ,me.passwordEl.nativeElement.value,me.phoneEl.nativeElement.value,me.emailEl.nativeElement.value
	  ,me.permissionEl.nativeElement.value,me.cnameEl.nativeElement.value).subscribe(res => { 		           
		me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
	  });
  }

  addUser() { 	
	  me.jobService.addUser(me.nameEl.nativeElement.value
	  ,me.passwordEl.nativeElement.value,me.phoneEl.nativeElement.value,me.emailEl.nativeElement.value
	  ,me.permissionEl.nativeElement.value,me.cnameEl.nativeElement.value).subscribe(res => { 	           
		me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
	  });
  }

  reset() {
  	me.nameEl.nativeElement.value = '';
  	me.passwordEl.nativeElement.value = '';
  	me.phoneEl.nativeElement.value = '';
  	me.emailEl.nativeElement.value = '';
  	me.permissionEl.nativeElement.value = '';
  	me.resultEl.nativeElement.innerHTML = '';
  }
}
