import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from '../../../environments/environment';
import { promised, resolve } from "q";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {
  constructor( private googlePlus: GooglePlus,private facebook: Facebook,
    private nativeStorage: NativeStorage) { }
  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
    //return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  async AuthorisedUser(email: string, password: string){
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    if(user){

    }

  }
  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(email: string, password: string): Promise<any> {
    
    //return firebase.auth().createUserWithEmailAndPassword(email, password);
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        res =>{
          res.user.sendEmailVerification();
          resolve(res)
        } ,
        err => reject(err))
    })
  }

   async register(email: string, password: string) :Promise<any>{
    let response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    return new Promise<any>((resolve, reject) => {
       resolve(response);
    
    })
      /* .then(res => {
        let user = firebase.auth().currentUser;
        user.sendEmailVerification();
        //this.navCtrl.setRoot('LoginPage');
        return  res;
      });*/
    
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  async resetPassword(email: string): Promise<any> {
    let response = await firebase.auth().sendPasswordResetEmail(email);
    return new Promise<any>((resolve, reject) => {
      resolve(response);
   
   })
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): Promise<any> {
    return firebase.auth().signOut();
  }
   
  async doGoogleLogin():Promise<any>{
   
    try {

    const gUser = await this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': environment.googleWebClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      });
     const userAuth = await  firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gUser.idToken))
    return userAuth;
    } catch(err) {
      console.log(err)
    }

 /*  this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': environment.googleWebClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user => {
        //save user data on the native storage
        console.log(user);  
        }, err => {
        console.log(err);
      })*/
  }
  async webGoogleLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await firebase.auth().signInWithPopup(provider);
      return credential;
    } catch(err) {
      console.log(err)
    }
  
  }
  async doFacebookNativeLogin():Promise<any>{
    
    return new Promise<any>((resolve,reject)=>{
      const permissions = ["public_profile", "email"];
    this.facebook.login(permissions)
       .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
          let userId = response.authResponse.userID;
          this.facebook.api("/me?fields=name,email,address,picture", permissions)
			    .then(user =>{
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=small";
          })
          firebase.auth().signInWithCredential(facebookCredential)
            .then( success => { 
              console.log("Firebase success: " + JSON.stringify(success)); 
              resolve(success);
            },error =>{
              reject(error);
              console.log('sign in error :' + error)
            });
         //save user data on the native storage
         console.log(response);  
       }, err => {
         console.log(err);
         reject(err);
         /*if(!this.platform.is('cordova')){
           this.presentAlert();
         }*/
         
       })
    })
    
   }
  async webFacebookLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await firebase.auth().signInWithPopup(provider);
      return credential;
    } catch(err) {
      return(err)
    }
  
  }
  
}
