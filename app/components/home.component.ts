import { Component, ElementRef, ViewChild, NgZone, OnDestroy, AfterContentInit } from '@angular/core';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';
let GoogleMaps = require('google-maps');
let d3 = require('d3');

let me: HomeComponent;
@Component({
  selector: 'home-component',
  template: `
    <div class="c-card c-card--accordion">
	<div class="c-card__item c-card__item--divider c-card__item--success">Нийт ажил: <select class="c-field" id="jobs" (change)="selectJobMain()">
	<option 
  *ngFor="let job of mains; let i = index" [attr.data-index]="i" value="{{job.id}}">{{job.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Гүйцэтгэгч: {{job.contractorName}}</option>
	</select></div><br/>
      <div class="c-card__item c-card__item--divider c-card__item--success">Статистик</div>
      <div class="c-card__item o-grid o-grid--wrap">
        <div class="o-grid__cell">
          <span class="c-text--loud">Нэр</span>
          <br/>
          <span class="c-text">{{mainJob.name}}</span>
        </div>
        <div class="o-grid__cell">
          <span class="c-text--loud">Үр дүн</span>
          <br/>
          <span class="c-text">{{mainJob.percent}}%</span>
        </div>
        <div class="o-grid__cell">
          <span class="c-text--loud">Хоцролт</span>
          <br/>
          <span class="c-text">{{mainJob.delay}}%</span>
        </div>
        <div class="o-grid__cell">
          <span class="c-text--loud">Сүүлд ирсэн мэдээлэл</span>
          <br/>
          <span class="c-text">{{mainJob.lastUpdate}}</span><span class="badge" (click)="showNotif()" title="Хүсэлт мэдээллүүд">{{notifs.length}}</span>
        </div>
      </div>
      <input type="checkbox" id="plan-detail">
      <label class="c-card__item" for="plan-detail">Төлөвлөгөө</label>
      <div class="c-card__item">
        <div class="o-grid o-grid--wrap">
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Эхлэх огноо</span>
            <br/>
            <span class="c-text">{{mainJob.start | date}}</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Сүүлийн хугацаа</span>
            <br/>
            <span class="c-text">{{mainJob.deadline | date}}</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Гүйцэтгэх компани</span>
            <br/>
            <span class="c-text">{{mainJob.contractorName}}</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Байрлал</span>
            <br/>
            <span class="c-text">{{mainJob.location}}</span>
          </div>
        </div>
      </div>
      <input type="checkbox" id="job-detail">
      <label class="c-card__item" for="job-detail">Ажлын үйл явц дэлгэрэнгүй</label>
      <div class="c-card__item">
        <div class="o-grid o-grid--wrap">
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Эхлэх огноо</span>
            <br/>
            <span class="c-text">{{mainJob.start | date}}</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25" *ngIf="mainJob.deadline1">
            <span class="c-text--loud">Дуусах огноо</span>
            <br/>
            <span class="c-text">{{mainJob.deadline1 * 1000 | date}}</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25" *ngIf="!mainJob.deadline1">
            <span class="c-text--loud">Дуусах огноо</span>
            <br/>
            <span class="c-text">{{mainJob.deadline | date}}</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Үнэлгээ</span>
            <br/>
            <span class="c-text">{{mainJob.rating}}%</span>
          </div>
          <div class="o-grid__cell o-grid__cell--width-25">
            <span class="c-text--loud">Нийт гарсан ажлын анги</span>
            <br/>
            <span class="c-text">{{mainJob.groups}}ш</span>
          </div>
        </div>
      </div>
    </div>
    <div class="c-card">
      <div class="c-card__item c-card__item--divider u-bg-green">Ажлын явц</div>
      <div class="c-card__item">
        <span 
          (mouseenter)="showJobPercents = true;" 
          (mouseleave)="!keepJobPercents ? showJobPercents = false : showJobPercents = true;" 
          (click)="toggleJobPercents()"
          class="c-badge c-badge--rounded c-badge--warning c-badge--ghost clickable">
          <i class="fa fa-question" aria-hidden="true"></i>
        </span> 
        <span 
          (click)="selectJob()" 
          [class.c-badge--ghost]="selectedSubJob"
          [class.c-badge--info]="!selectedSubJob"
          class="c-badge clickable">Нийт</span>
        <span 
          *ngFor="let job of mainJob.jobs" 
          (click)="selectJob(job)" 
          [class.c-badge--ghost]="!selectedSubJob || selectedSubJob.id !== job.id"
          [class.c-badge--info]="selectedSubJob && selectedSubJob.id === job.id"
          style="margin-right:5px;" 
          class="c-badge clickable">{{job.name}}</span>
          <span style="float: right" 
          (click)="selectChart(0)" 
          [class.c-badge--ghost]="!checkDate"
          [class.c-badge--info]="checkDate"
          class="c-badge clickable">Анхны дуусах огноо</span>
          <span style="float: right;margin-right:5px;" 
          (click)="selectChart(1)" *ngIf="mainJob.deadline1"
          [class.c-badge--ghost]="checkDate"
          [class.c-badge--info]="!checkDate"
          class="c-badge clickable">Дараах дуусах огноо</span>
      </div>
      <div [class.invisible]="!showJobPercents" class="c-card__item">
        <ul class="c-list c-list--unstyled">
          <li *ngFor="let job of mainJob.jobs" class="c-list__item">
            <span class="c-text--loud">{{job.name}}</span>
            <div class="c-progress x-small" *ngIf="job.conditions">
              <div 
                class="c-progress__bar u-bg-brown-lighter" *ngIf="job.conditions[0]"
                [style.width]="job.conditions[0].total_percent + '%'">
                <span class="c-tooltip c-tooltip--top" [attr.aria-label]="job.conditions[0].percent + '%'">
                  {{job.conditions[0].percent + '%'}}</span></div>
              <div class="c-progress__bar u-bg-brown c-tooltip c-tooltip--top" *ngIf="job.conditions[1]"
                [style.width]="job.conditions[1].total_percent + '%'">
                <span class="c-tooltip c-tooltip--top" [attr.aria-label]="job.conditions[1].percent + '%'">
                  {{job.conditions[1].percent + '%'}}</span></div>
              <div class="c-progress__bar u-bg-brown-darker c-tooltip c-tooltip--top" *ngIf="job.conditions[2]"
                [style.width]="job.conditions[2].total_percent + '%'">
                <span class="c-tooltip c-tooltip--top" [attr.aria-label]="job.conditions[2].percent + '%'">
                  {{job.conditions[2].percent + '%'}}</span></div>
              <div class="c-progress__bar u-bg-brand-light c-tooltip c-tooltip--top" *ngIf="job.conditions[3]"
                [style.width]="job.conditions[3].total_percent + '%'">
                <span class="c-tooltip c-tooltip--top" [attr.aria-label]="job.conditions[3].percent + '%'">
                  {{job.conditions[3].percent + '%'}}</span></div>
              <div class="c-progress__bar u-bg-brand-dark c-tooltip c-tooltip--top" *ngIf="job.conditions[4]"
                [style.width]="job.conditions[4].total_percent + '%'">
                <span class="c-tooltip c-tooltip--top" [attr.aria-label]="job.conditions[4].percent + '%'">
                  {{job.conditions[4].percent + '%'}}</span></div>
              <div class="c-progress__bar u-bg-green-dark c-tooltip c-tooltip--top" *ngIf="job.conditions[5]"
                [style.width]="job.conditions[5].total_percent + '%'">
                <span class="c-tooltip c-tooltip--top" [attr.aria-label]="job.conditions[5].percent + '%'">
                  {{job.conditions[5].percent + '%'}}</span></div>
            </div>
            <div class="c-progress x-small" *ngIf="!job.conditions">
              <div class="c-progress__bar" style="width:100%">Ажил эхлээгүй</div>
            </div>
          </li>
        </ul>
        <div class="u-letter-box--small">
          <span *ngFor="let type of types">
            <span class="c-badge" [style.background-color]="type.color_code">&nbsp;</span><span class="c-text--quiet">-{{type.name}}</span>
            <!--<span class="c-badge u-bg-brown">&nbsp;</span><span class="c-text--quiet">-Дэд суурь</span>
            <span class="c-badge u-bg-brown-darker">&nbsp;</span><span class="c-text--quiet">-Далангийн дээд</span>
            <span class="c-badge u-bg-brand-light">&nbsp;</span><span class="c-text--quiet">-Суурь</span>
            <span class="c-badge u-bg-brand-dark">&nbsp;</span><span class="c-text--quiet">-Асфальт</span>
            <span class="c-badge   u-bg-green-dark">&nbsp;</span><span class="c-text--quiet">-Шингэн цацлага</span>-->
          </span>
        </div>
      </div>
      <div class="o-grid o-grid--wrap o-grid--no-gutter" id="maps">
        <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high"><div #map id="map_canvas"></div></div>
        <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high u-bg-white">
          <svg #chart id="chart" width="100%" height="100%"></svg>
        </div>
      </div>
      <div class="c-card__item" style="position: relative;">
        <div class="c-overlay" [class.invisible]="selectedSubJob">
          <span class="c-text--loud u-color-white u-center-block__content u-center-block__content--vertical">
            &nbsp;&nbsp;Ажлын хэсгээ сонгоно уу.</span>
        </div>
        <div class="u-centered">
          <span class="c-badge c-badge--rounded c-badge--warning c-badge--ghost clickable">
            <i class="fa fa-question" aria-hidden="true"></i>
          </span>
          <div class="inline-div" *ngIf="!selectedSubJob">
            <span class="c-badge c-badge--rounded u-bg-purple-dark">&nbsp;&nbsp;Нийт&nbsp;&nbsp;</span>
            <span class="c-badge c-badge--rounded u-bg-brown-lighter">Шороон далан</span>
            <span class="c-badge c-badge--rounded u-bg-brown">Дэд суурь</span>
            <span class="c-badge c-badge--rounded u-bg-brown-darker">Далангийн дээд</span>
            <span class="c-badge c-badge--rounded u-bg-brand-light">Суурь</span>
            <span class="c-badge c-badge--rounded u-bg-brand-dark">Асфальт</span>
            <span class="c-badge c-badge--rounded u-bg-green-dark">Шингэн цацлага</span>
          </div>
          <div class="inline-div" *ngIf="selectedSubJob">
            <span 
              (click)="resetSelectedConditions()"
              [class.c-badge--ghost]="!displayAllConditions"
              [class.u-bg-purple-dark]="displayAllConditions"
              class="c-badge c-badge--rounded clickable">&nbsp;&nbsp;Нийт&nbsp;&nbsp;</span>
            <span 
              *ngFor="let cond of selectedSubJob.planned_conditions"
              style="margin-right:5px;"
              (click)="selectDisplayCondition(cond)"
              [ngClass]="getCondBadge(cond)">{{cond.name}}</span>
          </div>
        </div>
      </div>
      <div class="c-card__item c-card__item--divider u-bg-green-dark">Дэлгэрэнгүй</div>
      <div class="c-card__item o-grid o-grid--wrap" style="position:relative;">
        <div class="c-overlay" [class.invisible]="selectedPhoto && selectedPhoto.image">
          <div class="u-center-block__content">
              <h2 class="c-heading u-color-white">Та дээрх газрын зурагнаас зурагаа сонгоно уу.</h2>
          </div>
        </div>
        <div class="o-grid__cell o-grid__cell--width-100" *ngIf="selectedPhoto">
          <label>{{selectedPhoto.date | date}}</label>
        </div>
        <div class="o-grid__cell o-grid__cell--width-100" *ngIf="!selectedPhoto">
          <label>{{selectedPhoto?.date | date}}</label>
        </div>
        <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@large u-letter-box--medium" *ngIf="selectedPhoto && selectedPhoto.image">
          <img class="u-higher o-image" src="uploads/{{selectedPhoto.image}}" style="width: 100%; min-height:300px;">
        </div>
        <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@large u-letter-box--medium" *ngIf="!selectedPhoto || !selectedPhoto.image">
          <img class="u-higher o-image" src="uploads/1_2_20170124.jpg" style="width: 100%; min-height:300px;">
        </div>
        <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@large">
          <form>
            <label class="c-label o-form-element">
              Байрлал
              <div class="c-input-group">
                <button class="c-button c-button--ghost-brand" type="button"><i class="fa fa-fw fa-map-marker c-icon"></i></button>
                <div class="o-field">
                  <input class="c-field" type="text" placeholder="Байрлал" [value]="selectedPhoto?.position" #location>
                </div>
              </div>
            </label>
            <label class="c-label o-form-element">
              Төрөл
              <div class="c-input-group">
                <div class="o-field">
                  <select class="c-field" type="text" placeholder="Байрлал" [value]="selectedPhoto?.type" #type>
                    <option value="">Зурагны төрлөө сонгоно уу</option>
                    <option value="1">Шороон далан</option>
                    <option value="2">Дэд суурь</option>
                    <option value="3">Далангийн дээд</option>
                    <option value="4">Суурь</option>
                    <option value="5">Асфальт</option>
                    <option value="6">Шингэн цацлага</option>
                  </select>
                </div>
              </div>
            </label>
            <label class="c-label o-form-element">
              Тайлбар
              <div class="c-input-group">
                <div class="o-field">
                  <textarea class="c-field" type="text" [value]="selectedPhoto?.desc" placeholder="Тайлбар" #desc></textarea>
                </div>
              </div>
            </label>            
          </form>
          <span class="c-input-group" *ngIf="permission <= 2">
              <button class="c-button c-button--success" *ngIf="permission == 1" (click)="editPath()">Засварлах</button>
              <button class="c-button c-button--error" *ngIf="permission == 1" (click)="deletePath(selectedPhoto.id)">Устгах</button>
              <button class="c-button" (click)="reset()">Цэвэрлэх</button>
            </span>
        </div>
      </div>
    </div>
  `,
  providers: [JobService]
})

export class HomeComponent implements OnDestroy, AfterContentInit {

  @ViewChild('map') mapEl: ElementRef;
  @ViewChild('chart') chartEl: ElementRef;

  @ViewChild('type') typeEl: ElementRef;
  @ViewChild('desc') descEl: ElementRef;

  // Google Maps specific declaration -- START
  GOOGLE_MAPS_API_KEY: string = 'AIzaSyDvm_ijwtFfh2oKp5WGiMSTYk0A_5Op_F8';
  mapOptions = { zoom: 9, center: { lat: 50.107635, lng: 105.787132 }, mapTypeId: 'roadmap' };
  paths: Array<any> = []; dpaths: Array<any> = []; markers: Array<any> = [];
  checkMarker: Array<any> = [];
  mains: Array<any> = [];
  map: any; google: any; mapLoaded = false; mOverlay: any; infoWindow: any;
  // Google Maps specific declaration -- END

  // Chart specific declaration -- START

  // Chart specific declaration -- END

  // Real data declaration -- START
  selectMainJob: any = 1;
  permission: any = 0;
  notifs: any = {};
  mainJob: any = {};
  selectedSubJob: any = null;
  photoData: any = {};
  workProgressData: any = null;
  selectedPhoto: any = null;
  types: Array<any> = [];
  checkDate: any = true;
  // Real data declaration -- END

  // UI interaction necessities declaration -- START
  showJobPercents = false;
  keepJobPercents = false;
  displayAllConditions = true;
  // UI interaction necessities declaration -- END


  constructor(private jobService: JobService, public zone: NgZone) {
    me = this;
    GoogleMaps.KEY = me.GOOGLE_MAPS_API_KEY;
    me.initChartLocale();
    me.selectMains();
    me.initData();
  }  

  selectMains() {  
    me.jobService.getMain().subscribe(res => { 
      me.mains = res;
    });
    me.jobService.getPermission().subscribe(res => {       
      me.permission = res.permission;
    });
    me.jobService.getNotifs(me.selectMainJob).subscribe(res => {       
      me.notifs = res;
    });
    me.jobService.getTypes(me.selectMainJob).subscribe(res => { 
      me.types = res;
    });
  }

  selectJobMain() {  
    var value: string = (event.target as any).value;  
    me.selectMainJob = value;

    me.jobService.getNotifs(me.selectMainJob).subscribe(res => {       
      me.notifs = res;
    });
    
   // me.selectMains();
    me.initChartLocale();
    me.initData();
    me.initPhotoDetail(0,0);
    //me.initPlanChart();
    //me.initProgressPath();
    me.selectJob(0);
    me.selectChart(0);
    //me.initPath();
    //me.initPlanChart();
  }

  selectJob(job: any) {
    if (job && job != 0) {
      me.selectedSubJob = job;
    }else {
      me.selectedSubJob = null;
    }
    me.initPath();
    me.initPlanChart();
  }

  selectChart(id: any) {
    if(id == 1) {
      me.checkDate = false;
    } else {
      me.checkDate = true;
    }
    me.initPlanChart();
  }

  toggleJobPercents() {
    if (me.keepJobPercents) {
      me.showJobPercents = false;
      me.keepJobPercents = false;
    }else {
      me.keepJobPercents = true;
      me.showJobPercents = true;
    }
  }

  getCondBadge(cond: any) { return 'clickable c-badge c-badge--rounded ' + (cond.display ? cond.color : 'c-badge--ghost'); }

  resetSelectedConditions() {
    me.displayAllConditions = true;
    me.selectedSubJob.planned_conditions.forEach(function(cond: any){
      cond.display = false;
    });
    me.initPlanChart();
  }

  selectMarker(marker: any) {
    if (me.infoWindow) {
      me.infoWindow.close();
    }
    if (marker.overlap) {
      let div = document.createElement('div');
      let ul = document.createElement('ul');
      ul.className = 'c-card c-card--menu';
      div.appendChild(ul);      
      let i = 0;
      me.checkMarker = [];
      marker.conds.forEach((c: any) => {
          me.checkMarker.forEach((cm: any) => {          
            if(cm == c.type) {
              i = 1;
            }
          });
          if(i == 0) {
            me.checkMarker.push(c.type);          
            let li = document.createElement('li');
            li.className = 'c-card__item';
            li.textContent = me.getCondName(c.type);            
            li.onclick = function(){ me.markerCondClick(c.photo_id, marker, c.type); };
            ul.appendChild(li); 
          } else {
            i = 0;
          }         
      });
      me.infoWindow = new me.google.maps.InfoWindow({
        content: div});
      me.infoWindow.open(me.map, marker);
    }else {
      me.markers.forEach(m =>  m.setIcon('assets/images/point_1.png'));
      marker.setIcon('assets/images/point_2.png');
      me.initPhotoDetail(marker.photo_id, 0);
    }
  }

  markerCondClick(photoId: any, marker: any, tid: any) {
    if (me.infoWindow) {
      me.infoWindow.close();
    }
    me.markers.forEach(m =>  m.setIcon('assets/images/point_1.png'));
    marker.setIcon('assets/images/point_2.png');
    me.initPhotoDetail(photoId, tid);
  }

  selectDisplayCondition(cond: any) {
    cond.display = !cond.display;
    me.displayAllConditions = false;
    me.initPlanChart();
    me.initProgressPath();
  }

  ngAfterContentInit() {
    this.initMap();
    setTimeout(this.initPlanChart, 1000);
  }

  ngOnDestroy() {
    me.map = null;
    me = null;
  }

  initData() {    
    me.jobService.getPlan(me.selectMainJob).subscribe(res => { 
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }            
      me.mainJob = res;
      me.mainJob.start *= 1000;
      me.mainJob.deadline *= 1000;
      me.jobService.getWorkProgress(me.selectMainJob).subscribe(resp => {
        resp.forEach(function(item: any){
          item.conditions.forEach((cond: any) => cond.total_percent = cond.percent * (100 / item.conditions.length) / 100);
        });        
        me.mainJob.jobs.forEach(function(item: any){
          item.color = me.genColor(Math.floor(Math.random() * 10), 10);
          item.start *= 1000;
          item.deadline *= 1000;
          item.planned_conditions.forEach(function(cond: any){
            cond.start *= 1000; cond.deadline *= 1000;
          });
          let found = _.find(resp, function(o: any){ return o.id === item.id; });
          if (found) { item.conditions = found.conditions; }
        });
        me.initPath();
      });
    });
  }

  initPlanChart() {
    if(me.checkDate) {
      let chart  = d3.select('#chart'), margin = {top: 20, right: 20, bottom: 30, left: 50};
      chart.selectAll('*').remove();
      let width  = +me.chartEl.nativeElement.width.baseVal.value - margin.left - margin.right,
          height = +me.chartEl.nativeElement.height.baseVal.value - margin.top - margin.bottom,
          g = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      let x = d3.scaleTime().rangeRound([0, width]); let y = d3.scaleLinear().rangeRound([height, 0]);
      if (!me.selectedSubJob) {
        x.domain([me.mainJob.start, me.mainJob.deadline]);
      }else {
        x.domain([me.selectedSubJob.start, me.selectedSubJob.deadline]);
      }
      y.domain([0, 100]);
      g.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x)).select('.domain').remove();
      g.append('g')
        .call(d3.axisLeft(y)).append('text')
          .attr('fill', '#000').attr('transform', 'rotate(-90)')
          .attr('y', 6).attr('dy', '0.71em')
          .attr('text-anchor', 'end').text('Хувь');

      let legendY = 95;

      if (!me.selectedSubJob) {
        me.mainJob.jobs.forEach((job: any) => {
          g.append('text')
            .attr('x', () => x(me.mainJob.start) + 20).attr('y', () => y(legendY))
            .text(job.name).style('fill', job.color);
          legendY -= 5;
        });
      }
      if (!me.selectedSubJob) {
        g.selectAll('dot')
            .data(me.mainJob.jobs)
            .enter().append('circle')
            .attr('r', 3.5).attr('fill', (d: any) => d.color)
            .attr('cx', (d: any) => x(d.start)).attr('cy', (d: any) => y(0));
        g.selectAll('dot')
            .data(me.mainJob.jobs)
            .enter().append('circle')
            .attr('r', 3.5).attr('fill', (d: any) => d.color)
            .attr('cx', (d: any) => x(d.deadline)).attr('cy', (d: any) => y(100));
        g.selectAll('dot')
            .data(me.mainJob.jobs)
            .enter().append('line')
            .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8).attr('fill', 'none')
            .attr('stroke', (d: any) => d.color).attr('stroke-width', 1.5)
            .attr('x1', (d: any) => x(d.start)).attr('y1', (d: any) => y(0))
            .attr('x2', (d: any) => x(d.deadline)).attr('y2', (d: any) => y(100));
      }else {
        g.selectAll('dot')
            .data(_.filter(me.selectedSubJob.planned_conditions, (d: any) => me.displayAllConditions || d.display))
            .enter().append('circle')
            .attr('r', 4.5).attr('fill', (d: any) => d.color_code)
            .attr('cx', (d: any) => x(d.start)).attr('cy', (d: any) => y(0));
        g.selectAll('dot')
            .data(_.filter(me.selectedSubJob.planned_conditions, (d: any) => me.displayAllConditions || d.display))
            .enter().append('circle')
            .attr('r', 4.5).attr('fill', (d: any) => d.color_code)
            .attr('cx', (d: any) => x(d.deadline)).attr('cy', (d: any) => y(100));
        g.selectAll('dot')
            .data(_.filter(me.selectedSubJob.planned_conditions, (d: any) => me.displayAllConditions || d.display))
            .enter().append('line')
            .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8)
            .attr('fill', 'none').attr('stroke', (d: any) => d.color_code)
            .attr('stroke-width', 1.5)
            .attr('x1', (d: any) => x(d.start)).attr('y1', (d: any) => y(0))
            .attr('x2', (d: any) => x(d.deadline)).attr('y2', (d: any) => y(100));
      }
      me.initChart(g, width, height);
    } else {
      let chart  = d3.select('#chart'), margin = {top: 20, right: 20, bottom: 30, left: 50};
      chart.selectAll('*').remove();
      let width  = +me.chartEl.nativeElement.width.baseVal.value - margin.left - margin.right,
          height = +me.chartEl.nativeElement.height.baseVal.value - margin.top - margin.bottom,
          g = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      let x = d3.scaleTime().rangeRound([0, width]); let y = d3.scaleLinear().rangeRound([height, 0]);
      if (!me.selectedSubJob) {
        x.domain([me.mainJob.start, me.mainJob.deadline1 * 1000]);
      }else {
        x.domain([me.selectedSubJob.start, me.selectedSubJob.deadline]);
      }
      y.domain([0, 100]);
      g.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x)).select('.domain').remove();
      g.append('g')
        .call(d3.axisLeft(y)).append('text')
          .attr('fill', '#000').attr('transform', 'rotate(-90)')
          .attr('y', 6).attr('dy', '0.71em')
          .attr('text-anchor', 'end').text('Хувь');

      let legendY = 95;

      if (!me.selectedSubJob) {
        me.mainJob.jobs.forEach((job: any) => {
          g.append('text')
            .attr('x', () => x(me.mainJob.start) + 20).attr('y', () => y(legendY))
            .text(job.name).style('fill', job.color);
          legendY -= 5;
        });
      }
      if (!me.selectedSubJob) {
        g.selectAll('dot')
            .data(me.mainJob.jobs)
            .enter().append('circle')
            .attr('r', 3.5).attr('fill', (d: any) => d.color)
            .attr('cx', (d: any) => x(d.start)).attr('cy', (d: any) => y(0));
        g.selectAll('dot')
            .data(me.mainJob)
            .enter().append('circle')
            .attr('r', 3.5).attr('fill', (d: any) => d.color)
            .attr('cx', (d: any) => x(d.deadline1 * 1000)).attr('cy', (d: any) => y(100));
        g.selectAll('dot')
            .data(me.mainJob)
            .enter().append('line')
            .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8).attr('fill', 'none')
            .attr('stroke', (d: any) => d.color).attr('stroke-width', 1.5)
            .attr('x1', (d: any) => x(d.start)).attr('y1', (d: any) => y(0))
            .attr('x2', (d: any) => x(d.deadline1 * 1000)).attr('y2', (d: any) => y(100));
      }else {
        g.selectAll('dot')
            .data(_.filter(me.selectedSubJob.planned_conditions, (d: any) => me.displayAllConditions || d.display))
            .enter().append('circle')
            .attr('r', 4.5).attr('fill', (d: any) => d.color_code)
            .attr('cx', (d: any) => x(d.start)).attr('cy', (d: any) => y(0));
        g.selectAll('dot')
            .data(_.filter(me.selectedSubJob.planned_conditions, (d: any) => me.displayAllConditions || d.display))
            .enter().append('circle')
            .attr('r', 4.5).attr('fill', (d: any) => d.color_code)
            .attr('cx', (d: any) => x(d.deadline)).attr('cy', (d: any) => y(100));
        g.selectAll('dot')
            .data(_.filter(me.selectedSubJob.planned_conditions, (d: any) => me.displayAllConditions || d.display))
            .enter().append('line')
            .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8)
            .attr('fill', 'none').attr('stroke', (d: any) => d.color_code)
            .attr('stroke-width', 1.5)
            .attr('x1', (d: any) => x(d.start)).attr('y1', (d: any) => y(0))
            .attr('x2', (d: any) => x(d.deadline)).attr('y2', (d: any) => y(100));
      }
      me.initChart(g, width, height);
    }    
  }

  initChart(g: any, width: any, height: any) {
    me.initWorkProgress(function(){
      let x = d3.scaleTime().rangeRound([0, width]);
      let y = d3.scaleTime().rangeRound([height, 0]);
      if (!me.selectedSubJob) {
        if(me.checkDate) {
          x.domain([me.mainJob.start, me.mainJob.deadline]);
        } else {
          x.domain([me.mainJob.start, me.mainJob.deadline1]);
        }
      }else {
        x.domain([me.selectedSubJob.start, me.selectedSubJob.deadline]);
      }
      y.domain([0, 100]);
      let djLine = d3.line()
        .curve(d3.curveBasis).x((d: any) => x(d.date)).y((d: any) => y(d.percent));
      if (!me.selectedSubJob) {
            me.workProgressData.forEach((i: any) => {
              if(i.updates) {
                g.selectAll('path').data(i.updates)
                .enter().append('path')
                .attr('stroke', (d: any) => {
                    let color = '';
                    me.mainJob.jobs.forEach((k: any) => {
                      if (k.id === i.id) { color = k.color; }
                    });
                    return color;
                })
                .attr('fill', 'none')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', djLine(i.updates));
              }
            });
      }else {
        let partitioned: any = _.chain(me.workProgressData.updates).orderBy('date', 'asc')
                                .filter((f: any) => {
                                    if (me.displayAllConditions) { return true;
                                    } else {
                                      let toDisplay = false;
                                      me.selectedSubJob.planned_conditions.forEach((k: any) => {
                                        if (k.id === Number.parseInt(f.type) && k.display) { toDisplay = true; }
                                      });
                                      return toDisplay;
                                    }
                                }).groupBy('type').value();
        _.forEach(partitioned, (o: any, key: any) => {
            if(o.position) {
              let color = me.getCondColor(key);
              g.append('path')
                .attr('fill', 'none').attr('stroke', color)
                .attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round')
                .attr('stroke-width', 2).attr('d', djLine(o));
            }
        });
      }
      me.initProgressPath(); // Initializing progress on map
    });
  }

  initMap() {
    GoogleMaps.load(function(google: any){
      me.google = google;
      me.map = new google.maps.Map(me.mapEl.nativeElement, me.mapOptions);
      me.mapLoaded = true;
      me.mOverlay = new google.maps.OverlayView();
      me.mOverlay.draw = function() {};
      me.mOverlay.setMap(me.map);
    });
  }

  initPath() {
    if (me.mapLoaded) {
      let subJobId: number; let mainJobId: number;
      if (me.mainJob) {
        mainJobId = me.mainJob.id;
      }
      if (me.selectedSubJob) {
        subJobId = me.selectedSubJob.id;
      }
      me.jobService.getPath(mainJobId, subJobId).subscribe(res => {
        if(res.error) {
          window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
        }
        me.clearMap(true);
        if (me.selectedSubJob) {
          let coords: Array<any> = new Array<any>();
          let i = 0;
          res.path.forEach(function(pathPoint: Array<Number>){
            let lat = pathPoint[1];
            let lng = pathPoint[0];
            if (lat !== 0 && lng !== 0) {
              coords[i] = {lat: lat, lng: lng};
              i += 1;
            }
          });
          me.mapOptions = { zoom: 9, center: coords[0], mapTypeId: 'roadmap' };
          me.map.setCenter(coords[0]);
          let route = new me.google.maps.Polyline({
            path: coords,
            strokeColor: me.getJobColor(res.id),
            strokeOpacity: 0.8,
            strokeWeight: 2
          });
          route.setMap(me.map);
          me.paths.push(route);
        }else {
          res.forEach(function(job: any){
            let coords: Array<any> = new Array<any>();
            let i = 0;
            job.path.forEach((pathPoint: any) => {
              let lat = pathPoint[1];
              let lng = pathPoint[0];
              if (lat !== 0 && lng !== 0) {
                coords[i] = {lat: lat, lng: lng};
                i += 1;
              }
            });
            me.mapOptions = { zoom: 9, center: coords[0], mapTypeId: 'roadmap' };
            me.map.setCenter(coords[0]);
            let route = new me.google.maps.Polyline({
              path: coords,
              strokeColor: me.getJobColor(job.id),
              strokeOpacity: 1,
              strokeWeight: 2
            });
            route.setMap(me.map);
            me.paths.push(route);
          });
        }
      });
    }else {
      setTimeout(me.initPath, 1000);
    }
  }

  initProgressPath() {
    if (me.workProgressData) {
      let partitioned: any;
      if (me.selectedSubJob) {
        me.clearMap(false);
        partitioned = _.chain(me.workProgressData.updates).orderBy('date', 'asc')
          .filter((f: any) => {
              if (me.displayAllConditions) { return true;
              } else {
                let toDisplay = false;
                me.selectedSubJob.planned_conditions.forEach((k: any) => {
                  if (k.id === Number.parseInt(f.type) && k.display) { toDisplay = true; }
                });
                return toDisplay;
              }
          }).groupBy('type').value();
          _.forEach(partitioned, (paths: any, key: any) => {
          let cpaths: Array<any> = [];
          paths.forEach((o: any) => {
            if(o.position) {
              let pos = {lat: o.position[1], lng: o.position[0]};
              cpaths.push(pos);
              let date = new Date(o.date);
              let marker = new me.google.maps.Marker({
                icon: {
                  // use whatever icon you want for the "dots"
                  url: 'assets/images/point_1.png',
                  size: new me.google.maps.Size(7, 7),
                  anchor: new me.google.maps.Point(4, 4)
                },
                position: pos,
                title: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                // custom datas
                overlap: false,
                photo_id: o.id, percent: o.percent, date: o.date, type: o.type
              });
              let overlapping = false;
              let ppixelpos = me.mOverlay.getProjection().fromLatLngToContainerPixel(marker.getPosition());
              me.markers.forEach(function(m){
                let mpixelpos = me.mOverlay.getProjection().fromLatLngToContainerPixel(m.getPosition());
                if (Math.abs(ppixelpos.x - mpixelpos.x) <= 0 && Math.abs(ppixelpos.y - mpixelpos.y) <= 0) {
                    overlapping = true;
                    if (!m.overlap) {                    
                      m.overlap = true;
                      m.conds = [{ photo_id: m.photo_id, percent: m.percent, date: m.date, type: m.type }];
                      m.photo_id = null; m.percent = null;
                      m.date = null; m.type = null;
                    }
                    m.conds.push({ photo_id: o.id, percent: o.percent, date: o.date, type: o.type});
                }
              });
              if (!overlapping) {
                if (!marker.overlap) {                    
                  marker.overlap = true;
                  marker.conds = [{ photo_id: marker.photo_id, percent: marker.percent, date: marker.date, type: marker.type }];
                  marker.photo_id = null; marker.percent = null;
                  marker.date = null; marker.type = null;
                }
                marker.conds.push({ photo_id: o.id, percent: o.percent, date: o.date, type: o.type});
                marker.addListener('click', function(){ me.selectMarker(marker); });
                marker.setMap(me.map);
                me.markers.push(marker);
              }
            }
          });
          let polyline = new me.google.maps.Polyline({
            path: cpaths,
            geodesic: false,
            strokeColor: me.getCondColor(key),
            strokeOpacity: 0.8,
            strokeWeight: me.getCondStroke(key)
          });
          me.dpaths.push(polyline);
          polyline.setMap(me.map);
        });
      }
    }
  }

  initWorkProgress(callback: Function) {
    let subJobId: number; let mainJobId: number;
    if (me.mainJob) {
      mainJobId = me.mainJob.id;
    }
    if (me.selectedSubJob) {
      subJobId = me.selectedSubJob.id;
    }
    me.jobService.getWorkProgressDetails(mainJobId, subJobId).subscribe(res => {
      if(res.error) {
        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
      }
      me.workProgressData = res;
      if (me.selectedSubJob) {
        me.workProgressData.date *= 1000;
        me.workProgressData.updates.forEach((d: any) => d.date *= 1000);
      }else {
        me.workProgressData.forEach((d: any) => {
          d.updates.forEach((k: any) => k.date *= 1000);
        });
      }
      callback();
    });
  }

  initPhotoDetail(photoId: any, tid: any) {
    me.zone.run(() => {
      me.jobService.getPhoto(photoId, me.selectMainJob, tid).subscribe(res => {
        if(res.error) {
          window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
        }
        me.selectedPhoto = res;
      });
    });
  }

  clearMap(full: boolean) {
    if (full) {
      me.paths.forEach((p: any) => {
        p.setMap(null);
      });
      me.paths = [];
    }
    me.dpaths.forEach((p: any) => {
      p.setMap(null);
    });
    me.markers.forEach((m: any) => {
      m.setMap(null);
    });
    me.dpaths = [];
    me.markers = [];
  }

  initChartLocale() {
    d3.json('assets/language/mn-MN.json', function(error: any, locale: any) {
      if (error) { throw error; };
      d3.timeFormatDefaultLocale(locale);
    });
  }

  getCondName(id: any) {
    let name = '';
    me.selectedSubJob.planned_conditions.forEach((k: any) => {
      if (k.id === Number.parseInt(id)) {
        name = k.name;
      }
    });
    return name;
  }

  getCondColor(id: any) {
    let color = '';
    me.selectedSubJob.planned_conditions.forEach((k: any) => {
      if (k.id === Number.parseInt(id)) {
        color = k.color_code;
      }
    });
    return color;
  }

  getJobColor(id: any) {
    let color = '';
    me.mainJob.jobs.forEach((k: any) => {
      if (k.id === Number.parseInt(id)) {
        color = k.color;
      }
    });
    return color;
  }

  getCondStroke(id: any) {
    let iid = Number.parseInt(id);
    switch (iid) {
      case 1: return 20;
      case 2: return 15;
      case 3: return 10;
      case 4: return 5;
      case 5: return 3;
      case 6: return 1;
      default: return 2;
    }
  }

  genColorBack(colorNum: any, colors: any) {
      let r: any, g: any, b: any;
      let h = colorNum / colors;
      let i = ~~(h * 6); let f = h * 6 - i; let q = 1 - f;
      switch (i % 6) {
          case 0: r = 1; g = f; b = 0; break; case 1: r = q; g = 1; b = 0; break;
          case 2: r = 0; g = 1; b = f; break; case 3: r = 0; g = q; b = 1; break;
          case 4: r = f; g = 0; b = 1; break; case 5: r = 1; g = 0; b = q; break;
      }
      let c = '#' + ('00' + (~ ~(r * 255)).toString(16)).slice(-2)
                  + ('00' + (~ ~(g * 255)).toString(16)).slice(-2)
                  + ('00' + (~ ~(b * 255)).toString(16)).slice(-2);
      return (c);
  }

  genColor(colorNum: any, colors: any) {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  deletePath(id: any) {    
    if(confirm('Та устгахдаа итгэлтэй байна уу?')) {
      me.jobService.deletePath(id).subscribe(res => {        
        me.initData();
      });
    }
  }

  editPath() {
    me.jobService.editPath(me.selectedPhoto.id,me.typeEl.nativeElement.value,me.descEl.nativeElement.value).subscribe(res => {              
    
    });
  }

  reset() {
    me.typeEl.nativeElement.value = '';
    me.descEl.nativeElement.value = '';    
  }

  showNotif() {
    let str = '';
    me.notifs.forEach((k: any) => {
      str = str + 'Замын ажил: ' + k.name + ', Мэдээлэл: ' + k.msg + ', Огноо: ' + k.ndate + '\n';
    });
    if(str != '') {
      alert(str);
    } else {
      alert('Одоогоор хоосон байна.');
    }
  }
}

