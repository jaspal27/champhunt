import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { UsersService } from '../../services/firebase/users.service';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private cameraImage: String;
  private cameraOptions: CameraOptions = {
    quality: 100,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    //mediaType: this.camera.MediaType.PICTURE,
    
  };

  constructor(
    
    private camera: Camera,
    private events: Events,
    public actionSheet: ActionSheetController,
    public usersService:UsersService,
    //private photoUploaderService: PhotoUploaderService, 
    ) { }

  /**
   *
   * Select an image from the device photo library
   *
   * @public
   * @method getImage
   * @return {Promise}
   */
  
  getImage(cameraObject): Promise<any> {
    return new Promise(resolve => {
      let cameraSheet = this.actionSheet.create({
        buttons: [{
          text: 'Photo Library',
          handler: () => {
            cameraObject.sourceType = "library";
            this.loadImage(cameraObject)
              .then((data: any) => {
                resolve(data);
              });
          }
        }, {
          text: 'Take Photo',
          handler: () => {
            cameraObject.sourceType = "camera";
            this.loadImage(cameraObject)
              .then((data: any) => {
                resolve(data);
              });
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }]
      });

    });
  }

  /**
   *
   * Select a new image or remove the existing one
   *
   * @public
   * @method editImage
   * @return {Promise}
   */
  editImage(): Promise<any> {
    return new Promise(resolve => {
      
        this.actionSheet.create({
          buttons: [
            {
              text: 'Edit Image',
              handler: () => {
                resolve('edit');
              }
            },
            {
              text: 'Remove Photo',
              handler: () => {
                resolve('remove');
              },
              role: 'Remove',
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
      
    });
  }

  /**
   * @public
   * @method chooseFromLibrary
   * @param cameraObject
   */
  public chooseFromLibrary(cameraObject): Promise<any> {
    return new Promise(resolve => {
      cameraObject.source = 'library';
      this.loadImage(cameraObject)
        .then((data: any) => {
          resolve(data);
        });
    });

  }

  /**
   * @public
   * @method openCamera
   * @param cameraObject
   */
  public openCamera(cameraObject): Promise<any> {
    return new Promise(resolve => {
      cameraObject.source = 'camera';
      this.loadImage(cameraObject)
        .then((data: any) => {
          resolve(data);
        });
    });
  }


   /**
  * @private
  * @method loadImage
  * @param cameraObject
  */
 private loadImage(cameraObject): Promise<any> {
  return new Promise(resolve => {
    if (cameraObject.isNative) { // this will use if we want to use Native crop with File URI instead of Data Uri
      this.cameraOptions.destinationType = this.camera.DestinationType.FILE_URI;
    }
    let cameraSourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    if (cameraObject.sourceType === 'camera') {
      cameraSourceType = this.camera.PictureSourceType.CAMERA;
      //this.cameraOptions.allowEdit = true;
    }
    this.cameraOptions.sourceType = cameraSourceType;
    // this.cameraOptions.targetWidth = cameraObject.width;
    // this.cameraOptions.targetHeight = cameraObject.height;

    this.camera.getPicture(this.cameraOptions)
      .then((data) => {
        let options: any = {
          quality: cameraObject.quality || 75,
          keepingAspectRatio: true,
          targetHeight: cameraObject.targetHeight || -1,
          targetWidth: cameraObject.targetWidth || -1

        }
        if (cameraObject.isNative) {
          /*this.crop.crop(data, options)
            .then(
              newImage => resolve(normalizeURL(newImage)),
              error => resolve(error)
            );*/
        } else {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        }
      });
  })
}
/*
public getPhoto(userGuid: string, typeKey: PhotoTypeKey): any {
  return this.photoUploaderService.getPhoto(userGuid, typeKey).map(response => {
    return this.parsePhotoUrl(response)
  });
}

public getPhotos(userGuids: string[], typeKey: PhotoTypeKey): any {
  return this.photoUploaderService.getPhotos(userGuids, typeKey);
}

public savePhoto(image: any, typeKey: PhotoTypeKey, removePreviousPhoto = false): any {
  return this.photoUploaderService.uploadPhoto(image, typeKey, removePreviousPhoto).map((response) => {
    let parsedResponse = this.parsePhotoUrl(response);

    if (typeKey === PhotoTypeKey.PROFILE) {
      this.events.publish('profile-photo-updated', parsedResponse.URL);
    }

    return parsedResponse;
  });
}

public removePhoto(photoPublicId: string) {
  return this.photoUploaderService.deletePhoto(photoPublicId);
}*/
public savePhoto(userObject: any, removePreviousPhoto = false): any {
  return this.usersService.saveUserProfilePhoto(userObject)
}
private parsePhotoUrl(response) {
  let URL = "";
  let publicId = "";

  if (response && response.requestUrl && response.photoInfos && response.photoInfos.length) {
    publicId = response.photoInfos[0].publicId;
    URL = response.requestUrl + publicId;
  }

  return {
    URL: URL,
    publicId: publicId
  };
}
}


