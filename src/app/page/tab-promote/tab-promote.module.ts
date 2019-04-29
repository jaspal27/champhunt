import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../component/components.module';
import { TabPromotePage } from './tab-promote.page';
import { PipesModule } from  '../../pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: TabPromotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ComponentsModule
  ],
  declarations: [TabPromotePage]
})
export class TabPromotePageModule {}
