import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';
let me: ContractorListComponent;

@Component({
  selector: 'contractor-list-component',
  template: `
    <div class="c-card">
      <div class="c-card__item c-card__item--divider u-bg-green">Ажил гүйцэтгэгчид</div>
      <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;">   
      </div>
      <div class="c-card__item" id="contractPer">
        <table class="c-table">
          <thead class="c-table__head">
            <tr class="c-table__row c-table__row--heading">
              <th class="c-table__cell">ID</th>
              <th class="c-table__cell">Компаны Нэр</th>
              <th class="c-table__cell">Улсын бүртгэлийн дугаар</th>
              <th class="c-table__cell">Үнэлгээ</th>
              <th class="c-table__cell">Бэлэн байдал</th>
              <th class="c-table__cell">Засварлах, Устгах</th>
            </tr>
          </thead>
          <tbody class="c-table__body">
            <tr class="c-table__row"
            *ngFor="let eq of mainCompanys; let i = index" [attr.data-index]="i" >
              <td class="c-table__cell">{{i+1}}</td>
              <td class="c-table__cell">{{eq.name}}</td>
              <td class="c-table__cell">{{eq.register}}</td>
              <td class="c-table__cell">{{eq.rank}}</td>
              <td class="c-table__cell">{{eq.ready_type}}</td>
              <td class="c-table__cell"><span class="c-input-group">
              <button class="c-button c-button--success" routerLink="/contractor/edit/{{eq.id}}">Засварлах</button>
              <button class="c-button c-button--error" (click)="deleteCompany(eq?.id)">Устгах</button>
            </span></td>
            </tr>
            <!--<tr class="c-table__row">
              <td class="c-table__cell">1</td>
              <td class="c-table__cell">Балуу ХХК</td>
              <td class="c-table__cell">УП95052932</td>
              <td class="c-table__cell">Маш сайн</td>
              <td class="c-table__cell">Ажил гүйцэтгэж байна</td>
              <td class="c-table__cell"></td>
            </tr>-->
          </tbody>
        </table>
        <button class="c-button c-button--success" routerLink="/contractor"><i class="fa fa-plus" aria-hidden="true"></i>Шинэ ажил гүйцэтгэгч нэмэх</button>
      </div>
    </div>
  `,
  providers: [JobService]
})
export class ContractorListComponent  {

  mainCompanys: Array<any> = [];
  permission: any = 0;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    me.initData();
  }

  initData() {
    me.jobService.getCompanys().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainCompanys = res;
    });
    me.jobService.getPermission().subscribe(res => {       
      me.permission = res.permission;
      if(me.permission > 2) {
        document.getElementById('contractPer').style.display = "none";
        me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд гүйцэтгэгч харах эрх байхгүй байна.';
      }
    });
  }

  deleteCompany(id: any) {
    if(confirm('Та устгахдаа итгэлтэй байна уу?')) {
      me.jobService.deleteCompany(id).subscribe(res => {                    
        me.initData();
      });
    }
  }
}
