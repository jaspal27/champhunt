import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bestplayers',
  templateUrl: './bestplayers.component.html',
  styleUrls: ['./bestplayers.component.scss','./bestplayers.shell.scss'],
})
export class BestplayersComponent implements OnInit {
  dataobject =10;
  dataPlayer ="Right Handed Batsman";
  imgPath = "./assets/images/lemon23.jpg";
  profile:any = {"friends": [
		{
			"image": "https://www.gstatic.com/webp/gallery3/1.png",
			"fname": "Leo",
			"lname": "Gill",
			"job": "Ionic Developer",
			"followers": "24",
			"followings": "120",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_2.jpg",
			"fname": "Marie",
			"lname": "Jensen",
			"job": "Illustrator",
			"followers": "300",
			"followings": "120K",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_3.jpg",
			"fname": "Sasha",
			"lname": "Ho",
			"job": "UI Designer",
			"followers": "65",
			"followings": "30",
			"following": false
		},
		{
			"image": "./assets/sample-images/user/person_4.jpg",
			"fname": "Duane",
			"lname": "Miles",
			"job": "Graphic Designer",
			"followers": "24K",
			"followings": "10K",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_5.jpg",
			"fname": "Joaquin",
			"lname": "Marquez",
			"job": "Developer",
			"followers": "100",
			"followings": "102",
			"following": true
		},
		{
			"image": "./assets/sample-images/user/person_6.jpg",
			"fname": "Leah",
			"lname": "Stevens",
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
  constructor() { }

  ngOnInit() {}

}
