import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import { HomeComponent } from './home.component';
import * as _ from 'lodash';
let me: EquipmentListComponent;
let d3 = require('d3');
@Component({
  selector: 'equipment-list-component',
  template: `
    <div class="c-card">
      <div class="c-card__item c-card__item--divider u-bg-green">Төхөөрөмжний жагсаалт</div>
      <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;">   
      </div>
      <div class="c-card__item c-card__item--divider c-card__item--success">Нийт ажил: <select class="c-field" id="jobs" (change)="selectJobMain()">
	<option 
  *ngFor="let job of mains; let i = index" [attr.data-index]="i" value="{{job.id}}">{{job.name}}</option>
	</select></div><br/>
      <div class="c-card__item" id="equipPer">
        <table class="c-table">
          <thead class="c-table__head">
            <tr class="c-table__row c-table__row--heading">
              <th class="c-table__cell">ID</th>
              <th class="c-table__cell">Нэр</th>
              <th class="c-table__cell">Зураг</th>
              <th class="c-table__cell">Үзүүлэлт</th>
              <th class="c-table__cell">Тайлбар</th>
              <th class="c-table__cell">Засварлах, Устгах</th>
            </tr>
          </thead>
          <tbody class="c-table__body">
            <tr class="c-table__row"
            *ngFor="let eq of mainEquipments; let i = index" [attr.data-index]="i" >
              <td class="c-table__cell">{{i+1}}</td>
              <td class="c-table__cell">{{eq.name}}</td>
              <td class="c-table__cell"><img src="uploads/{{eq.image}}" width="150px" height="80px"/></td>
              <td class="c-table__cell">{{eq.power}}</td>
              <td class="c-table__cell">{{eq.e_desc}}</td>
              <td class="c-table__cell"><span class="c-input-group">
              <button class="c-button c-button--success" routerLink="/equipment/edit/{{eq.id}}">Засварлах</button>
              <button class="c-button c-button--error" (click)="deleteEquipment(eq?.id)">Устгах</button>
            </span></td>
            </tr>
            <!--<tr class="c-table__row">
              <td class="c-table__cell">1</td>
              <td class="c-table__cell">Ачааны машин</td>
              <td class="c-table__cell"><img src="http://localhost/zam/uploads/1_1_20170124.jpg" width="150px" height="80px"/></td>
              <td class="c-table__cell">Сайн</td>
              <td class="c-table__cell">Замд ашиглах ачааны машин</td>
              <td class="c-table__cell"></td>
            </tr>
            <tr class="c-table__row">
              <td class="c-table__cell">1</td>
              <td class="c-table__cell">Машин-2</td>
              <td class="c-table__cell"><img src="http://localhost/zam/uploads/1_1_20170124.jpg" width="150px" height="80px"/></td>
              <td class="c-table__cell">Сайн</td>
              <td class="c-table__cell">Зам тэгшлэх машин</td>
              <td class="c-table__cell"></td>
            </tr>
            <tr class="c-table__row">
              <td class="c-table__cell">1</td>
              <td class="c-table__cell">Машин-3</td>
              <td class="c-table__cell"><img src="http://localhost/zam/uploads/1_1_20170124.jpg" width="150px" height="80px"/></td>
              <td class="c-table__cell">Сайн</td>
              <td class="c-table__cell">Зам тэгшлэх машин</td>
              <td class="c-table__cell"></td>
            </tr>-->
          </tbody>
        </table>
        <button class="c-button c-button--success" routerLink="/equipment"><i class="fa fa-plus" aria-hidden="true"></i>Шинэ төхөөрөмж нэмэх</button>
      </div>
    </div>
  `,
  providers: [JobService]
})
export class EquipmentListComponent {

  mainEquipments: Array<any> = [];
  mains: Array<any> = [];
  permission: any = 0;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    me.initData();
  }

  initData() {    
    me.jobService.getPermission().subscribe(res => {       
      me.permission = res.permission;
      if(me.permission > 2) {
        document.getElementById('equipPer').style.display = "none";
        me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд төхөөрөмж харах эрх байхгүй байна.';
      }
    });
    me.jobService.getMain().subscribe(res => { 
      me.mains = res;
    });
  }

  getEquipments() {
    me.jobService.getEquipments().subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainEquipments = res;
    });
  }

  deleteEquipment(id: any) {
    if(confirm('Та устгахдаа итгэлтэй байна уу?')) {
      me.jobService.deleteEquipment(id).subscribe(res => {
        me.initData();
      });
    }
  }

  selectJobMain() {  
    me.getEquipments();
  }
}
