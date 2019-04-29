import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../services/firebase/firebase-authentication.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  signupForm: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };
	loading: any;
  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    private router: Router,
    private firebaseAuthenticationService:FirebaseAuthenticationService,
		public formBuilder: FormBuilder,
  ) { 
    
    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit() {
  }
  doRestPassword() {
    if (this.signupForm.valid) {
        console.log(this.signupForm.value);
        this.firebaseAuthenticationService.resetPassword(this.signupForm.value.email).then(res=>{
          this.presentAlertSuccess();
        },(error=>{
          this.presentAlertError();
        }))
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