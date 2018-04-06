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
var d3 = require('d3');
var EquipmentListComponent = /** @class */ (function () {
    function EquipmentListComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.mainEquipments = [];
        this.mains = [];
        this.permission = 0;
        me = this;
        me.initData();
    }
    EquipmentListComponent.prototype.initData = function () {
        me.jobService.getPermission().subscribe(function (res) {
            me.permission = res.permission;
            if (me.permission > 2) {
                document.getElementById('equipPer').style.display = "none";
                me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд төхөөрөмж харах эрх байхгүй байна.';
            }
        });
        me.jobService.getMain().subscribe(function (res) {
            me.mains = res;
        });
    };
    EquipmentListComponent.prototype.getEquipments = function () {
        me.jobService.getEquipments().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainEquipments = res;
        });
    };
    EquipmentListComponent.prototype.deleteEquipment = function (id) {
        if (confirm('Та устгахдаа итгэлтэй байна уу?')) {
            me.jobService.deleteEquipment(id).subscribe(function (res) {
                me.initData();
            });
        }
    };
    EquipmentListComponent.prototype.selectJobMain = function () {
        me.getEquipments();
    };
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentListComponent.prototype, "resultEl", void 0);
    EquipmentListComponent = __decorate([
        core_1.Component({
            selector: 'equipment-list-component',
            template: "\n    <div class=\"c-card\">\n      <div class=\"c-card__item c-card__item--divider u-bg-green\">\u0422\u04E9\u0445\u04E9\u04E9\u0440\u04E9\u043C\u0436\u043D\u0438\u0439 \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442</div>\n      <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n        border: 1px solid transparent;\n        border-radius: 4px;\">   \n      </div>\n      <div class=\"c-card__item c-card__item--divider c-card__item--success\">\u041D\u0438\u0439\u0442 \u0430\u0436\u0438\u043B: <select class=\"c-field\" id=\"jobs\" (change)=\"selectJobMain()\">\n\t<option \n  *ngFor=\"let job of mains; let i = index\" [attr.data-index]=\"i\" value=\"{{job.id}}\">{{job.name}}</option>\n\t</select></div><br/>\n      <div class=\"c-card__item\" id=\"equipPer\">\n        <table class=\"c-table\">\n          <thead class=\"c-table__head\">\n            <tr class=\"c-table__row c-table__row--heading\">\n              <th class=\"c-table__cell\">ID</th>\n              <th class=\"c-table__cell\">\u041D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u0417\u0443\u0440\u0430\u0433</th>\n              <th class=\"c-table__cell\">\u04AE\u0437\u04AF\u04AF\u043B\u044D\u043B\u0442</th>\n              <th class=\"c-table__cell\">\u0422\u0430\u0439\u043B\u0431\u0430\u0440</th>\n              <th class=\"c-table__cell\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445, \u0423\u0441\u0442\u0433\u0430\u0445</th>\n            </tr>\n          </thead>\n          <tbody class=\"c-table__body\">\n            <tr class=\"c-table__row\"\n            *ngFor=\"let eq of mainEquipments; let i = index\" [attr.data-index]=\"i\" >\n              <td class=\"c-table__cell\">{{i+1}}</td>\n              <td class=\"c-table__cell\">{{eq.name}}</td>\n              <td class=\"c-table__cell\"><img src=\"uploads/{{eq.image}}\" width=\"150px\" height=\"80px\"/></td>\n              <td class=\"c-table__cell\">{{eq.power}}</td>\n              <td class=\"c-table__cell\">{{eq.e_desc}}</td>\n              <td class=\"c-table__cell\"><span class=\"c-input-group\">\n              <button class=\"c-button c-button--success\" routerLink=\"/equipment/edit/{{eq.id}}\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n              <button class=\"c-button c-button--error\" (click)=\"deleteEquipment(eq?.id)\">\u0423\u0441\u0442\u0433\u0430\u0445</button>\n            </span></td>\n            </tr>\n            <!--<tr class=\"c-table__row\">\n              <td class=\"c-table__cell\">1</td>\n              <td class=\"c-table__cell\">\u0410\u0447\u0430\u0430\u043D\u044B \u043C\u0430\u0448\u0438\u043D</td>\n              <td class=\"c-table__cell\"><img src=\"http://localhost/zam/uploads/1_1_20170124.jpg\" width=\"150px\" height=\"80px\"/></td>\n              <td class=\"c-table__cell\">\u0421\u0430\u0439\u043D</td>\n              <td class=\"c-table__cell\">\u0417\u0430\u043C\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u0430\u0447\u0430\u0430\u043D\u044B \u043C\u0430\u0448\u0438\u043D</td>\n              <td class=\"c-table__cell\"></td>\n            </tr>\n            <tr class=\"c-table__row\">\n              <td class=\"c-table__cell\">1</td>\n              <td class=\"c-table__cell\">\u041C\u0430\u0448\u0438\u043D-2</td>\n              <td class=\"c-table__cell\"><img src=\"http://localhost/zam/uploads/1_1_20170124.jpg\" width=\"150px\" height=\"80px\"/></td>\n              <td class=\"c-table__cell\">\u0421\u0430\u0439\u043D</td>\n              <td class=\"c-table__cell\">\u0417\u0430\u043C \u0442\u044D\u0433\u0448\u043B\u044D\u0445 \u043C\u0430\u0448\u0438\u043D</td>\n              <td class=\"c-table__cell\"></td>\n            </tr>\n            <tr class=\"c-table__row\">\n              <td class=\"c-table__cell\">1</td>\n              <td class=\"c-table__cell\">\u041C\u0430\u0448\u0438\u043D-3</td>\n              <td class=\"c-table__cell\"><img src=\"http://localhost/zam/uploads/1_1_20170124.jpg\" width=\"150px\" height=\"80px\"/></td>\n              <td class=\"c-table__cell\">\u0421\u0430\u0439\u043D</td>\n              <td class=\"c-table__cell\">\u0417\u0430\u043C \u0442\u044D\u0433\u0448\u043B\u044D\u0445 \u043C\u0430\u0448\u0438\u043D</td>\n              <td class=\"c-table__cell\"></td>\n            </tr>-->\n          </tbody>\n        </table>\n        <button class=\"c-button c-button--success\" routerLink=\"/equipment\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\u0428\u0438\u043D\u044D \u0442\u04E9\u0445\u04E9\u04E9\u0440\u04E9\u043C\u0436 \u043D\u044D\u043C\u044D\u0445</button>\n      </div>\n    </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], EquipmentListComponent);
    return EquipmentListComponent;
}());
exports.EquipmentListComponent = EquipmentListComponent;
//# sourceMappingURL=equipment.list.component.js.map