import { Component, OnInit,ViewChild } from '@angular/core';
import { LoadingController, AlertController,ModalController, IonSlides } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { UsersService } from '../../../services/firebase/users.service';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
 // @ViewChild('slides') slides: IonSlides;
  @ViewChild('profileSlider') profileSlider: any;
  validationsForm: FormGroup;
  profileOptionObject:any={};
  playerTypes:any =[];
  batsmanType:any=[];
  bowlerType:any =[];
  battingPosition=[];
  fieldingPosition=[];
  favoriteFormat=[];
  
  validations = {
    
    'firstname': [
      { type: 'required', message: 'Name is required.' }
    ],
    'dob': [
      { type: 'required', message: 'Date of birth is required.' }
    ],
    
    
  };
  constructor( public alertController: AlertController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    

    private usersService:UsersService) { 
      this.validationsForm = new FormGroup({
        'firstname': new FormControl('', Validators.required),
        'dob': new FormControl('',Validators.required),
        'phone': new FormControl(''),
        'city': new FormControl(''),
        'state': new FormControl(''),
        'country': new FormControl(''),
        'gender': new FormControl(''),
        'playerType': new FormControl(''),
        'batsmanType':new FormControl(''),
        'BowlerType':new FormControl(''),
        'BattingPosition':new FormControl(''),
        'FieldingPosition': new FormControl(''),
        'FavoriteFormat': new FormControl(''),
        'FavoriteTeam': new FormControl(''),
        'FavoriteCricketShot': new FormControl(''),
        'FavoriteDelivery': new FormControl(''),
        'FavoriteWK': new FormControl(''),
        'AllTimeFavPlayer': new FormControl(''),
        'ccc': new FormControl(''),
        'spendTimeGym':new FormControl(''),
        'anyInjury': new FormControl(''),
        'playerLikeToReplace': new FormControl(''),
        'FavoriteIPL': new FormControl('')



      });
    }

  async ngOnInit() {
   // this.slides.lockSwipes(true);
   let response:any = await this.usersService.userProfileOptions();
   console.log(response);
   if(response!=null){
     if(response.playerOptions.length>0){
      this.profileOptionObject = JSON.parse(response.playerOptions[0]);
      this.playerTypes =  this.profileOptionObject.PlayerType[0];
     }
     //this.profileOptionObject.PlayerType =["jaspal","singh"];
     
     
   }
  }
  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      
    });
  }

  ionViewWillEnter() {
   
  }
  onDismiss(data:any){
    this.modalCtrl.dismiss(data);
  }
  

  onUserPersonalInfo(){
   // this.slides.lockSwipes(false);
   // this.slides.slideTo(1,1000);
   // this.slides.lockSwipes(true);
  }
  ionViewDidLeave() {
    
  }

}
