import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';
let me: UsersComponent;

@Component({
  selector: 'users-component',
  template: `
    <div class="c-card">
      <div class="c-card__item c-card__item--divider u-bg-green">Хэрэглэгчид</div>
      <div id="abc" style="width:100%;height:100%;opacity:.95;top:0;left:0;display:none;position:fixed;background-color:#313131;overflow:auto">
        <!-- Popup Div Starts Here -->
        <div id="popupContact" style="position:absolute;left:50%;top:17%;margin-left:-202px;font-family:'Raleway',sans-serif">
        <!-- Contact Us Form -->
        <img id="close" src="assets/images/3.png" (click)="div_hide()" style="position:absolute;right:-14px;top:-14px;cursor:pointer">
        <h2 style="background-color:#FEFFED;padding:20px 35px;margin:-10px -50px;text-align:center;border-radius:10px 10px 0 0">Хэрэглэгчид ажил олгох</h2>
        <hr style="margin:10px -50px;border:0;border-top:1px solid #ccc">
        <form style="max-width:350px;min-width:300px;padding:10px 50px;border:2px solid gray;border-radius:10px;font-family:raleway;background-color:#fff">
        <input id="id" name="id" placeholder="ID" type="hidden" (value)="jobId" style="width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway">
        <select class="c-field" id="job" #job style="width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway">          
        <option 
        *ngFor="let jobs of mains; let i = index" [attr.data-index]="i" value="{{jobs.id}}">{{jobs.name}}</option>
        </select>
        <button class="c-button c-button--success" (click)="setUserJob(jobId,companyId)" align="center">Оруулах</button>
        </form>        
        </div>
        <!-- Popup Div Ends Here -->
      </div>
      <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;">   
      </div>
      <div class="c-card__item" id="usersPer">
        <table class="c-table">
          <thead class="c-table__head">
            <tr class="c-table__row c-table__row--heading">
              <th class="c-table__cell">ID</th>
              <th class="c-table__cell">Нэр</th>
              <th class="c-table__cell">Нууц үг</th>
              <th class="c-table__cell">Компаний нэр</th>
              <th class="c-table__cell">Имэйл</th>
              <th class="c-table__cell">Утас</th>
              <th class="c-table__cell">Хандах эрх</th>
              <th class="c-table__cell">Засварлах, Устгах</th>
            </tr>
          </thead>
          <tbody class="c-table__body">
            <tr class="c-table__row"
            *ngFor="let eq of mainUsers; let i = index" [attr.data-index]="i" >
              <td class="c-table__cell">{{i+1}}</td>
              <td class="c-table__cell">{{eq.username}}</td>
              <td class="c-table__cell">{{eq.password}}</td>
              <td class="c-table__cell">{{eq.cname}}</td>
              <td class="c-table__cell">{{eq.email}}</td>
              <td class="c-table__cell">{{eq.phone}}</td>
              <td class="c-table__cell">{{eq.name}}</td>
              <td class="c-table__cell"><span class="c-input-group">
              <button class="c-button c-button--success" routerLink="/user/edit/{{eq.id}}">Засварлах</button>
              <button class="c-button c-button--error" (click)="deleteUser(eq?.id)">Устгах</button>
              <button class="c-button c-button--success" routerLink="/userjobs/{{eq.id}}/{{eq.company_id}}">Ажил олгох</button>
            </span></td>
            </tr>
          </tbody>
        </table>
        <button class="c-button c-button--success" routerLink="/user"><i class="fa fa-plus" aria-hidden="true"></i>Шинэ хэрэглэгч нэмэх</button>
      </div>
    </div>
  `,
  providers: [JobService]
})
export class UsersComponent  {
//(click)="setJob(eq?.id, eq?.company_id)"
  mainUsers: Array<any> = [];
  mains: Array<any> = [];
  jobId: any;
  companyId: any;
  permission: any = 0;
  @ViewChild('job') jobEl: ElementRef;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    me.initData();
    me.selectMains();
  }

  initData() {
    me.jobService.getUsers().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainUsers = res;
    });
    me.jobService.getPermission().subscribe(res => {       
      me.permission = res.permission;
      if(me.permission > 2) {
        document.getElementById('usersPer').style.display = "none";
        me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд хэрэглэгч нэмэх эрх байхгүй байна.';
      }
    });
  }

  selectMains() {  
    me.jobService.getMain().subscribe(res => { 
      me.mains = res;
    });
  }

  setJob(id: any, cid: any) {
    me.jobId = id;
    me.companyId = cid;
    document.getElementById('abc').style.display = "block";    
  }

  div_hide() {
    document.getElementById('abc').style.display = "none";
  }

  setUserJob(id: any, cid: any) {
    me.jobService.setUserJob(id, me.jobEl.nativeElement.value, cid).subscribe(res => {               
    me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
    document.getElementById('abc').style.display = "none";
    me.initData();
    });
  }

  deleteUser(id: any) {
    if(confirm('Та устгахдаа итгэлтэй байна уу?')) {
      me.jobService.deleteUser(id).subscribe(res => {                    
        me.initData();
      });
    }
  }
}
