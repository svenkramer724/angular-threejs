import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TwSelectModule } from 'ng-tw';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import { TypingAnimatorModule } from 'angular-typing-animator';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GptApiService } from './services/gpt-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';






@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    SharedModule,
    AppRoutingModule,
    TypingAnimatorModule,
    TwSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GptApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
