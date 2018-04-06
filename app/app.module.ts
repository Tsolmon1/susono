import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy,  HashLocationStrategy } from "@angular/common";
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { HomeComponent }           from './components/home.component';
import { ContractorComponent }     from './components/contractor.component';
import { ContractorListComponent } from './components/contractor.list.component';
import { EquipmentComponent }      from './components/equipment.component';
import { EquipmentListComponent }  from './components/equipment.list.component';
import { ReportComponent }         from './components/report.component';
import { JobsComponent }         from './components/jobs.component';
import { UsersComponent }         from './components/users.component';
import { UserComponent }         from './components/user.component';
import { UserjobComponent }         from './components/userjob.component';
import { UserjobsComponent }         from './components/userjobs.component';

import { PageNotFoundComponent }  from './errors/page-not-found.component';

const appRoutes: Routes = [
  { path: 'home',            component: HomeComponent },
  { path: 'equipments',      component: EquipmentListComponent },
  { path: 'equipment/edit/:id',  component: EquipmentComponent },
  { path: 'equipment',  component: EquipmentComponent },
  { path: 'contractors',     component: ContractorListComponent },
  { path: 'contractor/edit/:id', component: ContractorComponent },
  { path: 'contractor', component: ContractorComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/edit/:id', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'userjobs/:id/:cid', component: UserjobComponent },
  { path: 'userjob/edit/:id', component: UserjobsComponent },
  { path: 'userjob', component: UserjobsComponent },
  { path: 'report',          component: ReportComponent },
  { path: 'logout',          redirectTo: 'http://localhost/zam/admin_login.html' },
  // home redirection
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // errors
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ RouterModule.forRoot(appRoutes), BrowserModule, HttpModule ],
  providers:    [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  declarations: [ AppComponent,
                  HomeComponent,
                  EquipmentComponent,
                  EquipmentListComponent,
                  ContractorComponent,
                  ContractorListComponent,
                  JobsComponent,
                  UsersComponent,
                  UserComponent,
                  UserjobComponent,
                  UserjobsComponent,
                  ReportComponent,
                  PageNotFoundComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
