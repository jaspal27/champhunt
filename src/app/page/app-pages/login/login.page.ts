import { Component, OnInit } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SignupPage } from '../signup/signup.page';
import { ForgotPage } from '../forgot/forgot.page';
import { EmailVerficationPage } from '../email-verfication/email-verfication.page'
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { FirebaseAuthenticationService }  from '../../../services/firebase/firebase-authentication.service';
import { UsersService } from '../../../services/firebase/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading: any;
  copyRightsYear :any;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  constructor(public alertController: AlertController,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    private router: Router,
    public formBuilder: FormBuilder,
    private usersService:UsersService,
    public firebaseAuthenticationService: FirebaseAuthenticationService
   ) {
      this.copyRightsYear = new Date().getFullYear();
     
      this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        'password': new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ]))
      });
     }

   ngOnInit() {
    
  }
  doLoginUser(): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
  } else {
    this.presentLoading(); 
      this.firebaseAuthenticationService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
       if(authData.user.emailVerified){
        this.usersService.getUser(authData.user.uid).then(res=>{
          this.loading.dismiss().then(() => {
            this.router.navigate(['app']);
            });
        })
        
       }else{
        
        this.presentFilter(EmailVerficationPage,null);
       }  
        
      }, error => {
          this.loading.dismiss().then(() => {
            this.presentAlert('login failed','email or password is wrong');
          });
      });
               
  }
    //this.router.navigate(['tabs']);
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
        message: 'waiting',
    });
    return await this.loading.present();
}


async presentAlert(header:string,message:string) {
    const alert = await this.alertController.create({
        header: header,
        message: message ,
        buttons: ['OK']
    });
    await alert.present();
}

async presentFilter(page:any,loginObject:any) {
  
  const modal = await this.modalCtrl.create({
    component: page,
    componentProps: { pageData: loginObject }
  });
  await modal.present();

  const { data } = await modal.onWillDismiss();
  if (data) {
    //this.excludeTracks = data;
   
  }
}
openTermsPolicies():void{
  this.presentFilter(PrivacyPolicyPage,null);
}  
openSignup(): void {
    this.presentFilter(SignupPage,null);
   // this.router.navigate(['signup']);
  }
  async doGoogleLogin(){
    this.presentLoading();
   let response = await this.firebaseAuthenticationService.doGoogleLogin();
   this.loading.dismiss();
   if (response){
     response.loginType = 'gmailplus';
     if(response.uid){
       console.log('login success' + response);
       this.usersService.getUser(response.uid).then(res=>{
        if(res){
          this.loading.dismiss().then(() => {
            this.router.navigate(['app']);
            });
        }else{
          this.presentFilter(SignupPage,response);
        }
        
      })
       // check whether profile is created or not.

     }
     
   }
   /* this.firebaseAuthenticationService.doGoogleLogin().then(res=>{
      console.log(res);
    })*/
  }
  
  doFacebookLogin():void{
    this.presentLoading()
    this.firebaseAuthenticationService.doFacebookNativeLogin().then(response=>{
     // console.log(res);
      if (response){
        response.loginType = 'facebook';
        if(response.uid){
          console.log('login success' + response);
          this.usersService.getUser(response.uid).then(res=>{
           if(res){
             this.loading.dismiss().then(() => {
               this.router.navigate(['app']);
               });
           }else{
             this.presentFilter(SignupPage,response);
           }
           
         })
          // check whether profile is created or not.
   
        }
        
      }
      this.loading.dismiss();
    },error =>{
      this.loading.dismiss();
      this.presentAlert('Login Error' , error.message);
      
    })
  }

  async openForgotPwd() {
    const modal = await this.modalCtrl.create({
      component: ForgotPage,
      componentProps: { excludedTracks: null }
    });
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      //this.excludeTracks = data;
      
    }
  }

}
