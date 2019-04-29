import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ComponentsModule } from './component/components.module';



import { ModalViewComponentModule } from './component/modal-view/modal-view.module';
import { NotfoundComponentModule } from './component/error/notfound/notfound.module';
import { InternalComponentModule } from './component/error/internal/internal.module';



import { HttpModule, Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';


//youtube
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { fromEventPattern } from 'rxjs';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ComponentsModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    ModalViewComponentModule,
    NotfoundComponentModule,
    InternalComponentModule,
    
    
   
  ],
  providers: [
    StatusBar,
    Camera,
    WebView,
    File,
    FileTransfer,
    SplashScreen,
    YoutubeVideoPlayer,
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
