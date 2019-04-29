import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ForgotPage } from '../forgot/forgot.page';
import { LoginPageRoutingModule } from './login-routing.module'
import { LoginPage } from './login.page';
import { SignupPage } from '../signup/signup.page';
import { EmailVerficationPage } from '../email-verfication/email-verfication.page';
import { ComponentsModule } from '../../../component/components.module';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    ComponentsModule
   
  ],
  declarations: [LoginPage,SignupPage,ForgotPage,EmailVerficationPage,PrivacyPolicyPage],
  entryComponents: [
    SignupPage,
    ForgotPage,
    PrivacyPolicyPage,
    EmailVerficationPage
  ]
})
export class LoginPageModule {}
