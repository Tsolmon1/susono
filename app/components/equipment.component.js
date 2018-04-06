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
var EquipmentComponent = /** @class */ (function () {
    function EquipmentComponent(jobService, zone) {
        this.jobService = jobService;
        this.zone = zone;
        this.selectedEquipment = [];
        this.companys = [];
        me = this;
        me.initCompanys();
        if (window.location.hash.substring(0, 16) == '#/equipment/edit') {
            me.initData();
        }
        else {
            me.selectedEquipment = null;
        }
    }
    EquipmentComponent.prototype.initData = function () {
        me.jobService.getEquipmentId(window.location.hash.substring(17)).subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.selectedEquipment = res;
        });
    };
    EquipmentComponent.prototype.initCompanys = function () {
        me.jobService.getCompanys().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
            me.companys = res;
        });
    };
    EquipmentComponent.prototype.editEquipment = function () {
        if (me.imageEl.nativeElement.value != '') {
            var formData = new FormData();
            formData.append("image", me.imageEl.nativeElement.files[0]);
            me.jobService.addImage(formData).subscribe(function (res) {
            });
            me.jobService.editEquipment(window.location.hash.substring(17), me.nameEl.nativeElement.value, me.imageEl.nativeElement.files[0].name, me.powerEl.nativeElement.value, me.descEl.nativeElement.value, me.companyEl.nativeElement.value).subscribe(function (res) {
                me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
            });
        }
        else {
            me.jobService.editEquipment(window.location.hash.substring(17), me.nameEl.nativeElement.value, me.imageEl.nativeElement.value, me.powerEl.nativeElement.value, me.descEl.nativeElement.value, me.companyEl.nativeElement.value).subscribe(function (res) {
                me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай өөрчиллөө.';
            });
        }
    };
    EquipmentComponent.prototype.addEquipment = function () {
        var formData = new FormData();
        var now = new Date().getTime();
        formData.append('name', now + me.imageEl.nativeElement.files[0].name);
        formData.append("image", me.imageEl.nativeElement.files[0]);
        me.jobService.addImage(formData).subscribe(function (res) {
        });
        me.jobService.addEquipment(me.nameEl.nativeElement.value, now + me.imageEl.nativeElement.files[0].name, me.powerEl.nativeElement.value, me.descEl.nativeElement.value, me.companyEl.nativeElement.value).subscribe(function (res) {
            me.resultEl.nativeElement.innerHTML = '<strong>Success!</strong> Амжилттай орууллаа.';
        });
    };
    EquipmentComponent.prototype.reset = function () {
        me.nameEl.nativeElement.value = '';
        me.imageEl.nativeElement.value = '';
        me.powerEl.nativeElement.value = '';
        me.descEl.nativeElement.value = '';
        me.resultEl.nativeElement.innerHTML = '';
    };
    __decorate([
        core_1.ViewChild('name'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentComponent.prototype, "nameEl", void 0);
    __decorate([
        core_1.ViewChild('image'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentComponent.prototype, "imageEl", void 0);
    __decorate([
        core_1.ViewChild('power'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentComponent.prototype, "powerEl", void 0);
    __decorate([
        core_1.ViewChild('desc'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentComponent.prototype, "descEl", void 0);
    __decorate([
        core_1.ViewChild('company'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentComponent.prototype, "companyEl", void 0);
    __decorate([
        core_1.ViewChild('result'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentComponent.prototype, "resultEl", void 0);
    EquipmentComponent = __decorate([
        core_1.Component({
            selector: 'equipment-component',
            template: "\n    <h1>\u0422\u04E9\u0445\u04E9\u04E9\u0440\u04E9\u043C\u0436 \u043D\u044D\u043C\u044D\u0445</h1>\n    <div class=\"alert alert-success\" #result id=\"result\" style=\"color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;padding: 15px;margin-bottom: 20px;\n    border: 1px solid transparent;\n    border-radius: 4px;\">\t  \n\t</div>\n    <form method=\"post\" enctype=\"multipart/form-data\">\n\t    <label class=\"c-label o-form-element\">\n\t      \u0422\u04E9\u0445\u04E9\u04E9\u0440\u04E9\u043C\u0436\u0438\u0439\u043D \u043D\u044D\u0440\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u041D\u044D\u0440\" [value]=\"selectedEquipment?.name\" id=\"name\" #name>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u041A\u043E\u043C\u043F\u0430\u043D\u044B \u043D\u044D\u0440\n\t      <div class=\"c-input-group\">\t        \n\t        <div class=\"o-field\">\n\t          <select class=\"c-field\" id=\"company\" #company>\n\t\t\t\t<option \n\t\t\t  *ngFor=\"let com of companys\" value=\"{{com.id}}\">{{com.name}}</option>\n\t\t\t\t</select>\n\t        </div>\n\t      </div>\n\t    </label>\t    \n\t    <label class=\"c-label o-form-element\">\n\t      \u0417\u0443\u0440\u0430\u0433\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t        \t<input id=\"filePath\" name=\"filePath\" type=\"file\" accept=\"image/*\" #image/>\n\t        \t<img src=\"uploads/{{selectedEquipment.image}}\" width=\"150px\" height=\"80px\" *ngIf=\"selectedEquipment\"/>\n\t        \t<!--<input class=\"c-field\" type=\"text\" placeholder=\"\u0417\u0443\u0440\u0430\u0433\" [value]=\"selectedEquipment?.image\" id=\"image\" #image>-->\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u04AE\u0437\u04AF\u04AF\u043B\u044D\u043B\u0442\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u04AE\u0437\u04AF\u04AF\u043B\u044D\u043B\u0442\" [value]=\"selectedEquipment?.power\" id=\"power\" #power>\n\t        </div>\n\t      </div>\n\t    </label>\n\t    <label class=\"c-label o-form-element\">\n\t      \u0422\u0430\u0439\u043B\u0431\u0430\u0440\n\t      <div class=\"c-input-group\">\n\t        <div class=\"o-field\">\n\t          <input class=\"c-field\" type=\"text\" placeholder=\"\u0422\u0430\u0439\u043B\u0431\u0430\u0440\" [value]=\"selectedEquipment?.e_desc\" id=\"desc\" #desc>\n\t        </div>\n\t      </div>\n\t    </label>\t    \n\t  </form>\n\t  <span class=\"c-input-group\" *ngIf=\"selectedEquipment\">\n\t      <button class=\"c-button c-button--success\" (click)=\"editEquipment()\">\u0417\u0430\u0441\u0432\u0430\u0440\u043B\u0430\u0445</button>\n\t    </span>\n\t    <span class=\"c-input-group\" *ngIf=\"!selectedEquipment\">\n\t      <button class=\"c-button c-button--error\" (click)=\"addEquipment()\">\u041D\u044D\u043C\u044D\u0445</button>\n\t      <button class=\"c-button\" (click)=\"reset()\">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>\n\t    </span>\n  ",
            providers: [job_service_1.JobService]
        }),
        __metadata("design:paramtypes", [job_service_1.JobService, core_1.NgZone])
    ], EquipmentComponent);
    return EquipmentComponent;
}());
exports.EquipmentComponent = EquipmentComponent;
//# sourceMappingURL=equipment.component.js.map