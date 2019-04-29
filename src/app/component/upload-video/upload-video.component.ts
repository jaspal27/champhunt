import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { NavParams, AlertController, LoadingController,ModalController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer,FileUploadOptions,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/firebase/users.service';
import { UrlSerializer } from '@angular/router';
const baseUrl = 'https://api.cloudinary.com/v1_1/champhunt' +  "/video/upload";
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";
@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
})


export class UploadVideoComponent implements OnInit {
  @ViewChild('videoPlayer')videoPlayer:ElementRef
  validationsForm: FormGroup;
  selectedVideo: string; //= "https://res.cloudinary.com/demo/video/upload/w_640,h_640,c_pad/dog.mp4";
  uploadedVideo: string;
  showVideoPlayer:boolean= false;
  isUploading: boolean = false;
  uploadPercent: number = 0;
  videoFileUpload: FileTransferObject;
  userObject:any ={};
  
  loader;
  validations = {
    
    'title': [
      { type: 'required', message: 'title is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ],
    'videoDate': [
      { type: 'required', message: 'Video Date is required.' }
      
    ],
   
    
    
  };
  constructor(private camera: Camera,private loadingCtrl:LoadingController,private alertCtrl:AlertController,
    private transfer: FileTransfer,private params: NavParams, private file: File,private webview: WebView,private modalController:ModalController
    ,private userService:UsersService) {
      this.validationsForm = new FormGroup({
        'title': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'videoDate': new FormControl('',Validators.required),
      });
      this.userObject = this.params.get('userData');
     }

  ngOnInit() {}
  onClosePhotoModal(){
    this.modalController.dismiss(this.uploadedVideo)
  }
  toggleVideo(event: any) {
    this.videoPlayer.nativeElement.play();
}
  selectVideo() {
    if(this.userObject.userVideos){
      if(this.userObject.userVideos.length>5){
        return this.presentAlert("Error","You can not upload more than 5 videos.Please delete the existing video.");

      }
    }
    //this.selectedVideo = 'https://res.cloudinary.com/champhunt/video/upload/v1556418257/20190427_180835_mcptjz.mp4';
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options)
      .then( async (videoUrl) => {
        if (videoUrl) {
         // this.showLoader();
         // this.uploadedVideo = null;
          
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
           // this.dismissLoader();
           // return this.presentAlert("Error","Something went wrong.");
          }
          
          retrievedFile.file( data => {
             // this.dismissLoader();
             this.selectedVideo = '';
              if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error", "You cannot upload more than 5mb.");
              if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error", "Incorrect file type.");
              this.showVideoPlayer = false;
              this.selectedVideo = this.webview.convertFileSrc(retrievedFile.nativeURL);
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }

  async uploadVideo() {
    if (!this.validationsForm.valid) {
      return;
    }
    let videoObject:any = {};
    
    videoObject.title = this.validationsForm.value.title;
    videoObject.description= this.validationsForm.value.description;
    videoObject.videoDate = this.validationsForm.value.videoDate;

    var filename = this.selectedVideo.substr(this.selectedVideo.lastIndexOf('/') + 1);
    var options: FileUploadOptions = {
      fileName: filename,
      fileKey: "file",
      mimeType: "video/mp4",
      params:{'upload_preset':'zdrhb8vp'},
    }
    this.videoFileUpload = this.transfer.create();
    this.isUploading = true;
    this.videoFileUpload.upload(this.selectedVideo, baseUrl, options)
      .then((data)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        return JSON.parse(data.response);
      })
      .then((data) => {        
        this.uploadedVideo = data.url;
        videoObject.videoUrl = 'https://res.cloudinary.com/champhunt/video/upload/v1556418257/20190427_180835_mcptjz.mp4';
        if(!this.userObject.userVideos){
          this.userObject.userVideos =[];
        }
        this.userObject.userVideos.push(videoObject);
        this.userService.createUser(this.userObject).then(res=>{
        console.log('video saved success'); 
        });
        this.presentAlert("Success", "Video upload was successful.");
      })
      .catch((err)=>{
        alert( JSON.parse(err));
        this.isUploading = false;
        this.uploadPercent = 0;
        this.presentAlert("Error", "Error uploading video.");
      });

    this.videoFileUpload.onProgress((data) => {
      this.uploadPercent = Math.round((data.loaded/data.total) * 100);
    });

  }
  async showLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }

  async presentAlert(title, message) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: ['Dismiss']
    });
    await alert.present();
  }

  cancelSelection() {
    this.selectedVideo = null;
    this.uploadedVideo = null;
  }
  cancelUpload() {
    this.videoFileUpload.abort();
    this.uploadPercent = 0;
  } 
}
