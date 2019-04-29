import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
  }
  async onDismiss(){
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }

}
