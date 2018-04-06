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
var UsersComponent = /** @class */ (function () {
    function UsersComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        //(click)="setJob(eq?.id, eq?.company_id)"
        this.mainUsers = [];
        this.mains = [];
        this.permission = 0;
        me = this;
        me.initData();
        me.selectMains();
    }
    UsersComponent.prototype.initData = function () {
        me.jobService.getUsers().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainUsers = res;
        });
        me.jobService.getPermission().subscribe(function (res) {
            me.permission = res.permission;
            if (me.permission > 2) {
                document.getElementById('usersPer').style.display = "none";
                me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд хэрэглэгч нэмэх эрх байхгүй байна.';
            }
        });
    };
    UsersComponent.prototype.selectMains = function () {
        me.jobService.getMain().subscribe(function (res) {
            me.mains = res;
        });
    };
    UsersComponent.prototype.setJob = function (id, cid) {
        me.jobId = id;
        me.companyId = cid;
        document.getElementById('abc').style.display = "block";
    };
    UsersComponent.prototype.div_hide = function () {
        document.getElementById('abc').style.display = "none";
    };
    UsersComponent.prototype.setUserJob = function (id, cid) {
        me.jobService.setUserJob(id, me.jobEl.nativeElement.value, cid).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
            document.getElementById('abc').style.display = "none";
            me.initData();
        });
    };
    UsersComponent.prototype.deleteUser = function (id) {
        if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
            me.jobService.deleteUser(id).subscribe(function (res) {
                me.initData();
            });
        }
    };
    __decorate([
        core_1.ViewChild('job'),
        __metadata("design:type", core_1.ElementRef)
    ], UsersComponent.prototype, "jobEl", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], UsersComponent.prototype, "resultEl", void 0);
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'users-component',
            template: "\n    <div class=\"c-card\">\n      <div class=\"c-card__item c-card__item--divider u-bg-green\">\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0434</div>\n      <div id=\"abc\" style=\"width:100%;height:100%;opacity:.95;top:0;left:0;display:none;position:fixed;background-color:#313131;overflow:auto\">\n        <!-- Popup Div Starts Here -->\n        <div id=\"popupContact\" style=\"position:absolute;left:50%;top:17%;margin-left:-202px;font-family:'Raleway',sans-serif\">\n        <!-- Contact Us Form -->\n        <img id=\"close\" src=\"assets/images/3.png\" (click)=\"div_hide()\" style=\"position:absolute;right:-14px;top:-14px;cursor:pointer\">\n        <h2 style=\"background-color:#FEFFED;padding:20px 35px;margin:-10px -50px;text-align:center;border-radius:10px 10px 0 0\">\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0434 \u0430\u0436\u0438\u043B \u043E\u043B\u0433\u043E\u0445</h2>\n        <hr style=\"margin:10px -50px;border:0;border-top:1px solid #ccc\">\n        <form style=\"max-width:350px;min-width:300px;padding:10px 50px;border:2px solid gray;border-radius:10px;font-family:raleway;background-color:#fff\">\n        <input id=\"id\" name=\"id\" placeholder=\"ID\" type=\"hidden\" (value)=\"jobId\" style=\"width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway\">\n        <select class=\"c-field\" id=\"job\" #job style=\"width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway\">          \n        <option \n        *ngFor=\"let jobs of mains; let i = index\" [attr.data-index]=\"i\" value=\"{{jobs.id}}\">{{jobs.name}}</option>\n        </select>\n        <button class=\"c-button c-button--success\" (click)=\"setUserJob(jobId,companyId)\" align=\"center\">\u041E\u0440\u0443\u0443\u043B\u0430\u0445</button>\n        </form>        \n        </div>\n        <!-- Popup Div Ends Here -->\n      </div>\n      <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n        border: 1px solid transparent;\n        border-radius: 4px;\">   \n      </div>\n      <div class=\"c-card__item\" id=\"usersPer\">\n        <table class=\"c-table\">\n          <thead class=\"c-table__head\">\n            <tr class=\"c-table__row c-table__row--heading\">\n              <th class=\"c-table__cell\">ID</th>\n              <th class=\"c-table__cell\">\u041D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u041D\u0443\u0443\u0446 \u04AF\u0433</th>\n              <th class=\"c-table__cell\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u0418\u043C\u044D\u0439\u043B</th>\n              <th class=\"c-table__cell\">\u0423\u0442\u0430\u0441</th>\n              <th class=\"c-table__cell\">\u0425\u0430\u043D\u0434\u0430\u0445 \u044D\u0440\u0445</th>\n              <th class=\"c-table__cell\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445, \u0423\u0441\u0442\u0433\u0430\u0445</th>\n            </tr>\n          </thead>\n          <tbody class=\"c-table__body\">\n            <tr class=\"c-table__row\"\n            *ngFor=\"let eq of mainUsers; let i = index\" [attr.data-index]=\"i\" >\n              <td class=\"c-table__cell\">{{i+1}}</td>\n              <td class=\"c-table__cell\">{{eq.username}}</td>\n              <td class=\"c-table__cell\">{{eq.password}}</td>\n              <td class=\"c-table__cell\">{{eq.cname}}</td>\n              <td class=\"c-table__cell\">{{eq.email}}</td>\n              <td class=\"c-table__cell\">{{eq.phone}}</td>\n              <td class=\"c-table__cell\">{{eq.name}}</td>\n              <td class=\"c-table__cell\"><span class=\"c-input-group\">\n              <button class=\"c-button c-button--success\" routerLink=\"/user/edit/{{eq.id}}\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n              <button class=\"c-button c-button--error\" (click)=\"deleteUser(eq?.id)\">\u0423\u0441\u0442\u0433\u0430\u0445</button>\n              <button class=\"c-button c-button--success\" routerLink=\"/userjobs/{{eq.id}}/{{eq.company_id}}\">\u0410\u0436\u0438\u043B \u043E\u043B\u0433\u043E\u0445</button>\n            </span></td>\n            </tr>\n          </tbody>\n        </table>\n        <button class=\"c-button c-button--success\" routerLink=\"/user\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\u0428\u0438\u043D\u044D \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447 \u043D\u044D\u043C\u044D\u0445</button>\n      </div>\n    </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map