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
var me;
var UserjobsComponent = /** @class */ (function () {
    function UserjobsComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.selectedUser = [];
        this.permissions = [];
        this.mains = [];
        this.mainUsers = [];
        this.companys = [];
        me = this;
        if (window.location.hash.substring(0, 14) == '#/userjob/edit') {
            me.initData();
        }
        else {
            me.selectedUser = null;
        }
        me.getPermission();
        me.initCompanys();
        me.selectMains();
        me.initUsers();
    }
    UserjobsComponent.prototype.initData = function () {
        me.jobService.getUserJob(window.location.hash.substring(15)).subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.selectedUser = res;
        });
    };
    UserjobsComponent.prototype.initUsers = function () {
        me.jobService.getUsers().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainUsers = res;
        });
    };
    UserjobsComponent.prototype.initCompanys = function () {
        me.jobService.getCompanys().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.companys = res;
        });
    };
    UserjobsComponent.prototype.selectMains = function () {
        me.jobService.getMain().subscribe(function (res) {
            me.mains = res;
        });
    };
    UserjobsComponent.prototype.getPermission = function () {
        me.jobService.getPermissions().subscribe(function (res) {
            me.permissions = res;
        });
    };
    UserjobsComponent.prototype.editUserJob = function () {
        me.jobService.editUserJob(me.nameEl.nativeElement.value, me.cnameEl.nativeElement.value, me.jnameEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
        });
    };
    UserjobsComponent.prototype.setUserJob = function () {
        me.jobService.setUserJob(me.nameEl.nativeElement.value, me.cnameEl.nativeElement.value, me.jnameEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
        });
    };
    UserjobsComponent.prototype.reset = function () {
        me.nameEl.nativeElement.value = '';
        me.resultEl.nativeElement.innerHTML = '';
    };
    __decorate([
        core_1.ViewChild('username'),
        __metadata("design:type", core_1.ElementRef)
    ], UserjobsComponent.prototype, "nameEl", void 0);
    __decorate([
        core_1.ViewChild('cname'),
        __metadata("design:type", core_1.ElementRef)
    ], UserjobsComponent.prototype, "cnameEl", void 0);
    __decorate([
        core_1.ViewChild('jobname'),
        __metadata("design:type", core_1.ElementRef)
    ], UserjobsComponent.prototype, "jnameEl", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], UserjobsComponent.prototype, "resultEl", void 0);
    UserjobsComponent = __decorate([
        core_1.Component({
            selector: 'userjobs-component',
            template: "\n    <h1>\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0434 \u0430\u0436\u0438\u043B \u043D\u044D\u043C\u044D\u0445</h1>\n    <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n    border: 1px solid transparent;\n    border-radius: 4px;\">   \n  </div>\n    <form method=\"post\">\n      <label class=\"c-label o-form-element\">\n        \u041D\u044D\u0440\n        <div class=\"c-input-group\">         \n          <div class=\"o-field\">\n            <select class=\"c-field\" type=\"text\" placeholder=\"\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u043D\u044D\u0440\" [value]=\"selectedUser?.user_id\" id=\"username\" name=\"username\" #username>\n                <option \n                *ngFor=\"let user of mainUsers\" value=\"{{user.id}}\">{{user.username}}</option>\n              </select>\n          </div>\n        </div>\n      </label>\n      <label class=\"c-label o-form-element\">\n          \u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043D\u044D\u0440\n          <div class=\"c-input-group\">\n            <div class=\"o-field\">\n              <select class=\"c-field\" type=\"text\" placeholder=\"\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043D\u044D\u0440\" [value]=\"selectedUser?.company_id\" id=\"cname\" name=\"cname\" #cname>\n                <option \n                *ngFor=\"let com of companys\" value=\"{{com.id}}\">{{com.name}}</option>\n              </select>\n            </div>\n          </div>\n        </label> \n      <label class=\"c-label o-form-element\">\n          \u0410\u0436\u043B\u044B\u043D \u043D\u044D\u0440\n          <div class=\"c-input-group\">\n            <div class=\"o-field\">\n              <select class=\"c-field\" type=\"text\" placeholder=\"\u0410\u0436\u043B\u044B\u043D \u043D\u044D\u0440\" [value]=\"selectedUser?.job_id\" id=\"jobname\" name=\"jobname\" #jobname>\n                <option \n                *ngFor=\"let job of mains\" value=\"{{job.id}}\">{{job.name}}</option>\n              </select>\n            </div>\n          </div>\n        </label> \n    </form>\n    <span class=\"c-input-group\" *ngIf=\"selectedUser\">\n        <button class=\"c-button c-button--success\" (click)=\"editUserJob()\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n      </span>\n      <span class=\"c-input-group\" *ngIf=\"!selectedUser\">\n        <button class=\"c-button c-button--error\" (click)=\"setUserJob()\">\u041D\u044D\u043C\u044D\u0445</button>\n        <button class=\"c-button\" (click)=\"reset()\">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>\n      </span>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], UserjobsComponent);
    return UserjobsComponent;
}());
exports.UserjobsComponent = UserjobsComponent;
//# sourceMappingURL=userjobs.component.js.map