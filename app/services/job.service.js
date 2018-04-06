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
require("rxjs/Rx");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var _ = require("lodash");
var pt = 1;
var JobService = /** @class */ (function () {
    function JobService(http) {
        this.http = http;
        this.urls = 'http://localhost';
    }
    JobService.prototype.getPlan = function (mainJobId) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', mainJobId.toString());
        /*return this.http.get(this.urls + '/zam/services/' + 'data/plan.json', {
            search: params
        }).map((res: Response) => res.json());*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_jobs', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getWorkProgress = function (mainJobId) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', mainJobId.toString());
        /*return this.http.get(this.urls + '/zam/services/' + 'data/job.json', {
            search: params
        }).map((res: Response) => res.json());*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_sub_jobs', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getPath = function (jobId, subJobId) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', jobId);
        params.set('subJobId', subJobId);
        /*return this.http.get(this.urls + '/zam/services/' + 'data/path.json', {
            search: params
        }).map((res: Response) => {
            let jobs = res.json();
            if (subJobId) {
                return _.find(jobs, function(o: any) { return o.id === subJobId; });
            }else {
                return jobs;
            }
        });*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_paths', {
            search: params
        }).map(function (res) {
            var jobs = res.json();
            if (subJobId) {
                return _.find(jobs, function (o) { return o.id === subJobId; });
            }
            else {
                return jobs;
            }
        });
    };
    JobService.prototype.getWorkProgressDetails = function (jobId, subJobId) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', jobId);
        params.set('subJobId', subJobId);
        var allOr = 'progress.json';
        allOr = 'get_progress';
        if (!subJobId) {
            allOr = 'all-progress.json';
            allOr = 'get_all_progress';
        }
        /*return this.http.get(this.urls + '/zam/services/data/' + allOr, {
            search: params
        }).map((res: Response) => {
            let progress = res.json();
            if (subJobId) {
                return _.find(progress.jobs, function(o: any) { return o.id === subJobId; });
            }else {
                return progress.jobs;
            }
        });*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/' + allOr, {
            search: params
        }).map(function (res) {
            var progress = res.json();
            if (subJobId) {
                return _.find(progress.jobs, function (o) { return o.id === subJobId; });
            }
            else {
                return progress.jobs;
            }
        });
    };
    JobService.prototype.getPhoto = function (photoId, jobId, tid) {
        var params = new http_1.URLSearchParams();
        params.set('photoId', photoId);
        params.set('jobId', jobId);
        var i = 0;
        /*return this.http.get(this.urls + '/zam/services/' + 'data/details.json', {
            search: params
        }).map((res: Response) => {
            if (pt === 1) {
                pt = 0;
            }else {
                pt = 1;
            }
            return res.json()[pt];
        });*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_images', {
            search: params
        }).map(function (res) {
            if (photoId) {
                var result = _.find(res.json(), function (o) { return o.id === photoId && o.type === tid; });
                if (result) {
                    return result;
                }
                else {
                    return {};
                }
            }
            else {
                return {};
            }
            /*if (pt === 1) {
                pt = 0;
            }else {
                pt = 1;
            }
            res.json().forEach(function(p: any){
                if(p.id == photoId) {
                    return res.json()[i];
                }
                i += 1;
            });
            if(res.json().length == i) {
                return {};
            }
            if(res.json().length >= tid) {
                return res.json()[tid-1];
            } else {
                return {};
            }*/
        });
    };
    JobService.prototype.getJobId = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_job_by_id', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.addJob = function (name, cid, sdate, edate, loc, group, jobId, sid, path, types) {
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('cid', cid);
        params.set('sdate', sdate);
        params.set('edate', edate);
        //params.set('sdate1', sdate1);   
        //params.set('edate1', edate1);   
        params.set('loc', loc);
        params.set('group', group);
        params.set('jobId', jobId);
        params.set('sid', sid);
        params.set('path', path);
        params.set('types', types);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.editJob = function (name, cid, sdate, edate, loc, group, jobId, sid, path, sid1, types) {
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('cid', cid);
        params.set('sdate', sdate);
        params.set('edate', edate);
        //params.set('sdate1', sdate1);   
        //params.set('edate1', edate1);   
        params.set('loc', loc);
        params.set('group', group);
        params.set('jobId', jobId);
        params.set('sid', sid);
        params.set('sid1', sid1);
        params.set('path', path);
        params.set('types', types);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.deleteJob = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getMain = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_main', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getTypes = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_types', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getPermission = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_permission', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getPermissions = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_permissions', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getEquipments = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_equipments', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getEquipmentId = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('equipmentId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_equipments_by_id', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.editEquipment = function (id, name, image, power, desc, cid) {
        var params = new http_1.URLSearchParams();
        params.set('equipmentId', id);
        params.set('name', name);
        params.set('image', image);
        params.set('power', power);
        params.set('desc', desc);
        params.set('companyId', cid);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_equipment', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.sendReport = function () {
        var params = new http_1.URLSearchParams();
        params.set('notif', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/send_report', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.addEquipment = function (name, image, power, desc, cid) {
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('image', image);
        params.set('power', power);
        params.set('desc', desc);
        params.set('companyId', cid);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_equipment', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.deleteEquipment = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('equipmentId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_equipment', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.addImage = function (formData) {
        var params = new http_1.URLSearchParams();
        return this.http.post(this.urls + '/zam/zam/index.php/zam/add_image', formData).map(function (res) { return res; });
    };
    JobService.prototype.getUserJobs = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_user_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getUserJob = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('id', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_user_job_id', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.setUserJob = function (id, job, cid) {
        var params = new http_1.URLSearchParams();
        params.set('userId', id);
        params.set('jobId', job);
        params.set('companyId', cid);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/set_user_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.editUserJob = function (id, job, cid) {
        var params = new http_1.URLSearchParams();
        params.set('userId', id);
        params.set('jobId', job);
        params.set('companyId', cid);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_user_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.deleteUserJob = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('id', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_user_job', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getUsers = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_users', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getUserId = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('userId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_user_by_id', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.addUser = function (name, password, email, phone, permission, cid) {
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('password', password);
        params.set('phone', phone);
        params.set('cid', cid);
        params.set('email', email);
        params.set('permission', permission);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_user', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.editUser = function (id, name, password, email, phone, permission, cid) {
        var params = new http_1.URLSearchParams();
        params.set('userId', id);
        params.set('name', name);
        params.set('password', password);
        params.set('phone', phone);
        params.set('cid', cid);
        params.set('email', email);
        params.set('permission', permission);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_user', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.deleteUser = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('userId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_user', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getCompanys = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_companys', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getCompanyId = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('companyId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_companys_by_id', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.editCompany = function (id, name, register, phone, email, address, rank, ready) {
        var params = new http_1.URLSearchParams();
        params.set('companyId', id);
        params.set('name', name);
        params.set('register', register);
        params.set('phone', phone);
        params.set('email', email);
        params.set('address', address);
        params.set('rank', rank);
        params.set('ready', ready);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_company', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.addCompany = function (name, register, phone, email, address, rank, ready) {
        var params = new http_1.URLSearchParams();
        params.set('name', name);
        params.set('register', register);
        params.set('phone', phone);
        params.set('email', email);
        params.set('address', address);
        params.set('rank', rank);
        params.set('ready', ready);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_company', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.deleteCompany = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('companyId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_company', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getEquipmentsCompany = function (companyId) {
        var params = new http_1.URLSearchParams();
        params.set('companyId', companyId);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_equipments_company', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.editPath = function (id, type, desc) {
        var params = new http_1.URLSearchParams();
        params.set('pathId', id);
        params.set('type', type);
        params.set('desc', desc);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_path', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.deletePath = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('pathId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_path', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.setRating = function (id, rate) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', id);
        params.set('rate', rate);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/set_rating', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.setNotif = function (id, notif, cid) {
        var params = new http_1.URLSearchParams();
        params.set('jobId', id);
        params.set('notif', notif);
        params.set('cid', cid);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/set_notif', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService.prototype.getReport = function () {
        var params = new http_1.URLSearchParams();
        params.set('companyId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_report', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    /* add id:any*/
    JobService.prototype.getNotifs = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('companyId', '1');
        params.set('jobId', id);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_notifs', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    JobService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map