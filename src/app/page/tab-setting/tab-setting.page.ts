import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab-setting',
  templateUrl: 'tab-setting.page.html',
  styleUrls: ['tab-setting.page.scss']
})


export class TabSettingPage {

	list_theme: any;

	constructor() {
		this.list_theme = environment.themes;
	}

	changeTheme(name) {
  	
	}
}
