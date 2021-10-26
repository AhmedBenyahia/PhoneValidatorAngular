import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhoneValidatorComponent} from './phone-validator/phone-validator.component';

const routes: Routes = [
  {
    path: '**',
    component: PhoneValidatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
