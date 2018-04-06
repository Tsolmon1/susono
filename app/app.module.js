"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home.component");
var contractor_component_1 = require("./components/contractor.component");
var contractor_list_component_1 = require("./components/contractor.list.component");
var equipment_component_1 = require("./components/equipment.component");
var equipment_list_component_1 = require("./components/equipment.list.component");
var report_component_1 = require("./components/report.component");
var jobs_component_1 = require("./components/jobs.component");
var users_component_1 = require("./components/users.component");
var user_component_1 = require("./components/user.component");
var userjob_component_1 = require("./components/userjob.component");
var userjobs_component_1 = require("./components/userjobs.component");
var page_not_found_component_1 = require("./errors/page-not-found.component");
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'equipments', component: equipment_list_component_1.EquipmentListComponent },
    { path: 'equipment/edit/:id', component: equipment_component_1.EquipmentComponent },
    { path: 'equipment', component: equipment_component_1.EquipmentComponent },
    { path: 'contractors', component: contractor_list_component_1.ContractorListComponent },
    { path: 'contractor/edit/:id', component: contractor_component_1.ContractorComponent },
    { path: 'contractor', component: contractor_component_1.ContractorComponent },
    { path: 'jobs', component: jobs_component_1.JobsComponent },
    { path: 'users', component: users_component_1.UsersComponent },
    { path: 'user/edit/:id', component: user_component_1.UserComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'userjobs/:id/:cid', component: userjob_component_1.UserjobComponent },
    { path: 'userjob/edit/:id', component: userjobs_component_1.UserjobsComponent },
    { path: 'userjob', component: userjobs_component_1.UserjobsComponent },
    { path: 'report', component: report_component_1.ReportComponent },
    { path: 'logout', redirectTo: 'http://localhost/zam/admin_login.html' },
    // home redirection
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // errors
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoutes), platform_browser_1.BrowserModule, http_1.HttpModule],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            declarations: [app_component_1.AppComponent,
                home_component_1.HomeComponent,
                equipment_component_1.EquipmentComponent,
                equipment_list_component_1.EquipmentListComponent,
                contractor_component_1.ContractorComponent,
                contractor_list_component_1.ContractorListComponent,
                jobs_component_1.JobsComponent,
                users_component_1.UsersComponent,
                user_component_1.UserComponent,
                userjob_component_1.UserjobComponent,
                userjobs_component_1.UserjobsComponent,
                report_component_1.ReportComponent,
                page_not_found_component_1.PageNotFoundComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map