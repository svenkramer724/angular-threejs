import { HeaderComponent } from './../../components/header/header.component';
import { FooterComponent } from './../../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingAnimatorModule } from 'angular-typing-animator';
import { RouterModule } from '@angular/router';
import { ChatGPTComponent } from 'src/app/components/chat-gpt/chat-gpt.component';
import { FooterTwoComponent } from 'src/app/components/footer-two/footer-two.component';
import { HeaderTwoComponent } from 'src/app/components/header-two/header-two.component';
import { GptApiService } from 'src/app/services/gpt-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypewriterDirective } from 'src/app/directives/typewriter.directive';
import { Typewriter2Directive } from 'src/app/directives/typewriter-2.directive';
import { TypewriterPipe } from 'src/app/pipes/typewriter.pipe';
import { RoadmapComponent } from 'src/app/components/roadmap/roadmap.component';
import { PopoverContentComponent } from 'src/app/components/popover-content/popover-content.component';
import { AppleMenuComponent } from 'src/app/components/apple-menu/apple-menu.component';
import { ExpertComponent } from 'src/app/components/expert/expert.component';
import { IosSelectorDirective } from 'src/app/directives/ios-selector.directive';
import { ModalCloserDirective } from 'src/app/directives/modal-closer.directive';
import { RubikComponent } from 'src/app/components/rubik/rubik.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent,ChatGPTComponent, FooterTwoComponent, TypewriterDirective,TypewriterPipe,
    Typewriter2Directive, RoadmapComponent,AppleMenuComponent, ExpertComponent, IosSelectorDirective, ModalCloserDirective,
    HeaderTwoComponent, PopoverContentComponent, RubikComponent, AdminComponent],
  exports:[FooterComponent, HeaderComponent,ChatGPTComponent,  FooterTwoComponent, ModalCloserDirective,
    HeaderTwoComponent, TypewriterDirective, TypewriterPipe, RoadmapComponent, AppleMenuComponent, ExpertComponent, IosSelectorDirective,
    Typewriter2Directive, PopoverContentComponent, RubikComponent, AdminComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TypingAnimatorModule
  ],
  providers:[GptApiService]
})
export class SharedModule { }
