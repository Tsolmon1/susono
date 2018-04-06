import { Component, NgZone } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
let me: AppComponent;

@Component({
  selector: 'my-app',
  template: `
    <div class="nav">
      <div class="o-container o-container--super">
        <ul class="c-nav c-nav--inline u-bg-green-darker">
          <li class="c-nav__item" routerLink="/home"><img class="u-high" src="assets/images/muzg.png"></li>
          <li class="c-nav__item" routerLinkActive="active" routerLink="/home">Нүүр</li>
          <li class="c-nav__item" routerLinkActive="active" routerLink="/equipments">Тоног төхөөрөмж</li>
          <li class="c-nav__item" routerLinkActive="active" routerLink="/contractors">Замын гүйцэтгэгч</li>
          <li class="c-nav__item" routerLinkActive="active" routerLink="/jobs">Замын ажил</li>
          <li class="c-nav__item" routerLinkActive="active" routerLink="/users">Хэрэглэгч</li>
          <li class="c-nav__item" routerLinkActive="active" routerLink="/report">Тайлан</li>
          <li class="c-nav__item c-nav__item--right"><a href="http://localhost/zam/zam/index.php/auth/logout" style="color: #fff;"><i class="fa fa-sign-out" aria-hidden="true"></i>Гарах</a></li>
        </ul>
      </div>
    </div>
    <div class="o-container o-container--xlarge u-letter-box--large">
      <router-outlet></router-outlet>
    </div>
    <div class="footer">
      <hr/>
      <h5 class="c-heading c-text--quiet">©2017 SUSANO TECHNOLOGY ALL RIGHTS RESERVED</h5>
    </div>
  `,
})
export class AppComponent {
	urls = 'http://localhost';

	constructor(private http: Http, public zone: NgZone) {
	    me = this;
	    me.initData();
	}
	initData() {
		me.getPermission().subscribe(res => { 
	      if(res.error) {
	        window.location.href = 'http://localhost/zam/zam/index.php/auth/logout';
	      }
	    });  		
	}

	getPermission() {
        let params: URLSearchParams = new URLSearchParams();    
        params.set('userId', '1');    
        return this.http.get(this.urls + '/zam/zam/index.php/zam/get_permission', {
            search: params
        }).map((res: Response) => res.json());
    }
}
