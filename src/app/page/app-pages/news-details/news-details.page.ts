import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ModalController, NavParams} from '@ionic/angular';
@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
@Pipe({ name: 'keepHtml', pure: false })
export class NewsDetailsPage implements OnInit {
  private newsDetails:any;
  constructor(private modalController: ModalController,
    private navParams: NavParams,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.newsDetails = this.navParams.get('ModalData');
    
  }
  
  async onDismiss(){
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }

}
