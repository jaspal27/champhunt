import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.page.html',
  styleUrls: ['./termsofuse.page.scss'],
})
export class TermsofusePage implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
  }
  async onDismiss(){
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }

}
