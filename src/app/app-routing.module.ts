import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: './page/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './page/app-pages/login/login.module#LoginPageModule' },
  
  
  
  
  
  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
