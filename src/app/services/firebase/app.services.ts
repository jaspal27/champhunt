import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    AngularFirestore,
    AngularFirestoreCollection
  } from "angularfire2/firestore";
import { reject } from "q";
@Injectable({
  providedIn: 'root'
})

export class AppService {
    private snapshotChangesSubscription: any;
    constructor(private angularFireStore: AngularFirestore){
    }
    async getNewsData() :Promise<any>{
      return new Promise<any>((resolve, reject) => {
        this.angularFireStore.collection('news').doc('Z2lnlxNl3gpycbfz2fwg').snapshotChanges()
          .subscribe(res=>{
            resolve(res.payload.data())
          }, 
          err => reject(err)
          )
      }); // end of promise
    }
    async getArticleData() :Promise<any>{
        return new Promise<any>((resolve, reject) => {
        this.angularFireStore.collection('articles').doc('zvXQNOVrB7lLzAMOX09V').snapshotChanges()
            .subscribe(res=>{
                resolve( res.payload.data())
            }, 
            err => reject(err)
            )
        }); // end of promise
    }
    async getPolls(){
     return new Promise<any>((resolve, reject) => {
      this.angularFireStore.collection('polls').doc('EjSfNrGxqeLrA3he27Oo').snapshotChanges()
          .subscribe(res=>{
              resolve( res.payload.data())
          }, 
          err => reject(err)
          )
      }); // end of promise
      
    }
    async getDealsData() :Promise<any>{
        return new Promise<any>((resolve, reject) => {
        this.angularFireStore.collection('deals').doc('7AZ3b6eycjoXDHSPc0Ku').snapshotChanges()
            .subscribe(res=>{
            resolve(res.payload.data())
            }, 
            err => reject(err)
            )
        }); // end of promise
    }
    
}