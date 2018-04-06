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
var ContractorComponent = /** @class */ (function () {
    function ContractorComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.selectedCompany = [];
        me = this;
        if (window.location.hash.substring(0, 17) == '#/contractor/edit') {
            me.initData();
        }
        else {
            me.selectedCompany = null;
        }
    }
    ContractorComponent.prototype.initData = function () {
        me.jobService.getCompanyId(window.location.hash.substring(18)).subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.selectedCompany = res;
        });
    };
    ContractorComponent.prototype.editCompany = function () {
        me.jobService.editCompany(window.location.hash.substring(18), me.nameEl.nativeElement.value, me.registerEl.nativeElement.value, me.phoneEl.nativeElement.value, me.emailEl.nativeElement.value, me.addressEl.nativeElement.value, me.rankEl.nativeElement.value, me.readyEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
        });
    };
    ContractorComponent.prototype.addCompany = function () {
        me.jobService.addCompany(me.nameEl.nativeElement.value, me.registerEl.nativeElement.value, me.phoneEl.nativeElement.value, me.emailEl.nativeElement.value, me.addressEl.nativeElement.value, me.rankEl.nativeElement.value, me.readyEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
        });
    };
    ContractorComponent.prototype.reset = function () {
        me.nameEl.nativeElement.value = '';
        me.registerEl.nativeElement.value = '';
        me.phoneEl.nativeElement.value = '';
        me.emailEl.nativeElement.value = '';
        me.addressEl.nativeElement.value = '';
        me.rankEl.nativeElement.value = '';
        me.readyEl.nativeElement.value = '';
        me.resultEl.nativeElement.innerHTML = '';
    };
    __decorate([
        core_1.ViewChild('name'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "nameEl", void 0);
    __decorate([
        core_1.ViewChild('register'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "registerEl", void 0);
    __decorate([
        core_1.ViewChild('phone'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "phoneEl", void 0);
    __decorate([
        core_1.ViewChild('email'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "emailEl", void 0);
    __decorate([
        core_1.ViewChild('address'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "addressEl", void 0);
    __decorate([
        core_1.ViewChild('rank'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "rankEl", void 0);
    __decorate([
        core_1.ViewChild('ready'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "readyEl", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], ContractorComponent.prototype, "resultEl", void 0);
    ContractorComponent = __decorate([
        core_1.Component({
            selector: 'contractor-component',
            template: "\n    <h1>\u0413\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0433\u0447 \u043A\u043E\u043C\u043F\u0430\u043D\u0438 \u043D\u044D\u043C\u044D\u0445</h1>\n    <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n    border: 1px solid transparent;\n    border-radius: 4px;\">\t  \n\t</div>\n    <form method=\"post\">\n\t    <label class=\"c-label o-form-element\">\n\t      \u041A\u043E\u043C\u043F\u0430\u043D\u044B \u043D\u044D\u0440\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u041D\u044D\u0440\" [value]=\"selectedCompany?.name\" id=\"name\" name=\"name\" #name>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0439\u043D \u0434\u0443\u0433\u0430\u0430\u0440\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t        \t<input class=\"c-field\" type=\"text\" placeholder=\"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\" [value]=\"selectedCompany?.register\" id=\"register\" name=\"register\" #register>\t          \n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u0423\u0442\u0430\u0441\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0423\u0442\u0430\u0441\" [value]=\"selectedCompany?.phone\" id=\"phone\" name=\"phone\" #phone>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u0418\u043C\u044D\u0439\u043B\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0418\u043C\u044D\u0439\u043B\" [value]=\"selectedCompany?.email\" id=\"email\" name=\"email\" #email>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u0425\u0430\u044F\u0433\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0425\u0430\u044F\u0433\" [value]=\"selectedCompany?.address\" id=\"address\" name=\"address\" #address>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n          \u04AE\u0437\u04AF\u04AF\u043B\u044D\u043B\u0442\n          <div class=\"c-input-group\">\n            <div class=\"o-field\">\n              <select class=\"c-field\" type=\"text\" placeholder=\"\u04AE\u0437\u04AF\u04AF\u043B\u044D\u043B\u0442\" [value]=\"selectedCompany?.rank\" id=\"rank\" name=\"rank\" #rank>\n                <option value=\"\">\u04AE\u0437\u04AF\u04AF\u043B\u044D\u043B\u0442\u044D\u044D \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443</option>\n                <option value=\"\u041C\u0430\u0448 \u0441\u0430\u0439\u043D\">\u041C\u0430\u0448 \u0441\u0430\u0439\u043D</option>\n                <option value=\"\u0421\u0430\u0439\u043D\">\u0421\u0430\u0439\u043D</option>\n                <option value=\"\u0414\u0443\u043D\u0434\">\u0414\u0443\u043D\u0434</option>\n                <option value=\"\u041C\u0443\u0443\">\u041C\u0443\u0443</option>\n              </select>\n            </div>\n          </div>\n        </label>\n        <label class=\"c-label o-form-element\">\n          \u0411\u044D\u043B\u044D\u043D \u0431\u0430\u0439\u0434\u0430\u043B\n          <div class=\"c-input-group\">\n            <div class=\"o-field\">\n              <select class=\"c-field\" type=\"text\" placeholder=\"\u0411\u044D\u043B\u044D\u043D \u0431\u0430\u0439\u0434\u0430\u043B\" [value]=\"selectedCompany?.ready_type\" id=\"ready\" name=\"ready\" #ready>\n                <option value=\"\">\u0411\u044D\u043B\u044D\u043D \u0431\u0430\u0439\u0434\u043B\u0430\u0430 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443</option>\n                <option value=\"\u0411\u044D\u043B\u044D\u043D\">\u0411\u044D\u043B\u044D\u043D</option>\n                <option value=\"\u0411\u044D\u043B\u044D\u043D \u0431\u0443\u0441\">\u0411\u044D\u043B\u044D\u043D \u0431\u0443\u0441</option>\n                <option value=\"\u0423\u0434\u0430\u0445\u0433\u04AF\u0439\">\u0423\u0434\u0430\u0445\u0433\u04AF\u0439</option>\n              </select>\n            </div>\n          </div>\n        </label>\t    \n\t  </form>\n\t  <span class=\"c-input-group\" *ngIf=\"selectedCompany\">\n\t      <button class=\"c-button c-button--success\" (click)=\"editCompany()\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n\t    </span>\n\t    <span class=\"c-input-group\" *ngIf=\"!selectedCompany\">\n\t      <button class=\"c-button c-button--error\" (click)=\"addCompany()\">\u041D\u044D\u043C\u044D\u0445</button>\n\t      <button class=\"c-button\" (click)=\"reset()\">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>\n\t    </span>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], ContractorComponent);
    return ContractorComponent;
}());
exports.ContractorComponent = ContractorComponent;
//# sourceMappingURL=contractor.component.js.map