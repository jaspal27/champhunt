import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verfication',
  templateUrl: './email-verfication.page.html',
  styleUrls: ['./email-verfication.page.scss'],
})
export class EmailVerficationPage implements OnInit {

  resetPasswordForm: FormGroup;
	loading: any;
  constructor(public alertController: AlertController,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
		private router: Router,
		public formBuilder: FormBuilder,) {
      this.resetPasswordForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      });
     }

     ngOnInit() {
    }
    resendEmail() {
      if (!this.resetPasswordForm.valid) {
          console.log(this.resetPasswordForm.value);
      } else {
         
      }
  }
  
  
  dismiss(){
    this.modalCtrl.dismiss(null);
  }
  
  
  async presentAlertError() {
    const alert = await this.alertController.create({
        header: 'Request failed',
        message: 'Please do again',
        buttons: ['OK']
    });
    await alert.present();
  }
  
  async presentAlertSuccess() {
    const alert = await this.alertController.create({
        header: 'Complete request',
        message: 'We just sent you a reset link to your email',
        buttons: ['OK']
    });
    await alert.present();
  }
  }