import { Component, ElementRef, ViewChild, NgZone, OnDestroy, AfterContentInit } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';

let me: ReportComponent;
@Component({
  selector: 'report-component',
  template: `
    <h1>Тайлангийн хэсэг</h1>
    <div class="c-card">
      <div class="c-card__item c-card__item--divider u-bg-green">Тайлан компани, ажлаар</div>
      <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;">   
      </div>
      <div id="abc" style="width:100%;height:100%;opacity:.95;top:0;left:0;display:none;position:fixed;background-color:#313131;overflow:auto">
        <!-- Popup Div Starts Here -->
        <div id="popupContact" style="position:absolute;left:50%;top:17%;margin-left:-202px;font-family:'Raleway',sans-serif">
        <!-- Contact Us Form -->
        <img id="close" src="assets/images/3.png" (click)="div_hide()" style="position:absolute;right:-14px;top:-14px;cursor:pointer">
        <h2 style="background-color:#FEFFED;padding:20px 35px;margin:-10px -50px;text-align:center;border-radius:10px 10px 0 0">Үнэлгээний хэсэг</h2>
        <hr style="margin:10px -50px;border:0;border-top:1px solid #ccc">
        <form style="max-width:300px;min-width:250px;padding:10px 50px;border:2px solid gray;border-radius:10px;font-family:raleway;background-color:#fff">
        <input id="id" name="id" placeholder="ID" type="hidden" (value)="jobId" style="width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway">
        <input id="rate" name="rate" placeholder="Үнэлгээ" type="number" #rate style="width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway">
        <button class="c-button c-button--success" (click)="setRating(jobId)" align="center">Илгээх</button>
        </form>        
        </div>
        <!-- Popup Div Ends Here -->
      </div>
      <div id="xyz" style="width:100%;height:100%;opacity:.95;top:0;left:0;display:none;position:fixed;background-color:#313131;overflow:auto">
        <!-- Popup Div Starts Here -->
        <div id="popupContact" style="position:absolute;left:50%;top:17%;margin-left:-202px;font-family:'Raleway',sans-serif">
        <!-- Contact Us Form -->
     
        <form style="max-height:300px;min-height:250px;max-width:300px;min-width:250px;padding:10px 50px;border:2px solid gray;border-radius:10px;font-family:raleway;background-color:#fff">
        <img id="close" src="assets/images/3.png" (click)="div_hide1()" style="position:absolute;right:-14px;top:-14px;cursor:pointer">
        <h2 style="background-color:#FEFFED;padding:20px 35px;margin:-10px -50px;text-align:center;border-radius:10px 10px 0 0">Сануулгын хэсэг</h2>
        <hr style="margin:10px -50px;border:0;border-top:1px solid #ccc">
        <input id="id" name="id" placeholder="ID" type="hidden" (value)="jobId" style="width:82%;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway"> 
        <input id="notif" name="notif" placeholder="Сануулга" type="text"  #notif style="padding:10px;width:100%;margin-top:10px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway"><br />
        <button class="c-button c-button--success"  style="width:80%;margin:10px; m" (click)="setNotif(jobId,companyId)" align="center">Илгээх</button>
        </form>        
        </div>
        <!-- Popup Div Ends Here -->
      </div>
      <div class="c-card__item" id="reportPer">
        <table class="c-table">
          <thead class="c-table__head">
            <tr class="c-table__row c-table__row--heading">
              <th class="c-table__cell">ID</th>
              <th class="c-table__cell">Компаны Нэр</th>
              <th class="c-table__cell">Ажлын нэр</th>
              <th class="c-table__cell">Үнэлгээ</th>
              <th class="c-table__cell">Эхлэх огноо</th>
              <th class="c-table__cell">Дуусах огноо</th>
              <th class="c-table__cell">Засварлах, Устгах</th>
            </tr>
          </thead>
          <tbody class="c-table__body">
            <tr class="c-table__row"
            *ngFor="let eq of mainReport; let i = index" [attr.data-index]="i" >
              <td class="c-table__cell">{{i+1}}</td>
              <td class="c-table__cell">{{eq.contractorName}}</td>
              <td class="c-table__cell">{{eq.name}}</td>
              <td class="c-table__cell">{{eq.percent}}%</td>
              <td class="c-table__cell">{{eq.start | date}}</td>
              <td class="c-table__cell">{{eq.deadline | date}}</td>
              <td class="c-table__cell"><span class="c-input-group">
              <button class="c-button c-button--success" (click)="sendReport(eq?.id,eq?.cid)">Сануулах</button><br/>
              <button class="c-button c-button--error" (click)="downRating(eq?.id)">Үнэлгээ өгөх</button>
            </span></td>
            </tr>
          </tbody>
        </table>
        <button class="c-button c-button--success" routerLink="/excel"><i class="fa fa-plus" aria-hidden="true"></i>Тайлан Export</button>
      </div>
    </div>
  `,
  providers: [JobService]
})
export class ReportComponent  {

  mainReport: Array<any> = [];
  jobId: any;
  companyId: any;
  permission: any = 0;

  @ViewChild('rate') rateEl: ElementRef;
  @ViewChild('notif') notifEl: ElementRef;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    me.initData();
  }

  initData() {
    me.jobService.getReport().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainReport = res;
    });
    me.jobService.getPermission().subscribe(res => {       
      me.permission = res.permission;
      if(me.permission > 2) {
        document.getElementById('reportPer').style.display = "none";
        me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд тайлан харах эрх байхгүй байна.';
      }
    });
  }

  sendReport(id: any,cid: any) {
    me.jobId = id;
    me.companyId = cid;
    if(me.permission <= 2) {
      //me.companyId = 0;      
    }
    document.getElementById('xyz').style.display = "block";   

    /*me.jobService.sendReport(me.nameEl.nativeElement.value
    ,me.companyEl.nativeElement.value,me.startEl.nativeElement.value,me.deadlineEl.nativeElement.value,me.locationEl.nativeElement.value
    ,me.groupsEl.nativeElement.value,me.selectMainJob,me.subjobEl.nativeElement.value,me.newmarkers,me.subjob1El.nativeElement.value).subscribe(res => {              
    me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай заслаа.';
    });*/
    me.jobService.sendReport().subscribe(res => { 		          
      me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
      });
  }

  downRating(id: any) {
    me.jobId = id;
    document.getElementById('abc').style.display = "block";    
  }

  div_hide() {
    document.getElementById('abc').style.display = "none";
  }

  div_hide1() {
    document.getElementById('xyz').style.display = "none";
  }

  setRating(id: any) {
    me.jobService.setRating(id, me.rateEl.nativeElement.value).subscribe(res => {               
    me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
    document.getElementById('abc').style.display = "none";
    me.initData();
    });
  }

  setNotif(id: any,cid: any) {
    me.jobService.setNotif(id, me.notifEl.nativeElement.value, cid).subscribe(res => {               
    me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
    document.getElementById('abc').style.display = "none";
    me.initData();
    });
  }
}
