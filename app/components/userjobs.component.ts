import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';

let me: UserjobsComponent;

@Component({
  selector: 'userjobs-component',
  template: `
    <h1>Хэрэглэгчид ажил нэмэх</h1>
    <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;">   
  </div>
    <form method="post">
      <label class="c-label o-form-element">
        Нэр
        <div class="c-input-group">         
          <div class="o-field">
            <select class="c-field" type="text" placeholder="Хэрэглэгчийн нэр" [value]="selectedUser?.user_id" id="username" name="username" #username>
                <option 
                *ngFor="let user of mainUsers" value="{{user.id}}">{{user.username}}</option>
              </select>
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
          Ажлын нэр
          <div class="c-input-group">
            <div class="o-field">
              <select class="c-field" type="text" placeholder="Ажлын нэр" [value]="selectedUser?.job_id" id="jobname" name="jobname" #jobname>
                <option 
                *ngFor="let job of mains" value="{{job.id}}">{{job.name}}</option>
              </select>
            </div>
          </div>
        </label> 
    </form>
    <span class="c-input-group" *ngIf="selectedUser">
        <button class="c-button c-button--success" (click)="editUserJob()">Засварлах</button>
      </span>
      <span class="c-input-group" *ngIf="!selectedUser">
        <button class="c-button c-button--error" (click)="setUserJob()">Нэмэх</button>
        <button class="c-button" (click)="reset()">Цэвэрлэх</button>
      </span>
  `,
  providers: [JobService]
})
export class UserjobsComponent  {

  selectedUser: Array<any> = [];
  permissions: Array<any> = [];
  mains: Array<any> = []; 
  mainUsers: Array<any> = []; 
  companys: Array<any> = [];
  @ViewChild('username') nameEl: ElementRef;
  @ViewChild('cname') cnameEl: ElementRef;
  @ViewChild('jobname') jnameEl: ElementRef;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    if(window.location.hash.substring(0,14) == '#/userjob/edit') {
      me.initData();
    } else {
      me.selectedUser = null;
    }
    me.getPermission();
    me.initCompanys();
    me.selectMains();
    me.initUsers();
  }

  initData() {
    me.jobService.getUserJob(window.location.hash.substring(15)).subscribe(res => { 
    if(res.error) {
      window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
    }            
    me.selectedUser = res;
    });    
  }

  initUsers() {
    me.jobService.getUsers().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainUsers = res;
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

  selectMains() {  
    me.jobService.getMain().subscribe(res => { 
      me.mains = res;
    });
  }

  getPermission() {
    me.jobService.getPermissions().subscribe(res => {                
      me.permissions = res;
    });
  }

  editUserJob() {
    me.jobService.editUserJob(me.nameEl.nativeElement.value
    ,me.cnameEl.nativeElement.value,me.jnameEl.nativeElement.value).subscribe(res => {                
    me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
    });
  }

  setUserJob() {   
    me.jobService.setUserJob(me.nameEl.nativeElement.value
    ,me.cnameEl.nativeElement.value,me.jnameEl.nativeElement.value).subscribe(res => {              
    me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
    });
  }

  reset() {
    me.nameEl.nativeElement.value = '';
    me.resultEl.nativeElement.innerHTML = '';
  }
}
