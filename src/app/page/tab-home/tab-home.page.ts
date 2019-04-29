import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/firebase/users.service';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { MyprofilePage } from '../app-pages/myprofile/myprofile.page';
import {NewsDetailsPage} from '../app-pages/news-details/news-details.page';
import { AppService } from '../../services/firebase/app.services';
import {ArticlesDetailsPage} from '../app-pages/articles-details/articles-details.page';

import { Router } from '@angular/router';
import { async } from 'q';
import { JsonPipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AboutusComponent } from '../../app-pages/aboutus/aboutus.component';
//import { AboutusComponent } from 'src/app/app-pages/aboutus/aboutus.component';

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss']
})
export class TabHomePage {
	readonly ourMission:any = "Champ Hunt is a social impact organization that aims to provide a lifelong enjoyment of sports to our users while emphasizing ...";
	readonly ourVision:any = "Champ Hunts’ vision serves as a guideline for each and every aspect of our business, ensuring a profitable and successful future ...";
	readonly whoWeAre:any = "Champ Hunt is dedicated to providing the highest quality sporting experience to each user on our platform. We bring sports and technology together to make the best out of it...";
	profile:any = {"friends": [
		{
			"image": "./assets/sample-images/user/person_1.jpg",
			"name": "Leo Gill",
			"job": "Ionic Developer",
			"followers": "24",
			"followings": "120",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_2.jpg",
			"name": "Marie Jensen",
			"job": "Illustrator",
			"followers": "300",
			"followings": "120K",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_3.jpg",
			"name": "Sasha Ho",
			"job": "UI Designer",
			"followers": "65",
			"followings": "30",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_4.jpg",
			"name": "Duane Miles",
			"job": "Graphic Designer",
			"followers": "24K",
			"followings": "10K",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_5.jpg",
			"name": "Joaquin Marquez",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_6.jpg",
			"name": "Leah Stevens",
			"job": "Ionic Developer",
			"followers": "24",
			"followings": "120",
			"following": false
		}
	],
	"followers": [
		{
			"image": "./assets/sample-images/user/person_7.jpg",
			"name": "Tyrone Lowe",
			"job": "Ionic Developer",
			"followers": "24",
			"followings": "120",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_8.jpg",
			"name": "Micheal Murphy",
			"job": "Illustrator",
			"followers": "300",
			"followings": "120K",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_9.jpg",
			"name": "Sophie Turner",
			"job": "UI Designer",
			"followers": "65",
			"followings": "30",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_10.jpg",
			"name": "Srithan Savela",
			"job": "Graphic Designer",
			"followers": "24K",
			"followings": "10K",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_11.jpg",
			"name": "Linnea Berthelsen",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": true
		}
	],
	"following": [
		{
			"image": "./assets/sample-images/user/person_12.jpg",
			"name": "Seth Cottle",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_13.jpeg",
			"name": "Annabella Graham",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_14.jpg",
			"name": "Sheyra",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_15.jpg",
			"name": "Ali Khundmiri",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": true
		}
	]}
	pollsObject:any;
	pollingUrl:any ;
	list_menu: any;
	newsPayload:any;
	newsObject:any;
	articlesPayload:any;
	dealsPayload:any;
	userObject:any;
	isGoogleFormSubmitted:boolean = false;
	trustedArticleImageUrl : SafeUrl;
	slideOpts = {
	    effect: 'flip',
	    autoHeight: true,
	    speed: 1000,
    	// spaceBetween: 50,
	    loop: true,
	    autoplay: {
    		delay: 3000,
  		},
	};

	constructor(
		public loadingController: LoadingController,
		public modalCtrl: ModalController,
		public alertController:AlertController,
		public user:UsersService,
		public navCtrl : NavController,
		private router: Router,
		public appService:AppService,
		private sanitizer: DomSanitizer,
		
		
	){
		this.list_menu = environment.menu;
	}
	async ngOnInit() {
		this.isGoogleFormSubmitted = false;
		this.userObject = this.user.getUserLocalObject();
		let articleData:any = await this.appService.getArticleData();
		this.articlesPayload = JSON.parse(articleData.articles);
	/*	for(let item in this.articlesPayload){
			this.articlesPayload.artilces[1].imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.articlesPayload(1).image);
		}*/
		let newsData:any = await this.appService.getNewsData();
		 this.dealsPayload = await this.appService.getDealsData();
		this.newsPayload = JSON.parse(newsData.news);
		let dealsData:any = await this.appService.getDealsData();
		this.newsObject = this.newsPayload.News[0];
		this.pollsObject = await this.appService.getPolls();
		this.pollingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pollsObject.pollingUrl)
		
		/*if(!userObjet.isProfileCreated){
			// load a controler and ask for creating the profile created
			this.presentAlertConfirm(MyprofilePage,null);
		}*/
			// fetch the news,deals and articles
		
	
	}
	resizeIframe(response){
		if(!this.isGoogleFormSubmitted){
			this.isGoogleFormSubmitted = true;
		}else{
			console.log('form submitted');
			let totalRuns= parseInt(this.userObject.score)+parseInt(this.pollsObject.runs);
			if(totalRuns){
				this.userObject.score  = totalRuns;
				this.user.createUser(this.userObject);
			}
			
			//implement the poll submited to object
		}
	}
	async onAboutUS(index){
		this.presentModal(AboutusComponent,index)
	}
	async onNews(newsData:any){
		this.presentModal(NewsDetailsPage,newsData)
	}
	
	async deals(){
		//this.router.navigate(['DealsPage']);
	//	this.presentModal(DealsPage, this.dealsPayload);
		
	}
	async onArticles(articleData:any){
		let totalRuns= parseInt(this.userObject.score)+parseInt(articleData.score);
		if(totalRuns){
		this.userObject.score  = totalRuns;
		this.user.createUser(this.userObject);
		this.presentModal(ArticlesDetailsPage,articleData)
		}
		
	}
	gotoDeals(dealsId){
		this.navCtrl.navigateRoot('/app/deals');
	}
	async presentAlertConfirm(page:any,modelObject:any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Please Create a profile to unlock all the features</strong>!!!',
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
						console.log('Confirm Okay');
						this.presentModal(page,null)
						
          }
        }
      ]
    });

    await alert.present();
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
