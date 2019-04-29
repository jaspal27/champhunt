import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TabProfilePage } from './tab-profile.page';
import { ParallaxCommonModule } from '../../common/parallax/parallax.module';
import { PopoverViewComponentModule } from '../../component/popover-view/popover-view.module';
import { PopoverViewComponent } from '../../component/popover-view/popover-view.component';
import { MyprofilePage } from '../app-pages/myprofile/myprofile.page';
import { ImageCropperModalComponent } from '../../component/imageCropper/image-cropper-modal/image-cropper-modal.component';
import { UploadVideoComponent } from '../../component/upload-video/upload-video.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ParallaxCommonModule,
    PopoverViewComponentModule,
    RouterModule.forChild([{ path: '', component: TabProfilePage }])
  ],
  declarations: [TabProfilePage,MyprofilePage,ImageCropperModalComponent,UploadVideoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MyprofilePage,ImageCropperModalComponent,UploadVideoComponent]
})
export class TabProfilePageModule {}
