import { Component, ElementRef, ViewChild, NgZone, OnDestroy, AfterContentInit } from '@angular/core';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { JobService } from '../services/job.service';
import * as _ from 'lodash';
let GoogleMaps = require('google-maps');
let d3 = require('d3');

let me: JobsComponent;
@Component({
  selector: 'jobs-component',
  template: `
    <h1>Замын ажлууд</h1>
    <div id="jobsPer" class="c-card__item c-card__item--divider c-card__item--success">Нийт ажил: <select class="c-field" id="jobs" (change)="selectJobMain()">
    <option value="0">Шинээр замын ажил оруулах</option>
	<option 
  *ngFor="let job of mains; let i = index" [attr.data-index]="i" value="{{job.id}}">{{job.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Гүйцэтгэгч: {{job.contractorName}}</option>
	</select></div><br/>
	<div class="alert alert-success" #result id="result" style="color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;">	  
	</div>
    <div class="o-grid o-grid--wrap o-grid--no-gutter" id="maps">
	    <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high">        
        <input *ngIf="selectedJob" id="file-field" name="file-field" (change)="uploadFile($event)" type="file" accept=".*" value="Файлаас оруулах">
        <div #map1 id="map_canvas"></div>
      </div>
	    <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high u-bg-white">
	      <form method="post" style="margin-left: 5px;">
	    <label class="c-label o-form-element" style="margin-bottom: -25px;">
	      Ажлын нэр
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Нэр" [value]="selectedJob?.name" id="name" name="name" #name>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element" style="margin-bottom: -25px;">
	      Компаны нэр
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <select class="c-field" id="company" #company [value]="selectedJob?.cid">
				<option 
			  *ngFor="let com of companys" value="{{com.id}}">{{com.name}}</option>
				</select>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element" style="margin-bottom: -25px;">
	      Хэдэн хэсэг
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <select class="c-field" id="subjob" #subjob [value]="selectedJob?.jobs.length">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				</select>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element" style="margin-bottom: -25px;" *ngIf="selectedJob">
	      Хэсэг сонгох
	      <div class="c-input-group">	        
	        <div class="o-field">
	          <select class="c-field" id="subjob1" #subjob1 [value]="selectedJob?.subid">
	          <option 
				*ngFor="let sjob of selectedJob.jobs" value="{{sjob.id}}">{{sjob.name}}</option>
				</select>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element" style="margin-bottom: -25px;">
	      Эхлэх огноо
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="date" ng2-datetime-picker [value]="selectedJob?.start" id="start" name="start" #start/>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element" style="margin-bottom: -25px;">
	      Дуусах огноо
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="date" placeholder="yyyy-MM-dd HH:mm:ss" [value]="selectedJob?.deadline" id="deadline" name="deadline" #deadline/>
	        </div>
	      </div>
	    </label>
      <label class="c-label o-form-element" style="margin-bottom: -25px;">
        Давхарга сонгох
        <div class="c-input-group">
          <div class="o-field o-field--fixed" *ngFor="let type of types">
            <label class="c-field c-field--choice" style="max-width: 50%;" *ngIf="checkList(type.id)">
              <input checked="checked" type="checkbox" value="{{type.id}}" id="path_types{{type.id}}" name="path_types{{type.id}}" #path_types (change)="addTypes($event.target.getAttribute('value'), $event.target.checked)">{{type.name}}
            </label>
            <label class="c-field c-field--choice" style="max-width: 50%;" *ngIf="!checkList(type.id)">
              <input type="checkbox" value="{{type.id}}" id="path_types{{type.id}}" name="path_types{{type.id}}" #path_types (change)="addTypes($event.target.getAttribute('value'), $event.target.checked)">{{type.name}}
            </label>
          </div>
        </div>
      </label>
	    <label class="c-label o-form-element" style="margin-bottom: -25px;">
	      Байрлал
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Байрлал" [value]="selectedJob?.location" id="location" name="location" #location>
	        </div>
	      </div>
	    </label>
	    <label class="c-label o-form-element" style="">
	      Ажиллах ангийн тоо
	      <div class="c-input-group">
	        <div class="o-field">
	          <input class="c-field" type="text" placeholder="Ажиллах ангийн тоо" [value]="selectedJob?.groups" id="groups" name="groups" #groups>
	        </div>
	      </div>
	    </label>	    
	  </form>
	  <span class="c-input-group" *ngIf="selectedJob && (permission <= 2 || permission == 4)" style="margin-left: 5px;">
	      <button class="c-button c-button--success" (click)="editJob()">Засварлах</button>
	      <button class="c-button c-button--error" (click)="deleteJob(selectMainJob)">Устгах</button>
	    </span>
	    <span class="c-input-group" *ngIf="!selectedJob && (permission <= 2 || permission == 4)" style="margin-left: 5px;">
	      <button class="c-button c-button--error" (click)="addJob()">Нэмэх</button>
	      <button class="c-button" (click)="reset()">Цэвэрлэх</button>	      
	    </span>
	    </div>
	  </div>
  `,
  providers: [JobService]
})
export class JobsComponent implements OnDestroy, AfterContentInit {
  @ViewChild('map1') mapEl: ElementRef;
  // Google Maps specific declaration -- START
  GOOGLE_MAPS_API_KEY: string = 'AIzaSyDvm_ijwtFfh2oKp5WGiMSTYk0A_5Op_F8';
  mapOptions = { zoom: 10, center: { lat: 50.107635, lng: 105.787132 }, mapTypeId: 'roadmap' };
  paths: Array<any> = []; dpaths: Array<any> = []; markers: Array<any> = [];
  newmarkers: Array<any> = [];
  selectedJob: Array<any> = [];
  mains: Array<any> = [];
  companys: Array<any> = [];
  permission: any = 0;
  selectMainJob: any = 0;
  map: any; google: any; mapLoaded = false; mOverlay: any; infoWindow: any;
  selectedSubJob: any = null;
  types: any = null;
  pathTypes: Array<any> = [];
  pathTypes1: any = null;

  @ViewChild('name') nameEl: ElementRef;
  @ViewChild('start') startEl: ElementRef;
  @ViewChild('deadline') deadlineEl: ElementRef;
  @ViewChild('location') locationEl: ElementRef;
  @ViewChild('groups') groupsEl: ElementRef;
  @ViewChild('company') companyEl: ElementRef;
  @ViewChild('subjob') subjobEl: ElementRef;
  @ViewChild('subjob1') subjob1El: ElementRef;
  @ViewChild('result') resultEl: ElementRef;
  @ViewChild('path_types') typesEl: ElementRef;

  datePick: Ng2DatetimePickerModule;
  
  constructor(private jobService: JobService, public zone: NgZone) {
  	me = this;
    GoogleMaps.KEY = me.GOOGLE_MAPS_API_KEY;
    //GoogleMaps.LIBRARIES = 'drawing';
    me.initChartLocale();
    //me.initMap();
    me.selectMains();
    me.initCompanys();
    me.initData();
  }

  ngAfterContentInit() {
    this.initMap();
  }

  ngOnDestroy() {
    me.map = null;
    me = null;
  }

  initData() {
  	  if(me.selectMainJob != 0) {
		  me.jobService.getJobId(me.selectMainJob).subscribe(res => { 
			if(res.error) {
			  window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
			}         
			me.selectedJob = res;
      //path_types
      me.pathTypes = [];
      me.pathTypes1 = res.path_types;
		  });
		  me.initPath();
	  } else {
	  	me.selectedJob = null;
	  }	  
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
    me.jobService.getPermission().subscribe(res => {       
      me.permission = res.permission;
      if(me.permission == 3) {
        document.getElementById('jobsPer').style.display = "none";
        document.getElementById('maps').style.display = "none";
        me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд бүх ажлыг харах эрх байхгүй байна.';
      }
    });
    me.jobService.getTypes(0).subscribe(res => { 
      me.types = res;
    });
  }

  selectJobMain() {  
    var value: string = (event.target as any).value;  
    me.selectMainJob = value;
    me.initData();
    me.initMap();
    me.resultEl.nativeElement.innerHTML = '';
  }

  initMap() {
    GoogleMaps.load(function(google: any){    
      me.google = google;
      me.map = new google.maps.Map(me.mapEl.nativeElement, me.mapOptions);
      me.mapLoaded = true;
      me.mOverlay = new google.maps.OverlayView();
      me.mOverlay.draw = function() {};
      me.mOverlay.setMap(me.map);
      me.newmarkers = [];

      if(me.selectMainJob != 0) {
	      let drawingManager = new google.maps.drawing.DrawingManager({
		    drawingMode: google.maps.drawing.OverlayType.MARKER,
		    drawingControl: true,
		    drawingControlOptions: {
		      position: google.maps.ControlPosition.TOP_CENTER,
		      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
		    },
		    //markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
		    markerOptions: {icon: 'assets/images/favicon.png'},
		    circleOptions: {
		      fillColor: '#ffff00',
		      fillOpacity: 1,
		      strokeWeight: 5,
		      clickable: true,
		      editable: true,
		      zIndex: 1
		    }
		  });
		  drawingManager.setMap(me.map);
		  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event: any) {
			  if(event.type == 'marker') {
			  	//console.log(event.overlay.position.lat());
			  	//console.log(event.overlay.position.lng());
			  	if(event.overlay.position.lng()) {
			    	me.newmarkers.push(event.overlay.position.lng() + ',' + event.overlay.position.lat());
			    }
			  }
		  });
	    }
    });
  }

  initPath() {
    if (me.mapLoaded) {
      let subJobId: number; let mainJobId: number;
      if (me.selectMainJob) {
        mainJobId = me.selectMainJob;
      }
      if (me.selectedSubJob) {
        subJobId = me.selectedSubJob.id;
      }
      let coords: Array<any> = new Array<any>();
      me.jobService.getPath(mainJobId, subJobId).subscribe(res => {
        if(res.error) {
          window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
        }
        me.clearMap(true);        
        if (me.selectedSubJob) {          
          let i = 0;
          res.path.forEach(function(pathPoint: Array<Number>){
            let lat = pathPoint[1];
            let lng = pathPoint[0];
            if (lat !== 0 && lng !== 0) {
              coords[i] = {lat: lat, lng: lng};              
              i += 1;
            }
          });
          me.mapOptions = { zoom: 10, center: coords[0], mapTypeId: 'roadmap' };
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
            let i = 0;
            job.path.forEach((pathPoint: any) => {
              let lat = pathPoint[1];
              let lng = pathPoint[0];
              if (lat !== 0 && lng !== 0) {
                coords[i] = {lat: lat, lng: lng};
                let pos = coords[i];
	            let marker = new me.google.maps.Marker({
	              icon: {
	                // use whatever icon you want for the "dots"
	                url: 'assets/images/point_1.png',
	                size: new me.google.maps.Size(7, 7),
	                anchor: new me.google.maps.Point(4, 4)
	              },
	              position: pos,
	              title: 'Замын ажлын байрлал',
	              // custom datas
	              overlap: false,
	              marker_id: i
	            });
	            me.markers.forEach(function(m){              
	                m.overlap = true;
	            });            
	          marker.addListener('click', function(){ me.selectMarker(marker); });
	          marker.setMap(me.map);
	          me.newmarkers.push(marker); 
                i += 1;
              }
            });
            me.mapOptions = { zoom: 10, center: coords[0], mapTypeId: 'roadmap' };
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

  selectMarker(marker: any) {  	
  	marker.setMap(null);
  	me.newmarkers.splice(marker.marker_id, 1);
  	console.log(me.newmarkers);
  	me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай байршил устгалаа.';
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
    me.newmarkers.forEach((m: any) => {
      m.setMap(null);
    });
    me.dpaths = [];
    me.markers = [];
    me.newmarkers = [];
  }

  initChartLocale() {
    d3.json('assets/language/mn-MN.json', function(error: any, locale: any) {
      if (error) { throw error; };
      d3.timeFormatDefaultLocale(locale);
    });
  }

  editJob() {
    me.pathTypes = me.pathTypes.filter( me.onlyUnique );
  	me.jobService.editJob(me.nameEl.nativeElement.value
	  ,me.companyEl.nativeElement.value,me.startEl.nativeElement.value,me.deadlineEl.nativeElement.value,me.locationEl.nativeElement.value
	  ,me.groupsEl.nativeElement.value,me.selectMainJob,me.subjobEl.nativeElement.value,me.newmarkers,me.subjob1El.nativeElement.value,me.pathTypes).subscribe(res => { 		          
		me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай заслаа.';
	  });
	  let i=0;
	  me.newmarkers.forEach((m: any) => {
	  	if((me.newmarkers.length-1) > i) {
        	me.newmarkers.splice(i, 1);
        }
        i += 1;
      });	  
	  //me.newmarkers = [];
  }

  addJob() {
    me.pathTypes = me.pathTypes.filter( me.onlyUnique );
    if(me.pathTypes.length > 0) {
      me.jobService.addJob(me.nameEl.nativeElement.value
      ,me.companyEl.nativeElement.value,me.startEl.nativeElement.value,me.deadlineEl.nativeElement.value,me.locationEl.nativeElement.value
      ,me.groupsEl.nativeElement.value,me.selectMainJob,me.subjobEl.nativeElement.value,me.newmarkers,me.pathTypes).subscribe(res => {               
      me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
      });
      me.selectMains();
    } else {
      alert('Давхаргаа сонгоно уу!');
    }      	
  }

  deleteJob(id: any) {  	
    if(confirm('Та устгахдаа итгэлтэй байна уу?')) {
      me.jobService.deleteJob(id).subscribe(res => {
      	me.selectMains();
        me.initData();
      });
    }
  }

  addTypes(id: any, check: any) {   
    me.pathTypes = me.pathTypes.filter( me.onlyUnique ); 
    if(check) {
      me.pathTypes.push(id);
    } else {
      const index: number = me.pathTypes.indexOf(id);
      if (index !== -1) {
          me.pathTypes.splice(index, 1);
      }
    }
  }

  onlyUnique(value:any, index:any, self:any) { 
    return self.indexOf(value) === index;
  }

  checkList(id: any): boolean {  
    let chC: any = false;  
    if(me.selectedJob) {
      let splitted = me.pathTypes1.split(",");      
      for(let i=0;i<splitted.length;i++) {
        if(splitted[i] == id) {          
          me.pathTypes.push(id);
          chC = true;
        }
      }
      if(chC) {
        return true;
      }
    }
    return false;
  }

  reset() {
  	me.nameEl.nativeElement.value = '';
  	me.startEl.nativeElement.value = '';
  	me.deadlineEl.nativeElement.value = '';
  	me.locationEl.nativeElement.value = '';
  	me.groupsEl.nativeElement.value = '';
  	me.resultEl.nativeElement.innerHTML = '';
  	me.initMap();
  }

  getJobColor(id: any) {    
    return 'black';
  }
}
