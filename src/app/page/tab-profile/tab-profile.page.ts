import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController, PopoverController,ModalController } from '@ionic/angular';

import { PopoverViewComponent } from '../../component/popover-view/popover-view.component';

import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { MyprofilePage } from '../app-pages/myprofile/myprofile.page';


import { UsersService } from '../../services/firebase/users.service';
import { FirebaseAuthenticationService } from '../../services/firebase/firebase-authentication.service';
import { ImageCropperModalComponent } from '../../component/imageCropper/image-cropper-modal/image-cropper-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadVideoComponent } from '../../component/upload-video/upload-video.component';

@Component({
  selector: 'app-tab-profile',
  templateUrl: 'tab-profile.page.html',
  styleUrls: ['tab-profile.page.scss']
})
export class TabProfilePage {
	public imageUrl:any ="assets/images/avt1.jpg";

	userObject:any;
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
		public popoverController: PopoverController,
		public alertController: AlertController,
		public modalCtrl:ModalController,
		private router: Router,
		public usersService:UsersService,
		private _sanitizer: DomSanitizer,
		public firebaseAuthenticationProvider: FirebaseAuthenticationService
	
	) {
		;
		//this._sanitizer.bypassSecurityTrustResourceUrl(
		 
	
	}
		
	toPresentPopover(params){
		this.presentPopover(params);
	}

	async goToProfileDetailsPage(){
	 await	this.presentModal(MyprofilePage,null);
	}

	onLogout() {
		this.presentAlertConfirm();
	}

	async ngOnInit() {
		this.userObject = this.usersService.getUserLocalObject();
		this.imageUrl = this.userObject.profilePhoto;
		console.log('image Url :' + this.imageUrl);

	}
	async onUserPhoto()
	{
		const modal = await this.modalCtrl.create({
			component: ImageCropperModalComponent,
			componentProps: { userData: this.userObject }
		});
		await modal.present();
	
		const { data } = await modal.onWillDismiss();
		if (data) {
			//this.excludeTracks = data;
			this.imageUrl = data;
		 
		}
	}
	
	async presentPopover(ev: any) {
	    const popover = await this.popoverController.create({
	      	component: PopoverViewComponent,
	      	event: ev,
	      	translucent: true
	    });
	    return await popover.present();
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
	async toggleVideo(){
		
	}
	async createPosts(){
		const modal = await this.modalCtrl.create({
			component: UploadVideoComponent,
			componentProps: { userData: this.userObject }
		});
		await modal.present();
	
		const { data } = await modal.onWillDismiss();
		if (data) {
			//this.excludeTracks = data;
			this.imageUrl = data;
			
		}
	}
	async presentAlertConfirm() {
	    const alert = await this.alertController.create({
	      message: 'Confirm! <strong>You are sure to sign out</strong>!!!',
	      buttons: [
	        {
	          text: 'Cancel',
	          role: 'cancel',
	          cssClass: 'secondary',
	          handler: (blah) => {
	            console.log('Confirm Cancel: blah');
	          }
	        }, {
	          text: 'Okay',
	          handler: () => {
	          	
	      			this.router.navigate(['login']);
	    		
	            console.log('Confirm Okay');
	          }
	        }
	      ]
	    });

	    await alert.present();
	}

}
