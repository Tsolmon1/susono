"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var job_service_1 = require("../services/job.service");
var GoogleMaps = require('google-maps');
var d3 = require('d3');
var me;
var JobsComponent = /** @class */ (function () {
    function JobsComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        // Google Maps specific declaration -- START
        this.GOOGLE_MAPS_API_KEY = 'AIzaSyDvm_ijwtFfh2oKp5WGiMSTYk0A_5Op_F8';
        this.mapOptions = { zoom: 10, center: { lat: 50.107635, lng: 105.787132 }, mapTypeId: 'roadmap' };
        this.paths = [];
        this.dpaths = [];
        this.markers = [];
        this.newmarkers = [];
        this.selectedJob = [];
        this.mains = [];
        this.companys = [];
        this.permission = 0;
        this.selectMainJob = 0;
        this.mapLoaded = false;
        this.selectedSubJob = null;
        this.types = null;
        this.pathTypes = [];
        this.pathTypes1 = null;
        me = this;
        GoogleMaps.KEY = me.GOOGLE_MAPS_API_KEY;
        //GoogleMaps.LIBRARIES = 'drawing';
        me.initChartLocale();
        //me.initMap();
        me.selectMains();
        me.initCompanys();
        me.initData();
    }
    JobsComponent.prototype.ngAfterContentInit = function () {
        this.initMap();
    };
    JobsComponent.prototype.ngOnDestroy = function () {
        me.map = null;
        me = null;
    };
    JobsComponent.prototype.initData = function () {
        if (me.selectMainJob != 0) {
            me.jobService.getJobId(me.selectMainJob).subscribe(function (res) {
                if (res.error) {
                    window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
                }
                me.selectedJob = res;
                //path_types
                me.pathTypes = [];
                me.pathTypes1 = res.path_types;
            });
            me.initPath();
        }
        else {
            me.selectedJob = null;
        }
    };
    JobsComponent.prototype.initCompanys = function () {
        me.jobService.getCompanys().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.companys = res;
        });
    };
    JobsComponent.prototype.selectMains = function () {
        me.jobService.getMain().subscribe(function (res) {
            me.mains = res;
        });
        me.jobService.getPermission().subscribe(function (res) {
            me.permission = res.permission;
            if (me.permission == 3) {
                document.getElementById('jobsPer').style.display = "none";
                document.getElementById('maps').style.display = "none";
                me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд бүх ажлыг харах эрх байхгүй байна.';
            }
        });
        me.jobService.getTypes(0).subscribe(function (res) {
            me.types = res;
        });
    };
    JobsComponent.prototype.selectJobMain = function () {
        var value = event.target.value;
        me.selectMainJob = value;
        me.initData();
        me.initMap();
        me.resultEl.nativeElement.innerHTML = '';
    };
    JobsComponent.prototype.initMap = function () {
        GoogleMaps.load(function (google) {
            me.google = google;
            me.map = new google.maps.Map(me.mapEl.nativeElement, me.mapOptions);
            me.mapLoaded = true;
            me.mOverlay = new google.maps.OverlayView();
            me.mOverlay.draw = function () { };
            me.mOverlay.setMap(me.map);
            me.newmarkers = [];
            if (me.selectMainJob != 0) {
                var drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.MARKER,
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
                    },
                    //markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
                    markerOptions: { icon: 'assets/images/favicon.png' },
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
                google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
                    if (event.type == 'marker') {
                        //console.log(event.overlay.position.lat());
                        //console.log(event.overlay.position.lng());
                        if (event.overlay.position.lng()) {
                            me.newmarkers.push(event.overlay.position.lng() + ',' + event.overlay.position.lat());
                        }
                    }
                });
            }
        });
    };
    JobsComponent.prototype.initPath = function () {
        if (me.mapLoaded) {
            var subJobId = void 0;
            var mainJobId = void 0;
            if (me.selectMainJob) {
                mainJobId = me.selectMainJob;
            }
            if (me.selectedSubJob) {
                subJobId = me.selectedSubJob.id;
            }
            var coords_1 = new Array();
            me.jobService.getPath(mainJobId, subJobId).subscribe(function (res) {
                if (res.error) {
                    window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
                }
                me.clearMap(true);
                if (me.selectedSubJob) {
                    var i_1 = 0;
                    res.path.forEach(function (pathPoint) {
                        var lat = pathPoint[1];
                        var lng = pathPoint[0];
                        if (lat !== 0 && lng !== 0) {
                            coords_1[i_1] = { lat: lat, lng: lng };
                            i_1 += 1;
                        }
                    });
                    me.mapOptions = { zoom: 10, center: coords_1[0], mapTypeId: 'roadmap' };
                    me.map.setCenter(coords_1[0]);
                    var route = new me.google.maps.Polyline({
                        path: coords_1,
                        strokeColor: me.getJobColor(res.id),
                        strokeOpacity: 0.8,
                        strokeWeight: 2
                    });
                    route.setMap(me.map);
                    me.paths.push(route);
                }
                else {
                    res.forEach(function (job) {
                        var i = 0;
                        job.path.forEach(function (pathPoint) {
                            var lat = pathPoint[1];
                            var lng = pathPoint[0];
                            if (lat !== 0 && lng !== 0) {
                                coords_1[i] = { lat: lat, lng: lng };
                                var pos = coords_1[i];
                                var marker_1 = new me.google.maps.Marker({
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
                                me.markers.forEach(function (m) {
                                    m.overlap = true;
                                });
                                marker_1.addListener('click', function () { me.selectMarker(marker_1); });
                                marker_1.setMap(me.map);
                                me.newmarkers.push(marker_1);
                                i += 1;
                            }
                        });
                        me.mapOptions = { zoom: 10, center: coords_1[0], mapTypeId: 'roadmap' };
                        me.map.setCenter(coords_1[0]);
                        var route = new me.google.maps.Polyline({
                            path: coords_1,
                            strokeColor: me.getJobColor(job.id),
                            strokeOpacity: 1,
                            strokeWeight: 2
                        });
                        route.setMap(me.map);
                        me.paths.push(route);
                    });
                }
            });
        }
        else {
            setTimeout(me.initPath, 1000);
        }
    };
    JobsComponent.prototype.selectMarker = function (marker) {
        marker.setMap(null);
        me.newmarkers.splice(marker.marker_id, 1);
        console.log(me.newmarkers);
        me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай байршил устгалаа.';
    };
    JobsComponent.prototype.clearMap = function (full) {
        if (full) {
            me.paths.forEach(function (p) {
                p.setMap(null);
            });
            me.paths = [];
        }
        me.dpaths.forEach(function (p) {
            p.setMap(null);
        });
        me.markers.forEach(function (m) {
            m.setMap(null);
        });
        me.newmarkers.forEach(function (m) {
            m.setMap(null);
        });
        me.dpaths = [];
        me.markers = [];
        me.newmarkers = [];
    };
    JobsComponent.prototype.initChartLocale = function () {
        d3.json('assets/language/mn-MN.json', function (error, locale) {
            if (error) {
                throw error;
            }
            ;
            d3.timeFormatDefaultLocale(locale);
        });
    };
    JobsComponent.prototype.editJob = function () {
        me.pathTypes = me.pathTypes.filter(me.onlyUnique);
        me.jobService.editJob(me.nameEl.nativeElement.value, me.companyEl.nativeElement.value, me.startEl.nativeElement.value, me.deadlineEl.nativeElement.value, me.locationEl.nativeElement.value, me.groupsEl.nativeElement.value, me.selectMainJob, me.subjobEl.nativeElement.value, me.newmarkers, me.subjob1El.nativeElement.value, me.pathTypes).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай заслаа.';
        });
        var i = 0;
        me.newmarkers.forEach(function (m) {
            if ((me.newmarkers.length - 1) > i) {
                me.newmarkers.splice(i, 1);
            }
            i += 1;
        });
        //me.newmarkers = [];
    };
    JobsComponent.prototype.addJob = function () {
        me.pathTypes = me.pathTypes.filter(me.onlyUnique);
        if (me.pathTypes.length > 0) {
            me.jobService.addJob(me.nameEl.nativeElement.value, me.companyEl.nativeElement.value, me.startEl.nativeElement.value, me.deadlineEl.nativeElement.value, me.locationEl.nativeElement.value, me.groupsEl.nativeElement.value, me.selectMainJob, me.subjobEl.nativeElement.value, me.newmarkers, me.pathTypes).subscribe(function (res) {
                me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
            });
            me.selectMains();
        }
        else {
            alert('Давхаргаа сонгоно уу!');
        }
    };
    JobsComponent.prototype.deleteJob = function (id) {
        if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
            me.jobService.deleteJob(id).subscribe(function (res) {
                me.selectMains();
                me.initData();
            });
        }
    };
    JobsComponent.prototype.addTypes = function (id, check) {
        me.pathTypes = me.pathTypes.filter(me.onlyUnique);
        if (check) {
            me.pathTypes.push(id);
        }
        else {
            var index = me.pathTypes.indexOf(id);
            if (index !== -1) {
                me.pathTypes.splice(index, 1);
            }
        }
    };
    JobsComponent.prototype.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    JobsComponent.prototype.checkList = function (id) {
        var chC = false;
        if (me.selectedJob) {
            var splitted = me.pathTypes1.split(",");
            for (var i = 0; i < splitted.length; i++) {
                if (splitted[i] == id) {
                    me.pathTypes.push(id);
                    chC = true;
                }
            }
            if (chC) {
                return true;
            }
        }
        return false;
    };
    JobsComponent.prototype.reset = function () {
        me.nameEl.nativeElement.value = '';
        me.startEl.nativeElement.value = '';
        me.deadlineEl.nativeElement.value = '';
        me.locationEl.nativeElement.value = '';
        me.groupsEl.nativeElement.value = '';
        me.resultEl.nativeElement.innerHTML = '';
        me.initMap();
    };
    JobsComponent.prototype.getJobColor = function (id) {
        return 'black';
    };
    __decorate([
        core_1.ViewChild('map1'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "mapEl", void 0);
    __decorate([
        core_1.ViewChild('name'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "nameEl", void 0);
    __decorate([
        core_1.ViewChild('start'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "startEl", void 0);
    __decorate([
        core_1.ViewChild('deadline'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "deadlineEl", void 0);
    __decorate([
        core_1.ViewChild('location'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "locationEl", void 0);
    __decorate([
        core_1.ViewChild('groups'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "groupsEl", void 0);
    __decorate([
        core_1.ViewChild('company'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "companyEl", void 0);
    __decorate([
        core_1.ViewChild('subjob'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "subjobEl", void 0);
    __decorate([
        core_1.ViewChild('subjob1'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "subjob1El", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "resultEl", void 0);
    __decorate([
        core_1.ViewChild('path_types'),
        __metadata("design:type", core_1.ElementRef)
    ], JobsComponent.prototype, "typesEl", void 0);
    JobsComponent = __decorate([
        core_1.Component({
            selector: 'jobs-component',
            template: "\n    <h1>\u0417\u0430\u043C\u044B\u043D \u0430\u0436\u043B\u0443\u0443\u0434</h1>\n    <div id=\"jobsPer\" class=\"c-card__item c-card__item--divider c-card__item--success\">\u041D\u0438\u0439\u0442 \u0430\u0436\u0438\u043B: <select class=\"c-field\" id=\"jobs\" (change)=\"selectJobMain()\">\n    <option value=\"0\">\u0428\u0438\u043D\u044D\u044D\u0440 \u0437\u0430\u043C\u044B\u043D \u0430\u0436\u0438\u043B \u043E\u0440\u0443\u0443\u043B\u0430\u0445</option>\n\t<option \n  *ngFor=\"let job of mains; let i = index\" [attr.data-index]=\"i\" value=\"{{job.id}}\">{{job.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u0413\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0433\u0447: {{job.contractorName}}</option>\n\t</select></div><br/>\n\t<div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n    border: 1px solid transparent;\n    border-radius: 4px;\">\t  \n\t</div>\n    <div class=\"o-grid o-grid--wrap o-grid--no-gutter\" id=\"maps\">\n\t    <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high\">        \n        <input *ngIf=\"selectedJob\" id=\"file-field\" name=\"file-field\" (change)=\"uploadFile($event)\" type=\"file\" accept=\".*\" value=\"\u0424\u0430\u0439\u043B\u0430\u0430\u0441 \u043E\u0440\u0443\u0443\u043B\u0430\u0445\">\n        <div #map1 id=\"map_canvas\"></div>\n      </div>\n\t    <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high u-bg-white\">\n\t      <form method=\"post\" style=\"margin-left: 5px;\">\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n\t      \u0410\u0436\u043B\u044B\u043D \u043D\u044D\u0440\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u041D\u044D\u0440\" [value]=\"selectedJob?.name\" id=\"name\" name=\"name\" #name>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n\t      \u041A\u043E\u043C\u043F\u0430\u043D\u044B \u043D\u044D\u0440\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <select class=\"c-field\" id=\"company\" #company [value]=\"selectedJob?.cid\">\n\t\t\t\t<option \n\t\t\t  *ngFor=\"let com of companys\" value=\"{{com.id}}\">{{com.name}}</option>\n\t\t\t\t</select>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n\t      \u0425\u044D\u0434\u044D\u043D \u0445\u044D\u0441\u044D\u0433\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <select class=\"c-field\" id=\"subjob\" #subjob [value]=\"selectedJob?.jobs.length\">\n\t\t\t\t<option value=\"1\">1</option>\n\t\t\t\t<option value=\"2\">2</option>\n\t\t\t\t<option value=\"3\">3</option>\n\t\t\t\t<option value=\"4\">4</option>\n\t\t\t\t<option value=\"5\">5</option>\n\t\t\t\t<option value=\"6\">6</option>\n\t\t\t\t<option value=\"7\">7</option>\n\t\t\t\t<option value=\"8\">8</option>\n\t\t\t\t<option value=\"9\">9</option>\n\t\t\t\t<option value=\"10\">10</option>\n\t\t\t\t</select>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\" *ngIf=\"selectedJob\">\n\t      \u0425\u044D\u0441\u044D\u0433 \u0441\u043E\u043D\u0433\u043E\u0445\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <select class=\"c-field\" id=\"subjob1\" #subjob1 [value]=\"selectedJob?.subid\">\n\t          <option \n\t\t\t\t*ngFor=\"let sjob of selectedJob.jobs\" value=\"{{sjob.id}}\">{{sjob.name}}</option>\n\t\t\t\t</select>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n\t      \u042D\u0445\u043B\u044D\u0445 \u043E\u0433\u043D\u043E\u043E\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"date\" ng2-datetime-picker [value]=\"selectedJob?.start\" id=\"start\" name=\"start\" #start/>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n\t      \u0414\u0443\u0443\u0441\u0430\u0445 \u043E\u0433\u043D\u043E\u043E\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"date\" placeholder=\"yyyy-MM-dd HH:mm:ss\" [value]=\"selectedJob?.deadline\" id=\"deadline\" name=\"deadline\" #deadline/>\n\t        </div>\n\t      </div>\n\t    </label>\n      <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n        \u0414\u0430\u0432\u0445\u0430\u0440\u0433\u0430 \u0441\u043E\u043D\u0433\u043E\u0445\n        <div class=\"c-input-group\">\n          <div class=\"o-field o-field--fixed\" *ngFor=\"let type of types\">\n            <label class=\"c-field c-field--choice\" style=\"max-width: 50%;\" *ngIf=\"checkList(type.id)\">\n              <input checked=\"checked\" type=\"checkbox\" value=\"{{type.id}}\" id=\"path_types{{type.id}}\" name=\"path_types{{type.id}}\" #path_types (change)=\"addTypes($event.target.getAttribute('value'), $event.target.checked)\">{{type.name}}\n            </label>\n            <label class=\"c-field c-field--choice\" style=\"max-width: 50%;\" *ngIf=\"!checkList(type.id)\">\n              <input type=\"checkbox\" value=\"{{type.id}}\" id=\"path_types{{type.id}}\" name=\"path_types{{type.id}}\" #path_types (change)=\"addTypes($event.target.getAttribute('value'), $event.target.checked)\">{{type.name}}\n            </label>\n          </div>\n        </div>\n      </label>\n\t    <label class=\"c-label o-form-element\" style=\"margin-bottom: -25px;\">\n\t      \u0411\u0430\u0439\u0440\u043B\u0430\u043B\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0411\u0430\u0439\u0440\u043B\u0430\u043B\" [value]=\"selectedJob?.location\" id=\"location\" name=\"location\" #location>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\" style=\"\">\n\t      \u0410\u0436\u0438\u043B\u043B\u0430\u0445 \u0430\u043D\u0433\u0438\u0439\u043D \u0442\u043E\u043E\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0410\u0436\u0438\u043B\u043B\u0430\u0445 \u0430\u043D\u0433\u0438\u0439\u043D \u0442\u043E\u043E\" [value]=\"selectedJob?.groups\" id=\"groups\" name=\"groups\" #groups>\n\t        </div>\n\t      </div>\n\t    </label>\t    \n\t  </form>\n\t  <span class=\"c-input-group\" *ngIf=\"selectedJob && (permission <= 2 || permission == 4)\" style=\"margin-left: 5px;\">\n\t      <button class=\"c-button c-button--success\" (click)=\"editJob()\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n\t      <button class=\"c-button c-button--error\" (click)=\"deleteJob(selectMainJob)\">\u0423\u0441\u0442\u0433\u0430\u0445</button>\n\t    </span>\n\t    <span class=\"c-input-group\" *ngIf=\"!selectedJob && (permission <= 2 || permission == 4)\" style=\"margin-left: 5px;\">\n\t      <button class=\"c-button c-button--error\" (click)=\"addJob()\">\u041D\u044D\u043C\u044D\u0445</button>\n\t      <button class=\"c-button\" (click)=\"reset()\">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>\t      \n\t    </span>\n\t    </div>\n\t  </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], JobsComponent);
    return JobsComponent;
}());
exports.JobsComponent = JobsComponent;
//# sourceMappingURL=jobs.component.js.map