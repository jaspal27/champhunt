import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsDetailsPage } from './news-details.page';
import { ParallaxCommonModule } from 'src/app/common/parallax/parallax.module';
import { NewsDetailsComponent } from 'src/app/component/news-details/news-details.component';

const routes: Routes = [
  {
    path: '',
    component: NewsDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParallaxCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsDetailsPage,NewsDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsDetailsPageModule {}
