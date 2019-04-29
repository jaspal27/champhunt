import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/firebase/app.services';

@Component({
  selector: 'app-tab-promote',
  templateUrl: './tab-promote.page.html',
  styleUrls: ['./tab-promote.page.scss'],
})
export class TabPromotePage implements OnInit {
  
  public dealsPayload:any;
  
  constructor(public appService:AppService,) { }

  async ngOnInit() {
    let dealsData:any = await this.appService.getDealsData();
      this.dealsPayload = JSON.parse(dealsData.deals);
    

  }
  ionViewWillEnter() {
    //let dealsData:any = this.navParams.get('ModalData');
   
    
    
  }
}
