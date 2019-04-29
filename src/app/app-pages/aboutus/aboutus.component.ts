import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
  pageIndex:any;
  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {}
  ionViewWillEnter() {
    this.pageIndex = this.navParams.get('ModalData');
    
  }
  
  async onDismiss(){
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
}
