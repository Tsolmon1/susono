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
var _ = require("lodash");
var GoogleMaps = require('google-maps');
var d3 = require('d3');
var me;
var HomeComponent = /** @class */ (function () {
    // UI interaction necessities declaration -- END
    function HomeComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        // Google Maps specific declaration -- START
        this.GOOGLE_MAPS_API_KEY = 'AIzaSyDvm_ijwtFfh2oKp5WGiMSTYk0A_5Op_F8';
        this.mapOptions = { zoom: 9, center: { lat: 50.107635, lng: 105.787132 }, mapTypeId: 'roadmap' };
        this.paths = [];
        this.dpaths = [];
        this.markers = [];
        this.checkMarker = [];
        this.mains = [];
        this.mapLoaded = false;
        // Google Maps specific declaration -- END
        // Chart specific declaration -- START
        // Chart specific declaration -- END
        // Real data declaration -- START
        this.selectMainJob = 1;
        this.permission = 0;
        this.notifs = {};
        this.mainJob = {};
        this.selectedSubJob = null;
        this.photoData = {};
        this.workProgressData = null;
        this.selectedPhoto = null;
        this.types = [];
        this.checkDate = true;
        // Real data declaration -- END
        // UI interaction necessities declaration -- START
        this.showJobPercents = false;
        this.keepJobPercents = false;
        this.displayAllConditions = true;
        me = this;
        GoogleMaps.KEY = me.GOOGLE_MAPS_API_KEY;
        me.initChartLocale();
        me.selectMains();
        me.initData();
    }
    HomeComponent.prototype.selectMains = function () {
        me.jobService.getMain().subscribe(function (res) {
            me.mains = res;
        });
        me.jobService.getPermission().subscribe(function (res) {
            me.permission = res.permission;
        });
        me.jobService.getNotifs(me.selectMainJob).subscribe(function (res) {
            me.notifs = res;
        });
        me.jobService.getTypes(me.selectMainJob).subscribe(function (res) {
            me.types = res;
        });
    };
    HomeComponent.prototype.selectJobMain = function () {
        var value = event.target.value;
        me.selectMainJob = value;
        me.jobService.getNotifs(me.selectMainJob).subscribe(function (res) {
            me.notifs = res;
        });
        // me.selectMains();
        me.initChartLocale();
        me.initData();
        me.initPhotoDetail(0, 0);
        //me.initPlanChart();
        //me.initProgressPath();
        me.selectJob(0);
        me.selectChart(0);
        //me.initPath();
        //me.initPlanChart();
    };
    HomeComponent.prototype.selectJob = function (job) {
        if (job && job != 0) {
            me.selectedSubJob = job;
        }
        else {
            me.selectedSubJob = null;
        }
        me.initPath();
        me.initPlanChart();
    };
    HomeComponent.prototype.selectChart = function (id) {
        if (id == 1) {
            me.checkDate = false;
        }
        else {
            me.checkDate = true;
        }
        me.initPlanChart();
    };
    HomeComponent.prototype.toggleJobPercents = function () {
        if (me.keepJobPercents) {
            me.showJobPercents = false;
            me.keepJobPercents = false;
        }
        else {
            me.keepJobPercents = true;
            me.showJobPercents = true;
        }
    };
    HomeComponent.prototype.getCondBadge = function (cond) { return 'clickable c-badge c-badge--rounded ' + (cond.display ? cond.color : 'c-badge--ghost'); };
    HomeComponent.prototype.resetSelectedConditions = function () {
        me.displayAllConditions = true;
        me.selectedSubJob.planned_conditions.forEach(function (cond) {
            cond.display = false;
        });
        me.initPlanChart();
    };
    HomeComponent.prototype.selectMarker = function (marker) {
        if (me.infoWindow) {
            me.infoWindow.close();
        }
        if (marker.overlap) {
            var div = document.createElement('div');
            var ul_1 = document.createElement('ul');
            ul_1.className = 'c-card c-card--menu';
            div.appendChild(ul_1);
            var i_1 = 0;
            me.checkMarker = [];
            marker.conds.forEach(function (c) {
                me.checkMarker.forEach(function (cm) {
                    if (cm == c.type) {
                        i_1 = 1;
                    }
                });
                if (i_1 == 0) {
                    me.checkMarker.push(c.type);
                    var li = document.createElement('li');
                    li.className = 'c-card__item';
                    li.textContent = me.getCondName(c.type);
                    li.onclick = function () { me.markerCondClick(c.photo_id, marker, c.type); };
                    ul_1.appendChild(li);
                }
                else {
                    i_1 = 0;
                }
            });
            me.infoWindow = new me.google.maps.InfoWindow({
                content: div
            });
            me.infoWindow.open(me.map, marker);
        }
        else {
            me.markers.forEach(function (m) { return m.setIcon('assets/images/point_1.png'); });
            marker.setIcon('assets/images/point_2.png');
            me.initPhotoDetail(marker.photo_id, 0);
        }
    };
    HomeComponent.prototype.markerCondClick = function (photoId, marker, tid) {
        if (me.infoWindow) {
            me.infoWindow.close();
        }
        me.markers.forEach(function (m) { return m.setIcon('assets/images/point_1.png'); });
        marker.setIcon('assets/images/point_2.png');
        me.initPhotoDetail(photoId, tid);
    };
    HomeComponent.prototype.selectDisplayCondition = function (cond) {
        cond.display = !cond.display;
        me.displayAllConditions = false;
        me.initPlanChart();
        me.initProgressPath();
    };
    HomeComponent.prototype.ngAfterContentInit = function () {
        this.initMap();
        setTimeout(this.initPlanChart, 1000);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        me.map = null;
        me = null;
    };
    HomeComponent.prototype.initData = function () {
        me.jobService.getPlan(me.selectMainJob).subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainJob = res;
            me.mainJob.start *= 1000;
            me.mainJob.deadline *= 1000;
            me.jobService.getWorkProgress(me.selectMainJob).subscribe(function (resp) {
                resp.forEach(function (item) {
                    item.conditions.forEach(function (cond) { return cond.total_percent = cond.percent * (100 / item.conditions.length) / 100; });
                });
                me.mainJob.jobs.forEach(function (item) {
                    item.color = me.genColor(Math.floor(Math.random() * 10), 10);
                    item.start *= 1000;
                    item.deadline *= 1000;
                    item.planned_conditions.forEach(function (cond) {
                        cond.start *= 1000;
                        cond.deadline *= 1000;
                    });
                    var found = _.find(resp, function (o) { return o.id === item.id; });
                    if (found) {
                        item.conditions = found.conditions;
                    }
                });
                me.initPath();
            });
        });
    };
    HomeComponent.prototype.initPlanChart = function () {
        if (me.checkDate) {
            var chart = d3.select('#chart'), margin = { top: 20, right: 20, bottom: 30, left: 50 };
            chart.selectAll('*').remove();
            var width = +me.chartEl.nativeElement.width.baseVal.value - margin.left - margin.right, height = +me.chartEl.nativeElement.height.baseVal.value - margin.top - margin.bottom, g_1 = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            var x_1 = d3.scaleTime().rangeRound([0, width]);
            var y_1 = d3.scaleLinear().rangeRound([height, 0]);
            if (!me.selectedSubJob) {
                x_1.domain([me.mainJob.start, me.mainJob.deadline]);
            }
            else {
                x_1.domain([me.selectedSubJob.start, me.selectedSubJob.deadline]);
            }
            y_1.domain([0, 100]);
            g_1.append('g')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(d3.axisBottom(x_1)).select('.domain').remove();
            g_1.append('g')
                .call(d3.axisLeft(y_1)).append('text')
                .attr('fill', '#000').attr('transform', 'rotate(-90)')
                .attr('y', 6).attr('dy', '0.71em')
                .attr('text-anchor', 'end').text('Хувь');
            var legendY_1 = 95;
            if (!me.selectedSubJob) {
                me.mainJob.jobs.forEach(function (job) {
                    g_1.append('text')
                        .attr('x', function () { return x_1(me.mainJob.start) + 20; }).attr('y', function () { return y_1(legendY_1); })
                        .text(job.name).style('fill', job.color);
                    legendY_1 -= 5;
                });
            }
            if (!me.selectedSubJob) {
                g_1.selectAll('dot')
                    .data(me.mainJob.jobs)
                    .enter().append('circle')
                    .attr('r', 3.5).attr('fill', function (d) { return d.color; })
                    .attr('cx', function (d) { return x_1(d.start); }).attr('cy', function (d) { return y_1(0); });
                g_1.selectAll('dot')
                    .data(me.mainJob.jobs)
                    .enter().append('circle')
                    .attr('r', 3.5).attr('fill', function (d) { return d.color; })
                    .attr('cx', function (d) { return x_1(d.deadline); }).attr('cy', function (d) { return y_1(100); });
                g_1.selectAll('dot')
                    .data(me.mainJob.jobs)
                    .enter().append('line')
                    .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8).attr('fill', 'none')
                    .attr('stroke', function (d) { return d.color; }).attr('stroke-width', 1.5)
                    .attr('x1', function (d) { return x_1(d.start); }).attr('y1', function (d) { return y_1(0); })
                    .attr('x2', function (d) { return x_1(d.deadline); }).attr('y2', function (d) { return y_1(100); });
            }
            else {
                g_1.selectAll('dot')
                    .data(_.filter(me.selectedSubJob.planned_conditions, function (d) { return me.displayAllConditions || d.display; }))
                    .enter().append('circle')
                    .attr('r', 4.5).attr('fill', function (d) { return d.color_code; })
                    .attr('cx', function (d) { return x_1(d.start); }).attr('cy', function (d) { return y_1(0); });
                g_1.selectAll('dot')
                    .data(_.filter(me.selectedSubJob.planned_conditions, function (d) { return me.displayAllConditions || d.display; }))
                    .enter().append('circle')
                    .attr('r', 4.5).attr('fill', function (d) { return d.color_code; })
                    .attr('cx', function (d) { return x_1(d.deadline); }).attr('cy', function (d) { return y_1(100); });
                g_1.selectAll('dot')
                    .data(_.filter(me.selectedSubJob.planned_conditions, function (d) { return me.displayAllConditions || d.display; }))
                    .enter().append('line')
                    .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8)
                    .attr('fill', 'none').attr('stroke', function (d) { return d.color_code; })
                    .attr('stroke-width', 1.5)
                    .attr('x1', function (d) { return x_1(d.start); }).attr('y1', function (d) { return y_1(0); })
                    .attr('x2', function (d) { return x_1(d.deadline); }).attr('y2', function (d) { return y_1(100); });
            }
            me.initChart(g_1, width, height);
        }
        else {
            var chart = d3.select('#chart'), margin = { top: 20, right: 20, bottom: 30, left: 50 };
            chart.selectAll('*').remove();
            var width = +me.chartEl.nativeElement.width.baseVal.value - margin.left - margin.right, height = +me.chartEl.nativeElement.height.baseVal.value - margin.top - margin.bottom, g_2 = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            var x_2 = d3.scaleTime().rangeRound([0, width]);
            var y_2 = d3.scaleLinear().rangeRound([height, 0]);
            if (!me.selectedSubJob) {
                x_2.domain([me.mainJob.start, me.mainJob.deadline1 * 1000]);
            }
            else {
                x_2.domain([me.selectedSubJob.start, me.selectedSubJob.deadline]);
            }
            y_2.domain([0, 100]);
            g_2.append('g')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(d3.axisBottom(x_2)).select('.domain').remove();
            g_2.append('g')
                .call(d3.axisLeft(y_2)).append('text')
                .attr('fill', '#000').attr('transform', 'rotate(-90)')
                .attr('y', 6).attr('dy', '0.71em')
                .attr('text-anchor', 'end').text('Хувь');
            var legendY_2 = 95;
            if (!me.selectedSubJob) {
                me.mainJob.jobs.forEach(function (job) {
                    g_2.append('text')
                        .attr('x', function () { return x_2(me.mainJob.start) + 20; }).attr('y', function () { return y_2(legendY_2); })
                        .text(job.name).style('fill', job.color);
                    legendY_2 -= 5;
                });
            }
            if (!me.selectedSubJob) {
                g_2.selectAll('dot')
                    .data(me.mainJob.jobs)
                    .enter().append('circle')
                    .attr('r', 3.5).attr('fill', function (d) { return d.color; })
                    .attr('cx', function (d) { return x_2(d.start); }).attr('cy', function (d) { return y_2(0); });
                g_2.selectAll('dot')
                    .data(me.mainJob)
                    .enter().append('circle')
                    .attr('r', 3.5).attr('fill', function (d) { return d.color; })
                    .attr('cx', function (d) { return x_2(d.deadline1 * 1000); }).attr('cy', function (d) { return y_2(100); });
                g_2.selectAll('dot')
                    .data(me.mainJob)
                    .enter().append('line')
                    .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8).attr('fill', 'none')
                    .attr('stroke', function (d) { return d.color; }).attr('stroke-width', 1.5)
                    .attr('x1', function (d) { return x_2(d.start); }).attr('y1', function (d) { return y_2(0); })
                    .attr('x2', function (d) { return x_2(d.deadline1 * 1000); }).attr('y2', function (d) { return y_2(100); });
            }
            else {
                g_2.selectAll('dot')
                    .data(_.filter(me.selectedSubJob.planned_conditions, function (d) { return me.displayAllConditions || d.display; }))
                    .enter().append('circle')
                    .attr('r', 4.5).attr('fill', function (d) { return d.color_code; })
                    .attr('cx', function (d) { return x_2(d.start); }).attr('cy', function (d) { return y_2(0); });
                g_2.selectAll('dot')
                    .data(_.filter(me.selectedSubJob.planned_conditions, function (d) { return me.displayAllConditions || d.display; }))
                    .enter().append('circle')
                    .attr('r', 4.5).attr('fill', function (d) { return d.color_code; })
                    .attr('cx', function (d) { return x_2(d.deadline); }).attr('cy', function (d) { return y_2(100); });
                g_2.selectAll('dot')
                    .data(_.filter(me.selectedSubJob.planned_conditions, function (d) { return me.displayAllConditions || d.display; }))
                    .enter().append('line')
                    .style('stroke-dasharray', ('3, 3')).style('stroke-opacity', 0.8)
                    .attr('fill', 'none').attr('stroke', function (d) { return d.color_code; })
                    .attr('stroke-width', 1.5)
                    .attr('x1', function (d) { return x_2(d.start); }).attr('y1', function (d) { return y_2(0); })
                    .attr('x2', function (d) { return x_2(d.deadline); }).attr('y2', function (d) { return y_2(100); });
            }
            me.initChart(g_2, width, height);
        }
    };
    HomeComponent.prototype.initChart = function (g, width, height) {
        me.initWorkProgress(function () {
            var x = d3.scaleTime().rangeRound([0, width]);
            var y = d3.scaleTime().rangeRound([height, 0]);
            if (!me.selectedSubJob) {
                if (me.checkDate) {
                    x.domain([me.mainJob.start, me.mainJob.deadline]);
                }
                else {
                    x.domain([me.mainJob.start, me.mainJob.deadline1]);
                }
            }
            else {
                x.domain([me.selectedSubJob.start, me.selectedSubJob.deadline]);
            }
            y.domain([0, 100]);
            var djLine = d3.line()
                .curve(d3.curveBasis).x(function (d) { return x(d.date); }).y(function (d) { return y(d.percent); });
            if (!me.selectedSubJob) {
                me.workProgressData.forEach(function (i) {
                    if (i.updates) {
                        g.selectAll('path').data(i.updates)
                            .enter().append('path')
                            .attr('stroke', function (d) {
                            var color = '';
                            me.mainJob.jobs.forEach(function (k) {
                                if (k.id === i.id) {
                                    color = k.color;
                                }
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
            }
            else {
                var partitioned = _.chain(me.workProgressData.updates).orderBy('date', 'asc')
                    .filter(function (f) {
                    if (me.displayAllConditions) {
                        return true;
                    }
                    else {
                        var toDisplay_1 = false;
                        me.selectedSubJob.planned_conditions.forEach(function (k) {
                            if (k.id === Number.parseInt(f.type) && k.display) {
                                toDisplay_1 = true;
                            }
                        });
                        return toDisplay_1;
                    }
                }).groupBy('type').value();
                _.forEach(partitioned, function (o, key) {
                    if (o.position) {
                        var color = me.getCondColor(key);
                        g.append('path')
                            .attr('fill', 'none').attr('stroke', color)
                            .attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round')
                            .attr('stroke-width', 2).attr('d', djLine(o));
                    }
                });
            }
            me.initProgressPath(); // Initializing progress on map
        });
    };
    HomeComponent.prototype.initMap = function () {
        GoogleMaps.load(function (google) {
            me.google = google;
            me.map = new google.maps.Map(me.mapEl.nativeElement, me.mapOptions);
            me.mapLoaded = true;
            me.mOverlay = new google.maps.OverlayView();
            me.mOverlay.draw = function () { };
            me.mOverlay.setMap(me.map);
        });
    };
    HomeComponent.prototype.initPath = function () {
        if (me.mapLoaded) {
            var subJobId = void 0;
            var mainJobId = void 0;
            if (me.mainJob) {
                mainJobId = me.mainJob.id;
            }
            if (me.selectedSubJob) {
                subJobId = me.selectedSubJob.id;
            }
            me.jobService.getPath(mainJobId, subJobId).subscribe(function (res) {
                if (res.error) {
                    window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
                }
                me.clearMap(true);
                if (me.selectedSubJob) {
                    var coords_1 = new Array();
                    var i_2 = 0;
                    res.path.forEach(function (pathPoint) {
                        var lat = pathPoint[1];
                        var lng = pathPoint[0];
                        if (lat !== 0 && lng !== 0) {
                            coords_1[i_2] = { lat: lat, lng: lng };
                            i_2 += 1;
                        }
                    });
                    me.mapOptions = { zoom: 9, center: coords_1[0], mapTypeId: 'roadmap' };
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
                        var coords = new Array();
                        var i = 0;
                        job.path.forEach(function (pathPoint) {
                            var lat = pathPoint[1];
                            var lng = pathPoint[0];
                            if (lat !== 0 && lng !== 0) {
                                coords[i] = { lat: lat, lng: lng };
                                i += 1;
                            }
                        });
                        me.mapOptions = { zoom: 9, center: coords[0], mapTypeId: 'roadmap' };
                        me.map.setCenter(coords[0]);
                        var route = new me.google.maps.Polyline({
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
        }
        else {
            setTimeout(me.initPath, 1000);
        }
    };
    HomeComponent.prototype.initProgressPath = function () {
        if (me.workProgressData) {
            var partitioned = void 0;
            if (me.selectedSubJob) {
                me.clearMap(false);
                partitioned = _.chain(me.workProgressData.updates).orderBy('date', 'asc')
                    .filter(function (f) {
                    if (me.displayAllConditions) {
                        return true;
                    }
                    else {
                        var toDisplay_2 = false;
                        me.selectedSubJob.planned_conditions.forEach(function (k) {
                            if (k.id === Number.parseInt(f.type) && k.display) {
                                toDisplay_2 = true;
                            }
                        });
                        return toDisplay_2;
                    }
                }).groupBy('type').value();
                _.forEach(partitioned, function (paths, key) {
                    var cpaths = [];
                    paths.forEach(function (o) {
                        if (o.position) {
                            var pos = { lat: o.position[1], lng: o.position[0] };
                            cpaths.push(pos);
                            var date = new Date(o.date);
                            var marker_1 = new me.google.maps.Marker({
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
                            var overlapping_1 = false;
                            var ppixelpos_1 = me.mOverlay.getProjection().fromLatLngToContainerPixel(marker_1.getPosition());
                            me.markers.forEach(function (m) {
                                var mpixelpos = me.mOverlay.getProjection().fromLatLngToContainerPixel(m.getPosition());
                                if (Math.abs(ppixelpos_1.x - mpixelpos.x) <= 0 && Math.abs(ppixelpos_1.y - mpixelpos.y) <= 0) {
                                    overlapping_1 = true;
                                    if (!m.overlap) {
                                        m.overlap = true;
                                        m.conds = [{ photo_id: m.photo_id, percent: m.percent, date: m.date, type: m.type }];
                                        m.photo_id = null;
                                        m.percent = null;
                                        m.date = null;
                                        m.type = null;
                                    }
                                    m.conds.push({ photo_id: o.id, percent: o.percent, date: o.date, type: o.type });
                                }
                            });
                            if (!overlapping_1) {
                                if (!marker_1.overlap) {
                                    marker_1.overlap = true;
                                    marker_1.conds = [{ photo_id: marker_1.photo_id, percent: marker_1.percent, date: marker_1.date, type: marker_1.type }];
                                    marker_1.photo_id = null;
                                    marker_1.percent = null;
                                    marker_1.date = null;
                                    marker_1.type = null;
                                }
                                marker_1.conds.push({ photo_id: o.id, percent: o.percent, date: o.date, type: o.type });
                                marker_1.addListener('click', function () { me.selectMarker(marker_1); });
                                marker_1.setMap(me.map);
                                me.markers.push(marker_1);
                            }
                        }
                    });
                    var polyline = new me.google.maps.Polyline({
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
    };
    HomeComponent.prototype.initWorkProgress = function (callback) {
        var subJobId;
        var mainJobId;
        if (me.mainJob) {
            mainJobId = me.mainJob.id;
        }
        if (me.selectedSubJob) {
            subJobId = me.selectedSubJob.id;
        }
        me.jobService.getWorkProgressDetails(mainJobId, subJobId).subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.workProgressData = res;
            if (me.selectedSubJob) {
                me.workProgressData.date *= 1000;
                me.workProgressData.updates.forEach(function (d) { return d.date *= 1000; });
            }
            else {
                me.workProgressData.forEach(function (d) {
                    d.updates.forEach(function (k) { return k.date *= 1000; });
                });
            }
            callback();
        });
    };
    HomeComponent.prototype.initPhotoDetail = function (photoId, tid) {
        me.zone.run(function () {
            me.jobService.getPhoto(photoId, me.selectMainJob, tid).subscribe(function (res) {
                if (res.error) {
                    window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
                }
                me.selectedPhoto = res;
            });
        });
    };
    HomeComponent.prototype.clearMap = function (full) {
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
        me.dpaths = [];
        me.markers = [];
    };
    HomeComponent.prototype.initChartLocale = function () {
        d3.json('assets/language/mn-MN.json', function (error, locale) {
            if (error) {
                throw error;
            }
            ;
            d3.timeFormatDefaultLocale(locale);
        });
    };
    HomeComponent.prototype.getCondName = function (id) {
        var name = '';
        me.selectedSubJob.planned_conditions.forEach(function (k) {
            if (k.id === Number.parseInt(id)) {
                name = k.name;
            }
        });
        return name;
    };
    HomeComponent.prototype.getCondColor = function (id) {
        var color = '';
        me.selectedSubJob.planned_conditions.forEach(function (k) {
            if (k.id === Number.parseInt(id)) {
                color = k.color_code;
            }
        });
        return color;
    };
    HomeComponent.prototype.getJobColor = function (id) {
        var color = '';
        me.mainJob.jobs.forEach(function (k) {
            if (k.id === Number.parseInt(id)) {
                color = k.color;
            }
        });
        return color;
    };
    HomeComponent.prototype.getCondStroke = function (id) {
        var iid = Number.parseInt(id);
        switch (iid) {
            case 1: return 20;
            case 2: return 15;
            case 3: return 10;
            case 4: return 5;
            case 5: return 3;
            case 6: return 1;
            default: return 2;
        }
    };
    HomeComponent.prototype.genColorBack = function (colorNum, colors) {
        var r, g, b;
        var h = colorNum / colors;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        switch (i % 6) {
            case 0:
                r = 1;
                g = f;
                b = 0;
                break;
            case 1:
                r = q;
                g = 1;
                b = 0;
                break;
            case 2:
                r = 0;
                g = 1;
                b = f;
                break;
            case 3:
                r = 0;
                g = q;
                b = 1;
                break;
            case 4:
                r = f;
                g = 0;
                b = 1;
                break;
            case 5:
                r = 1;
                g = 0;
                b = q;
                break;
        }
        var c = '#' + ('00' + (~~(r * 255)).toString(16)).slice(-2)
            + ('00' + (~~(g * 255)).toString(16)).slice(-2)
            + ('00' + (~~(b * 255)).toString(16)).slice(-2);
        return (c);
    };
    HomeComponent.prototype.genColor = function (colorNum, colors) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    HomeComponent.prototype.deletePath = function (id) {
        if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
            me.jobService.deletePath(id).subscribe(function (res) {
                me.initData();
            });
        }
    };
    HomeComponent.prototype.editPath = function () {
        me.jobService.editPath(me.selectedPhoto.id, me.typeEl.nativeElement.value, me.descEl.nativeElement.value).subscribe(function (res) {
        });
    };
    HomeComponent.prototype.reset = function () {
        me.typeEl.nativeElement.value = '';
        me.descEl.nativeElement.value = '';
    };
    HomeComponent.prototype.showNotif = function () {
        var str = '';
        me.notifs.forEach(function (k) {
            str = str + 'Замын ажил: ' + k.name + ', Мэдээлэл: ' + k.msg + ', Огноо: ' + k.ndate + '\n';
        });
        if (str != '') {
            alert(str);
        }
        else {
            alert('Одоогоор хоосон байна.');
        }
    };
    __decorate([
        core_1.ViewChild('map'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "mapEl", void 0);
    __decorate([
        core_1.ViewChild('chart'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "chartEl", void 0);
    __decorate([
        core_1.ViewChild('type'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "typeEl", void 0);
    __decorate([
        core_1.ViewChild('desc'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "descEl", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-component',
            template: "\n    <div class=\"c-card c-card--accordion\">\n\t<div class=\"c-card__item c-card__item--divider c-card__item--success\">\u041D\u0438\u0439\u0442 \u0430\u0436\u0438\u043B: <select class=\"c-field\" id=\"jobs\" (change)=\"selectJobMain()\">\n\t<option \n  *ngFor=\"let job of mains; let i = index\" [attr.data-index]=\"i\" value=\"{{job.id}}\">{{job.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u0413\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0433\u0447: {{job.contractorName}}</option>\n\t</select></div><br/>\n      <div class=\"c-card__item c-card__item--divider c-card__item--success\">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A</div>\n      <div class=\"c-card__item o-grid o-grid--wrap\">\n        <div class=\"o-grid__cell\">\n          <span class=\"c-text--loud\">\u041D\u044D\u0440</span>\n          <br/>\n          <span class=\"c-text\">{{mainJob.name}}</span>\n        </div>\n        <div class=\"o-grid__cell\">\n          <span class=\"c-text--loud\">\u04AE\u0440 \u0434\u04AF\u043D</span>\n          <br/>\n          <span class=\"c-text\">{{mainJob.percent}}%</span>\n        </div>\n        <div class=\"o-grid__cell\">\n          <span class=\"c-text--loud\">\u0425\u043E\u0446\u0440\u043E\u043B\u0442</span>\n          <br/>\n          <span class=\"c-text\">{{mainJob.delay}}%</span>\n        </div>\n        <div class=\"o-grid__cell\">\n          <span class=\"c-text--loud\">\u0421\u04AF\u04AF\u043B\u0434 \u0438\u0440\u0441\u044D\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B</span>\n          <br/>\n          <span class=\"c-text\">{{mainJob.lastUpdate}}</span><span class=\"badge\" (click)=\"showNotif()\" title=\"\u0425\u04AF\u0441\u044D\u043B\u0442 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u04AF\u04AF\u0434\">{{notifs.length}}</span>\n        </div>\n      </div>\n      <input type=\"checkbox\" id=\"plan-detail\">\n      <label class=\"c-card__item\" for=\"plan-detail\">\u0422\u04E9\u043B\u04E9\u0432\u043B\u04E9\u0433\u04E9\u04E9</label>\n      <div class=\"c-card__item\">\n        <div class=\"o-grid o-grid--wrap\">\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u042D\u0445\u043B\u044D\u0445 \u043E\u0433\u043D\u043E\u043E</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.start | date}}</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u0421\u04AF\u04AF\u043B\u0438\u0439\u043D \u0445\u0443\u0433\u0430\u0446\u0430\u0430</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.deadline | date}}</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u0413\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.contractorName}}</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u0411\u0430\u0439\u0440\u043B\u0430\u043B</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.location}}</span>\n          </div>\n        </div>\n      </div>\n      <input type=\"checkbox\" id=\"job-detail\">\n      <label class=\"c-card__item\" for=\"job-detail\">\u0410\u0436\u043B\u044B\u043D \u04AF\u0439\u043B \u044F\u0432\u0446 \u0434\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439</label>\n      <div class=\"c-card__item\">\n        <div class=\"o-grid o-grid--wrap\">\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u042D\u0445\u043B\u044D\u0445 \u043E\u0433\u043D\u043E\u043E</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.start | date}}</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\" *ngIf=\"mainJob.deadline1\">\n            <span class=\"c-text--loud\">\u0414\u0443\u0443\u0441\u0430\u0445 \u043E\u0433\u043D\u043E\u043E</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.deadline1 * 1000 | date}}</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\" *ngIf=\"!mainJob.deadline1\">\n            <span class=\"c-text--loud\">\u0414\u0443\u0443\u0441\u0430\u0445 \u043E\u0433\u043D\u043E\u043E</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.deadline | date}}</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.rating}}%</span>\n          </div>\n          <div class=\"o-grid__cell o-grid__cell--width-25\">\n            <span class=\"c-text--loud\">\u041D\u0438\u0439\u0442 \u0433\u0430\u0440\u0441\u0430\u043D \u0430\u0436\u043B\u044B\u043D \u0430\u043D\u0433\u0438</span>\n            <br/>\n            <span class=\"c-text\">{{mainJob.groups}}\u0448</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"c-card\">\n      <div class=\"c-card__item c-card__item--divider u-bg-green\">\u0410\u0436\u043B\u044B\u043D \u044F\u0432\u0446</div>\n      <div class=\"c-card__item\">\n        <span \n          (mouseenter)=\"showJobPercents = true;\" \n          (mouseleave)=\"!keepJobPercents ? showJobPercents = false : showJobPercents = true;\" \n          (click)=\"toggleJobPercents()\"\n          class=\"c-badge c-badge--rounded c-badge--warning c-badge--ghost clickable\">\n          <i class=\"fa fa-question\" aria-hidden=\"true\"></i>\n        </span> \n        <span \n          (click)=\"selectJob()\" \n          [class.c-badge--ghost]=\"selectedSubJob\"\n          [class.c-badge--info]=\"!selectedSubJob\"\n          class=\"c-badge clickable\">\u041D\u0438\u0439\u0442</span>\n        <span \n          *ngFor=\"let job of mainJob.jobs\" \n          (click)=\"selectJob(job)\" \n          [class.c-badge--ghost]=\"!selectedSubJob || selectedSubJob.id !== job.id\"\n          [class.c-badge--info]=\"selectedSubJob && selectedSubJob.id === job.id\"\n          style=\"margin-right:5px;\" \n          class=\"c-badge clickable\">{{job.name}}</span>\n          <span style=\"float: right\" \n          (click)=\"selectChart(0)\" \n          [class.c-badge--ghost]=\"!checkDate\"\n          [class.c-badge--info]=\"checkDate\"\n          class=\"c-badge clickable\">\u0410\u043D\u0445\u043D\u044B \u0434\u0443\u0443\u0441\u0430\u0445 \u043E\u0433\u043D\u043E\u043E</span>\n          <span style=\"float: right;margin-right:5px;\" \n          (click)=\"selectChart(1)\" *ngIf=\"mainJob.deadline1\"\n          [class.c-badge--ghost]=\"checkDate\"\n          [class.c-badge--info]=\"!checkDate\"\n          class=\"c-badge clickable\">\u0414\u0430\u0440\u0430\u0430\u0445 \u0434\u0443\u0443\u0441\u0430\u0445 \u043E\u0433\u043D\u043E\u043E</span>\n      </div>\n      <div [class.invisible]=\"!showJobPercents\" class=\"c-card__item\">\n        <ul class=\"c-list c-list--unstyled\">\n          <li *ngFor=\"let job of mainJob.jobs\" class=\"c-list__item\">\n            <span class=\"c-text--loud\">{{job.name}}</span>\n            <div class=\"c-progress x-small\" *ngIf=\"job.conditions\">\n              <div \n                class=\"c-progress__bar u-bg-brown-lighter\" *ngIf=\"job.conditions[0]\"\n                [style.width]=\"job.conditions[0].total_percent + '%'\">\n                <span class=\"c-tooltip c-tooltip--top\" [attr.aria-label]=\"job.conditions[0].percent + '%'\">\n                  {{job.conditions[0].percent + '%'}}</span></div>\n              <div class=\"c-progress__bar u-bg-brown c-tooltip c-tooltip--top\" *ngIf=\"job.conditions[1]\"\n                [style.width]=\"job.conditions[1].total_percent + '%'\">\n                <span class=\"c-tooltip c-tooltip--top\" [attr.aria-label]=\"job.conditions[1].percent + '%'\">\n                  {{job.conditions[1].percent + '%'}}</span></div>\n              <div class=\"c-progress__bar u-bg-brown-darker c-tooltip c-tooltip--top\" *ngIf=\"job.conditions[2]\"\n                [style.width]=\"job.conditions[2].total_percent + '%'\">\n                <span class=\"c-tooltip c-tooltip--top\" [attr.aria-label]=\"job.conditions[2].percent + '%'\">\n                  {{job.conditions[2].percent + '%'}}</span></div>\n              <div class=\"c-progress__bar u-bg-brand-light c-tooltip c-tooltip--top\" *ngIf=\"job.conditions[3]\"\n                [style.width]=\"job.conditions[3].total_percent + '%'\">\n                <span class=\"c-tooltip c-tooltip--top\" [attr.aria-label]=\"job.conditions[3].percent + '%'\">\n                  {{job.conditions[3].percent + '%'}}</span></div>\n              <div class=\"c-progress__bar u-bg-brand-dark c-tooltip c-tooltip--top\" *ngIf=\"job.conditions[4]\"\n                [style.width]=\"job.conditions[4].total_percent + '%'\">\n                <span class=\"c-tooltip c-tooltip--top\" [attr.aria-label]=\"job.conditions[4].percent + '%'\">\n                  {{job.conditions[4].percent + '%'}}</span></div>\n              <div class=\"c-progress__bar u-bg-green-dark c-tooltip c-tooltip--top\" *ngIf=\"job.conditions[5]\"\n                [style.width]=\"job.conditions[5].total_percent + '%'\">\n                <span class=\"c-tooltip c-tooltip--top\" [attr.aria-label]=\"job.conditions[5].percent + '%'\">\n                  {{job.conditions[5].percent + '%'}}</span></div>\n            </div>\n            <div class=\"c-progress x-small\" *ngIf=\"!job.conditions\">\n              <div class=\"c-progress__bar\" style=\"width:100%\">\u0410\u0436\u0438\u043B \u044D\u0445\u043B\u044D\u044D\u0433\u04AF\u0439</div>\n            </div>\n          </li>\n        </ul>\n        <div class=\"u-letter-box--small\">\n          <span *ngFor=\"let type of types\">\n            <span class=\"c-badge\" [style.background-color]=\"type.color_code\">&nbsp;</span><span class=\"c-text--quiet\">-{{type.name}}</span>\n            <!--<span class=\"c-badge u-bg-brown\">&nbsp;</span><span class=\"c-text--quiet\">-\u0414\u044D\u0434 \u0441\u0443\u0443\u0440\u044C</span>\n            <span class=\"c-badge u-bg-brown-darker\">&nbsp;</span><span class=\"c-text--quiet\">-\u0414\u0430\u043B\u0430\u043D\u0433\u0438\u0439\u043D \u0434\u044D\u044D\u0434</span>\n            <span class=\"c-badge u-bg-brand-light\">&nbsp;</span><span class=\"c-text--quiet\">-\u0421\u0443\u0443\u0440\u044C</span>\n            <span class=\"c-badge u-bg-brand-dark\">&nbsp;</span><span class=\"c-text--quiet\">-\u0410\u0441\u0444\u0430\u043B\u044C\u0442</span>\n            <span class=\"c-badge   u-bg-green-dark\">&nbsp;</span><span class=\"c-text--quiet\">-\u0428\u0438\u043D\u0433\u044D\u043D \u0446\u0430\u0446\u043B\u0430\u0433\u0430</span>-->\n          </span>\n        </div>\n      </div>\n      <div class=\"o-grid o-grid--wrap o-grid--no-gutter\" id=\"maps\">\n        <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high\"><div #map id=\"map_canvas\"></div></div>\n        <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@medium u-high u-bg-white\">\n          <svg #chart id=\"chart\" width=\"100%\" height=\"100%\"></svg>\n        </div>\n      </div>\n      <div class=\"c-card__item\" style=\"position: relative;\">\n        <div class=\"c-overlay\" [class.invisible]=\"selectedSubJob\">\n          <span class=\"c-text--loud u-color-white u-center-block__content u-center-block__content--vertical\">\n            &nbsp;&nbsp;\u0410\u0436\u043B\u044B\u043D \u0445\u044D\u0441\u0433\u044D\u044D \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443.</span>\n        </div>\n        <div class=\"u-centered\">\n          <span class=\"c-badge c-badge--rounded c-badge--warning c-badge--ghost clickable\">\n            <i class=\"fa fa-question\" aria-hidden=\"true\"></i>\n          </span>\n          <div class=\"inline-div\" *ngIf=\"!selectedSubJob\">\n            <span class=\"c-badge c-badge--rounded u-bg-purple-dark\">&nbsp;&nbsp;\u041D\u0438\u0439\u0442&nbsp;&nbsp;</span>\n            <span class=\"c-badge c-badge--rounded u-bg-brown-lighter\">\u0428\u043E\u0440\u043E\u043E\u043D \u0434\u0430\u043B\u0430\u043D</span>\n            <span class=\"c-badge c-badge--rounded u-bg-brown\">\u0414\u044D\u0434 \u0441\u0443\u0443\u0440\u044C</span>\n            <span class=\"c-badge c-badge--rounded u-bg-brown-darker\">\u0414\u0430\u043B\u0430\u043D\u0433\u0438\u0439\u043D \u0434\u044D\u044D\u0434</span>\n            <span class=\"c-badge c-badge--rounded u-bg-brand-light\">\u0421\u0443\u0443\u0440\u044C</span>\n            <span class=\"c-badge c-badge--rounded u-bg-brand-dark\">\u0410\u0441\u0444\u0430\u043B\u044C\u0442</span>\n            <span class=\"c-badge c-badge--rounded u-bg-green-dark\">\u0428\u0438\u043D\u0433\u044D\u043D \u0446\u0430\u0446\u043B\u0430\u0433\u0430</span>\n          </div>\n          <div class=\"inline-div\" *ngIf=\"selectedSubJob\">\n            <span \n              (click)=\"resetSelectedConditions()\"\n              [class.c-badge--ghost]=\"!displayAllConditions\"\n              [class.u-bg-purple-dark]=\"displayAllConditions\"\n              class=\"c-badge c-badge--rounded clickable\">&nbsp;&nbsp;\u041D\u0438\u0439\u0442&nbsp;&nbsp;</span>\n            <span \n              *ngFor=\"let cond of selectedSubJob.planned_conditions\"\n              style=\"margin-right:5px;\"\n              (click)=\"selectDisplayCondition(cond)\"\n              [ngClass]=\"getCondBadge(cond)\">{{cond.name}}</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"c-card__item c-card__item--divider u-bg-green-dark\">\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439</div>\n      <div class=\"c-card__item o-grid o-grid--wrap\" style=\"position:relative;\">\n        <div class=\"c-overlay\" [class.invisible]=\"selectedPhoto && selectedPhoto.image\">\n          <div class=\"u-center-block__content\">\n              <h2 class=\"c-heading u-color-white\">\u0422\u0430 \u0434\u044D\u044D\u0440\u0445 \u0433\u0430\u0437\u0440\u044B\u043D \u0437\u0443\u0440\u0430\u0433\u043D\u0430\u0430\u0441 \u0437\u0443\u0440\u0430\u0433\u0430\u0430 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443.</h2>\n          </div>\n        </div>\n        <div class=\"o-grid__cell o-grid__cell--width-100\" *ngIf=\"selectedPhoto\">\n          <label>{{selectedPhoto.date | date}}</label>\n        </div>\n        <div class=\"o-grid__cell o-grid__cell--width-100\" *ngIf=\"!selectedPhoto\">\n          <label>{{selectedPhoto?.date | date}}</label>\n        </div>\n        <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@large u-letter-box--medium\" *ngIf=\"selectedPhoto && selectedPhoto.image\">\n          <img class=\"u-higher o-image\" src=\"uploads/{{selectedPhoto.image}}\" style=\"width: 100%; min-height:300px;\">\n        </div>\n        <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@large u-letter-box--medium\" *ngIf=\"!selectedPhoto || !selectedPhoto.image\">\n          <img class=\"u-higher o-image\" src=\"uploads/1_2_20170124.jpg\" style=\"width: 100%; min-height:300px;\">\n        </div>\n        <div class=\"o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@large\">\n          <form>\n            <label class=\"c-label o-form-element\">\n              \u0411\u0430\u0439\u0440\u043B\u0430\u043B\n              <div class=\"c-input-group\">\n                <button class=\"c-button c-button--ghost-brand\" type=\"button\"><i class=\"fa fa-fw fa-map-marker c-icon\"></i></button>\n                <div class=\"o-field\">\n                  <input class=\"c-field\" type=\"text\" placeholder=\"\u0411\u0430\u0439\u0440\u043B\u0430\u043B\" [value]=\"selectedPhoto?.position\" #location>\n                </div>\n              </div>\n            </label>\n            <label class=\"c-label o-form-element\">\n              \u0422\u04E9\u0440\u04E9\u043B\n              <div class=\"c-input-group\">\n                <div class=\"o-field\">\n                  <select class=\"c-field\" type=\"text\" placeholder=\"\u0411\u0430\u0439\u0440\u043B\u0430\u043B\" [value]=\"selectedPhoto?.type\" #type>\n                    <option value=\"\">\u0417\u0443\u0440\u0430\u0433\u043D\u044B \u0442\u04E9\u0440\u043B\u04E9\u04E9 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443</option>\n                    <option value=\"1\">\u0428\u043E\u0440\u043E\u043E\u043D \u0434\u0430\u043B\u0430\u043D</option>\n                    <option value=\"2\">\u0414\u044D\u0434 \u0441\u0443\u0443\u0440\u044C</option>\n                    <option value=\"3\">\u0414\u0430\u043B\u0430\u043D\u0433\u0438\u0439\u043D \u0434\u044D\u044D\u0434</option>\n                    <option value=\"4\">\u0421\u0443\u0443\u0440\u044C</option>\n                    <option value=\"5\">\u0410\u0441\u0444\u0430\u043B\u044C\u0442</option>\n                    <option value=\"6\">\u0428\u0438\u043D\u0433\u044D\u043D \u0446\u0430\u0446\u043B\u0430\u0433\u0430</option>\n                  </select>\n                </div>\n              </div>\n            </label>\n            <label class=\"c-label o-form-element\">\n              \u0422\u0430\u0439\u043B\u0431\u0430\u0440\n              <div class=\"c-input-group\">\n                <div class=\"o-field\">\n                  <textarea class=\"c-field\" type=\"text\" [value]=\"selectedPhoto?.desc\" placeholder=\"\u0422\u0430\u0439\u043B\u0431\u0430\u0440\" #desc></textarea>\n                </div>\n              </div>\n            </label>            \n          </form>\n          <span class=\"c-input-group\" *ngIf=\"permission <= 2\">\n              <button class=\"c-button c-button--success\" *ngIf=\"permission == 1\" (click)=\"editPath()\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n              <button class=\"c-button c-button--error\" *ngIf=\"permission == 1\" (click)=\"deletePath(selectedPhoto.id)\">\u0423\u0441\u0442\u0433\u0430\u0445</button>\n              <button class=\"c-button\" (click)=\"reset()\">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>\n            </span>\n        </div>\n      </div>\n    </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map