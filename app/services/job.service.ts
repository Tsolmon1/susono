import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

var pt = 1;

@Injectable()
export class JobService {

    urls = 'http://localhost';

    constructor(private http: Http) { }

    getPlan(mainJobId: Number): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobId', mainJobId.toString());
        /*return this.http.get(this.urls + '/zam/services/' + 'data/plan.json', {
            search: params
        }).map((res: Response) => res.json());*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_jobs', {
            search: params
        }).map((res: Response) => res.json());
    }

    getWorkProgress(mainJobId: Number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobId', mainJobId.toString());
        /*return this.http.get(this.urls + '/zam/services/' + 'data/job.json', {
            search: params
        }).map((res: Response) => res.json());*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_sub_jobs', {
            search: params
        }).map((res: Response) => res.json());
    }

    getPath(jobId: any, subJobId: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobId', jobId);
        params.set('subJobId', subJobId);
        /*return this.http.get(this.urls + '/zam/services/' + 'data/path.json', {
            search: params
        }).map((res: Response) => {
            let jobs = res.json();
            if (subJobId) {
                return _.find(jobs, function(o: any) { return o.id === subJobId; });
            }else {
                return jobs;
            }
        });*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_paths', {
            search: params
        }).map((res: Response) => {
            let jobs = res.json();
            if (subJobId) {
                return _.find(jobs, function(o: any) { return o.id === subJobId; });
            }else {
                return jobs;
            }
        });
    }

    getWorkProgressDetails(jobId: any, subJobId: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobId', jobId);
        params.set('subJobId', subJobId);
        let allOr = 'progress.json';
        allOr = 'get_progress';
        if (!subJobId) {
            allOr = 'all-progress.json';
            allOr = 'get_all_progress';
        }
        /*return this.http.get(this.urls + '/zam/services/data/' + allOr, {
            search: params
        }).map((res: Response) => {
            let progress = res.json();
            if (subJobId) {
                return _.find(progress.jobs, function(o: any) { return o.id === subJobId; });
            }else {
                return progress.jobs;
            }
        });*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/' + allOr, {
            search: params
        }).map((res: Response) => {
            let progress = res.json();
            if (subJobId) {
                return _.find(progress.jobs, function(o: any) { return o.id === subJobId; });
            }else {
                return progress.jobs;
            }
        });
    }

    getPhoto(photoId: any, jobId: any, tid: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('photoId', photoId);
        params.set('jobId', jobId);
        let i=0;
        /*return this.http.get(this.urls + '/zam/services/' + 'data/details.json', {
            search: params
        }).map((res: Response) => {
            if (pt === 1) {
                pt = 0;
            }else {
                pt = 1;
            }
            return res.json()[pt];
        });*/
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_images', {
            search: params
        }).map((res: Response) => {
            if (photoId) {
                let result = _.find(res.json(), function(o: any) { return o.id === photoId && o.type === tid; });
                if(result) {
                    return result;
                } else {
                    return {};
                }
            }else {
                return {};
            }
            /*if (pt === 1) {
                pt = 0;
            }else {
                pt = 1;
            }            
            res.json().forEach(function(p: any){
                if(p.id == photoId) {
                    return res.json()[i];
                }
                i += 1;
            });
            if(res.json().length == i) {
                return {};
            }
            if(res.json().length >= tid) {
                return res.json()[tid-1];
            } else {
                return {};
            }*/
        });
    }

    getJobId(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('jobId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_job_by_id', {
            search: params
        }).map((res: Response) => res.json());
    }

    addJob(name: any,cid: any,sdate: any,edate: any,loc: any,group: any,jobId: any,sid: any,path: any,types: any) {
        let params: URLSearchParams = new URLSearchParams();        
        params.set('name', name);   
        params.set('cid', cid);   
        params.set('sdate', sdate);   
        params.set('edate', edate);   
        //params.set('sdate1', sdate1);   
        //params.set('edate1', edate1);   
        params.set('loc', loc);   
        params.set('group', group);   
        params.set('jobId', jobId);   
        params.set('sid', sid);   
        params.set('path', path); 
        params.set('types', types); 
        
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    editJob(name: any,cid: any,sdate: any,edate: any,loc: any,group: any,jobId: any,sid: any,path: any,sid1: any,types: any) {
        let params: URLSearchParams = new URLSearchParams();        
        params.set('name', name);   
        params.set('cid', cid);   
        params.set('sdate', sdate);   
        params.set('edate', edate);  
        //params.set('sdate1', sdate1);   
        //params.set('edate1', edate1);   
        params.set('loc', loc);   
        params.set('group', group);   
        params.set('jobId', jobId);   
        params.set('sid', sid);   
        params.set('sid1', sid1);   
        params.set('path', path); 
        params.set('types', types); 
        
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    deleteJob(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('jobId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    getMain() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');   
        params.set('name', 'Та утгаа сонгоно уу?'); 
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_main', {
            search: params
        }).map((res: Response) => res.json());
    }

    getTypes(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('jobId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_types', {
            search: params
        }).map((res: Response) => res.json());
    }

    getPermission() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_permission', {
            search: params
        }).map((res: Response) => res.json());
    }

    getPermissions() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_permissions', {
            search: params
        }).map((res: Response) => res.json());
    }

    getEquipments() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_equipments', {
            search: params
        }).map((res: Response) => res.json());
    }

    getEquipmentId(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('equipmentId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_equipments_by_id', {
            search: params
        }).map((res: Response) => res.json());
    }

    editEquipment(id: any,name: any,image: any,power: any,desc: any,cid: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('equipmentId', id);    
        params.set('name', name);   
        params.set('image', image);   
        params.set('power', power);   
        params.set('desc', desc);  
        params.set('companyId', cid);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_equipment', {
            search: params
        }).map((res: Response) => res.json());
    }
     sendReport() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('notif', '1');     
          
        return this.http.get(this.urls + '/zam/zam/index.php/zam/send_report', {
            search: params
        }).map((res: Response) => res.json());
    } 

    addEquipment(name: any,image: any,power: any,desc: any,cid: any) {
        let params: URLSearchParams = new URLSearchParams();        
        params.set('name', name);   
        params.set('image', image);   
        params.set('power', power);   
        params.set('desc', desc);   
        params.set('companyId', cid);   
        
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_equipment', {
            search: params
        }).map((res: Response) => res.json());
    }

    deleteEquipment(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('equipmentId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_equipment', {
            search: params
        }).map((res: Response) => res.json());
    }

    addImage(formData: FormData) {
        let params: URLSearchParams = new URLSearchParams();
        return this.http.post(this.urls + '/zam/zam/index.php/zam/add_image', formData).map((res: Response) => res);
    }

    getUserJobs() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_user_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    getUserJob(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('id', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_user_job_id', {
            search: params
        }).map((res: Response) => res.json());
    }

    setUserJob(id: any, job: any, cid: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', id);    
        params.set('jobId', job);    
        params.set('companyId', cid); 
        return this.http.get(this.urls + '/zam/zam/index.php/zam/set_user_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    editUserJob(id: any, job: any, cid: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', id);    
        params.set('jobId', job);    
        params.set('companyId', cid); 
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_user_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    deleteUserJob(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('id', id); 
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_user_job', {
            search: params
        }).map((res: Response) => res.json());
    }

    getUsers() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_users', {
            search: params
        }).map((res: Response) => res.json());
    }

    getUserId(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_user_by_id', {
            search: params
        }).map((res: Response) => res.json());
    }

    addUser(name: any,password: any,email: any,phone: any,permission: any, cid: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name); 
        params.set('password', password); 
        params.set('phone', phone); 
        params.set('cid', cid); 
        params.set('email', email); 
        params.set('permission', permission);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_user', {
            search: params
        }).map((res: Response) => res.json());
    }

    editUser(id: any,name: any,password: any,email: any,phone: any,permission: any, cid: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', id);    
        params.set('name', name); 
        params.set('password', password); 
        params.set('phone', phone); 
        params.set('cid', cid); 
        params.set('email', email); 
        params.set('permission', permission);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_user', {
            search: params
        }).map((res: Response) => res.json());
    }

    deleteUser(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_user', {
            search: params
        }).map((res: Response) => res.json());
    }

    getCompanys() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_companys', {
            search: params
        }).map((res: Response) => res.json());
    }

    getCompanyId(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('companyId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_companys_by_id', {
            search: params
        }).map((res: Response) => res.json());
    }

    editCompany(id: any,name: any,register: any,phone: any,email: any,address: any,rank: any,ready: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('companyId', id);    
        params.set('name', name); 
        params.set('register', register); 
        params.set('phone', phone); 
        params.set('email', email); 
        params.set('address', address); 
        params.set('rank', rank); 
        params.set('ready', ready); 
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_company', {
            search: params
        }).map((res: Response) => res.json());
    }

    addCompany(name: any,register: any,phone: any,email: any,address: any,rank: any,ready: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name); 
        params.set('register', register); 
        params.set('phone', phone); 
        params.set('email', email); 
        params.set('address', address); 
        params.set('rank', rank); 
        params.set('ready', ready); 
        return this.http.get(this.urls + '/zam/zam/index.php/zam/add_company', {
            search: params
        }).map((res: Response) => res.json());
    }

    deleteCompany(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('companyId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_company', {
            search: params
        }).map((res: Response) => res.json());
    }

    getEquipmentsCompany(companyId: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('companyId', companyId);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_equipments_company', {
            search: params
        }).map((res: Response) => res.json());
    }

    editPath(id: any,type: any,desc: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('pathId', id); 
        params.set('type', type);   
        params.set('desc', desc);   
        return this.http.get(this.urls + '/zam/zam/index.php/zam/edit_path', {
            search: params
        }).map((res: Response) => res.json());
    }

    deletePath(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('pathId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/delete_path', {
            search: params
        }).map((res: Response) => res.json());
    }

    setRating(id: any,rate: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('jobId', id);    
        params.set('rate', rate);
        return this.http.get(this.urls + '/zam/zam/index.php/zam/set_rating', {
            search: params
        }).map((res: Response) => res.json());
    }

    setNotif(id: any,notif: any,cid: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('jobId', id);    
        params.set('notif', notif);    
        params.set('cid', cid);  
        return this.http.get(this.urls + '/zam/zam/index.php/zam/set_notif', {
            search: params
        }).map((res: Response) => res.json());
    }

    getReport() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('companyId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_report', {
            search: params
        }).map((res: Response) => res.json());
    }
/* add id:any*/
    getNotifs(id: any) {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('companyId', '1');
        params.set('jobId', id);    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_notifs', {
            search: params
        }).map((res: Response) => res.json());
    }
}
