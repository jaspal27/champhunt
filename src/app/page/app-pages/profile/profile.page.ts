import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController,ModalController, IonSlides } from '@ionic/angular';
import { MyprofilePage } from '../myprofile/myprofile.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	slideProfileOpts = {
    effect: 'flip',
    autoHeight: true,
    speed: 1000,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 4,
};
  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  toPresentPopover(params){
		
	}

  onMyProfile(){
    this.presentProfile(MyprofilePage);
  }
  async presentProfile(page:any) {
  
    const modal = await this.modalCtrl.create({
      component: page,
      componentProps: { excludedTracks: null }
    });
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      //this.excludeTracks = data;
     
    }
  }
	logout() {
		
	}


	


	
}
