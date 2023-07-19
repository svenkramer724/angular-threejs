import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwSelectModule } from 'ng-tw';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../modules/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { TypingAnimatorModule } from 'angular-typing-animator';
import { InvestorComponent } from './investor/investor.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [HomeComponent, PagesComponent, InvestorComponent, EcosystemComponent],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    TypingAnimatorModule,
    TwSelectModule
  ]
})
export class PagesModule { }
