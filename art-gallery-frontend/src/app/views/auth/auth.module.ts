import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// View Models
import { LoginViewModel } from '../../view-models/login.view-model';
import { RegisterViewModel } from '../../view-models/register.view-model';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    TranslateModule.forChild()
  ],
  providers: [
    // View models
    LoginViewModel,
    RegisterViewModel
  ]
})
export class AuthModule { }