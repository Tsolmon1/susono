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
var ContractorListComponent = /** @class */ (function () {
    function ContractorListComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.mainCompanys = [];
        this.permission = 0;
        me = this;
        me.initData();
    }
    ContractorListComponent.prototype.initData = function () {
        me.jobService.getCompanys().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainCompanys = res;
        });
        me.jobService.getPermission().subscribe(function (res) {
            me.permission = res.permission;
            if (me.permission > 2) {
                document.getElementById('contractPer').style.display = "none";
                me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд гүйцэтгэгч харах эрх байхгүй байна.';
            }
        });
    };
    ContractorListComponent.prototype.deleteCompany = function (id) {
        if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
            me.jobService.deleteCompany(id).subscribe(function (res) {
                me.initData();
            });
        }
    };
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorListComponent.prototype, "resultEl", void 0);
    ContractorListComponent = __decorate([
        core_1.Component({
            selector: 'contractor-list-component',
            template: "\n    <div class=\"c-card\">\n      <div class=\"c-card__item c-card__item--divider u-bg-green\">\u0410\u0436\u0438\u043B \u0433\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0433\u0447\u0438\u0434</div>\n      <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n        border: 1px solid transparent;\n        border-radius: 4px;\">   \n      </div>\n      <div class=\"c-card__item\" id=\"contractPer\">\n        <table class=\"c-table\">\n          <thead class=\"c-table__head\">\n            <tr class=\"c-table__row c-table__row--heading\">\n              <th class=\"c-table__cell\">ID</th>\n              <th class=\"c-table__cell\">\u041A\u043E\u043C\u043F\u0430\u043D\u044B \u041D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u0423\u043B\u0441\u044B\u043D \u0431\u04AF\u0440\u0442\u0433\u044D\u043B\u0438\u0439\u043D \u0434\u0443\u0433\u0430\u0430\u0440</th>\n              <th class=\"c-table__cell\">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D</th>\n              <th class=\"c-table__cell\">\u0411\u044D\u043B\u044D\u043D \u0431\u0430\u0439\u0434\u0430\u043B</th>\n              <th class=\"c-table__cell\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445, \u0423\u0441\u0442\u0433\u0430\u0445</th>\n            </tr>\n          </thead>\n          <tbody class=\"c-table__body\">\n            <tr class=\"c-table__row\"\n            *ngFor=\"let eq of mainCompanys; let i = index\" [attr.data-index]=\"i\" >\n              <td class=\"c-table__cell\">{{i+1}}</td>\n              <td class=\"c-table__cell\">{{eq.name}}</td>\n              <td class=\"c-table__cell\">{{eq.register}}</td>\n              <td class=\"c-table__cell\">{{eq.rank}}</td>\n              <td class=\"c-table__cell\">{{eq.ready_type}}</td>\n              <td class=\"c-table__cell\"><span class=\"c-input-group\">\n              <button class=\"c-button c-button--success\" routerLink=\"/contractor/edit/{{eq.id}}\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n              <button class=\"c-button c-button--error\" (click)=\"deleteCompany(eq?.id)\">\u0423\u0441\u0442\u0433\u0430\u0445</button>\n            </span></td>\n            </tr>\n            <!--<tr class=\"c-table__row\">\n              <td class=\"c-table__cell\">1</td>\n              <td class=\"c-table__cell\">\u0411\u0430\u043B\u0443\u0443 \u0425\u0425\u041A</td>\n              <td class=\"c-table__cell\">\u0423\u041F95052932</td>\n              <td class=\"c-table__cell\">\u041C\u0430\u0448 \u0441\u0430\u0439\u043D</td>\n              <td class=\"c-table__cell\">\u0410\u0436\u0438\u043B \u0433\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0436 \u0431\u0430\u0439\u043D\u0430</td>\n              <td class=\"c-table__cell\"></td>\n            </tr>-->\n          </tbody>\n        </table>\n        <button class=\"c-button c-button--success\" routerLink=\"/contractor\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\u0428\u0438\u043D\u044D \u0430\u0436\u0438\u043B \u0433\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0433\u0447 \u043D\u044D\u043C\u044D\u0445</button>\n      </div>\n    </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], ContractorListComponent);
    return ContractorListComponent;
}());
exports.ContractorListComponent = ContractorListComponent;
//# sourceMappingURL=contractor.list.component.js.map