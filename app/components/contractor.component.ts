import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';

let me: ContractorComponent;

@Component({
  selector: 'contractor-component',
  template: `
    <h1>Гүйцэтгэгч компани нэмэх</h1>
    <div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;">	  
	</div>
    <form method="post">
	    <label class="c-label o-form-element">
	      Компаны нэр
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Нэр" [value]="selectedCompany?.name" id="name" name="name" #name>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Регистрийн дугаар
	      <div class="c-input-group">
	        <div class="o-field">
	        	<input class="c-field" type="text" placeholder="Регистр" [value]="selectedCompany?.register" id="register" name="register" #register>	          
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Утас
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Утас" [value]="selectedCompany?.phone" id="phone" name="phone" #phone>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Имэйл
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Имэйл" [value]="selectedCompany?.email" id="email" name="email" #email>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
	      Хаяг
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Хаяг" [value]="selectedCompany?.address" id="address" name="address" #address>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element">
          Үзүүлэлт
          <div class="c-input-group">
            <div class="o-field">
              <select class="c-field" type="text" placeholder="Үзүүлэлт" [value]="selectedCompany?.rank" id="rank" name="rank" #rank>
                <option value="">Үзүүлэлтээ сонгоно уу</option>
                <option value="Маш сайн">Маш сайн</option>
                <option value="Сайн">Сайн</option>
                <option value="Дунд">Дунд</option>
                <option value="Муу">Муу</option>
              </select>
            </div>
          </div>
        </label>
        <label class="c-label o-form-element">
          Бэлэн байдал
          <div class="c-input-group">
            <div class="o-field">
              <select class="c-field" type="text" placeholder="Бэлэн байдал" [value]="selectedCompany?.ready_type" id="ready" name="ready" #ready>
                <option value="">Бэлэн байдлаа сонгоно уу</option>
                <option value="Бэлэн">Бэлэн</option>
                <option value="Бэлэн бус">Бэлэн бус</option>
                <option value="Удахгүй">Удахгүй</option>
              </select>
            </div>
          </div>
        </label>	    
	  </form>
	  <span class="c-input-group" *ngIf="selectedCompany">
	      <button class="c-button c-button--success" (click)="editCompany()">Засварлах</button>
	    </span>
	    <span class="c-input-group" *ngIf="!selectedCompany">
	      <button class="c-button c-button--error" (click)="addCompany()">Нэмэх</button>
	      <button class="c-button" (click)="reset()">Цэвэрлэх</button>
	    </span>
  `,
  providers: [JobService]
})
export class ContractorComponent  {

  selectedCompany: Array<any> = [];
  @ViewChild('name') nameEl: ElementRef;
  @ViewChild('register') registerEl: ElementRef;
  @ViewChild('phone') phoneEl: ElementRef;
  @ViewChild('email') emailEl: ElementRef;
  @ViewChild('address') addressEl: ElementRef;
  @ViewChild('rank') rankEl: ElementRef;
  @ViewChild('ready') readyEl: ElementRef;
  @ViewChild('result') resultEl: ElementRef;

  constructor(private jobService: JobService, public zone: NgZone) {
  	me = this;
  	if(window.location.hash.substring(0,17) == '#/contractor/edit') {
    	me.initData();
    } else {
    	me.selectedCompany = null;
    }
  }

  initData() {
	  me.jobService.getCompanyId(window.location.hash.substring(18)).subscribe(res => { 
		if(res.error) {
		  window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
		}            
		me.selectedCompany = res;
	  });
  }

  editCompany() {
	  me.jobService.editCompany(window.location.hash.substring(18),me.nameEl.nativeElement.value
	  ,me.registerEl.nativeElement.value,me.phoneEl.nativeElement.value,me.emailEl.nativeElement.value
	  ,me.addressEl.nativeElement.value,me.rankEl.nativeElement.value,me.readyEl.nativeElement.value).subscribe(res => { 		           
		me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
	  });
  }

  addCompany() { 	
	  me.jobService.addCompany(me.nameEl.nativeElement.value
	  ,me.registerEl.nativeElement.value,me.phoneEl.nativeElement.value,me.emailEl.nativeElement.value
	  ,me.addressEl.nativeElement.value,me.rankEl.nativeElement.value,me.readyEl.nativeElement.value).subscribe(res => { 	           
		me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
	  });
  }

  reset() {
  	me.nameEl.nativeElement.value = '';
  	me.registerEl.nativeElement.value = '';
  	me.phoneEl.nativeElement.value = '';
  	me.emailEl.nativeElement.value = '';
  	me.addressEl.nativeElement.value = '';
  	me.rankEl.nativeElement.value = '';
  	me.readyEl.nativeElement.value = '';
  	me.resultEl.nativeElement.innerHTML = '';
  }
}
