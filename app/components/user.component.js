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
var UserComponent = /** @class */ (function () {
    function UserComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.selectedUser = [];
        this.permissions = [];
        this.companys = [];
        me = this;
        if (window.location.hash.substring(0, 11) == '#/user/edit') {
            me.initData();
        }
        else {
            me.selectedUser = null;
        }
        me.getPermission();
        me.initCompanys();
    }
    UserComponent.prototype.initData = function () {
        me.jobService.getUserId(window.location.hash.substring(12)).subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.selectedUser = res;
        });
    };
    UserComponent.prototype.initCompanys = function () {
        me.jobService.getCompanys().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.companys = res;
        });
    };
    UserComponent.prototype.getPermission = function () {
        me.jobService.getPermissions().subscribe(function (res) {
            me.permissions = res;
        });
    };
    UserComponent.prototype.editUser = function () {
        me.jobService.editUser(window.location.hash.substring(12), me.nameEl.nativeElement.value, me.passwordEl.nativeElement.value, me.phoneEl.nativeElement.value, me.emailEl.nativeElement.value, me.permissionEl.nativeElement.value, me.cnameEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
        });
    };
    UserComponent.prototype.addUser = function () {
        me.jobService.addUser(me.nameEl.nativeElement.value, me.passwordEl.nativeElement.value, me.phoneEl.nativeElement.value, me.emailEl.nativeElement.value, me.permissionEl.nativeElement.value, me.cnameEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
        });
    };
    UserComponent.prototype.reset = function () {
        me.nameEl.nativeElement.value = '';
        me.passwordEl.nativeElement.value = '';
        me.phoneEl.nativeElement.value = '';
        me.emailEl.nativeElement.value = '';
        me.permissionEl.nativeElement.value = '';
        me.resultEl.nativeElement.innerHTML = '';
    };
    __decorate([
        core_1.ViewChild('username'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "nameEl", void 0);
    __decorate([
        core_1.ViewChild('password'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "passwordEl", void 0);
    __decorate([
        core_1.ViewChild('phone'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "phoneEl", void 0);
    __decorate([
        core_1.ViewChild('cname'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "cnameEl", void 0);
    __decorate([
        core_1.ViewChild('email'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "emailEl", void 0);
    __decorate([
        core_1.ViewChild('permission'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "permissionEl", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], UserComponent.prototype, "resultEl", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user-component',
            template: "\n    <h1>\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447 \u043D\u044D\u043C\u044D\u0445</h1>\n    <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n    border: 1px solid transparent;\n    border-radius: 4px;\">\t  \n\t</div>\n    <form method=\"post\">\n\t    <label class=\"c-label o-form-element\">\n\t      \u041D\u044D\u0440\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u041D\u044D\u0440\" [value]=\"selectedUser?.username\" id=\"username\" name=\"username\" #username>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u041D\u0443\u0443\u0446 \u04AF\u0433\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t        \t<input class=\"c-field\" type=\"password\" placeholder=\"\u041D\u0443\u0443\u0446 \u04AF\u0433\" [value]=\"selectedUser?.password\" id=\"password\" name=\"password\" #password>\t          \n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n          \u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043D\u044D\u0440\n          <div class=\"c-input-group\">\n            <div class=\"o-field\">\n              <select class=\"c-field\" type=\"text\" placeholder=\"\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043D\u044D\u0440\" [value]=\"selectedUser?.company_id\" id=\"cname\" name=\"cname\" #cname>\n                <option \n                *ngFor=\"let com of companys\" value=\"{{com.id}}\">{{com.name}}</option>\n              </select>\n            </div>\n          </div>\n        </label> \n\t    <label class=\"c-label o-form-element\">\n\t      \u0418\u043C\u044D\u0439\u043B\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0418\u043C\u044D\u0439\u043B\" [value]=\"selectedUser?.email\" id=\"email\" name=\"email\" #email>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u0423\u0442\u0430\u0441\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0423\u0442\u0430\u0441\" [value]=\"selectedUser?.phone\" id=\"phone\" name=\"phone\" #phone>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n          \u0425\u0430\u043D\u0434\u0430\u0445 \u044D\u0440\u0445\n          <div class=\"c-input-group\">\n            <div class=\"o-field\">\n              <select class=\"c-field\" type=\"text\" placeholder=\"\u0425\u0430\u043D\u0434\u0430\u0445 \u044D\u0440\u0445\" [value]=\"selectedUser?.permission_id\" id=\"permission\" name=\"permission\" #permission>\n                <option \n                *ngFor=\"let per of permissions\" value=\"{{per.id}}\">{{per.name}}</option>\n              </select>\n            </div>\n          </div>\n        </label>    \n\t  </form>\n\t  <span class=\"c-input-group\" *ngIf=\"selectedUser\">\n\t      <button class=\"c-button c-button--success\" (click)=\"editUser()\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n\t    </span>\n\t    <span class=\"c-input-group\" *ngIf=\"!selectedUser\">\n\t      <button class=\"c-button c-button--error\" (click)=\"addUser()\">\u041D\u044D\u043C\u044D\u0445</button>\n\t      <button class=\"c-button\" (click)=\"reset()\">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>\n\t    </span>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map