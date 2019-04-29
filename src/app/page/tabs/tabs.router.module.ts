import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../tab-home/tab-home.module#TabHomePageModule'
          }
          
        ]
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: '../tab-news/tab-news.module#TabNewsPageModule'
          },
          {
            path: ':newsId',
            loadChildren: '../app-pages/news/news-details/news-details.module#NewsDetailsPageModule'
          }
        ]
      },
      {
        path: 'deals',
        children: [
          {
            path: '',
            loadChildren: '../tab-promote/tab-promote.module#TabPromotePageModule'
          },
          {
            path: ':dealsId',
            loadChildren: '../app-pages/deals/deals-details/deals-details.module#DealsDetailsPageModule'
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../tab-more/tab-more.module#TabMorePageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../tab-profile/tab-profile.module#TabProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
