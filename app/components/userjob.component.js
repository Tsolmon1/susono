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
var UserjobComponent = /** @class */ (function () {
    function UserjobComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.mainUsers = [];
        me = this;
        me.initData();
    }
    UserjobComponent.prototype.initData = function () {
        me.jobService.getUserJobs().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainUsers = res;
        });
    };
    UserjobComponent.prototype.deleteUserJob = function (id) {
        if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
            me.jobService.deleteUserJob(id).subscribe(function (res) {
                me.initData();
            });
        }
    };
    UserjobComponent = __decorate([
        core_1.Component({
            selector: 'userjob-component',
            template: "\n    <div class=\"c-card\">\n      <div class=\"c-card__item c-card__item--divider u-bg-green\">\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0434\u0438\u0439\u043D \u0430\u0436\u0438\u043B</div>      \n      <div class=\"c-card__item\">\n        <table class=\"c-table\">\n          <thead class=\"c-table__head\">\n            <tr class=\"c-table__row c-table__row--heading\">\n              <th class=\"c-table__cell\">ID</th>\n              <th class=\"c-table__cell\">\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u043D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u0410\u0436\u043B\u044B\u043D \u043D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445, \u0423\u0441\u0442\u0433\u0430\u0445</th>\n            </tr>\n          </thead>\n          <tbody class=\"c-table__body\">\n            <tr class=\"c-table__row\"\n            *ngFor=\"let eq of mainUsers; let i = index\" [attr.data-index]=\"i\" >\n              <td class=\"c-table__cell\">{{i+1}}</td>\n              <td class=\"c-table__cell\">{{eq.username}}</td>\n              <td class=\"c-table__cell\">{{eq.company_name}}</td>\n              <td class=\"c-table__cell\">{{eq.job_name}}</td>\n              <td class=\"c-table__cell\"><span class=\"c-input-group\">\n              <button class=\"c-button c-button--success\" routerLink=\"/userjob/edit/{{eq.id}}\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n              <button class=\"c-button c-button--error\" (click)=\"deleteUserJob(eq?.id)\">\u0423\u0441\u0442\u0433\u0430\u0445</button>\n            </span></td>\n            </tr>\n          </tbody>\n        </table>\n        <button class=\"c-button c-button--success\" routerLink=\"/userjob\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\u0428\u0438\u043D\u044D \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0434 \u0430\u0436\u0438\u043B \u043D\u044D\u043C\u044D\u0445</button>\n      </div>\n    </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], UserjobComponent);
    return UserjobComponent;
}());
exports.UserjobComponent = UserjobComponent;
//# sourceMappingURL=userjob.component.js.map