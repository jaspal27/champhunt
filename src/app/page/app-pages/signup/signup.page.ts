import { Component, OnInit,ViewChild } from '@angular/core';
import { LoadingController, AlertController,ModalController,IonSlides, NavController ,NavParams} from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../services/firebase/firebase-authentication.service';
import { UsersService } from '../../../services/firebase/users.service';
import { PasswordValidator } from '../validators/password.validator';
//import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
//import {TermsofusePage} from '../termsofuse/termsofuse.page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  tellUsForm:FormGroup;
  public isPasswordHide:boolean = false;
  matching_passwords_group: FormGroup;
  backgroundFirst = '/assets/images/signup/on-board-01.png';
  backgroundSecond = '/assets/images/signup/splash-bg.png';
  backgroundLast = '/assets/images/signup/on-board-03.png';
  profileOptionObject:any={};
  playerTypes:any =[];
  batsmanType:any=[];
  bowlerType:any =[];
  battingPosition=[];
  fieldingPosition=[];
  favoriteFormat=[];
  profileName:any;
  formData:any ={};
  transient:any= {
    stdCode: "+91",
    name:""
  };
   profilePhoto ="/assets/images/user.png";
  @ViewChild('slides') slides: IonSlides;
  

  backgrounds = [
    '/assets/images/splash-bg.png',
    '/assets/images/Login-in-BG.jpg',
    '/assets/images/Login-in-BG.jpg',
    '/assets/images/Login-in-BG.jpg'
  ];
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
      
    ],
    'dob': [
      { type: 'required', message: 'Date of birth is required.' }
      
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };
	loading: any;
  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    private router: Router,
    private navParams:NavParams,
    public formBuilder: FormBuilder,
    public firebaseAuthenticationService: FirebaseAuthenticationService,
    public userService:UsersService,
    
  ) {
    this.formData.loginType = 'manual';
    this.formData.name = '';
    this.formData.email = ''
    this.formData.profilePhoto = this.profilePhoto; 
    let pageData = this.navParams.get('pageData');
    this.isPasswordHide = false;
    if(pageData){
      if(pageData.loginType == 'gmailplus' || pageData.loginType == 'facebook'){
        this.isPasswordHide = true;
        this.formData.loginType = pageData.loginType;
        this.formData.name = pageData.displayName;
        this.transient.name = pageData.displayName;
        this.formData.email = pageData.email
        this.formData.profilePhoto = pageData.photoURL;
        this.formData.userId = pageData.uid;
        this.matching_passwords_group = new FormGroup({
          'password': new FormControl(''),
          'confirm_password': new FormControl('')
        }, (formGroup: FormGroup) => {
          return PasswordValidator.areNotEqual(formGroup);
        });
      }
    }else{
      this.matching_passwords_group = new FormGroup({
        'password': new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
        'confirm_password': new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areNotEqual(formGroup);
      });
    }
    
    
   
    this.tellUsForm = new FormGroup({
      'playforState':new FormControl('',Validators.required),
      'typeofBatsman':new FormControl(''),
      'typeofBowler':new FormControl(''),
      'cricketClub':new FormControl(''),
      'totalRuns':new FormControl(''),
      'totalWickets':new FormControl(''),
      'aboutMe': new FormControl('',Validators.required)
    })
    this.signupForm = new FormGroup({
      'email': new FormControl(this.formData.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'name': new FormControl(this.formData.name, Validators.required),
      'dob': new FormControl('',Validators.required),
      'stdCode': new FormControl('+91'),
      'phone': new FormControl(''),
      'matching_passwords': this.matching_passwords_group
    });
  }

  async ngOnInit() {
    this.profileName = this.signupForm.value.name; 
    this.slides.lockSwipes(true);
    let response:any = await this.userService.userProfileOptions();
   console.log(response);
   if(response!=null){
     if(response.playerOptions.length>0){
      this.profileOptionObject = JSON.parse(response.playerOptions[0]);
      this.playerTypes =  this.profileOptionObject.PlayerType[0];
     }
     //this.profileOptionObject.PlayerType =["jaspal","singh"];
     
     
   }
  }
  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  goBack(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }
  async doSignup() {
    if (!this.signupForm.valid) {
        console.log(this.signupForm.value);
    } else {
      this.presentLoading();
      let userObj :any ={};
      userObj.name = this.signupForm.value.name;
      userObj.dob = this.signupForm.value.dob;
      userObj.email = this.signupForm.value.email;
      userObj.phone = this.signupForm.value.phone;
      userObj.playforState = this.tellUsForm.value.playforState;
      userObj.typeofBatsman = this.tellUsForm.value.typeofBatsman;
      userObj.runs =  this.tellUsForm.value.totalRuns;
      userObj.typeofBowler = this.tellUsForm.value.typeofBowler;
      userObj.wickets =  this.tellUsForm.value.totalWickets;
      userObj.cricketClub = this.tellUsForm.value.cricketClub;
      userObj.score =99;
      userObj.badges =5;
      userObj.likes =1;
      userObj.follower =1;
      userObj.shares =1;
      userObj.userVideos=[];
      userObj.aboutme = this.tellUsForm.value.aboutMe;
      userObj.profilePhoto = this.formData.profilePhoto;
      userObj.isProfileCreated = true;
      userObj.loginType =  this.formData.loginType;
      if(this.formData.userId){
        userObj.userId = this.formData.userId;
       let response = await this.userService.createUser(userObj);
       this.loading.dismiss().then(() => {
        this.presentAlertConfirm();
      });
      }else{
        this.firebaseAuthenticationService.signupUser(this.signupForm.value.email, this.signupForm.value.matching_passwords.password)
        .then((res) => {
          userObj.userId = res.user.uid 
          this.userService.createUser(userObj);
          this.loading.dismiss().then(() => {
              this.presentAlertConfirm();
            });
        }, (error) => {
            this.loading.dismiss().then(() => {
                this.presentAlert(error.message);
            });
        });
      }
     
    }
}
async profileCreation(){
  const modal = await this.modalCtrl.create({
    component: null,
    componentProps: { userInfo: this.signupForm.value.email }
  });
  await modal.present();

  const { data } = await modal.onWillDismiss();
  if (data) {
    //this.excludeTracks = data;
    
  }
}
gotoLogin(){
  this.dismiss(null)
}
dismiss(data?: any) {
  // using the injected ModalController this page
  // can "dismiss" itself and pass back data
  this.modalCtrl.dismiss(data);
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    message: 'Confirm! <strong>Successfully registered, Please check your email and verify your email id for continue.</strong>!!!',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          //this.router.navigate(['tabs']);
          console.log('Confirm Okay');
          this.nextSlide();
          this.slides.slideNext();
        }
      }
    ]
  });

  await alert.present();
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'waiting',
      duration: 2000
  });
  return await this.loading.present();
}


async presentAlert(message:string) {
  const alert = await this.alertController.create({
      header: 'Signup failed',
      message: message,
        buttons: [
            {
                text: "Ok",
                role: 'cancel'
            }
        ]
  });
  await alert.present();
}
doFacebookSignup(): void {
  console.log('facebook signup');
  //this.router.navigate(['app/categories']);
}

doGoogleSignup(): void {
  console.log('google signup');
  //this.router.navigate(['app/categories']);
}

doTwitterSignup(): void {
  console.log('twitter signup');
  //this.router.navigate(['app/categories']);
}
showPrivacyModal():void{
  //this.presentModal(PrivacyPolicyPage,null);
}
showTermsModal():void{
  //this.presentModal(TermsofusePage,null);
}
async presentModal(page:any,modalObject:any) {
  
  const modal = await this.modalCtrl.create({
    component: page,
    componentProps: { ModalData: modalObject }
  });
  await modal.present();

  const { data } = await modal.onWillDismiss();
  if (data) {
    //this.excludeTracks = data;
   
  }
}

}
