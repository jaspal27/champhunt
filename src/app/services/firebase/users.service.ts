import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    AngularFirestore,
    AngularFirestoreCollection
  } from "angularfire2/firestore";
  import { Users } from '../../models/users'
import { reject } from "q";
@Injectable({
  providedIn: 'root'
})

export class UsersService {
    private snapshotChangesSubscription: any;
    private usersCollection: AngularFirestoreCollection<Users>;
    private users: Observable<Users[]>;
    private usersData:any;
    constructor(private angularFireStore: AngularFirestore){
       
    }
    getUsers(){
       /* this.usersCollection = this.angularFireStore.collection<Users>('users');
        this.users = this.usersCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
                });
            })
            );
         return new Promise<any>((resolve, reject) => {
            this.angularFireStore.collection('users').doc('VttemofxOHlLf9ds8LQi').snapshotChanges()
            .subscribe(res=>{
                console.log(res);
            })
            this.snapshotChangesSubscription = this.angularFireStore.collection('users').snapshotChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            })
          });*/
          /*return new Promise<any>((resolve, reject) => {  
            this.usersCollection = this.angularFireStore.collection<Users>('users');
            this.users = this.usersCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
                });
            })
            );
            
        });*/
      }
      
      getUser(userId){
        // userId = '6I9DNzWfnsaPHmNM0tOv3ACYXyc2';
        return new Promise<any>((resolve, reject) => {
          this.angularFireStore.collection('users').doc(userId).snapshotChanges()
            .subscribe(res=>{
              if(res.payload.data()){
                this.usersData = res.payload.data();
                this.usersData.userId = userId;
                resolve(res);
              }else{
                resolve(null);
              }
              
            }, 
            err => reject(err)
            )
        }); // end of promise
         
      }
      getUserLocalObject(){
        return this.usersData;
      }

    async userProfileOptions() :Promise<any>{
      return new Promise<any>((resolve, reject) => {
        this.angularFireStore.collection('profileOptions').doc('HGkxjp7YWP5WrUf3EusE').snapshotChanges()
          .subscribe(res=>{
            resolve(res.payload.data())
          }, 
          err => reject(err)
          )
      }); // end of promise
    
  }
  saveUserProfilePhoto(userData:any){
    this.createUser(userData);
  }    
      async createUser(userData:any){
        // docId = '6I9DNzWfnsaPHmNM0tOv3ACYXyc2';
     return  await this.angularFireStore.collection('users').doc(userData.userId).set(userData)
     /*name:userData.name,
     dob:userData.dob,
     email:userData.email,
     phone:userData.phone,
     playforState:userData.playforState,
     typeofBatsman:userData.typeofBatsman,
     runs:userData.runs,
     wickets:userData.wickets,
     typeofBowler:userData.typeofBowler,
     cricketClub:userData.cricketClub,
     redeem:userData.redeem,
     profilePhoto:userData.profilePhoto,
     isProfileCreated:true,*/
      }
}