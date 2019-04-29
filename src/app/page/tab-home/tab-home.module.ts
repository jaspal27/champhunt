import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../component/components.module';
import { TabHomePage } from './tab-home.page';
import { ParallaxCommonModule } from '../../common/parallax/parallax.module';
import { BestplayersComponent } from '../../component/bestplayers/bestplayers.component';
import { AboutusComponent } from '../../app-pages/aboutus/aboutus.component';
import {NewsDetailsPage} from '../app-pages/news-details/news-details.page';
//import {DealsPage} from  '../app-pages/deals/deals.page';
import {ArticlesDetailsPage} from '../app-pages/articles-details/articles-details.page';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ParallaxCommonModule,
    ComponentsModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: TabHomePage }])
  ],
  entryComponents: [NewsDetailsPage,ArticlesDetailsPage,AboutusComponent],
  declarations: [TabHomePage,BestplayersComponent,NewsDetailsPage,ArticlesDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabHomePageModule {}
