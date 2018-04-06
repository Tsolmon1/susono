import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';
let me: UserjobComponent;

@Component({
  selector: 'userjob-component',
  template: `
    <div class="c-card">
      <div class="c-card__item c-card__item--divider u-bg-green">Хэрэглэгчдийн ажил</div>      
      <div class="c-card__item">
        <table class="c-table">
          <thead class="c-table__head">
            <tr class="c-table__row c-table__row--heading">
              <th class="c-table__cell">ID</th>
              <th class="c-table__cell">Хэрэглэгчийн нэр</th>
              <th class="c-table__cell">Компаний нэр</th>
              <th class="c-table__cell">Ажлын нэр</th>
              <th class="c-table__cell">Засварлах, Устгах</th>
            </tr>
          </thead>
          <tbody class="c-table__body">
            <tr class="c-table__row"
            *ngFor="let eq of mainUsers; let i = index" [attr.data-index]="i" >
              <td class="c-table__cell">{{i+1}}</td>
              <td class="c-table__cell">{{eq.username}}</td>
              <td class="c-table__cell">{{eq.company_name}}</td>
              <td class="c-table__cell">{{eq.job_name}}</td>
              <td class="c-table__cell"><span class="c-input-group">
              <button class="c-button c-button--success" routerLink="/userjob/edit/{{eq.id}}">Засварлах</button>
              <button class="c-button c-button--error" (click)="deleteUserJob(eq?.id)">Устгах</button>
            </span></td>
            </tr>
          </tbody>
        </table>
        <button class="c-button c-button--success" routerLink="/userjob"><i class="fa fa-plus" aria-hidden="true"></i>Шинэ хэрэглэгчид ажил нэмэх</button>
      </div>
    </div>
  `,
  providers: [JobService]
})
export class UserjobComponent  {

  mainUsers: Array<any> = [];

  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    me.initData();
  }

  initData() {
    me.jobService.getUserJobs().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainUsers = res;
    });
  }

  deleteUserJob(id: any) {
    if(confirm('Та устгахдаа итгэлтэй байна уу?')) {
      me.jobService.deleteUserJob(id).subscribe(res => {                    
        me.initData();
      });
    }
  }
}
