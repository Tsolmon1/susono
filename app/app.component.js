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
var http_1 = require("@angular/http");
var me;
var AppComponent = /** @class */ (function () {
    function AppComponent(http, zone) {
        this.http = http;
        this.zone = zone;
        this.urls = 'http://localhost';
        me = this;
        me.initData();
    }
    AppComponent.prototype.initData = function () {
        me.getPermission().subscribe(function (res) {
            if (res.error) {
                window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
            }
        });
    };
    AppComponent.prototype.getPermission = function () {
        var params = new http_1.URLSearchParams();
        params.set('userId', '1');
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_permission', {
            search: params
        }).map(function (res) { return res.json(); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div class=\"nav\">\n      <div class=\"o-container o-container--super\">\n        <ul class=\"c-nav c-nav--inline u-bg-green-darker\">\n          <li class=\"c-nav__item\" routerLink=\"/home\"><img class=\"u-high\" src=\"assets/images/muzg.png\"></li>\n          <li class=\"c-nav__item\" routerLinkActive=\"active\" routerLink=\"/home\">\u041D\u04AF\u04AF\u0440</li>\n          <li class=\"c-nav__item\" routerLinkActive=\"active\" routerLink=\"/equipments\">\u0422\u043E\u043D\u043E\u0433 \u0442\u04E9\u0445\u04E9\u04E9\u0440\u04E9\u043C\u0436</li>\n          <li class=\"c-nav__item\" routerLinkActive=\"active\" routerLink=\"/contractors\">\u0417\u0430\u043C\u044B\u043D \u0433\u04AF\u0439\u0446\u044D\u0442\u0433\u044D\u0433\u0447</li>\n          <li class=\"c-nav__item\" routerLinkActive=\"active\" routerLink=\"/jobs\">\u0417\u0430\u043C\u044B\u043D \u0430\u0436\u0438\u043B</li>\n          <li class=\"c-nav__item\" routerLinkActive=\"active\" routerLink=\"/users\">\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447</li>\n          <li class=\"c-nav__item\" routerLinkActive=\"active\" routerLink=\"/report\">\u0422\u0430\u0439\u043B\u0430\u043D</li>\n          <li class=\"c-nav__item c-nav__item--right\"><a href=\"http://localhost/zam/zam/index.php/auth/logout\" style=\"color: #fff;\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>\u0413\u0430\u0440\u0430\u0445</a></li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"o-container o-container--xlarge u-letter-box--large\">\n      <router-outlet></router-outlet>\n    </div>\n    <div class=\"footer\">\n      <hr/>\n      <h5 class=\"c-heading c-text--quiet\">\u00A92017 SUSANO TECHNOLOGY ALL RIGHTS RESERVED</h5>\n    </div>\n  ",
        }),
        __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map