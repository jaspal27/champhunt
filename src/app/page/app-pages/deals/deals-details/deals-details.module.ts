import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DealsDetailsPage } from './deals-details.page';
import { ParallaxCommonModule } from 'src/app/common/parallax/parallax.module';
import { DealsDetailsComponent } from 'src/app/component/deals-details/deals-details.component';

const routes: Routes = [
  {
    path: '',
    component: DealsDetailsPage
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
  declarations: [DealsDetailsPage,DealsDetailsComponent]
})
export class DealsDetailsPageModule {}
