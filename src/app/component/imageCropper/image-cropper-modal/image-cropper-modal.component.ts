import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavParams,LoadingController,ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../photo.service';




declare var Croppie: any;

@Component({
  selector: 'image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss'],
})
export class ImageCropperModalComponent implements AfterViewInit {

   private data: any = {};
  private imgCropper: any;
  private loaderModal: any;
  private skipSaving: boolean = false;
  private cropImageData:string;
  constructor(public params: NavParams,
              private photoProvider: PhotoService,
              private http: HttpClient,
              public loadingController: LoadingController,
              public modalController:ModalController
              ) {
    this.data = {};
  }

  // Initialize the Croppie Object with user defined properties
  ngAfterViewInit() {
    let el = document.getElementById('image-Cropper');
    let defaultViewport = {width: 300, height: 300, type: 'circle'};
    this.imgCropper = new Croppie(el, {
      viewport: this.params.get('viewport') || defaultViewport,
      showZoomer: false,
      enableOrientation: false,

    });
    this.bindImage(this.params.get('userData').profilePhoto);
    //this.photoTypeKey = this.params.get('photoTypeKey') || PhotoTypeKey.PROFILE;
    this.skipSaving = this.params.get('skipSaving') || false;
  }

  bindImage(imgUrl) {
    if(imgUrl){
      this.imgCropper.bind({url: '',}); // reset url for loading image again
    this.imgCropper.bind({
      url: imgUrl,
      orientation: 4
    });
    }
    
  }

  /**
   *
   * Select an image from the device Photo Library
   *
   * @public
   * @method selectImage
   * @return none
   */
  selectImage(sourceType) {
    let that = this;
    let cameraOptions = {
      width: -1,
      height: -1,
    };

    this.photoProvider.getImage(cameraOptions)
      .then((data: any) => {
        let image: any = new Image();
        image.src = data;
        that.bindImage(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  selectFromLibrary() {
    let that = this;
    let cameraOptions = {
      width: -1,
      height: -1,
    };

    this.photoProvider.chooseFromLibrary(cameraOptions)
      .then((data: any) => {
        let image: any = new Image();
        image.src = data;
        that.bindImage(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  selectCamera() {
    let cameraOptions = {
      width: -1,
      height: -1,
    };

    this.photoProvider.openCamera(cameraOptions)
      .then((data: any) => {
        let image: any = new Image();
        image.src = data;
        this.bindImage(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }
  onSavePhotoModal(){
    this.imgCropper.result('base64').then((response) => {
      if(response){
         console.log('image Url: ' + response);
         this.saveImage(response);
       }
       
     });
  }
  onClosePhotoModal() {
    this.modalController.dismiss(null);
  }

  onCancelPhotoModal() {
   // this.overlayService.hideModal(null);
  }

  /**
   *
   * Retrieve the cropped image value (base64 image data)
   *
   * @public
   * @method saveImage
   * @return none
   */
  async saveImage(imageData: string) {
    this.loaderModal = await this.loadingController.create({ message: 'loading ...' });
    let updatingExistingPicture = this.params.get('updateExistingPicture');
    let userObject = this.params.get('userData');
    userObject.profilePhoto = imageData;
    this.cropImageData = imageData;
    await this.loaderModal.present();
    this.photoProvider.savePhoto(userObject,  updatingExistingPicture);
    this.hideLoader();
  }

  hideLoader() {
   
    if (this.loaderModal) {
      this.loaderModal.dismiss();
      this.loaderModal = null;
      this.modalController.dismiss(this.cropImageData);
    }
    
  }

}
