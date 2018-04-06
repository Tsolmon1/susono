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
var ReportComponent = /** @class */ (function () {
    function ReportComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.mainReport = [];
        this.permission = 0;
        me = this;
        me.initData();
    }
    ReportComponent.prototype.initData = function () {
        me.jobService.getReport().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.mainReport = res;
        });
        me.jobService.getPermission().subscribe(function (res) {
            me.permission = res.permission;
            if (me.permission > 2) {
                document.getElementById('reportPer').style.display = "none";
                me.resultEl.nativeElement.innerHTML = '<strong>Permission Fail!</strong> Танд тайлан харах эрх байхгүй байна.';
            }
        });
    };
    ReportComponent.prototype.sendReport = function (id, cid) {
        me.jobId = id;
        me.companyId = cid;
        if (me.permission <= 2) {
            //me.companyId = 0;      
        }
        document.getElementById('xyz').style.display = "block";
        /*me.jobService.sendReport(me.nameEl.nativeElement.value
        ,me.companyEl.nativeElement.value,me.startEl.nativeElement.value,me.deadlineEl.nativeElement.value,me.locationEl.nativeElement.value
        ,me.groupsEl.nativeElement.value,me.selectMainJob,me.subjobEl.nativeElement.value,me.newmarkers,me.subjob1El.nativeElement.value).subscribe(res => {
        me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай заслаа.';
        });*/
        me.jobService.sendReport().subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
        });
    };
    ReportComponent.prototype.downRating = function (id) {
        me.jobId = id;
        document.getElementById('abc').style.display = "block";
    };
    ReportComponent.prototype.div_hide = function () {
        document.getElementById('abc').style.display = "none";
    };
    ReportComponent.prototype.div_hide1 = function () {
        document.getElementById('xyz').style.display = "none";
    };
    ReportComponent.prototype.setRating = function (id) {
        me.jobService.setRating(id, me.rateEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
            document.getElementById('abc').style.display = "none";
            me.initData();
        });
    };
    ReportComponent.prototype.setNotif = function (id, cid) {
        me.jobService.setNotif(id, me.notifEl.nativeElement.value, cid).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
            document.getElementById('abc').style.display = "none";
            me.initData();
        });
    };
    __decorate([
        core_1.ViewChild('rate'),
        __metadata("design:type", core_1.ElementRef)
    ], ReportComponent.prototype, "rateEl", void 0);
    __decorate([
        core_1.ViewChild('notif'),
        __metadata("design:type", core_1.ElementRef)
    ], ReportComponent.prototype, "notifEl", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], ReportComponent.prototype, "resultEl", void 0);
    ReportComponent = __decorate([
        core_1.Component({
            selector: 'report-component',
            template: "\n    <h1>\u0422\u0430\u0439\u043B\u0430\u043D\u0433\u0438\u0439\u043D \u0445\u044D\u0441\u044D\u0433</h1>\n    <div class=\"c-card\">\n      <div class=\"c-card__item c-card__item--divider u-bg-green\">\u0422\u0430\u0439\u043B\u0430\u043D \u043A\u043E\u043C\u043F\u0430\u043D\u0438, \u0430\u0436\u043B\u0430\u0430\u0440</div>\n      <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n        border: 1px solid transparent;\n        border-radius: 4px;\">   \n      </div>\n      <div id=\"abc\" style=\"width:100%;height:100%;opacity:.95;top:0;left:0;display:none;position:fixed;background-color:#313131;overflow:auto\">\n        <!-- Popup Div Starts Here -->\n        <div id=\"popupContact\" style=\"position:absolute;left:50%;top:17%;margin-left:-202px;font-family:'Raleway',sans-serif\">\n        <!-- Contact Us Form -->\n        <img id=\"close\" src=\"assets/images/3.png\" (click)=\"div_hide()\" style=\"position:absolute;right:-14px;top:-14px;cursor:pointer\">\n        <h2 style=\"background-color:#FEFFED;padding:20px 35px;margin:-10px -50px;text-align:center;border-radius:10px 10px 0 0\">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D\u043D\u0438\u0439 \u0445\u044D\u0441\u044D\u0433</h2>\n        <hr style=\"margin:10px -50px;border:0;border-top:1px solid #ccc\">\n        <form style=\"max-width:300px;min-width:250px;padding:10px 50px;border:2px solid gray;border-radius:10px;font-family:raleway;background-color:#fff\">\n        <input id=\"id\" name=\"id\" placeholder=\"ID\" type=\"hidden\" (value)=\"jobId\" style=\"width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway\">\n        <input id=\"rate\" name=\"rate\" placeholder=\"\u04AE\u043D\u044D\u043B\u0433\u044D\u044D\" type=\"number\" #rate style=\"width:82%;padding:10px;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway\">\n        <button class=\"c-button c-button--success\" (click)=\"setRating(jobId)\" align=\"center\">\u0418\u043B\u0433\u044D\u044D\u0445</button>\n        </form>        \n        </div>\n        <!-- Popup Div Ends Here -->\n      </div>\n      <div id=\"xyz\" style=\"width:100%;height:100%;opacity:.95;top:0;left:0;display:none;position:fixed;background-color:#313131;overflow:auto\">\n        <!-- Popup Div Starts Here -->\n        <div id=\"popupContact\" style=\"position:absolute;left:50%;top:17%;margin-left:-202px;font-family:'Raleway',sans-serif\">\n        <!-- Contact Us Form -->\n     \n        <form style=\"max-height:300px;min-height:250px;max-width:300px;min-width:250px;padding:10px 50px;border:2px solid gray;border-radius:10px;font-family:raleway;background-color:#fff\">\n        <img id=\"close\" src=\"assets/images/3.png\" (click)=\"div_hide1()\" style=\"position:absolute;right:-14px;top:-14px;cursor:pointer\">\n        <h2 style=\"background-color:#FEFFED;padding:20px 35px;margin:-10px -50px;text-align:center;border-radius:10px 10px 0 0\">\u0421\u0430\u043D\u0443\u0443\u043B\u0433\u044B\u043D \u0445\u044D\u0441\u044D\u0433</h2>\n        <hr style=\"margin:10px -50px;border:0;border-top:1px solid #ccc\">\n        <input id=\"id\" name=\"id\" placeholder=\"ID\" type=\"hidden\" (value)=\"jobId\" style=\"width:82%;margin-top:30px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway\"> \n        <input id=\"notif\" name=\"notif\" placeholder=\"\u0421\u0430\u043D\u0443\u0443\u043B\u0433\u0430\" type=\"text\"  #notif style=\"padding:10px;width:100%;margin-top:10px;border:1px solid #ccc;padding-left:40px;font-size:16px;font-family:raleway\"><br />\n        <button class=\"c-button c-button--success\"  style=\"width:80%;margin:10px; m\" (click)=\"setNotif(jobId,companyId)\" align=\"center\">\u0418\u043B\u0433\u044D\u044D\u0445</button>\n        </form>        \n        </div>\n        <!-- Popup Div Ends Here -->\n      </div>\n      <div class=\"c-card__item\" id=\"reportPer\">\n        <table class=\"c-table\">\n          <thead class=\"c-table__head\">\n            <tr class=\"c-table__row c-table__row--heading\">\n              <th class=\"c-table__cell\">ID</th>\n              <th class=\"c-table__cell\">\u041A\u043E\u043C\u043F\u0430\u043D\u044B \u041D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u0410\u0436\u043B\u044B\u043D \u043D\u044D\u0440</th>\n              <th class=\"c-table__cell\">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D</th>\n              <th class=\"c-table__cell\">\u042D\u0445\u043B\u044D\u0445 \u043E\u0433\u043D\u043E\u043E</th>\n              <th class=\"c-table__cell\">\u0414\u0443\u0443\u0441\u0430\u0445 \u043E\u0433\u043D\u043E\u043E</th>\n              <th class=\"c-table__cell\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445, \u0423\u0441\u0442\u0433\u0430\u0445</th>\n            </tr>\n          </thead>\n          <tbody class=\"c-table__body\">\n            <tr class=\"c-table__row\"\n            *ngFor=\"let eq of mainReport; let i = index\" [attr.data-index]=\"i\" >\n              <td class=\"c-table__cell\">{{i+1}}</td>\n              <td class=\"c-table__cell\">{{eq.contractorName}}</td>\n              <td class=\"c-table__cell\">{{eq.name}}</td>\n              <td class=\"c-table__cell\">{{eq.percent}}%</td>\n              <td class=\"c-table__cell\">{{eq.start | date}}</td>\n              <td class=\"c-table__cell\">{{eq.deadline | date}}</td>\n              <td class=\"c-table__cell\"><span class=\"c-input-group\">\n              <button class=\"c-button c-button--success\" (click)=\"sendReport(eq?.id,eq?.cid)\">\u0421\u0430\u043D\u0443\u0443\u043B\u0430\u0445</button><br/>\n              <button class=\"c-button c-button--error\" (click)=\"downRating(eq?.id)\">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D \u04E9\u0433\u04E9\u0445</button>\n            </span></td>\n            </tr>\n          </tbody>\n        </table>\n        <button class=\"c-button c-button--success\" routerLink=\"/excel\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\u0422\u0430\u0439\u043B\u0430\u043D Export</button>\n      </div>\n    </div>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map