import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.page.html',
  styleUrls: ['./articles-details.page.scss'],
})
export class ArticlesDetailsPage implements OnInit {
  private articleDetails:string;
  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

    ngOnInit() {
    }
    ionViewWillEnter() {
      this.articleDetails = this.navParams.get('ModalData');
      
    }
    
    async onDismiss(){
      const result: Date = new Date();
      await this.modalController.dismiss(result);
    }

}
